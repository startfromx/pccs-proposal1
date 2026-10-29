(function () {
  'use strict';
  const root = document.querySelector('[data-career-jobs]');
  if (!root) return;
  const zh = document.documentElement.lang === 'zh-CN';
  let jobs = [
    { en:['Production Planning Executive','Batu Pahat, Johor','Production · Full-time','Oct 26, 2026','Coordinate production plans, capacity and delivery schedules across operating teams.','Plan production orders, monitor output and work with merchandising and factory teams.','Diploma or degree in production, operations, supply chain or a related field.'], zh:['生产计划主管','柔佛州峇株巴辖','生产 · 全职','2026年10月26日','协调生产计划、产能与交付时间表，支持各运营团队。','安排生产订单、跟进产量，并与商品及工厂团队合作。','生产、运营、供应链或相关领域的文凭或学位。'] },
    { en:['Quality Assurance Executive','Batu Pahat, Johor','Quality & Compliance · Full-time','Oct 18, 2026','Help build quality into every stage from cut to shipment.','Carry out inline inspections, record findings and support corrective actions.','Experience in garment quality, compliance or manufacturing is preferred.'], zh:['质量保证主管','柔佛州峇株巴辖','质量与合规 · 全职','2026年10月18日','在从裁剪到出货的每个环节建立质量标准。','进行生产线检查、记录结果并协助落实改善措施。','具备服装质量、合规或制造业经验者优先。'] },
    { en:['Senior Merchandiser','Johor Bahru, Johor','Merchandising · Full-time','Oct 10, 2026','Connect customer briefs to a clear, buildable production plan.','Manage development timelines, costing, approvals and customer communication.','Relevant apparel merchandising experience and strong communication skills.'], zh:['高级跟单员','柔佛州新山','商品跟单 · 全职','2026年10月10日','将客户要求转化为清晰、可执行的生产计划。','管理开发进度、成本核算、审批及客户沟通。','具备服装跟单经验及良好的沟通能力。'] },
    { en:['Garment Technologist','Phnom Penh, Cambodia','Development & Design · Full-time','Sep 28, 2026','Turn product intent into technical specifications that production can deliver.','Review samples, measurements, construction details and fit comments.','Technical garment development experience and attention to detail.'], zh:['服装技术员','柬埔寨金边','开发与设计 · 全职','2026年9月28日','将产品概念转化为生产团队可以执行的技术规格。','审核样衣、尺寸、工艺细节及合身度意见。','具备服装技术开发经验，注重细节。'] },
    { en:['Embroidery Development Specialist','Batu Pahat, Johor','The Mark · Full-time','Sep 12, 2026','Develop embroidery and embellishment solutions that hold up in the real world.','Prepare artwork, test techniques and work with production on execution.','Experience with embroidery, artwork preparation or embellishment development.'], zh:['刺绣开发专员','柔佛州峇株巴辖','品牌标记 · 全职','2026年9月12日','开发经得起实际使用的刺绣与装饰方案。','准备图稿、测试工艺，并与生产团队合作落实。','具备刺绣、图稿准备或装饰开发经验。'] },
    { en:['Maintenance Engineer','Phnom Penh, Cambodia','Engineering · Full-time','Aug 26, 2026','Keep production equipment reliable, safe and ready for the next order.','Plan preventive maintenance, troubleshoot equipment and track downtime.','Diploma or degree in mechanical, electrical or industrial engineering.'], zh:['维修工程师','柬埔寨金边','工程 · 全职','2026年8月26日','确保生产设备可靠、安全并随时投入下一张订单。','安排预防性维护、排查设备故障并跟进停机时间。','机械、电气或工业工程文凭或学位。'] },
    { en:['R&D Materials Executive','Suzhou, China','R&D / Material · Full-time','Aug 14, 2026','Find materials and finishes that meet the brief exactly.','Source, test and document fabrics, trims and finishing techniques.','Textile, materials or product development experience is preferred.'], zh:['研发材料主管','中国苏州','研发 / 材料 · 全职','2026年8月14日','寻找完全符合产品要求的材料与工艺。','搜寻、测试并记录面料、辅料及后整理工艺。','具备纺织、材料或产品开发经验者优先。'] },
    { en:['Finance Executive','Kuala Lumpur, Malaysia','Corporate · Full-time','Jul 30, 2026','Support accurate reporting and financial discipline across the Group.','Prepare schedules, reconcile accounts and assist with monthly reporting.','Degree in accounting, finance or a related discipline.'], zh:['财务主管','马来西亚吉隆坡','企业职能 · 全职','2026年7月30日','支持集团准确的财务报告与财务管理。','准备报表、核对账目并协助月度报告。','会计、财务或相关专业学位。'] },
    { en:['HR & Training Executive','Phnom Penh, Cambodia','People · Full-time','Jul 18, 2026','Help teams grow through thoughtful people operations and training.','Coordinate recruitment, onboarding, training records and employee programmes.','Human resources experience and confident communication in English.'], zh:['人力资源与培训主管','柬埔寨金边','人才发展 · 全职','2026年7月18日','通过完善的人力运营与培训支持团队成长。','协调招聘、入职、培训记录及员工项目。','具备人力资源经验，能以英语自信沟通。'] },
    { en:['Business Development Executive','Kuala Lumpur, Malaysia','Commercial · Full-time','Jun 26, 2026','Build relationships with brands and partners who value better engineering.','Research opportunities, prepare proposals and coordinate customer meetings.','Commercial experience in apparel, manufacturing or related industries.'], zh:['业务发展主管','马来西亚吉隆坡','商务 · 全职','2026年6月26日','与重视更好工程能力的品牌及合作伙伴建立关系。','研究机会、准备提案并协调客户会议。','具备服装、制造业或相关行业商务经验。'] }
  ];
  jobs.push(
    { en:['Production Supervisor','Batu Pahat, Johor','Production · Full-time','Jun 12, 2026','Lead a production team that turns technical specifications into consistent, high-quality output.','Manage daily line performance, manpower allocation and production issues.','Diploma or degree with relevant supervisory experience in manufacturing.'], zh:['生产主管','柔佛州峇株巴辖','生产 · 全职','2026年6月12日','带领生产团队，将技术规格转化为稳定、高质量的产出。','管理生产线表现、人力分配及生产问题。','具备文凭或学位，并拥有制造业相关主管经验。'] },
    { en:['Industrial Engineer','Batu Pahat, Johor','Engineering · Full-time','Jun 4, 2026','Improve the way people, processes and equipment work together on the production floor.','Analyse workflow, capacity and productivity data to recommend improvements.','Degree in industrial engineering, operations or a related discipline.'], zh:['工业工程师','柔佛州峇株巴辖','工程 · 全职','2026年6月4日','改善生产现场人员、流程与设备之间的协作方式。','分析流程、产能及生产力数据并提出改善建议。','工业工程、运营或相关专业学位。'] },
    { en:['Fabric Technologist','Batu Pahat, Johor','R&D / Material · Full-time','May 22, 2026','Evaluate fabrics and finishes for performance, quality and manufacturability.','Coordinate material testing, supplier feedback and technical documentation.','Textile technology or materials experience is preferred.'], zh:['面料技术员','柔佛州峇株巴辖','研发 / 材料 · 全职','2026年5月22日','从性能、质量与可制造性角度评估面料及后整理工艺。','协调材料测试、供应商反馈及技术文件。','具备纺织技术或材料相关经验者优先。'] },
    { en:['Sample Room Coordinator','Johor Bahru, Johor','Development & Design · Full-time','May 8, 2026','Keep sample development moving from first pattern to approved sample.','Coordinate sample priorities, fittings, comments and delivery dates.','Experience in sample room, technical development or apparel production.'], zh:['样衣室协调员','柔佛州新山','开发与设计 · 全职','2026年5月8日','推动样衣开发，从首版版型到最终确认样衣。','协调样衣优先级、试身、意见及交付日期。','具备样衣室、技术开发或服装生产经验。'] },
    { en:['Compliance Executive','Phnom Penh, Cambodia','Quality & Compliance · Full-time','Apr 26, 2026','Support responsible operations and standards across the manufacturing network.','Maintain compliance records, coordinate audits and follow up corrective actions.','Experience in social compliance, factory audit or sustainability is an advantage.'], zh:['合规主管','柬埔寨金边','质量与合规 · 全职','2026年4月26日','支持制造网络中的负责任运营与标准执行。','维护合规记录、协调审核并跟进改善措施。','具备社会合规、工厂审核或可持续发展经验者优先。'] },
    { en:['Production Planning Assistant','Phnom Penh, Cambodia','Production · Full-time','Apr 14, 2026','Support accurate planning and communication across production teams.','Update schedules, prepare reports and follow up material readiness.','Strong organisation skills and basic spreadsheet experience.'], zh:['生产计划助理','柬埔寨金边','生产 · 全职','2026年4月14日','支持生产团队进行准确的计划与沟通。','更新计划、准备报告并跟进材料准备情况。','组织能力强，具备基本电子表格经验。'] },
    { en:['Graphic Artwork Executive','Batu Pahat, Johor','The Mark · Full-time','Mar 30, 2026','Prepare artwork that translates brand intent into production-ready detail.','Check artwork, colour references and production samples with internal teams.','Experience with Adobe Creative Suite and artwork production workflows.'], zh:['平面图稿主管','柔佛州峇株巴辖','品牌标记 · 全职','2026年3月30日','准备将品牌概念转化为可生产细节的图稿。','与内部团队检查图稿、颜色参考及生产样品。','熟悉 Adobe Creative Suite 及图稿生产流程。'] },
    { en:['Mechanical Maintenance Technician','Phnom Penh, Cambodia','Engineering · Full-time','Mar 18, 2026','Keep machinery performing safely and reliably throughout the production cycle.','Perform scheduled maintenance, repairs and equipment inspections.','Technical certificate or hands-on maintenance experience.'], zh:['机械维修技术员','柬埔寨金边','工程 · 全职','2026年3月18日','确保生产周期内机械安全、可靠地运行。','执行定期维护、维修及设备检查。','具备技术证书或实际维修经验。'] },
    { en:['Accounts Executive','Kuala Lumpur, Malaysia','Corporate · Full-time','Mar 6, 2026','Support accurate accounts payable, receivable and month-end processes.','Process transactions, reconcile balances and prepare supporting schedules.','Degree or diploma in accounting with good attention to detail.'], zh:['会计主管','马来西亚吉隆坡','企业职能 · 全职','2026年3月6日','支持准确的应付账款、应收账款及月结流程。','处理交易、核对余额并准备相关报表。','会计学位或文凭，注重细节。'] },
    { en:['Talent Acquisition Executive','Kuala Lumpur, Malaysia','People · Full-time','Feb 20, 2026','Help PCCS find people who care about the work and the standards behind it.','Manage job advertising, candidate screening, interviews and onboarding coordination.','Recruitment experience and confident communication skills.'], zh:['人才招聘主管','马来西亚吉隆坡','人才发展 · 全职','2026年2月20日','帮助 PCCS 找到重视工作与标准的人才。','管理职位发布、候选人筛选、面试及入职协调。','具备招聘经验及良好的沟通能力。'] },
    { en:['Customer Programme Executive','Johor Bahru, Johor','Commercial · Full-time','Feb 8, 2026','Coordinate customer programmes from development brief through delivery.','Track milestones, communicate risks and align internal stakeholders.','Apparel programme management or merchandising experience preferred.'], zh:['客户项目主管','柔佛州新山','商务 · 全职','2026年2月8日','协调客户项目，从开发要求到最终交付。','跟进里程碑、沟通风险并协调内部相关团队。','具备服装项目管理或跟单经验者优先。'] },
    { en:['Warehouse Executive','Batu Pahat, Johor','Supply Chain · Full-time','Jan 22, 2026','Support accurate movement and control of materials and finished goods.','Coordinate receiving, storage, stock records and dispatch preparation.','Warehouse or supply chain experience is preferred.'], zh:['仓库主管','柔佛州峇株巴辖','供应链 · 全职','2026年1月22日','支持材料与成品的准确流转及管理。','协调收货、储存、库存记录及出货准备。','具备仓库或供应链经验者优先。'] },
    { en:['Sustainability Executive','Kuala Lumpur, Malaysia','Sustainability · Full-time','Jan 10, 2026','Help turn sustainability commitments into measurable operating practice.','Coordinate data collection, reporting and improvement initiatives across teams.','Sustainability, environmental or reporting experience is preferred.'], zh:['可持续发展主管','马来西亚吉隆坡','可持续发展 · 全职','2026年1月10日','将可持续发展承诺转化为可衡量的运营实践。','协调数据收集、报告及跨团队改善项目。','具备可持续发展、环境或报告经验者优先。'] }
  );
  const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  const value = (job) => zh ? job.zh : job.en;
  const labels = zh ? { filter:'筛选职位', all:'全部职位', location:'地点', team:'职能领域', results:'个职位', back:'返回职位列表', summary:'职位概览', description:'职位描述', responsibilities:'工作内容', minimum:'最低资格', preferred:'优先资格', other:'其他信息', apply:'申请职位 ↗', preview:'以下为版面预览资料，之后可由 Careers CMS 替换为正式职位。', search:'搜索职位、地点或职能' } : { filter:'Filter jobs', all:'All jobs', location:'Location', team:'Team', results:'results', back:'Back to search results', summary:'Summary', description:'Description', responsibilities:'Responsibilities', minimum:'Minimum Qualifications', preferred:'Preferred Qualifications', other:'Other details', apply:'Apply for this role ↗', preview:'Sample records for layout preview — these will be replaced by published Careers CMS vacancies.', search:'Search roles, locations or teams' };
  let locations = [...new Set(jobs.map((job) => value(job)[1]))];
  let teams = [...new Set(jobs.map((job) => value(job)[2].split(' · ')[0]))];
  let activeJob = null;
  let currentPage = 1;
  const pageSize = 10;
  const formatDate = (date) => date ? new Date(date + 'T00:00:00').toLocaleDateString(zh ? 'zh-CN' : 'en-GB', { day:'2-digit', month:'short', year:'numeric' }) : '';
  const lines = (text) => String(text || '').split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
  const fromRemote = (row) => {
    const teamEn = row.team_en || '';
    const employmentEn = row.employment_en || 'Full-time';
    return {
      en: [row.title_en || row.title_zh, row.location_en || row.location_zh, teamEn + ' · ' + employmentEn, formatDate(row.posted_date), row.summary_en || row.summary_zh, row.responsibilities_en || row.responsibilities_zh, row.minimum_qualifications_en || row.minimum_qualifications_zh],
      zh: [row.title_en || row.title_zh, row.location_en || row.location_zh, teamEn + ' · ' + employmentEn, formatDate(row.posted_date), row.summary_en || row.summary_zh, row.responsibilities_en || row.responsibilities_zh, row.minimum_qualifications_en || row.minimum_qualifications_zh],
      detail: {
        en: { summary: lines(row.summary_en || row.summary_zh), description: lines(row.description_en || row.description_zh), responsibilities: lines(row.responsibilities_en || row.responsibilities_zh), minimum: lines(row.minimum_qualifications_en || row.minimum_qualifications_zh), preferred: lines(row.preferred_qualifications_en || row.preferred_qualifications_zh), other: lines(row.other_details_en || row.other_details_zh) },
        zh: { summary: lines(row.summary_en || row.summary_zh), description: lines(row.description_en || row.description_zh), responsibilities: lines(row.responsibilities_en || row.responsibilities_zh), minimum: lines(row.minimum_qualifications_en || row.minimum_qualifications_zh), preferred: lines(row.preferred_qualifications_en || row.preferred_qualifications_zh), other: lines(row.other_details_en || row.other_details_zh) }
      },
      applicationEmail: row.application_email || 'communication@pccsgroup.net'
    };
  };
  function refreshFilters() {
    locations = [...new Set(jobs.map((job) => value(job)[1]))];
    teams = [...new Set(jobs.map((job) => value(job)[2].split(' · ')[0]))];
    const locationSelect = root.querySelector('[data-job-location]');
    const teamSelect = root.querySelector('[data-job-team]');
    if (locationSelect) locationSelect.innerHTML = '<option value="">' + labels.all + '</option>' + locations.map((item) => '<option>' + esc(item) + '</option>').join('');
    if (teamSelect) teamSelect.innerHTML = '<option value="">' + labels.all + '</option>' + teams.map((item) => '<option>' + esc(item) + '</option>').join('');
  }
  function useRemoteJobs(rows) { if (!rows.length) return; jobs = rows.map(fromRemote); refreshFilters(); currentPage = 1; renderList(); }
  async function loadRemoteJobs() {
    if (!window.supabase || !window.PCCS_SUPABASE_URL || !window.PCCS_SUPABASE_ANON_KEY) return;
    const client = window.supabase.createClient(window.PCCS_SUPABASE_URL, window.PCCS_SUPABASE_ANON_KEY);
    const { data, error } = await client.from('pccs_career_jobs').select('*').eq('status', 'published').order('sort_order').order('posted_date', { ascending:false });
    if (!error && data && data.length) useRemoteJobs(data);
  }
  function renderList() {
    const query = (root.querySelector('[data-job-search]')?.value || '').toLowerCase().trim();
    const location = root.querySelector('[data-job-location]')?.value || '';
    const team = root.querySelector('[data-job-team]')?.value || '';
    const filtered = jobs.filter((job) => { const v = value(job); return (!query || v.slice(0, 3).join(' ').toLowerCase().includes(query)) && (!location || v[1] === location) && (!team || v[2].startsWith(team)); });
    const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize)); currentPage = Math.min(currentPage, pageCount);
    const pageRows = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    root.querySelector('[data-job-count]').textContent = filtered.length + ' ' + labels.results;
    root.querySelector('[data-job-results]').innerHTML = pageRows.map((job) => { const v = value(job); const index = jobs.indexOf(job); return '<button class="cr-job-result" type="button" data-job-index="' + index + '"><span class="cr-job-result-main"><strong>' + esc(v[0]) + '</strong><span>' + esc(v[2]) + '</span><time>' + esc(v[3]) + '</time></span><span class="cr-job-result-location">' + esc(v[1]) + '</span><span class="cr-job-result-arrow" aria-hidden="true">›</span></button>'; }).join('') || '<p class="cr-job-no-results">' + (zh ? '没有符合条件的职位。' : 'No roles match your filters.') + '</p>';
    root.querySelector('[data-job-pager]').innerHTML = pageCount > 1 ? '<button type="button" data-page-prev ' + (currentPage === 1 ? 'disabled' : '') + '>' + (zh ? '上一页' : 'Previous') + '</button><span>' + currentPage + ' / ' + pageCount + '</span><button type="button" data-page-next ' + (currentPage === pageCount ? 'disabled' : '') + '>' + (zh ? '下一页' : 'Next') + '</button>' : '';
    root.querySelector('[data-page-prev]')?.addEventListener('click', () => { currentPage -= 1; renderList(); }); root.querySelector('[data-page-next]')?.addEventListener('click', () => { currentPage += 1; renderList(); });
    root.querySelectorAll('[data-job-index]').forEach((button) => button.addEventListener('click', () => showDetail(jobs[Number(button.dataset.jobIndex)])));
  }
  function showDetail(job) {
    activeJob = job; const v = value(job);
    closeModal();
    const list = (items) => '<ul>' + items.map((item) => '<li>' + esc(item) + '</li>').join('') + '</ul>';
    const copy = job.detail ? job.detail[zh ? 'zh' : 'en'] : (zh ? {
      summary: [v[4], '与跨部门团队合作，持续改善工作流程与成果。'],
      description: ['这个职位负责将团队目标转化为稳定、可执行的日常工作。', '你将在实际运营环境中解决问题，并与不同团队共同完成交付。'],
      responsibilities: [v[5], '跟进进度、记录结果，并及时升级需要处理的问题。', '参与流程改善、团队会议及相关报告。'],
      minimum: [v[6], '能够清晰沟通、组织工作，并独立跟进任务。', '愿意在快速变化的制造与运营环境中学习。'],
      preferred: ['具备相关行业或跨部门项目经验者优先。', '熟悉 Microsoft Office、报告工具或相关专业软件者优先。'],
      other: ['工作地点：' + v[1], '工作性质：' + v[2], '发布日期：' + v[3]]
    } : {
      summary: [v[4], 'Work closely with cross-functional teams to improve how work gets done and delivered.'],
      description: ['This role turns team objectives into reliable, practical day-to-day work.', 'You will solve problems in a real operating environment and help different teams deliver together.'],
      responsibilities: [v[5], 'Track progress, record outcomes and escalate issues that need attention.', 'Contribute to process improvement, team reviews and reporting.'],
      minimum: [v[6], 'Clear communication, organised follow-through and the ability to work independently.', 'A willingness to learn in a fast-moving manufacturing and operations environment.'],
      preferred: ['Relevant industry or cross-functional project experience is preferred.', 'Experience with Microsoft Office, reporting tools or relevant professional software is an advantage.'],
      other: ['Location: ' + v[1], 'Employment: ' + v[2], 'Posted: ' + v[3]]
    });
    const copyText = (items) => '<div class="cr-job-copy"><p>' + items.map(esc).join(' ') + '</p></div>';
    root.insertAdjacentHTML('beforeend', '<div class="cr-job-modal" role="dialog" aria-modal="true" aria-label="' + esc(v[0]) + '"><div class="cr-job-modal-panel"><button class="cr-job-modal-close" type="button" data-job-close aria-label="Close">×</button><div class="cr-job-detail-head"><h3>' + esc(v[0]) + '</h3><p>' + esc(v[1]) + ' · ' + esc(v[2]) + '</p><time>' + esc(v[3]) + '</time><a class="cr-job-apply" target="_blank" rel="noopener" href="mailto:' + encodeURIComponent(job.applicationEmail || 'communication@pccsgroup.net') + '?subject=' + encodeURIComponent(v[0]) + '">' + labels.apply + '</a></div><div class="cr-job-detail-body"><aside><strong>' + labels.summary + '</strong><span>' + esc(v[3]) + '</span></aside><div><section><h4>' + labels.summary + '</h4>' + copyText(copy.summary) + '</section><section><h4>' + labels.description + '</h4>' + copyText(copy.description) + '</section><section><h4>' + labels.responsibilities + '</h4>' + list(copy.responsibilities) + '</section><section><h4>' + labels.minimum + '</h4>' + list(copy.minimum) + '</section><section><h4>' + labels.preferred + '</h4>' + list(copy.preferred) + '</section><section><h4>' + labels.other + '</h4>' + list(copy.other) + '</section></div></div></div></div>');
    document.body.classList.add('cr-job-modal-open');
    const modal = root.querySelector('.cr-job-modal');
    modal.querySelector('[data-job-close]').addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
    modal.querySelector('[data-job-close]').focus();
  }
  function closeModal() { const modal = root.querySelector('.cr-job-modal'); if (modal) modal.remove(); document.body.classList.remove('cr-job-modal-open'); activeJob = null; }
  function showBrowser() { closeModal(); root.querySelector('[data-job-detail-view]').hidden = true; root.querySelector('[data-job-browser]').hidden = false; renderList(); }
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });
  root.innerHTML = '<div class="cr-job-browser" data-job-browser><div class="cr-job-tools"><div class="cr-job-search"><label>' + labels.filter + '</label><input data-job-search type="search" placeholder="' + labels.search + '"></div><label>' + labels.location + '<select data-job-location><option value="">' + labels.all + '</option>' + locations.map((item) => '<option>' + esc(item) + '</option>').join('') + '</select></label><label>' + labels.team + '<select data-job-team><option value="">' + labels.all + '</option>' + teams.map((item) => '<option>' + esc(item) + '</option>').join('') + '</select></label></div><div class="cr-job-results-head"><strong data-job-count></strong></div><div data-job-results></div><div class="cr-job-pager" data-job-pager></div></div><div data-job-detail-view hidden></div>';
  root.querySelector('[data-job-search]').addEventListener('input', () => { currentPage = 1; renderList(); }); root.querySelector('[data-job-location]').addEventListener('change', () => { currentPage = 1; renderList(); }); root.querySelector('[data-job-team]').addEventListener('change', () => { currentPage = 1; renderList(); }); renderList(); loadRemoteJobs();
}());
