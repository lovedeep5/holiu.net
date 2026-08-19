-- Login attempt tracking for brute-force lockout (3 failed attempts -> 24h lock),
-- keyed by email and by IP so either dimension can trigger a lock.
create table if not exists login_attempts (
  id uuid primary key default gen_random_uuid(),
  identifier_type text not null check (identifier_type in ('email', 'ip')),
  identifier_value text not null,
  attempt_count int not null default 0,
  locked_until timestamptz,
  last_attempt_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (identifier_type, identifier_value)
);

create index if not exists idx_login_attempts_locked_until
  on login_attempts (locked_until)
  where locked_until is not null;

alter table login_attempts enable row level security;
-- Accessed only via the service-role client from server-side API routes — no public policies.

-- Generic rate limiter (currently used for the leads/contact form) — one row per
-- (bucket, identifier) sliding window.
create table if not exists rate_limit_hits (
  bucket text not null,
  identifier text not null,
  count int not null default 0,
  window_start timestamptz not null default now(),
  primary key (bucket, identifier)
);

alter table rate_limit_hits enable row level security;
-- Accessed only via the service-role client from server-side API routes — no public policies.
