-- ============================================================================
-- Lanny Santana Nutricionista — Desafio Fit Club (21 dias)
-- Run this in the Supabase SQL editor AFTER 004_teleconsulta_only.sql.
--
-- Standalone signup table for the "Desafio Fit Club" landing page. Kept
-- separate from `orders` (which models multi-session teleconsulta bookings)
-- because the challenge is a single flat-fee product with its own fields —
-- reusing `orders` would mean nullable columns that don't apply here.
-- ============================================================================

create type challenge_objective as enum ('emagrecimento', 'hipertrofia');

create table if not exists challenge_signups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  whatsapp text not null,
  email text not null,
  objective challenge_objective not null,
  amount_cents integer not null default 11990,
  payment_status payment_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists challenge_signups_email_idx on challenge_signups (email);
create index if not exists challenge_signups_payment_status_idx on challenge_signups (payment_status);

drop trigger if exists challenge_signups_set_updated_at on challenge_signups;
create trigger challenge_signups_set_updated_at
  before update on challenge_signups
  for each row execute function set_updated_at();

-- Row Level Security -----------------------------------------------------
alter table challenge_signups enable row level security;

create policy "public can create challenge signups"
  on challenge_signups for insert
  to anon
  with check (true);

-- Note: anon has no SELECT policy here either (same PII pattern as `orders`
-- in 003_orders.sql) — the checkout route reads it back with the service
-- role key, never the anon client.

create policy "authenticated can read challenge signups"
  on challenge_signups for select
  to authenticated
  using (true);

create policy "authenticated can update challenge signups"
  on challenge_signups for update
  to authenticated
  using (true);

create policy "authenticated can delete challenge signups"
  on challenge_signups for delete
  to authenticated
  using (true);
