-- Add editable Board / Management classification to existing leadership records.
alter table public.pccs_group_leaders
  add column if not exists classification text not null default 'board';

update public.pccs_group_leaders
set classification = 'management'
where name = 'Tang Lai Huat'
   or role in ('Corporate Controller', '企业财务总监');

alter table public.pccs_group_leaders
  drop constraint if exists pccs_group_leaders_classification_check;

alter table public.pccs_group_leaders
  add constraint pccs_group_leaders_classification_check
  check (classification in ('board', 'management'));
