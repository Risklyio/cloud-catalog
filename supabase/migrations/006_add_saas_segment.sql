create type saas_segment as enum ('it', 'cyber-security', 'compliance');

alter table public.services
  add column if not exists saas_segment saas_segment;

create index if not exists services_saas_segment_idx
  on public.services (saas_segment)
  where saas_segment is not null;
