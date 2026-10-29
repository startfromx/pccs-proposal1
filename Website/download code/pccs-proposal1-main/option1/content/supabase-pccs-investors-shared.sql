-- Replace duplicated English/Chinese investor rows with one shared record per document.
-- Run once in Supabase SQL Editor. The admin and public pages will use this table afterward.

alter table public.pccs_investor_documents add column if not exists year integer;

create table if not exists public.pccs_investor_documents_shared (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('annual', 'quarterly', 'governance', 'agm')),
  year integer,
  title_en text not null default '',
  title_zh text not null default '',
  file_url text not null default '',
  sort_order integer not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.pccs_investor_documents_shared enable row level security;
grant select on public.pccs_investor_documents_shared to anon, authenticated;
grant insert, update, delete on public.pccs_investor_documents_shared to authenticated;

drop policy if exists "Public can read published shared investor documents" on public.pccs_investor_documents_shared;
create policy "Public can read published shared investor documents" on public.pccs_investor_documents_shared
  for select using (published = true);
drop policy if exists "Authenticated can manage shared investor documents" on public.pccs_investor_documents_shared;
create policy "Authenticated can manage shared investor documents" on public.pccs_investor_documents_shared
  for all to authenticated using (true) with check (true);

delete from public.pccs_investor_documents_shared;

with english as (
  select *, row_number() over (partition by category order by sort_order, id) as pair_no
  from public.pccs_investor_documents
  where language = 'en'
), chinese as (
  select *, row_number() over (partition by category order by sort_order, id) as pair_no
  from public.pccs_investor_documents
  where language = 'zh'
), merged as (
  select coalesce(english.category, chinese.category) as category,
         coalesce(
           english.year,
           chinese.year,
           case
             when coalesce(nullif(english.title, ''), nullif(chinese.title, '')) ilike 'Notice of the 32nd AGM' then 2026
             when coalesce(nullif(english.title, ''), nullif(chinese.title, '')) ilike 'Notice of the 31st AGM' then 2025
             when coalesce(nullif(english.title, ''), nullif(chinese.title, '')) ilike 'Notice of the 30th AGM' then 2024
             when coalesce(nullif(english.title, ''), nullif(chinese.title, '')) ilike 'Notice of the 29th AGM' then 2023
             when coalesce(nullif(english.title, ''), nullif(chinese.title, '')) ilike 'Administrative Guide' then 2022
             when coalesce(nullif(english.title, ''), nullif(chinese.title, '')) ilike 'Requisite Form for the Circular' then 2022
             when coalesce(nullif(english.title, ''), nullif(chinese.title, '')) ilike 'Requisition Form' then 2022
             else substring(coalesce(nullif(english.title, ''), nullif(chinese.title, '')) from '[12][0-9]{3}')::integer
           end
         ) as year,
         regexp_replace(coalesce(nullif(english.title, ''), nullif(chinese.title, ''), ''), '^Annua ?l? ?Report', 'Annual Report', 'i') as title_en,
         regexp_replace(coalesce(nullif(chinese.title, ''), nullif(english.title, ''), ''), '^Annua ?l? ?Report', 'Annual Report', 'i') as title_zh,
         coalesce(nullif(english.file_url, ''), chinese.file_url, '') as file_url,
         coalesce(english.sort_order, chinese.sort_order, 0) as old_sort_order,
         coalesce(english.published, chinese.published, true) as published
  from english
  full join chinese using (category, pair_no)
)
insert into public.pccs_investor_documents_shared (category, year, title_en, title_zh, file_url, sort_order, published)
select category, year, title_en, title_zh, file_url,
       row_number() over (
         partition by category
         order by year desc nulls last,
           case
             when title_en ilike 'Notice of the % AGM%' then 10
             when title_en ilike 'Form of Proxy %' then 20
             when title_en ilike 'Annual Report %' then 30
             when title_en ilike 'Statement to Shareholders %' then 40
             when title_en ilike 'Corporate Governance Report %' then 50
             when title_en ilike 'Request Form for Annual Report %' then 60
             when title_en ilike 'RRPT Circular and SBB Statements %' then 10
             when title_en ilike 'Request form for Annual Report %' then 20
             when title_en ilike 'PCCS AR2022%' then 30
             when title_en ilike 'Corporate Governance Report 2022' then 40
             else 100
           end,
           old_sort_order
       ) - 1,
       published
from merged;
