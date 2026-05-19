-- PaaS hyperscaler filter (AWS / Azure / GCP)

create type paas_provider as enum ('aws', 'azure', 'gcp');

alter table public.services
  add column if not exists paas_provider paas_provider;

create index if not exists services_paas_provider_idx
  on public.services (paas_provider)
  where paas_provider is not null;
