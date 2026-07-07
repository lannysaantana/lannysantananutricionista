-- ============================================================================
-- Lanny Santana Nutricionista — Planos, preços e pedidos multi-sessão
-- Run this in the Supabase SQL editor AFTER 002_availability.sql.
--
-- Replaces the single-appointment booking model with configurable service
-- plans (prices/features editable from /admin/configuracoes, never hardcoded
-- in the app) and "orders" that can contain several individually-scheduled
-- sessions (e.g. Consulta Inicial + Avaliação Física + Segunda Consulta).
-- ============================================================================

create type payment_method as enum ('pix', 'cartao');
create type order_status as enum ('pending', 'confirmed', 'cancelled');
create type session_status as enum ('pending', 'confirmed', 'cancelled', 'completed');

-- ----------------------------------------------------------------------
-- service_plans: every price and feature list shown to patients lives
-- here, so the admin can change any value with no code changes.
-- ----------------------------------------------------------------------
create table if not exists service_plans (
  key text primary key,
  name text not null,
  duration_minutes integer not null,
  base_price_cents integer not null,
  features jsonb not null default '[]'::jsonb,
  badge text,
  payment_note text,
  -- "Essencial" / "Acompanhamento Recomendado" second-consultation tiers
  -- (only presencial and teleconsulta use these; null otherwise).
  has_tiers boolean not null default false,
  essential_label text,
  essential_price_cents integer,
  essential_features jsonb,
  recommended_label text,
  recommended_price_cents integer,
  recommended_features jsonb,
  recommended_badge text,
  savings_message text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

drop trigger if exists service_plans_set_updated_at on service_plans;
create trigger service_plans_set_updated_at
  before update on service_plans
  for each row execute function set_updated_at();

insert into service_plans (
  key, name, duration_minutes, base_price_cents, features, sort_order,
  has_tiers, essential_label, essential_price_cents, essential_features,
  recommended_label, recommended_price_cents, recommended_features,
  recommended_badge, savings_message
) values
(
  'presencial', 'Consulta Presencial', 60, 35000,
  '["Consulta presencial de 60 minutos", "Plano alimentar individualizado", "Avaliação física com bioimpedância (30 minutos), sugerida aproximadamente 20 dias após a consulta", "Acesso ao Portal do Paciente", "Acesso à Pré-Consulta (Anamnese + Recordatório Alimentar)"]'::jsonb,
  1,
  true, 'Atendimento Essencial', 35000,
  '["Consulta Presencial (60 minutos)", "Avaliação Física (30 minutos)"]'::jsonb,
  'Acompanhamento Recomendado', 55000,
  '["Consulta Presencial (60 minutos)", "Avaliação Física (30 minutos)", "Segunda Consulta Presencial (60 minutos)"]'::jsonb,
  'Mais vantajoso',
  'Economize R$150 ao contratar seu acompanhamento completo e já garanta todos os seus horários.'
),
(
  'teleconsulta', 'Teleconsulta', 60, 30000,
  '["Teleconsulta de 60 minutos", "Bioimpedância Online", "Retorno Online de 30 minutos, sugerido aproximadamente 15 dias após a consulta", "Plano alimentar individualizado", "Acesso ao Portal do Paciente", "Pré-Consulta"]'::jsonb,
  2,
  true, 'Atendimento Essencial', 30000,
  '["Teleconsulta", "Retorno Online"]'::jsonb,
  'Acompanhamento Recomendado', 45000,
  '["Teleconsulta", "Retorno Online", "Segunda Consulta Online (60 minutos)"]'::jsonb,
  'Mais vantajoso',
  'Garanta sua segunda consulta com valor promocional e mantenha seu acompanhamento nutricional.'
),
(
  'protocolo_trimestral', 'Protocolo Trimestral Premium', 60, 90000,
  '["3 Consultas Presenciais (60 minutos cada)", "2 Retornos Presenciais (30 minutos cada)", "Suporte Online durante 3 meses", "Plataforma de Desafios gratuita", "Plano alimentar atualizado em todas as consultas", "Acompanhamento contínuo"]'::jsonb,
  3,
  false, null, null, null, null, null, null, null,
  'Melhor custo-benefício para quem busca acompanhamento contínuo e resultados duradouros.'
),
(
  'glp1_essencial', 'Programa Metabólico GLP-1 Essencial', 60, 60000,
  '["1 Teleconsulta (60 minutos)", "Plano alimentar individualizado", "Estratégias para minimizar efeitos colaterais", "Preservação da massa muscular", "Retorno Online (30 minutos) após aproximadamente 30 dias", "Suporte pelo WhatsApp durante 30 dias (horário comercial)", "Acesso ao Portal do Paciente", "Pré-Consulta"]'::jsonb,
  4,
  false, null, null, null, null, null, null, null, null
),
(
  'glp1_premium', 'Programa Metabólico GLP-1 Premium', 60, 89700,
  '["3 Teleconsultas (60 minutos cada), 1 a cada 30 dias", "Plano alimentar atualizado em cada consulta", "Ajustes nutricionais conforme evolução", "Estratégias para minimizar efeitos colaterais", "Preservação da massa muscular", "Suporte pelo WhatsApp durante 90 dias (horário comercial)", "Plataforma de Desafios", "Material exclusivo", "Acesso ao Portal do Paciente", "Pré-Consulta"]'::jsonb,
  5,
  false, null, null, null, null, null, null, null, null
)
on conflict (key) do nothing;

update service_plans set payment_note = 'À vista via Pix. Cartão de crédito com acréscimos.'
where key in ('protocolo_trimestral', 'glp1_essencial', 'glp1_premium');

-- ----------------------------------------------------------------------
-- payment_settings: single-row config for the card surcharge percentage,
-- editable from /admin/configuracoes — never hardcoded.
-- ----------------------------------------------------------------------
create table if not exists payment_settings (
  id boolean primary key default true check (id), -- enforces a single row
  card_surcharge_percent numeric(5, 2) not null default 0,
  updated_at timestamptz not null default now()
);

insert into payment_settings (id, card_surcharge_percent) values (true, 0)
on conflict (id) do nothing;

drop trigger if exists payment_settings_set_updated_at on payment_settings;
create trigger payment_settings_set_updated_at
  before update on payment_settings
  for each row execute function set_updated_at();

-- ----------------------------------------------------------------------
-- orders / order_sessions / pre_consultation_forms
-- ----------------------------------------------------------------------
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  age integer not null check (age between 1 and 120),
  phone text not null,
  email text not null,
  objective patient_objective not null,
  other_objective text,
  has_locomotion_limitation boolean not null default false,
  service_plan_key text not null references service_plans (key),
  selected_tier text not null default 'base', -- 'base' | 'essential' | 'recommended'
  payment_method payment_method not null,
  accepted_reschedule_policy boolean not null default false,
  accepted_cancellation_policy boolean not null default false,
  amount_cents integer not null,
  status order_status not null default 'pending',
  payment_status payment_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_email_idx on orders (email);
create index if not exists orders_status_idx on orders (status);

drop trigger if exists orders_set_updated_at on orders;
create trigger orders_set_updated_at
  before update on orders
  for each row execute function set_updated_at();

create table if not exists order_sessions (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders (id) on delete cascade,
  session_key text not null,
  label text not null,
  sequence integer not null default 0,
  session_date date not null,
  session_time time not null,
  status session_status not null default 'pending',
  reschedule_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists order_sessions_order_id_idx on order_sessions (order_id);
create index if not exists order_sessions_date_idx on order_sessions (session_date);

drop trigger if exists order_sessions_set_updated_at on order_sessions;
create trigger order_sessions_set_updated_at
  before update on order_sessions
  for each row execute function set_updated_at();

create table if not exists pre_consultation_forms (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique references orders (id) on delete cascade,
  responses jsonb not null,
  submitted_at timestamptz not null default now()
);

-- Row Level Security -----------------------------------------------------
alter table service_plans enable row level security;
alter table payment_settings enable row level security;
alter table orders enable row level security;
alter table order_sessions enable row level security;
alter table pre_consultation_forms enable row level security;

create policy "public can read active service plans"
  on service_plans for select
  to anon
  using (is_active);

create policy "authenticated can read all service plans"
  on service_plans for select
  to authenticated
  using (true);

create policy "authenticated can manage service plans"
  on service_plans for all
  to authenticated
  using (true)
  with check (true);

create policy "public can read payment settings"
  on payment_settings for select
  to anon
  using (true);

create policy "authenticated can manage payment settings"
  on payment_settings for all
  to authenticated
  using (true)
  with check (true);

create policy "public can create orders"
  on orders for insert
  to anon
  with check (true);

-- Note: anon has no SELECT policy on orders — the "already a patient?"
-- check for new-patient promotions goes through the has_previous_order()
-- security-definer function below, which only ever returns a boolean.

create policy "authenticated can update orders"
  on orders for update
  to authenticated
  using (true);

create policy "authenticated can delete orders"
  on orders for delete
  to authenticated
  using (true);

create policy "public can create order sessions"
  on order_sessions for insert
  to anon
  with check (true);

create policy "authenticated can read order sessions"
  on order_sessions for select
  to authenticated
  using (true);

create policy "authenticated can update order sessions"
  on order_sessions for update
  to authenticated
  using (true);

create policy "authenticated can delete order sessions"
  on order_sessions for delete
  to authenticated
  using (true);

create policy "public can submit pre-consultation form"
  on pre_consultation_forms for insert
  to anon
  with check (true);

create policy "authenticated can read pre-consultation forms"
  on pre_consultation_forms for select
  to authenticated
  using (true);

-- ----------------------------------------------------------------------
-- get_booked_session_slots: booked TIMES on a date across order_sessions
-- (non-cancelled) — same privacy pattern as get_booked_slots, no patient
-- data exposed, just the times already taken.
-- ----------------------------------------------------------------------
create or replace function get_booked_session_slots(target_date date)
returns table (session_time time)
language sql
security definer
set search_path = public
stable
as $$
  select s.session_time
  from order_sessions s
  where s.session_date = target_date
    and s.status <> 'cancelled';
$$;

revoke all on function get_booked_session_slots(date) from public;
grant execute on function get_booked_session_slots(date) to anon, authenticated;

-- ----------------------------------------------------------------------
-- has_previous_order: true if this email already has an order — used to
-- hide new-patient promotions for returning patients without exposing any
-- order details to the public "orders" select policy consumers.
-- ----------------------------------------------------------------------
create or replace function has_previous_order(patient_email text)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from orders where email = patient_email
  );
$$;

revoke all on function has_previous_order(text) from public;
grant execute on function has_previous_order(text) to anon, authenticated;
