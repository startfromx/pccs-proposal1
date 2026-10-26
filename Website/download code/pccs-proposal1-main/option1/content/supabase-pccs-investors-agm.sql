-- Sync AGM Summary records with the official PCCS AGM Summary list:
-- https://www.pccsgroup.net/lists/27.html

delete from public.pccs_investor_documents_shared
where category = 'agm';

insert into public.pccs_investor_documents_shared
  (category, year, title_en, title_zh, file_url, sort_order, published)
values
  ('agm', 2026, 'Annexure A - Response to MSWG Queries', 'Annexure A - Response to MSWG Queries', '../documents/agm-summary/Annexure%20A%20-%20Response%20to%20MSWG%20Queries%20(alternate%20copy%202).pdf', 0, true),
  ('agm', 2026, 'Minutes of the 32nd Annual General Meeting', 'Minutes of the 32nd Annual General Meeting', '../documents/agm-summary/Minutes%20of%20the%2032nd%20Annual%20General%20Meeting.pdf', 1, true),
  ('agm', 2025, 'Minutes of the 31st Annual General Meeting', 'Minutes of the 31st Annual General Meeting', '../documents/agm-summary/Minutes%20of%20the%2031st%20Annual%20General%20Meeting.pdf', 2, true),
  ('agm', 2025, 'Annexure A - Response to MSWG Queries', 'Annexure A - Response to MSWG Queries', '../documents/agm-summary/Annexure%20A%20-%20Response%20to%20MSWG%20Queries.pdf', 3, true),
  ('agm', 2025, 'Annexure A - Response to MSWG Queries', 'Annexure A - Response to MSWG Queries', '../documents/agm-summary/Annexure%20A%20-%20Response%20to%20MSWG%20Queries%20(alternate%20copy).pdf', 4, true),
  ('agm', 2024, 'Minutes of the 30th Annual General Meeting', 'Minutes of the 30th Annual General Meeting', '../documents/agm-summary/Minutes%20of%20the%2030th%20Annual%20General%20Meeting.pdf', 5, true),
  ('agm', 2024, 'Annexure A - Response to MSWG Queries', 'Annexure A - Response to MSWG Queries', '../documents/agm-summary/Annexure%20A%20-%20Response%20to%20MSWG%20Queries%20(alternate%20copy%202).pdf', 6, true),
  ('agm', 2023, 'Summary of 29th AGM', 'Summary of 29th AGM', '../documents/agm-summary/Summaryof%2029th%20AGM.pdf', 7, true),
  ('agm', 2023, 'Response letter to MSWG for AGM Queries 2023', 'Response letter to MSWG for AGM Queries 2023', '../documents/agm-summary/Response%20letter%20to%20MSWG%20for%20AGM%20Queries%202023.pdf', 8, true),
  ('agm', 2022, 'Summary of 28th AGM', 'Summary of 28th AGM', '../documents/agm-summary/Summary%20of%2028th%20AGM.pdf', 9, true),
  ('agm', 2022, 'Minutes of the EGM dated 25.02.2022', 'Minutes of the EGM dated 25.02.2022', '../documents/agm-summary/Minutes%20of%20the%20EGM%20dated%2025.02.2022.pdf', 10, true),
  ('agm', 2021, 'Summary of 27th AGM', 'Summary of 27th AGM', '../documents/agm-summary/Summary%20of%2027th%20AGM.pdf', 11, true),
  ('agm', 2020, 'Summary of 26th AGM', 'Summary of 26th AGM', '../documents/agm-summary/Summary%20of%2026th%20AGM.pdf', 12, true);
