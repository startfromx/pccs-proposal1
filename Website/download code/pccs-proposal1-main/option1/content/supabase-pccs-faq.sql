-- PCCS FAQ content for the shared Supabase project.
-- Run this in Supabase Dashboard > SQL Editor.

create table if not exists public.pccs_faq (
  id uuid primary key default gen_random_uuid(),
  language text not null check (language in ('en', 'zh')),
  question text not null,
  answer text not null,
  email text,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists pccs_faq_language_order_idx
  on public.pccs_faq (language, sort_order);

alter table public.pccs_faq enable row level security;

grant select on public.pccs_faq to anon, authenticated;
grant insert, update, delete on public.pccs_faq to authenticated;

drop policy if exists "Public can read published PCCS FAQs" on public.pccs_faq;
create policy "Public can read published PCCS FAQs"
  on public.pccs_faq for select
  using (published = true);

drop policy if exists "Authenticated users can read all PCCS FAQs" on public.pccs_faq;
create policy "Authenticated users can read all PCCS FAQs"
  on public.pccs_faq for select
  to authenticated
  using (true);

drop policy if exists "Authenticated users can insert PCCS FAQs" on public.pccs_faq;
create policy "Authenticated users can insert PCCS FAQs"
  on public.pccs_faq for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated users can update PCCS FAQs" on public.pccs_faq;
create policy "Authenticated users can update PCCS FAQs"
  on public.pccs_faq for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated users can delete PCCS FAQs" on public.pccs_faq;
create policy "Authenticated users can delete PCCS FAQs"
  on public.pccs_faq for delete
  to authenticated
  using (true);

create or replace function public.set_pccs_faq_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists pccs_faq_updated_at on public.pccs_faq;
create trigger pccs_faq_updated_at
before update on public.pccs_faq
for each row execute function public.set_pccs_faq_updated_at();
