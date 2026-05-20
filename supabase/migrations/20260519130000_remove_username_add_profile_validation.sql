-- Remove coluna username (campo removido do cadastro)
-- Atualiza trigger e adiciona validação de name/phone no banco

drop index if exists public.profiles_username_idx;

alter table public.profiles
  drop constraint if exists profiles_username_unique;

alter table public.profiles
  drop column if exists username;

-- Nome: 2–100 caracteres; letras (incl. acentuação), espaço, hífen e apóstrofo
alter table public.profiles
  add constraint profiles_name_format check (
    length(trim(name)) >= 2
    and length(trim(name)) <= 100
    and trim(name) ~ '^[[:alpha:][:space:]-'']+$'
  );

-- Telefone: opcional; se informado, formato internacional + apenas dígitos (10–15)
alter table public.profiles
  drop constraint if exists profiles_phone_not_empty;

alter table public.profiles
  add constraint profiles_phone_format check (
    phone is null
    or (
      length(trim(phone)) >= 8
      and length(trim(phone)) <= 25
      and trim(phone) ~ '^\+[0-9]{1,4} [0-9\s().-]+$'
      and length(regexp_replace(phone, '\D', '', 'g')) between 10 and 15
    )
  );

comment on column public.profiles.name is 'Nome completo; apenas letras, espaços, hífen e apóstrofo.';
comment on column public.profiles.phone is 'Telefone com DDI, ex.: +55 (11) 98765-4321; opcional.';

-- Trigger sem username
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, name, phone)
  values (
    new.id,
    coalesce(nullif(trim(new.raw_user_meta_data->>'name'), ''), 'Usuário'),
    nullif(trim(new.raw_user_meta_data->>'phone'), '')
  );
  return new;
end;
$$;
