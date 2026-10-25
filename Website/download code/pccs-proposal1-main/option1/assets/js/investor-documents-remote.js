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
  const yearOf = (title) => ((String(title).match(/(19|20)\d{2}/) || [])[0] || 'Archive');
  function render(rows) {
    const byCategory = { annual: [], quarterly: [], governance: [], agm: [] };
    rows.forEach((row) => { if (byCategory[row.category]) byCategory[row.category].push(row); });
    const categories = Object.keys(byCategory).map((id) => ({ id, label: labels[id], count: byCategory[id].length }));
    const nav = root.querySelector('[data-investor-categories]'); const select = root.querySelector('[data-investor-select]'); const panel = root.querySelector('[data-investor-documents]');
    nav.replaceChildren(); if (select) select.replaceChildren();
    let active = 'annual';
    function renderCategory(type) {
      const list = byCategory[type].slice().sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
      const groups = {};
      list.forEach((row) => { const key = type === 'governance' ? 'Policies and governance documents' : type === 'agm' ? 'AGM documents' : yearOf(row.title); (groups[key] || (groups[key] = [])).push(row); });
      const keys = Object.keys(groups).sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
      panel.innerHTML = '<div class="investor-doc-head"><div><div class="page-card-kicker">' + (language === 'zh' ? '文件库' : 'Document library') + '</div><h2>' + labels[type] + '</h2><p>' + descriptions[type] + '</p></div><span class="investor-count">' + list.length + ' ' + (language === 'zh' ? '份 PDF' : 'PDFs') + '</span></div>' + keys.map((key, index) => '<details class="investor-doc-group"' + (index === 0 ? ' open' : '') + '><summary><span>' + escapeHtml(key) + '</span><span class="investor-group-count">' + groups[key].length + ' ' + (language === 'zh' ? '份文件' : 'documents') + ' <b>+</b></span></summary><div class="investor-doc-list">' + groups[key].map((row) => '<a class="investor-doc-row" href="' + escapeHtml(row.file_url) + '" target="_blank" rel="noopener"><span class="investor-doc-title">' + escapeHtml(row.title) + '</span><span class="investor-doc-meta">PDF <span aria-hidden="true">↗</span></span></a>').join('') + '</div></details>').join('');
      nav.querySelectorAll('[data-investor-category]').forEach((button) => button.classList.toggle('active', button.dataset.investorCategory === type)); if (select) select.value = type; active = type;
    }
    categories.forEach((category) => { const button = document.createElement('button'); button.type = 'button'; button.className = 'investor-category'; button.dataset.investorCategory = category.id; button.innerHTML = escapeHtml(category.label) + '<span>' + category.count + '</span>'; button.addEventListener('click', () => renderCategory(category.id)); nav.appendChild(button); if (select) { const option = document.createElement('option'); option.value = category.id; option.textContent = category.label; select.appendChild(option); } });
    if (select) select.onchange = () => renderCategory(select.value);
    renderCategory(active);
  }
  client.from('pccs_investor_documents').select('*').eq('language', language).eq('published', true).order('category').order('sort_order').then(({ data, error }) => { if (!error && data && data.length) render(data); });
}());
