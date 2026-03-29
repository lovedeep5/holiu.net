-- ================================================
-- HOLIU.NET — Initial Schema Migration
-- ================================================

-- ── products ────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.products (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            text UNIQUE NOT NULL,
  name_en         text NOT NULL,
  name_de         text,
  description_en  text,
  description_de  text,
  category        text NOT NULL,
  price           integer NOT NULL,
  currency        text NOT NULL DEFAULT 'EUR',
  stripe_price_id text,
  file_path       text,
  thumbnail_url   text,
  featured        boolean NOT NULL DEFAULT false,
  published       boolean NOT NULL DEFAULT true,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- ── profiles ────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       text NOT NULL,
  full_name   text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- ── orders ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.orders (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id text UNIQUE NOT NULL,
  customer_email    text NOT NULL,
  user_id           uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  status            text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','paid','failed')),
  created_at        timestamptz NOT NULL DEFAULT now()
);

-- ── order_items ──────────────────────────────────
CREATE TABLE IF NOT EXISTS public.order_items (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id    uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id  uuid NOT NULL REFERENCES public.products(id),
  price_paid  integer NOT NULL
);

-- ── download_tokens ──────────────────────────────
CREATE TABLE IF NOT EXISTS public.download_tokens (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token           text UNIQUE NOT NULL,
  order_item_id   uuid NOT NULL REFERENCES public.order_items(id) ON DELETE CASCADE,
  product_id      uuid NOT NULL REFERENCES public.products(id),
  email           text NOT NULL,
  expires_at      timestamptz NOT NULL,
  used            boolean NOT NULL DEFAULT false,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- ── leads ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.leads (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text,
  email       text NOT NULL,
  message     text,
  source      text DEFAULT 'contact',
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- ================================================
-- ROW LEVEL SECURITY
-- ================================================

ALTER TABLE public.products        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.download_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads           ENABLE ROW LEVEL SECURITY;

-- products: anyone can read published products
CREATE POLICY "products_public_read"
  ON public.products FOR SELECT
  USING (published = true);

-- profiles: user can read/update their own row
CREATE POLICY "profiles_own_select"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "profiles_own_update"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "profiles_own_insert"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- orders / order_items / download_tokens / leads:
-- service role only (no client-side access)
-- (No policies = only service_role bypass works)

-- ================================================
-- STORAGE BUCKET
-- ================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('digital-products', 'digital-products', false)
ON CONFLICT (id) DO NOTHING;

-- Service role can do everything on digital-products
CREATE POLICY "digital_products_service_all"
  ON storage.objects FOR ALL
  USING (bucket_id = 'digital-products')
  WITH CHECK (bucket_id = 'digital-products');
