-- =====================================================================
-- PRECISION Group : schéma initial de la base de données
--
-- À exécuter une fois : Supabase > SQL Editor > coller ce fichier > Run
-- (ou `supabase db push` avec la CLI Supabase).
--
-- Règles d'accès (RLS), appliquées par la base, pas par le navigateur :
--   * visiteur anonyme : lit le contenu publié, peut ENVOYER un lead ou un
--     témoignage, mais ne peut jamais relire, modifier ni supprimer quoi que ce soit ;
--   * administrateur (table public.admins) : accès complet à toutes les tables.
-- =====================================================================

-- ---------- Administrateurs ----------

create table public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;
-- Aucune policy : la table n'est lisible que via la fonction is_admin() ci-dessous
-- (et par le tableau de bord Supabase).

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- ---------- Mise à jour automatique de updated_at ----------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------- Leads (formulaires du site) ----------

create table public.leads (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  full_name    text not null check (char_length(full_name) between 1 and 200),
  email        text not null check (char_length(email) <= 320 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone        text check (char_length(phone) <= 50),
  company      text check (char_length(company) <= 200),
  position     text check (char_length(position) <= 200),
  message      text check (char_length(message) <= 5000),
  source       text check (source in ('hero_form', 'contact_page', 'newsletter', 'resource_download', 'chat')),
  interest     text check (interest in ('consulting', 'development', 'marketing', 'formation', 'autre')),
  status       text not null default 'new'
               check (status in ('new', 'contacted', 'qualified', 'proposal', 'won', 'lost')),
  budget_range text check (budget_range in ('< 5k', '5k-15k', '15k-50k', '50k-100k', '> 100k')),
  priority     text not null default 'medium' check (priority in ('low', 'medium', 'high', 'urgent')),
  notes        text
);

-- ---------- Projets (portfolio) ----------

create table public.projects (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  title              text not null,
  client             text not null,
  description        text,
  challenge          text,
  solution           text,
  results            text,
  image_url          text,
  gallery            text[] not null default '{}',
  category           text check (category in ('web', 'mobile', 'branding', 'marketing', 'consulting')),
  industry           text check (industry in ('tech', 'finance', 'retail', 'healthcare', 'education', 'other')),
  metrics            jsonb not null default '[]'::jsonb, -- [{ "label": "...", "value": "..." }]
  testimonial        text,
  testimonial_author text,
  is_featured        boolean not null default false,
  year               integer
);

-- ---------- Services ----------

create table public.services (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  title             text not null,
  short_description text not null,
  full_description  text,
  icon              text, -- nom d'une icône lucide-react
  features          text[] not null default '{}',
  price_range       text,
  category          text check (category in ('consulting', 'development', 'marketing', 'formation')),
  display_order     integer,
  is_featured       boolean not null default false
);

-- ---------- Articles de blog ----------

create table public.blog_posts (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  title        text not null,
  slug         text unique,
  excerpt      text,
  content      text not null, -- Markdown
  cover_image  text,
  author       text,
  category     text check (category in ('insights', 'tutorials', 'news', 'case-study')),
  tags         text[] not null default '{}',
  reading_time integer check (reading_time > 0),
  is_published boolean not null default false,
  is_featured  boolean not null default false
);

-- ---------- Témoignages ----------

create table public.testimonials (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  content     text not null check (char_length(content) between 1 and 3000),
  author_name text not null check (char_length(author_name) between 1 and 200),
  position    text check (char_length(position) <= 200),
  company     text check (char_length(company) <= 200),
  rating      integer not null default 5 check (rating between 1 and 5),
  is_approved boolean not null default false
);

-- ---------- Équipe ----------

create table public.team_members (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  name          text not null,
  position      text not null,
  bio           text,
  photo_url     text,
  linkedin      text,
  twitter       text,
  email         text,
  expertise     text[] not null default '{}',
  display_order integer,
  is_leadership boolean not null default false
);

-- ---------- FAQ ----------

create table public.faqs (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  question      text not null,
  answer        text not null,
  category      text check (category in ('general', 'services', 'pricing', 'process', 'technical')),
  display_order integer
);

-- ---------- Triggers updated_at ----------

create trigger leads_updated_at        before update on public.leads        for each row execute function public.set_updated_at();
create trigger projects_updated_at     before update on public.projects     for each row execute function public.set_updated_at();
create trigger services_updated_at     before update on public.services     for each row execute function public.set_updated_at();
create trigger blog_posts_updated_at   before update on public.blog_posts   for each row execute function public.set_updated_at();
create trigger testimonials_updated_at before update on public.testimonials for each row execute function public.set_updated_at();
create trigger team_members_updated_at before update on public.team_members for each row execute function public.set_updated_at();
create trigger faqs_updated_at         before update on public.faqs         for each row execute function public.set_updated_at();

-- =====================================================================
-- Règles d'accès (Row Level Security)
-- =====================================================================

alter table public.leads        enable row level security;
alter table public.projects     enable row level security;
alter table public.services     enable row level security;
alter table public.blog_posts   enable row level security;
alter table public.testimonials enable row level security;
alter table public.team_members enable row level security;
alter table public.faqs         enable row level security;

-- Administrateurs : accès complet partout
create policy "admins_all" on public.leads        for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins_all" on public.projects     for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins_all" on public.services     for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins_all" on public.blog_posts   for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins_all" on public.testimonials for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins_all" on public.team_members for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins_all" on public.faqs         for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Leads : un visiteur peut seulement en créer, avec les valeurs internes par défaut
create policy "public_insert" on public.leads
  for insert to anon, authenticated
  with check (status = 'new' and priority = 'medium' and notes is null);

-- Témoignages : un visiteur peut en proposer un (non approuvé) et lire ceux approuvés
create policy "public_insert" on public.testimonials
  for insert to anon, authenticated
  with check (is_approved = false);
create policy "public_read_approved" on public.testimonials
  for select to anon, authenticated
  using (is_approved);

-- Blog : seuls les articles publiés sont lisibles (les brouillons restent privés)
create policy "public_read_published" on public.blog_posts
  for select to anon, authenticated
  using (is_published);

-- Contenus du site : lecture publique
create policy "public_read" on public.projects     for select to anon, authenticated using (true);
create policy "public_read" on public.services     for select to anon, authenticated using (true);
create policy "public_read" on public.team_members for select to anon, authenticated using (true);
create policy "public_read" on public.faqs         for select to anon, authenticated using (true);

-- Droits de base sur les tables (les règles RLS ci-dessus filtrent ensuite les lignes)
grant select, insert, update, delete on all tables in schema public to authenticated;
grant select on public.projects, public.services, public.blog_posts, public.testimonials,
                public.team_members, public.faqs to anon;
grant insert on public.leads, public.testimonials to anon;
