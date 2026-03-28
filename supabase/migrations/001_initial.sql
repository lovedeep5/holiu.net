-- ============================================================
-- HOLIU.NET — Initial Supabase Migration
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            text UNIQUE NOT NULL,
  name_en         text NOT NULL,
  name_de         text,
  description_en  text,
  description_de  text,
  category        text NOT NULL CHECK (category IN ('Courses', 'Workshops', 'Meditations', 'Chakra Balancing', 'Channeling')),
  price           int NOT NULL,  -- in cents (€22 = 2200)
  currency        text NOT NULL DEFAULT 'EUR',
  stripe_price_id text,
  file_path       text,          -- Supabase Storage path in 'digital-products' bucket
  thumbnail_url   text,
  featured        boolean NOT NULL DEFAULT false,
  published       boolean NOT NULL DEFAULT true,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- Profiles (customer accounts)
CREATE TABLE IF NOT EXISTS profiles (
  id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       text NOT NULL,
  full_name   text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id text UNIQUE NOT NULL,
  customer_email    text NOT NULL,
  user_id           uuid REFERENCES profiles(id) ON DELETE SET NULL,
  status            text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed')),
  created_at        timestamptz NOT NULL DEFAULT now()
);

-- Order items
CREATE TABLE IF NOT EXISTS order_items (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id    uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id  uuid NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  price_paid  int NOT NULL
);

-- Download tokens
CREATE TABLE IF NOT EXISTS download_tokens (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token           text UNIQUE NOT NULL,
  order_item_id   uuid NOT NULL REFERENCES order_items(id) ON DELETE CASCADE,
  product_id      uuid NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  email           text NOT NULL,
  expires_at      timestamptz NOT NULL,
  used            boolean NOT NULL DEFAULT false,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- Leads (contact form + newsletter signups)
CREATE TABLE IF NOT EXISTS leads (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text,
  email       text NOT NULL,
  message     text,
  source      text CHECK (source IN ('contact', 'newsletter', 'free-gift')),
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE products        ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles        ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders          ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items     ENABLE ROW LEVEL SECURITY;
ALTER TABLE download_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads           ENABLE ROW LEVEL SECURITY;

-- Products: anyone can read published products; only service role can write
CREATE POLICY "Public read published products"
  ON products FOR SELECT
  USING (published = true);

-- Profiles: users can read and update their own profile
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Orders: users can read their own orders
CREATE POLICY "Users can read own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

-- Order items: users can read items from their own orders
CREATE POLICY "Users can read own order items"
  ON order_items FOR SELECT
  USING (
    order_id IN (
      SELECT id FROM orders WHERE user_id = auth.uid()
    )
  );

-- Download tokens: users can read their own tokens (by email match handled in API)
-- No direct public access — served only via /api/downloads/[token]

-- ============================================================
-- Storage bucket (create via Supabase Dashboard or CLI)
-- ============================================================
-- Bucket name: digital-products
-- Access: Private (no public access)
-- File size limit: 500MB
-- Allowed MIME types: audio/*, video/*, application/pdf, application/zip

-- ============================================================
-- Admin user setup
-- ============================================================
-- After running this migration:
-- 1. Go to Supabase Dashboard → Authentication → Users
-- 2. Create user: ruth@holiu.net (admin email)
-- 3. In the app, admin access is controlled by checking against ADMIN_EMAIL env var
