-- IHO Turismo — login e cadastro
--
-- Modelo recomendado no Supabase:
--   • auth.users     → email (unique), senha (hash), user_id (uuid automático)
--   • public.profiles → name, phone (+ username opcional do formulário)
--
-- Não armazene senha em tabela public: o Supabase Auth já faz hash e validação.

-- ---------------------------------------------------------------------------
-- Perfil do usuário (1:1 com auth.users)
-- ---------------------------------------------------------------------------
create table public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  name text not null,
  phone text,
  username text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint profiles_username_unique unique (username),
  constraint profiles_phone_not_empty check (phone is null or length(trim(phone)) > 0)
);

comment on table public.profiles is 'Dados complementares do usuário IHO; auth em auth.users.';
comment on column public.profiles.user_id is 'Mesmo id de auth.users; gerado automaticamente no signup.';
comment on column public.profiles.username is 'Campo "Usuário" do formulário de cadastro; opcional e único se informado.';

create index profiles_username_idx on public.profiles (username) where username is not null;

-- ---------------------------------------------------------------------------
-- updated_at automático
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row
  execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Cria profile ao registrar em auth (metadata do signUp)
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, name, phone, username)
  values (
    new.id,
    coalesce(nullif(trim(new.raw_user_meta_data->>'name'), ''), 'Usuário'),
    nullif(trim(new.raw_user_meta_data->>'phone'), ''),
    nullif(trim(new.raw_user_meta_data->>'username'), '')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;

create policy "profiles_select_own"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "profiles_update_own"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Cadastro público usa signUp (anon); leitura/edição só do próprio perfil.
