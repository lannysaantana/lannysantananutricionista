-- ============================================================================
-- Lanny Santana Nutricionista — Desafio Fit Club: anamnese pós-pagamento +
-- cupom de desconto para quem já participou.
-- Run this in the Supabase SQL editor AFTER 005_fitclub_challenge.sql.
-- ============================================================================

alter table challenge_signups
  add column if not exists coupon_code text;

-- ----------------------------------------------------------------------
-- challenge_anamnese: preenchida após o pagamento confirmado, uma por
-- inscrição. Fotos e medidas de perímetro corporal continuam sendo
-- enviadas por WhatsApp (usadas na avaliação Body3D), não por upload aqui.
-- ----------------------------------------------------------------------
create table if not exists challenge_anamnese (
  id uuid primary key default gen_random_uuid(),
  signup_id uuid not null unique references challenge_signups (id) on delete cascade,
  age integer not null check (age between 12 and 100),
  weight_kg numeric(5, 1) not null,
  height_cm numeric(5, 1) not null,
  food_preferences text,
  food_aversions text,
  allergies text,
  meal_schedule text,
  breakfast text,
  morning_snack text,
  lunch text,
  afternoon_snack text,
  dinner text,
  training_frequency text,
  training_time text,
  medications_in_use text,
  waist_cm numeric(5, 1),
  hip_cm numeric(5, 1),
  referred_by text,
  created_at timestamptz not null default now()
);

create index if not exists challenge_anamnese_signup_id_idx on challenge_anamnese (signup_id);

-- Row Level Security -----------------------------------------------------
alter table challenge_anamnese enable row level security;

create policy "public can create challenge anamnese"
  on challenge_anamnese for insert
  to anon
  with check (true);

-- Note: anon has no SELECT policy here either (same PII pattern as
-- `challenge_signups`) — the admin panel reads through an authenticated
-- session, which the policy below allows.

create policy "authenticated can read challenge anamnese"
  on challenge_anamnese for select
  to authenticated
  using (true);

create policy "authenticated can update challenge anamnese"
  on challenge_anamnese for update
  to authenticated
  using (true);

create policy "authenticated can delete challenge anamnese"
  on challenge_anamnese for delete
  to authenticated
  using (true);
