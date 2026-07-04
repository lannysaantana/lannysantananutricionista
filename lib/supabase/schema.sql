-- ============================================================================
-- Lanny Santana Nutricionista — Supabase schema
-- Run this in the Supabase SQL editor (or via `supabase db push`).
-- ============================================================================

create extension if not exists "pgcrypto";

create type appointment_status as enum ('pending', 'confirmed', 'cancelled', 'completed');
create type payment_status as enum ('pending', 'paid', 'failed', 'refunded');
create type consultation_type as enum ('presencial', 'teleconsulta');
create type patient_objective as enum (
  'emagrecimento',
  'hipertrofia',
  'performance',
  'reeducacao_alimentar',
  'saude_intestinal',
  'gestacao',
  'outro'
);

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  age integer not null check (age between 1 and 120),
  phone text not null,
  email text not null,
  objective patient_objective not null,
  other_objective text,
  has_limitation boolean not null default false,
  consultation_type consultation_type not null,
  appointment_date date not null,
  appointment_time time not null,
  status appointment_status not null default 'pending',
  payment_status payment_status not null default 'pending',
  amount integer not null, -- stored in cents (BRL)
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists appointments_date_idx on appointments (appointment_date);
create index if not exists appointments_status_idx on appointments (status);
create index if not exists appointments_email_idx on appointments (email);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists appointments_set_updated_at on appointments;
create trigger appointments_set_updated_at
  before update on appointments
  for each row execute function set_updated_at();

-- Row Level Security -----------------------------------------------------
alter table appointments enable row level security;

-- Public (anon) can INSERT their own appointment (the booking wizard),
-- but cannot read or modify existing rows.
create policy "public can create appointments"
  on appointments for insert
  to anon
  with check (true);

-- Only authenticated (admin) users can read/update/delete.
create policy "authenticated can read appointments"
  on appointments for select
  to authenticated
  using (true);

create policy "authenticated can update appointments"
  on appointments for update
  to authenticated
  using (true);

create policy "authenticated can delete appointments"
  on appointments for delete
  to authenticated
  using (true);
