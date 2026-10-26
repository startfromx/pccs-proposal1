(function () {
  'use strict';
  const client = window.supabase.createClient(window.PCCS_SUPABASE_URL, window.PCCS_SUPABASE_ANON_KEY);
  const requestedCategory = new URLSearchParams(window.location.search).get('category');
  const state = { category: ['annual', 'quarterly', 'governance', 'agm'].includes(requestedCategory) ? requestedCategory : 'annual', rows: [] };
  const $ = (selector) => document.querySelector(selector);
  const categories = ['annual', 'quarterly', 'governance', 'agm'];
  const labels = { annual: 'Annual reports', quarterly: 'Quarterly reports', governance: 'Corporate governance', agm: 'AGM documents' };
  const status = (message) => { const target = $('#status'); target.textContent = message; clearTimeout(target._timer); target._timer = setTimeout(() => { target.textContent = ''; }, 4500); };
  const yearFrom = (value) => { const text = String(value || ''); const match = text.match(/[12][0-9]{3}/); if (match) return Number(match[0]); if (/Notice of the 32nd AGM/i.test(text)) return 2026; if (/Notice of the 31st AGM/i.test(text)) return 2025; if (/Notice of the 30th AGM/i.test(text)) return 2024; if (/Notice of the 29th AGM/i.test(text)) return 2023; if (/^(Administrative Guide|Requisite Form for the Circular|Requisition Form)$/i.test(text)) return 2022; return null; };
  const sourceRank = (title) => { const text = String(title || ''); if (/Notice of the .* AGM/i.test(text)) return 10; if (/Form of Proxy/i.test(text)) return 20; if (/^Annual Report/i.test(text)) return 30; if (/Statement to Shareholders/i.test(text)) return 40; if (/Corporate Governance Report/i.test(text)) return 50; if (/Request Form for Annual Report/i.test(text)) return 60; if (/RRPT Circular and SBB Statements/i.test(text)) return 10; if (/Request form for Annual Report/i.test(text)) return 20; if (/PCCS AR2022/i.test(text)) return 30; return 100; };
  const fallbackUrl = (category, file) => '../documents/' + ({ annual: 'annual-reports', quarterly: 'quarterly-reports', governance: 'corporate-governance', agm: 'agm-summary' }[category]) + '/' + encodeURIComponent(file);
  function sortRows(rows) { return rows.sort((a, b) => Number(b.year || yearFrom(b.title_en)) - Number(a.year || yearFrom(a.title_en)) || Number(a.sort_order || 0) - Number(b.sort_order || 0)); }
  async function loadStatic() {
    const source = await (await fetch('../assets/js/investor-documents.js')).text();
    const match = source.match(/var documents = (\{[\s\S]*?\});/);
    if (!match) return;
    const documents = JSON.parse(match[1]);
    state.rows = categories.flatMap((category) => documents[category].map((file, index) => ({ category, year: yearFrom(file), title_en: file.replace(/\.pdf$/i, ''), title_zh: file.replace(/\.pdf$/i, ''), file_url: fallbackUrl(category, file), sort_order: index, published: true })));
  }
  async function load() {
    const { data, error } = await client.from('pccs_investor_documents_shared').select('*').order('category').order('year', { ascending: false }).order('sort_order');
    if (error) { status('Shared investor table is not ready. Run the migration SQL first.'); return; }
    state.rows = (data || []).map((row) => { row.title_en = row.title_en || row.title_zh || ''; row.title_zh = row.title_zh || row.title_en || ''; row.year = row.year || yearFrom(row.title_en); return row; });
    if (!state.rows.length) await loadStatic();
    render();
    status(data && data.length ? 'Shared investor documents loaded.' : 'Existing documents loaded. Save to Supabase to create the shared records.');
  }
  function move(row, direction) {
    const rows = sortRows(state.rows.filter((item) => item.category === state.category));
    const index = rows.indexOf(row); const target = index + (direction === 'up' ? -1 : 1);
    if (target < 0 || target >= rows.length) return;
    if (Number(rows[index].year || yearFrom(rows[index].title_en)) !== Number(rows[target].year || yearFrom(rows[target].title_en))) return;
    const oldOrder = rows[index].sort_order;
    rows[index].sort_order = rows[target].sort_order;
    rows[target].sort_order = oldOrder;
    render(); status('Order updated. Save to Supabase to publish it.');
  }
  async function uploadPdf(file, row) {
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-');
    const path = 'investors/shared/' + row.category + '/' + Date.now() + '-' + safeName;
    const { error } = await client.storage.from('pccs-media').upload(path, file, { contentType: 'application/pdf', upsert: true });
    if (error) throw error;
    return client.storage.from('pccs-media').getPublicUrl(path).data.publicUrl;
  }
  function render() {
    $('#category-heading').textContent = labels[state.category];
    const counts = categories.reduce((result, category) => { result[category] = state.rows.filter((row) => row.category === category).length; return result; }, {});
    document.querySelectorAll('[data-investor-count]').forEach((node) => { node.textContent = counts[node.dataset.investorCount] || 0; });
    const total = document.querySelector('[data-investor-total]'); if (total) total.textContent = Object.values(counts).reduce((sum, count) => sum + count, 0);
    document.querySelectorAll('[data-category]').forEach((tab) => tab.classList.toggle('is-active', tab.dataset.category === state.category));
    document.querySelectorAll('[data-investor-nav]').forEach((link) => link.classList.toggle('is-active', link.dataset.investorNav === state.category));
    const list = $('#document-list'); list.replaceChildren();
    const rows = sortRows(state.rows.filter((row) => row.category === state.category));
    if (!rows.length) { const empty = document.createElement('p'); empty.className = 'empty-state'; empty.textContent = 'No documents yet. Add the first one above.'; list.appendChild(empty); return; }
    let currentYear = null;
    rows.forEach((row) => {
      const year = Number(row.year || yearFrom(row.title_en));
      if (year && year !== currentYear) { const heading = document.createElement('h3'); heading.className = 'investor-admin-year'; heading.textContent = year; list.appendChild(heading); currentYear = year; }
      const item = document.createElement('div'); item.className = 'investor-admin-row'; item.dataset.id = row.id || '';
      item.innerHTML = '<input class="investor-year-input" aria-label="Document year" type="number" min="1900" max="2200" placeholder="Year"><div class="investor-title-with-copy"><input class="investor-title-input" aria-label="English title" placeholder="English title"><button class="copy-title" type="button" data-copy="en-to-zh" title="Copy English title to Chinese">→</button></div><div class="investor-title-with-copy"><input class="investor-title-input" aria-label="Chinese title" placeholder="Chinese title"><button class="copy-title" type="button" data-copy="zh-to-en" title="Copy Chinese title to English">←</button></div><input class="investor-url-input" aria-label="Shared PDF URL" placeholder="Shared PDF URL"><div class="investor-file-controls"><input type="file" accept="application/pdf"><span class="investor-file-note"></span></div><div class="investor-row-actions"><button class="row-move" type="button" data-direction="up" aria-label="Move document up" title="Move up">↑</button><button class="row-move" type="button" data-direction="down" aria-label="Move document down" title="Move down">↓</button><button class="row-remove" type="button" aria-label="Remove document" title="Remove document">×</button></div>';
      const inputs = item.querySelectorAll('.investor-title-input');
      item.querySelector('.investor-year-input').value = row.year || '';
      inputs[0].value = row.title_en || '';
      inputs[1].value = row.title_zh || '';
      item.querySelector('[data-copy="en-to-zh"]').addEventListener('click', () => { row.title_zh = row.title_en || ''; inputs[1].value = row.title_zh; status('English title copied to Chinese.'); });
      item.querySelector('[data-copy="zh-to-en"]').addEventListener('click', () => { row.title_en = row.title_zh || ''; inputs[0].value = row.title_en; status('Chinese title copied to English.'); });
      item.querySelector('.investor-url-input').value = row.file_url || '';
      item.querySelector('.investor-file-note').textContent = row.file_url ? decodeURIComponent(row.file_url.split('/').pop()) : 'No PDF selected';
      item.querySelector('.investor-year-input').addEventListener('change', (event) => { row.year = event.target.value ? Number(event.target.value) : null; render(); status('Year updated. Save to Supabase to publish it.'); });
      inputs[0].addEventListener('input', (event) => { row.title_en = event.target.value; });
      inputs[1].addEventListener('input', (event) => { row.title_zh = event.target.value; });
      item.querySelector('.investor-url-input').addEventListener('input', (event) => { row.file_url = event.target.value; });
      item.querySelector('input[type=file]').addEventListener('change', async (event) => { if (!event.target.files[0]) return; try { row.file_url = await uploadPdf(event.target.files[0], row); render(); status('PDF uploaded. Save to Supabase to publish it.'); } catch (error) { status('PDF upload failed: ' + error.message); } });
      item.querySelectorAll('.row-move').forEach((button) => button.addEventListener('click', () => move(row, button.dataset.direction)));
      item.querySelector('.row-remove').addEventListener('click', () => { const index = state.rows.indexOf(row); if (index >= 0) state.rows.splice(index, 1); render(); status('Document removed from the draft. Save to Supabase to publish the change.'); });
      list.appendChild(item);
    });
  }
  async function save() {
    const button = $('#save-button'); button.disabled = true; button.textContent = 'Saving…'; status('Saving changes to Supabase…');
    try {
      const rows = categories.flatMap((category) => sortRows(state.rows.filter((row) => row.category === category))).map((row, index) => ({ category: row.category, year: row.year || yearFrom(row.title_en), title_en: row.title_en || '', title_zh: row.title_zh || row.title_en || '', file_url: row.file_url || '', sort_order: row.sort_order ?? index, published: row.published !== false }));
      const { error: deleteError } = await client.from('pccs_investor_documents_shared').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      if (deleteError) throw deleteError;
      if (rows.length) { const { error } = await client.from('pccs_investor_documents_shared').insert(rows); if (error) throw error; }
      button.textContent = 'Saved!'; status('Saved to Supabase. The public Investors pages are updated.'); setTimeout(() => { button.textContent = 'Save to Supabase'; button.disabled = false; }, 2600);
    } catch (error) { button.textContent = 'Save to Supabase'; button.disabled = false; status('Save failed: ' + error.message); }
  }
  const authScreen = $('#auth-screen'); const adminApp = $('#admin-app'); let shown = false;
  function showAdmin(user) { if (shown) return; shown = true; authScreen.hidden = true; authScreen.style.display = 'none'; adminApp.hidden = false; adminApp.style.display = 'flex'; $('#user-email').textContent = user.email || 'Admin'; load().catch((error) => status(error.message)); }
  function showLogin() { authScreen.hidden = false; authScreen.style.display = 'grid'; adminApp.hidden = true; adminApp.style.display = 'none'; }
  $('#login-form').addEventListener('submit', async (event) => { event.preventDefault(); const button = $('#login-form button[type=submit]'); button.disabled = true; button.textContent = 'Signing in…'; try { const result = await client.auth.signInWithPassword({ email: $('#login-email').value, password: $('#login-password').value }); if (result.error) status(result.error.message, $('#login-status')); else showAdmin(result.data.user); } catch (error) { status(error.message, $('#login-status')); } finally { button.disabled = false; button.textContent = 'Sign in'; } });
  $('#logout-button').addEventListener('click', async () => { await client.auth.signOut(); shown = false; showLogin(); });
  document.querySelectorAll('[data-category]').forEach((tab) => tab.addEventListener('click', () => { state.category = tab.dataset.category; render(); }));
  $('#add-document').addEventListener('click', () => { const row = { category: state.category, year: new Date().getFullYear(), title_en: '', title_zh: '', file_url: '', sort_order: state.rows.length, published: true, _new: true }; state.rows.push(row); render(); const item = $('#document-list .investor-admin-row:last-child'); if (item) { item.scrollIntoView({ behavior: 'smooth', block: 'center' }); item.classList.add('is-new-row'); item.querySelector('.investor-title-input').focus(); } status('New shared document added. Enter both titles and upload one PDF.'); });
  $('#save-button').addEventListener('click', save);
  $('#reset-button').addEventListener('click', () => load().catch((error) => status('Reset failed: ' + error.message)));
  client.auth.onAuthStateChange((_event, session) => { if (session) showAdmin(session.user); });
  client.auth.getSession().then(({ data }) => data.session ? showAdmin(data.session.user) : showLogin()).catch(() => showLogin());
}());
