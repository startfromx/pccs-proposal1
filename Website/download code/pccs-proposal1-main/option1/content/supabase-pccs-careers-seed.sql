-- Seed the 23 current Careers preview listings into the Careers CMS table.
-- Run content/supabase-pccs-careers.sql first, then run this file once.

delete from public.pccs_career_jobs;

insert into public.pccs_career_jobs (
  status, title_en, title_zh, location_en, location_zh, team_en, team_zh,
  employment_en, employment_zh, posted_date, summary_en, summary_zh,
  description_en, description_zh, responsibilities_en, responsibilities_zh,
  minimum_qualifications_en, minimum_qualifications_zh,
  preferred_qualifications_en, preferred_qualifications_zh,
  other_details_en, other_details_zh, application_email, sort_order
)
select
  'published', title_en, title_en, location_en, location_en, team_en, team_en,
  employment_en, employment_en, posted_date,
  'Join PCCS as ' || title_en || ' and help turn strong ideas into reliable, high-quality work.',
  'Join PCCS as ' || title_en || ' and help turn strong ideas into reliable, high-quality work.',
  'This role works in a practical, collaborative environment across PCCS teams. You will help improve day-to-day execution, solve problems and deliver work that meets our standards.',
  'This role works in a practical, collaborative environment across PCCS teams. You will help improve day-to-day execution, solve problems and deliver work that meets our standards.',
  'Own the day-to-day priorities for this role.' || chr(10) || 'Work with cross-functional teams to keep plans, quality and delivery on track.' || chr(10) || 'Record progress, identify risks and support continuous improvement.',
  'Own the day-to-day priorities for this role.' || chr(10) || 'Work with cross-functional teams to keep plans, quality and delivery on track.' || chr(10) || 'Record progress, identify risks and support continuous improvement.',
  'Diploma or degree in a relevant discipline.' || chr(10) || 'Clear communication, organised follow-through and the ability to work independently.' || chr(10) || 'Willingness to learn in a fast-moving manufacturing environment.',
  'Diploma or degree in a relevant discipline.' || chr(10) || 'Clear communication, organised follow-through and the ability to work independently.' || chr(10) || 'Willingness to learn in a fast-moving manufacturing environment.',
  'Relevant industry experience is preferred.' || chr(10) || 'Experience with Microsoft Office, reporting tools or related professional software is an advantage.',
  'Relevant industry experience is preferred.' || chr(10) || 'Experience with Microsoft Office, reporting tools or related professional software is an advantage.',
  'PCCS Group · Full-time opportunity',
  'PCCS Group · Full-time opportunity',
  'communication@pccsgroup.net', sort_order
from (values
  ('Production Planning Executive','生产计划主管','Batu Pahat, Johor','柔佛州峇株巴辖','Production','生产','Full-time','全职','2026-10-26'::date,0),
  ('Quality Assurance Executive','质量保证主管','Batu Pahat, Johor','柔佛州峇株巴辖','Quality & Compliance','质量与合规','Full-time','全职','2026-10-18'::date,1),
  ('Senior Merchandiser','高级跟单员','Johor Bahru, Johor','柔佛州新山','Merchandising','商品跟单','Full-time','全职','2026-10-10'::date,2),
  ('Garment Technologist','服装技术员','Phnom Penh, Cambodia','柬埔寨金边','Development & Design','开发与设计','Full-time','全职','2026-09-28'::date,3),
  ('Embroidery Development Specialist','刺绣开发专员','Batu Pahat, Johor','柔佛州峇株巴辖','The Mark','品牌标记','Full-time','全职','2026-09-12'::date,4),
  ('Maintenance Engineer','维修工程师','Phnom Penh, Cambodia','柬埔寨金边','Engineering','工程','Full-time','全职','2026-08-26'::date,5),
  ('R&D Materials Executive','研发材料主管','Suzhou, China','中国苏州','R&D / Material','研发 / 材料','Full-time','全职','2026-08-14'::date,6),
  ('Finance Executive','财务主管','Kuala Lumpur, Malaysia','马来西亚吉隆坡','Corporate','企业职能','Full-time','全职','2026-07-30'::date,7),
  ('HR & Training Executive','人力资源与培训主管','Phnom Penh, Cambodia','柬埔寨金边','People','人才发展','Full-time','全职','2026-07-18'::date,8),
  ('Business Development Executive','业务发展主管','Kuala Lumpur, Malaysia','马来西亚吉隆坡','Commercial','商务','Full-time','全职','2026-06-26'::date,9),
  ('Production Supervisor','生产主管','Batu Pahat, Johor','柔佛州峇株巴辖','Production','生产','Full-time','全职','2026-06-12'::date,10),
  ('Industrial Engineer','工业工程师','Batu Pahat, Johor','柔佛州峇株巴辖','Engineering','工程','Full-time','全职','2026-06-04'::date,11),
  ('Fabric Technologist','面料技术员','Batu Pahat, Johor','柔佛州峇株巴辖','R&D / Material','研发 / 材料','Full-time','全职','2026-05-22'::date,12),
  ('Sample Room Coordinator','样衣室协调员','Johor Bahru, Johor','柔佛州新山','Development & Design','开发与设计','Full-time','全职','2026-05-08'::date,13),
  ('Compliance Executive','合规主管','Phnom Penh, Cambodia','柬埔寨金边','Quality & Compliance','质量与合规','Full-time','全职','2026-04-26'::date,14),
  ('Production Planning Assistant','生产计划助理','Phnom Penh, Cambodia','柬埔寨金边','Production','生产','Full-time','全职','2026-04-14'::date,15),
  ('Graphic Artwork Executive','平面图稿主管','Batu Pahat, Johor','柔佛州峇株巴辖','The Mark','品牌标记','Full-time','全职','2026-03-30'::date,16),
  ('Mechanical Maintenance Technician','机械维修技术员','Phnom Penh, Cambodia','柬埔寨金边','Engineering','工程','Full-time','全职','2026-03-18'::date,17),
  ('Accounts Executive','会计主管','Kuala Lumpur, Malaysia','马来西亚吉隆坡','Corporate','企业职能','Full-time','全职','2026-03-06'::date,18),
  ('Talent Acquisition Executive','人才招聘主管','Kuala Lumpur, Malaysia','马来西亚吉隆坡','People','人才发展','Full-time','全职','2026-02-20'::date,19),
  ('Customer Programme Executive','客户项目主管','Johor Bahru, Johor','柔佛州新山','Commercial','商务','Full-time','全职','2026-02-08'::date,20),
  ('Warehouse Executive','仓库主管','Batu Pahat, Johor','柔佛州峇株巴辖','Supply Chain','供应链','Full-time','全职','2026-01-22'::date,21),
  ('Sustainability Executive','可持续发展主管','Kuala Lumpur, Malaysia','马来西亚吉隆坡','Sustainability','可持续发展','Full-time','全职','2026-01-10'::date,22)
) as seed(title_en,title_zh,location_en,location_zh,team_en,team_zh,employment_en,employment_zh,posted_date,sort_order);
