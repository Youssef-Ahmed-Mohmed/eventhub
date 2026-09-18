create extension if not exists "pgcrypto";

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(), title text not null,
  event_date timestamptz not null, location text not null default '',
  description text not null default '', category text not null default 'General',
  status text not null default 'Pending Review' check (status in ('Draft','Pending Review','Upcoming','Live','Completed','Rejected')),
  created_by uuid references auth.users(id),
  ticket_price numeric(10,2) not null default 0 check (ticket_price >= 0),
  capacity integer not null default 0 check (capacity >= 0),
  live_attendance_count integer not null default 0 check (live_attendance_count >= 0),
  created_at timestamptz not null default now()
);
create table if not exists public.seats (
  id uuid primary key default gen_random_uuid(), event_id uuid not null references public.events(id) on delete cascade,
  seat_number integer not null, status text not null default 'available' check (status in ('available','reserved','booked')),
  reserved_by text, reserved_at timestamptz, unique (event_id, seat_number)
);
create table if not exists public.tickets (
  id uuid primary key default gen_random_uuid(), event_id uuid not null references public.events(id) on delete cascade,
  seat_id uuid not null references public.seats(id), user_id text not null,
  status text not null default 'reserved' check (status in ('reserved','used','cancelled')),
  scanned_at timestamptz, created_at timestamptz not null default now(), unique (event_id, seat_id)
);
alter table public.events enable row level security;
alter table public.seats enable row level security;
alter table public.tickets enable row level security;
create policy "Public can view events" on public.events for select using (true);
create policy "Public can view seats" on public.seats for select using (true);

-- Run this migration too when the original schema is already installed.
alter table public.events add column if not exists created_by uuid references auth.users(id);
alter table public.events drop constraint if exists events_status_check;
alter table public.events add constraint events_status_check check (status in ('Draft','Pending Review','Upcoming','Live','Completed','Rejected'));

create or replace function public.reserve_seat(p_event_id uuid, p_seat_id uuid, p_user_id text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare v_ticket_id uuid;
begin
  update seats set status = 'reserved', reserved_by = p_user_id, reserved_at = now()
  where id = p_seat_id and event_id = p_event_id and status = 'available';
  if not found then raise exception 'Seat is no longer available'; end if;
  insert into tickets (event_id, seat_id, user_id) values (p_event_id, p_seat_id, p_user_id) returning id into v_ticket_id;
  return jsonb_build_object('ticket_id', v_ticket_id);
end;
$$;

create or replace function public.check_in_ticket(p_event_id uuid, p_ticket_id uuid)
returns jsonb language plpgsql security definer set search_path = public as $$
declare v_ticket tickets%rowtype;
begin
  update tickets set status = 'used', scanned_at = now()
  where id = p_ticket_id and event_id = p_event_id and status = 'reserved' returning * into v_ticket;
  if not found then raise exception 'Ticket is invalid or has already been used'; end if;
  update events set live_attendance_count = live_attendance_count + 1 where id = p_event_id;
  return to_jsonb(v_ticket);
end;
$$;
