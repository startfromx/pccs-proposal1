-- PCCS security hardening for the shared Supabase project.
-- Run the content table SQL files first, then run this migration once in
-- Supabase Dashboard > SQL Editor. Add approved login emails to pccs_admins.

create table if not exists public.pccs_admins (
  email text primary key,
  created_at timestamptz not null default now()
);

alter table public.pccs_admins enable row level security;
revoke all on public.pccs_admins from anon, authenticated;

create or replace function public.pccs_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.pccs_admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

revoke all on function public.pccs_is_admin() from public;
grant execute on function public.pccs_is_admin() to anon, authenticated;

drop policy if exists "Authenticated can manage career jobs" on public.pccs_career_jobs;
create policy "Approved admins can manage career jobs" on public.pccs_career_jobs
  for all to authenticated using (public.pccs_is_admin()) with check (public.pccs_is_admin());

drop policy if exists "Authenticated users can read all PCCS FAQs" on public.pccs_faq;
drop policy if exists "Authenticated users can insert PCCS FAQs" on public.pccs_faq;
drop policy if exists "Authenticated users can update PCCS FAQs" on public.pccs_faq;
drop policy if exists "Authenticated users can delete PCCS FAQs" on public.pccs_faq;
create policy "Approved admins can read all PCCS FAQs" on public.pccs_faq
  for select to authenticated using (public.pccs_is_admin());
create policy "Approved admins can insert PCCS FAQs" on public.pccs_faq
  for insert to authenticated with check (public.pccs_is_admin());
create policy "Approved admins can update PCCS FAQs" on public.pccs_faq
  for update to authenticated using (public.pccs_is_admin()) with check (public.pccs_is_admin());
create policy "Approved admins can delete PCCS FAQs" on public.pccs_faq
  for delete to authenticated using (public.pccs_is_admin());

drop policy if exists "Authenticated can manage group story" on public.pccs_group_story;
drop policy if exists "Authenticated can manage group leaders" on public.pccs_group_leaders;
create policy "Approved admins can manage group story" on public.pccs_group_story
  for all to authenticated using (public.pccs_is_admin()) with check (public.pccs_is_admin());
create policy "Approved admins can manage group leaders" on public.pccs_group_leaders
  for all to authenticated using (public.pccs_is_admin()) with check (public.pccs_is_admin());

drop policy if exists "Authenticated can manage investor documents" on public.pccs_investor_documents;
drop policy if exists "Authenticated can manage shared investor documents" on public.pccs_investor_documents_shared;
create policy "Approved admins can manage investor documents" on public.pccs_investor_documents
  for all to authenticated using (public.pccs_is_admin()) with check (public.pccs_is_admin());
create policy "Approved admins can manage shared investor documents" on public.pccs_investor_documents_shared
  for all to authenticated using (public.pccs_is_admin()) with check (public.pccs_is_admin());

drop policy if exists "Authenticated can manage PCCS media" on storage.objects;
create policy "Approved admins can manage PCCS media" on storage.objects
  for all to authenticated
  using (bucket_id = 'pccs-media' and public.pccs_is_admin())
  with check (bucket_id = 'pccs-media' and public.pccs_is_admin());
