-- 予約
create table public.bookings (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id),
  name text not null,
  phone text not null,
  address text not null,
  content text not null,
  created_at timestamptz not null default now()
);

revoke all on table public.bookings from anon, authenticated;
grant select on table public.bookings to anon, authenticated;
grant select, insert on table public.bookings to service_role;

-- 社員
create table public.staff (
  user_id uuid primary key references auth.users (id),
  created_at timestamptz not null default now()
);

alter table public.staff enable row level security;

grant select on table public.staff to service_role;
