-- Plateforme Guiem Richard — schéma initial
-- Voir le plan de construction, section 05 (Modèle de données).
-- Tous les libellés visibles existent en colonnes _fr / _en.

-- ---------------------------------------------------------------------------
-- profiles : une ligne par utilisateur authentifié
-- ---------------------------------------------------------------------------
create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  first_name  text,
  last_name   text,
  phone       text,
  locale      text not null default 'fr' check (locale in ('fr', 'en')),
  is_admin    boolean not null default false,
  created_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles: read own"
  on public.profiles for select using (auth.uid() = id);

create policy "profiles: update own (never is_admin)"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id and is_admin = (select p.is_admin from public.profiles p where p.id = auth.uid()));

-- Crée la ligne profile à l'inscription
create function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, first_name, last_name)
  values (new.id, new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'last_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Helper : l'appelant est-il admin ?
create function public.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

-- ---------------------------------------------------------------------------
-- categories
-- ---------------------------------------------------------------------------
create table public.categories (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  name_fr         text not null,
  name_en         text not null,
  description_fr  text,
  description_en  text,
  position        int not null default 0,
  created_at      timestamptz not null default now()
);

alter table public.categories enable row level security;

create policy "categories: public read" on public.categories for select using (true);
create policy "categories: admin write" on public.categories for all
  using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- courses
-- ---------------------------------------------------------------------------
create table public.courses (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  category_id     uuid references public.categories (id) on delete set null,
  title_fr        text not null,
  title_en        text not null,
  summary_fr      text,
  summary_en      text,
  description_fr  text,
  description_en  text,
  cover_url       text,
  price_fcfa      int not null default 0 check (price_fcfa >= 0),
  level           text,
  is_published    boolean not null default false,
  position        int not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

alter table public.courses enable row level security;

create policy "courses: public read published" on public.courses for select
  using (is_published or public.is_admin());
create policy "courses: admin write" on public.courses for all
  using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- course_files : fichiers rattachés à un cours (pdf maintenant, video plus tard)
-- ---------------------------------------------------------------------------
create table public.course_files (
  id            uuid primary key default gen_random_uuid(),
  course_id     uuid not null references public.courses (id) on delete cascade,
  kind          text not null default 'pdf' check (kind in ('pdf', 'video', 'resource')),
  label         text not null,
  storage_path  text not null,
  size_bytes    bigint,
  position      int not null default 0
);

alter table public.course_files enable row level security;

-- Lecture réservée aux inscrits ; la livraison réelle passe par une Edge
-- Function `download` qui vérifie l'enrollment puis renvoie une URL signée.
create policy "course_files: enrolled read" on public.course_files for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.enrollments e
      where e.course_id = course_files.course_id and e.user_id = auth.uid()
    )
  );
create policy "course_files: admin write" on public.course_files for all
  using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- orders : cycle de vie d'un paiement Maketou / Tara Money
-- ---------------------------------------------------------------------------
create table public.orders (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references public.profiles (id) on delete cascade,
  course_id     uuid not null references public.courses (id) on delete restrict,
  amount_fcfa   int not null check (amount_fcfa >= 0),
  currency      text not null default 'FCFA',
  status        text not null default 'pending'
                check (status in ('pending', 'success', 'failed',
                                  'flagged_underpaid', 'flagged_reversal', 'expired')),
  provider      text not null default 'maketou',
  payment_method text,
  payment_ref   text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table public.orders enable row level security;

-- L'utilisateur lit ses commandes ; insertion / mise à jour se font via la clé
-- service (checkout + webhook), qui contourne la RLS.
create policy "orders: read own" on public.orders for select
  using (auth.uid() = user_id or public.is_admin());

-- ---------------------------------------------------------------------------
-- enrollments : accès accordé à un cours (unique par utilisateur/cours)
-- ---------------------------------------------------------------------------
create table public.enrollments (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles (id) on delete cascade,
  course_id   uuid not null references public.courses (id) on delete cascade,
  order_id    uuid references public.orders (id) on delete set null,
  source      text not null default 'purchase' check (source in ('purchase', 'free', 'admin')),
  granted_at  timestamptz not null default now(),
  unique (user_id, course_id)
);

alter table public.enrollments enable row level security;

create policy "enrollments: read own" on public.enrollments for select
  using (auth.uid() = user_id or public.is_admin());
create policy "enrollments: admin write" on public.enrollments for all
  using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- free_resources : corrigés / épreuves / fiches (gratuits, produit d'appel)
-- ---------------------------------------------------------------------------
create table public.free_resources (
  id            uuid primary key default gen_random_uuid(),
  kind          text not null check (kind in ('corrige', 'epreuve', 'fiche')),
  title         text not null,
  storage_path  text not null,
  course_label  text,
  year          int,
  is_published  boolean not null default true,
  created_at    timestamptz not null default now()
);

alter table public.free_resources enable row level security;

create policy "free_resources: public read published" on public.free_resources for select
  using (is_published or public.is_admin());
create policy "free_resources: admin write" on public.free_resources for all
  using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- publications : thèse, mémoire, articles à comité de lecture
-- ---------------------------------------------------------------------------
create table public.publications (
  id          uuid primary key default gen_random_uuid(),
  type        text not null check (type in ('thesis', 'dissertation', 'article')),
  year        int,
  authors     text,
  title       text not null,
  venue       text,
  url         text,
  file_path   text,
  position    int not null default 0
);

alter table public.publications enable row level security;

create policy "publications: public read" on public.publications for select using (true);
create policy "publications: admin write" on public.publications for all
  using (public.is_admin()) with check (public.is_admin());
