-- Execute este arquivo no SQL Editor do projeto Supabase.
-- Ele usa auth.users do Supabase Auth; não crie uma tabela própria de senhas.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null check (char_length(trim(full_name)) between 2 and 100),
  skin_type text check (skin_type in ('Normal', 'Seca', 'Oleosa', 'Mista', 'Sensível')),
  theme_mode text not null default 'light' check (theme_mode in ('light', 'dark')),
  notifications_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id text not null,
  name text not null,
  price numeric(10, 2) not null check (price >= 0),
  image_url text not null,
  quantity integer not null check (quantity > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, product_id)
);

create table if not exists public.quiz_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  result_type text not null check (result_type in ('oleosa', 'seca', 'sensivel', 'normal')),
  scores jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists cart_items_updated_at on public.cart_items;
create trigger cart_items_updated_at before update on public.cart_items
for each row execute function public.set_updated_at();

-- O perfil é criado no servidor quando uma conta é criada no Supabase Auth.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, skin_type)
  values (
    new.id,
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''), 'Usuária'),
    case new.raw_user_meta_data ->> 'skin_type'
      when 'Normal' then 'Normal'
      when 'Seca' then 'Seca'
      when 'Oleosa' then 'Oleosa'
      when 'Mista' then 'Mista'
      when 'Sensível' then 'Sensível'
      else null
    end
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.cart_items enable row level security;
alter table public.quiz_results enable row level security;

-- Cada política compara a linha com o JWT autenticado: nenhum usuário vê ou edita dados alheios.
drop policy if exists "Profiles are private" on public.profiles;
create policy "Profiles are private" on public.profiles
  for all to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

drop policy if exists "Cart is private" on public.cart_items;
create policy "Cart is private" on public.cart_items
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Quiz results are private" on public.quiz_results;
create policy "Quiz results are private" on public.quiz_results
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
