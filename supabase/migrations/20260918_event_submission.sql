-- Apply this once in Supabase SQL Editor for user-submitted events.
alter table public.events add column if not exists created_by uuid references auth.users(id);
alter table public.events drop constraint if exists events_status_check;
alter table public.events add constraint events_status_check
  check (status in ('Draft','Pending Review','Upcoming','Live','Completed','Rejected'));
