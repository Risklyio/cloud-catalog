alter table public.service_groups
  add column if not exists parent_slug text;

create index if not exists service_groups_parent_slug_idx
  on public.service_groups (parent_slug)
  where parent_slug is not null;
