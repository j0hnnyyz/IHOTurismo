-- Relaxa CHECKs que podem falhar com nomes acentuados (locale do Postgres).
-- Validação principal permanece no app e nas Netlify Functions.

alter table public.profiles
  drop constraint if exists profiles_name_format;

alter table public.profiles
  drop constraint if exists profiles_phone_format;

alter table public.profiles
  add constraint profiles_name_format check (
    char_length(trim(name)) >= 2
    and char_length(trim(name)) <= 100
  );

alter table public.profiles
  add constraint profiles_phone_format check (
    phone is null
    or char_length(trim(phone)) between 8 and 30
  );
