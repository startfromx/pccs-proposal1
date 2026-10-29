(function () {
  'use strict';
  if (!window.supabase || !window.PCCS_SUPABASE_URL) return;
  const root = document.querySelector('[data-investor-library]');
  if (!root) return;
  const client = window.supabase.createClient(window.PCCS_SUPABASE_URL, window.PCCS_SUPABASE_ANON_KEY);
  const language = document.documentElement.lang === 'zh-CN' ? 'zh' : 'en';
  const labels = language === 'zh' ? { annual: '年度财务报告', quarterly: '季度财务报告', governance: '企业管治', agm: '股东大会摘要' } : { annual: 'Annual Financial Report', quarterly: 'Quarterly Financial Report', governance: 'Corporate Governance', agm: 'AGM Summary' };
  const descriptions = language === 'zh' ? { annual: '年度报告、声明、管治报告及股东大会相关文件。', quarterly: '按报告期间整理的季度财务报告。', governance: '政策、章程及委员会职权范围。', agm: '股东大会会议记录、摘要及股东问询回复。' } : { annual: 'Annual reports, statements, governance reports and supporting AGM documents.', quarterly: 'Quarterly financial reports arranged by reporting period.', governance: 'Policies, charters and committee terms of reference.', agm: 'AGM minutes, summaries and responses to shareholder queries.' };
  const folders = { annual: 'annual-reports', quarterly: 'quarterly-reports', governance: 'corporate-governance', agm: 'agm-summary' };
  const escapeHtml = (value) => String(value || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const yearOf = (title) => { const text = String(title || ''); const match = text.match(/[12][0-9]{3}/); if (match) return match[0]; if (/Notice of the 32nd AGM/i.test(text)) return '2026'; if (/Notice of the 31st AGM/i.test(text)) return '2025'; if (/Notice of the 30th AGM/i.test(text)) return '2024'; if (/Notice of the 29th AGM/i.test(text)) return '2023'; if (/^(Administrative Guide|Requisite Form for the Circular|Requisition Form)$/i.test(text)) return '2022'; return ''; };
  const sourceRank = (title) => { const text = String(title || ''); if (/Notice of the .* AGM/i.test(text)) return 10; if (/Form of Proxy/i.test(text)) return 20; if (/^Annual Report/i.test(text)) return 30; if (/Statement to Shareholders/i.test(text)) return 40; if (/Corporate Governance Report/i.test(text)) return 50; if (/Request Form for Annual Report/i.test(text)) return 60; if (/RRPT Circular and SBB Statements/i.test(text)) return 10; if (/Request form for Annual Report/i.test(text)) return 20; if (/PCCS AR2022/i.test(text)) return 30; return 100; };
  function render(rows) {
    const byCategory = { annual: [], quarterly: [], governance: [], agm: [] };
    rows.forEach((row) => { if (byCategory[row.category]) byCategory[row.category].push(row); });
    const categories = Object.keys(byCategory).map((id) => ({ id, label: labels[id], count: byCategory[id].length }));
    const nav = root.querySelector('[data-investor-categories]'); const select = root.querySelector('[data-investor-select]'); const panel = root.querySelector('[data-investor-documents]');
    nav.replaceChildren(); if (select) select.replaceChildren();
    let active = 'annual';
    function renderCategory(type) {
      const list = byCategory[type].slice().sort((a, b) => Number(b.year || yearOf(b.title_en || b.title_zh)) - Number(a.year || yearOf(a.title_en || a.title_zh)) || (a.sort_order || 0) - (b.sort_order || 0));
      const groups = {};
      list.forEach((row) => { const key = type === 'governance' ? 'Policies and governance documents' : type === 'agm' ? 'AGM documents' : String(row.year || yearOf(row.title_en || row.title_zh)); (groups[key] || (groups[key] = [])).push(row); });
      const keys = Object.keys(groups).sort((a, b) => { if (!a) return 1; if (!b) return -1; return b.localeCompare(a, undefined, { numeric: true }); });
      panel.innerHTML = '<div class="investor-doc-head"><div><div class="page-card-kicker">' + (language === 'zh' ? '文件库' : 'Document library') + '</div><h2>' + labels[type] + '</h2><p>' + descriptions[type] + '</p></div><span class="investor-count">' + list.length + ' ' + (language === 'zh' ? '份 PDF' : 'PDFs') + '</span></div>' + keys.map((key) => '<section class="investor-doc-group investor-doc-group-open"><h3 class="investor-year-heading">' + (key ? escapeHtml(key) : '') + '</h3><div class="investor-doc-list">' + groups[key].map((row) => '<a class="investor-doc-row" href="' + escapeHtml(row.file_url) + '" target="_blank" rel="noopener"><span class="investor-doc-title">' + escapeHtml(language === 'zh' ? (row.title_zh || row.title_en) : (row.title_en || row.title_zh)) + '</span><span class="investor-doc-meta">PDF <span aria-hidden="true">↗</span></span></a>').join('') + '</div></section>').join('');
      nav.querySelectorAll('[data-investor-category]').forEach((button) => button.classList.toggle('active', button.dataset.investorCategory === type)); if (select) select.value = type; active = type;
    }
    categories.forEach((category) => { const button = document.createElement('button'); button.type = 'button'; button.className = 'investor-category'; button.dataset.investorCategory = category.id; button.innerHTML = escapeHtml(category.label) + '<span>' + category.count + '</span>'; button.addEventListener('click', () => renderCategory(category.id)); nav.appendChild(button); if (select) { const option = document.createElement('option'); option.value = category.id; option.textContent = category.label; select.appendChild(option); } });
    if (select) select.onchange = () => renderCategory(select.value);
    renderCategory(active);
  }
  client.from('pccs_investor_documents_shared').select('*').eq('published', true).order('category').order('year', { ascending: false }).order('sort_order').then(({ data, error }) => { if (!error && data && data.length) render(data); });
}());
