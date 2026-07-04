-- ============================================================================
-- Lanny Santana Nutricionista — Availability settings
-- Run this in the Supabase SQL editor AFTER schema.sql.
-- Lets the admin control which weekdays/hours are bookable and block off
-- specific dates (holidays, vacation), without touching code.
-- ============================================================================

-- One row per weekday (0 = Sunday ... 6 = Saturday).
create table if not exists business_hours (
  weekday integer primary key check (weekday between 0 and 6),
  is_open boolean not null default false,
  start_time time not null default '09:00',
  end_time time not null default '18:00',
  slot_duration_minutes integer not null default 60 check (slot_duration_minutes > 0),
  updated_at timestamptz not null default now()
);

-- Specific closed dates (holidays, vacation, etc.) that override business_hours.
create table if not exists blocked_dates (
  date date primary key,
  reason text,
  created_at timestamptz not null default now()
);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists business_hours_set_updated_at on business_hours;
create trigger business_hours_set_updated_at
  before update on business_hours
  for each row execute function set_updated_at();

-- Seed sensible defaults: Monday–Friday, 09:00–18:00, 60-minute slots.
-- Safe to re-run (ON CONFLICT DO NOTHING) — edit via the admin panel afterwards.
insert into business_hours (weekday, is_open, start_time, end_time, slot_duration_minutes)
values
  (0, false, '09:00', '18:00', 60), -- Sunday
  (1, true,  '09:00', '18:00', 60), -- Monday
  (2, true,  '09:00', '18:00', 60), -- Tuesday
  (3, true,  '09:00', '18:00', 60), -- Wednesday
  (4, true,  '09:00', '18:00', 60), -- Thursday
  (5, true,  '09:00', '18:00', 60), -- Friday
  (6, false, '09:00', '18:00', 60)  -- Saturday
on conflict (weekday) do nothing;

-- Row Level Security -----------------------------------------------------
alter table business_hours enable row level security;
alter table blocked_dates enable row level security;

-- Anyone (including anonymous visitors on the booking page) can read the
-- schedule so the calendar can compute available days/times.
create policy "public can read business hours"
  on business_hours for select
  to anon
  using (true);

create policy "public can read blocked dates"
  on blocked_dates for select
  to anon
  using (true);

-- Only the authenticated admin can change the schedule.
create policy "authenticated can manage business hours"
  on business_hours for all
  to authenticated
  using (true)
  with check (true);

create policy "authenticated can manage blocked dates"
  on blocked_dates for all
  to authenticated
  using (true)
  with check (true);

-- ----------------------------------------------------------------------
-- get_booked_slots: returns only the appointment TIMES already taken on a
-- given date — never patient names/emails/etc — so the public booking
-- calendar can hide taken slots without exposing any patient data.
-- ----------------------------------------------------------------------
create or replace function get_booked_slots(target_date date)
returns table (appointment_time time)
language sql
security definer
set search_path = public
stable
as $$
  select a.appointment_time
  from appointments a
  where a.appointment_date = target_date
    and a.status <> 'cancelled';
$$;

revoke all on function get_booked_slots(date) from public;
grant execute on function get_booked_slots(date) to anon, authenticated;
