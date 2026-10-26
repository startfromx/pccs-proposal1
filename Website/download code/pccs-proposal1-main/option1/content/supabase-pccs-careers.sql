-- Careers CMS: one shared bilingual record per job opening.
create table if not exists public.pccs_career_jobs (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'draft' check (status in ('draft', 'published', 'closed', 'archived')),
  title_en text not null default '',
  title_zh text not null default '',
  location_en text not null default '',
  location_zh text not null default '',
  team_en text not null default '',
  team_zh text not null default '',
  employment_en text not null default 'Full-time',
  employment_zh text not null default '全职',
  posted_date date,
  closing_date date,
  summary_en text not null default '',
  summary_zh text not null default '',
  description_en text not null default '',
  description_zh text not null default '',
  responsibilities_en text not null default '',
  responsibilities_zh text not null default '',
  minimum_qualifications_en text not null default '',
  minimum_qualifications_zh text not null default '',
  preferred_qualifications_en text not null default '',
  preferred_qualifications_zh text not null default '',
  other_details_en text not null default '',
  other_details_zh text not null default '',
  application_email text not null default 'communication@pccsgroup.net',
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.pccs_career_jobs enable row level security;
grant select on public.pccs_career_jobs to anon, authenticated;
grant insert, update, delete on public.pccs_career_jobs to authenticated;

drop policy if exists "Public can read published career jobs" on public.pccs_career_jobs;
create policy "Public can read published career jobs" on public.pccs_career_jobs
  for select using (status = 'published');
drop policy if exists "Authenticated can manage career jobs" on public.pccs_career_jobs;
create policy "Authenticated can manage career jobs" on public.pccs_career_jobs
  for all to authenticated using (true) with check (true);
