-- Run after schema.sql. Promote trusted users with:
-- update public.profiles set role = 'admin' where id = '<auth user UUID>';
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'attendee' check (role in ('attendee', 'organizer', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile" on public.profiles
  for select to authenticated using (auth.uid() = id);

create or replace function public.create_profile_for_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id) values (new.id) on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
  after insert on auth.users
  for each row execute function public.create_profile_for_new_user();

insert into public.profiles (id)
select id from auth.users on conflict (id) do nothing;

-- Releasing reservations before Auth cascades delete the user's tickets.
create or replace function public.release_deleted_user_reservations()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  update public.seats
  set status = 'available', reserved_by = null, reserved_at = null
  where reserved_by = old.id::text and status = 'reserved';
  update public.seats
  set status = 'available', reserved_by = null, reserved_at = null
  where id in (select seat_id from public.tickets where user_id = old.id::text)
    and status in ('reserved', 'booked');
  delete from public.tickets where user_id = old.id::text;
  return old;
end;
$$;

drop trigger if exists before_auth_user_delete_release_seats on auth.users;
create trigger before_auth_user_delete_release_seats
  before delete on auth.users
  for each row execute function public.release_deleted_user_reservations();
