-- Cloud Catalog schema (read-only public access)

create type service_category as enum ('SaaS', 'PaaS', 'IaaS', 'AI');

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null,
  category service_category not null,
  vendor text not null,
  logo_url text,
  website_url text,
  tags text[] not null default '{}',
  departments text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.service_groups (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  service_ids uuid[] not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists services_category_idx on public.services (category);
create index if not exists services_vendor_idx on public.services (vendor);
create index if not exists services_tags_gin_idx on public.services using gin (tags);
create index if not exists services_departments_gin_idx on public.services using gin (departments);

alter table public.services enable row level security;
alter table public.service_groups enable row level security;

create policy "Public read services"
  on public.services for select
  to anon, authenticated
  using (true);

create policy "Public read service groups"
  on public.service_groups for select
  to anon, authenticated
  using (true);
