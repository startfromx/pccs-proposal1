-- Add explicit year support for investor documents.
-- Run this once in Supabase SQL Editor before saving documents from the updated admin.

alter table public.pccs_investor_documents
  add column if not exists year integer;

update public.pccs_investor_documents
set year = substring(title from '[12][0-9]{3}')::integer
where year is null
  and title ~ '[12][0-9]{3}';
