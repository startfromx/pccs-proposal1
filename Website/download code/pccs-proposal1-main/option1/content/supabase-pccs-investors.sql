-- PCCS investor reports and disclosures.
create table if not exists public.pccs_investor_documents (
  id uuid primary key default gen_random_uuid(),
  language text not null check (language in ('en', 'zh')),
  category text not null check (category in ('annual', 'quarterly', 'governance', 'agm')),
  year integer,
  title text not null default '',
  file_url text not null default '',
  sort_order integer not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create index if not exists pccs_investor_documents_language_category_order_idx
  on public.pccs_investor_documents (language, category, sort_order);

alter table public.pccs_investor_documents add column if not exists year integer;

alter table public.pccs_investor_documents enable row level security;
grant select on public.pccs_investor_documents to anon, authenticated;
grant insert, update, delete on public.pccs_investor_documents to authenticated;

drop policy if exists "Public can read published investor documents" on public.pccs_investor_documents;
create policy "Public can read published investor documents" on public.pccs_investor_documents
  for select using (published = true);
drop policy if exists "Authenticated can manage investor documents" on public.pccs_investor_documents;
create policy "Authenticated can manage investor documents" on public.pccs_investor_documents
  for all to authenticated using (true) with check (true);
