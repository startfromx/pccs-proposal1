-- PCCS Our Group content for the shared Supabase project.
create table if not exists public.pccs_group_story (
  id uuid primary key default gen_random_uuid(),
  language text not null check (language in ('en', 'zh')),
  kicker text not null default '',
  headline text not null default '',
  year_label text not null default 'Year',
  milestone_label text not null default 'Milestone',
  milestones jsonb not null default '[]'::jsonb,
  leadership_kicker text not null default '',
  leadership_headline text not null default '',
  leadership_intro text not null default '',
  published boolean not null default true,
  updated_at timestamptz not null default now(),
  unique (language)
);

alter table public.pccs_group_story add column if not exists leadership_kicker text not null default '';
alter table public.pccs_group_story add column if not exists leadership_headline text not null default '';
alter table public.pccs_group_story add column if not exists leadership_intro text not null default '';

create table if not exists public.pccs_group_leaders (
  id uuid primary key default gen_random_uuid(),
  language text not null check (language in ('en', 'zh')),
  sort_order integer not null default 0,
  name text not null default '',
  role text not null default '',
  bio text not null default '',
  image_path text,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create index if not exists pccs_group_leaders_language_order_idx
  on public.pccs_group_leaders (language, sort_order);

alter table public.pccs_group_story enable row level security;
alter table public.pccs_group_leaders enable row level security;

grant select on public.pccs_group_story, public.pccs_group_leaders to anon, authenticated;
grant insert, update, delete on public.pccs_group_story, public.pccs_group_leaders to authenticated;

drop policy if exists "Public can read published group story" on public.pccs_group_story;
create policy "Public can read published group story" on public.pccs_group_story
  for select using (published = true);
drop policy if exists "Authenticated can manage group story" on public.pccs_group_story;
create policy "Authenticated can manage group story" on public.pccs_group_story
  for all to authenticated using (true) with check (true);

drop policy if exists "Public can read published group leaders" on public.pccs_group_leaders;
create policy "Public can read published group leaders" on public.pccs_group_leaders
  for select using (published = true);
drop policy if exists "Authenticated can manage group leaders" on public.pccs_group_leaders;
create policy "Authenticated can manage group leaders" on public.pccs_group_leaders
  for all to authenticated using (true) with check (true);

-- Optional Storage setup for director photos. Run if image uploads are enabled.
insert into storage.buckets (id, name, public)
values ('pccs-media', 'pccs-media', true)
on conflict (id) do nothing;

drop policy if exists "Public can read PCCS media" on storage.objects;
create policy "Public can read PCCS media" on storage.objects
  for select using (bucket_id = 'pccs-media');
drop policy if exists "Authenticated can manage PCCS media" on storage.objects;
create policy "Authenticated can manage PCCS media" on storage.objects
  for all to authenticated using (bucket_id = 'pccs-media') with check (bucket_id = 'pccs-media');
