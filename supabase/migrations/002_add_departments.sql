-- Add department tags for SaaS services (run on existing projects)

alter table public.services
  add column if not exists departments text[] not null default '{}';

create index if not exists services_departments_gin_idx
  on public.services using gin (departments);
