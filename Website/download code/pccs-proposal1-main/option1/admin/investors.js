(function () {
  'use strict';
  const client = window.supabase.createClient(window.PCCS_SUPABASE_URL, window.PCCS_SUPABASE_ANON_KEY);
  const state = { language: 'en', category: 'annual', rows: { en: [], zh: [] } };
  const $ = (selector) => document.querySelector(selector);
  const categoryLabels = { annual: 'Annual reports', quarterly: 'Quarterly reports', governance: 'Corporate governance', agm: 'AGM documents' };
  function showStatus(message, target = $('#status')) { target.textContent = message; clearTimeout(target._timer); target._timer = setTimeout(() => { target.textContent = ''; }, 4500); }
  function staticUrl(category, file) { const folder = { annual: 'annual-reports', quarterly: 'quarterly-reports', governance: 'corporate-governance', agm: 'agm-summary' }[category]; return '../documents/' + folder + '/' + encodeURIComponent(file); }
  async function loadStaticDefaults() {
    const response = await fetch('../assets/js/investor-documents.js');
    const source = await response.text();
    const match = source.match(/var documents = (\{[\s\S]*?\});/);
    if (!match) return;
    const documents = JSON.parse(match[1]);
    ['en', 'zh'].forEach((language) => Object.entries(documents).forEach(([category, files]) => { state.rows[language].push(...files.map((file, index) => ({ language, category, title: file.replace(/\.pdf$/i, ''), file_url: staticUrl(category, file), sort_order: index, published: true }))); }));
  }
  async function load() {
    const { data, error } = await client.from('pccs_investor_documents').select('*').order('language').order('category').order('sort_order');
    if (error) { showStatus('Investor table is not ready. Run supabase-pccs-investors.sql first.'); return; }
    state.rows = { en: [], zh: [] };
    if (data && data.length) data.forEach((row) => state.rows[row.language].push(row));
    else await loadStaticDefaults();
    render(); showStatus(data && data.length ? 'Investor documents loaded from Supabase.' : 'Existing documents loaded. Save to Supabase to create the records.');
  }
  function render() {
    $('#category-heading').textContent = categoryLabels[state.category];
    document.querySelectorAll('[data-category]').forEach((tab) => tab.classList.toggle('is-active', tab.dataset.category === state.category));
    const list = $('#document-list'); list.replaceChildren();
    const rows = state.rows[state.language].filter((row) => row.category === state.category);
    if (!rows.length) { const empty = document.createElement('p'); empty.className = 'empty-state'; empty.textContent = 'No documents yet. Add the first one above.'; list.appendChild(empty); return; }
    rows.forEach((row, visibleIndex) => {
      const item = document.createElement('div'); item.className = 'investor-admin-row';
      item.innerHTML = '<input class="investor-title-input" aria-label="Document title"><input class="investor-url-input" aria-label="PDF URL"><div class="investor-file-controls"><input type="file" accept="application/pdf"><span class="investor-file-note"></span><button class="row-remove" type="button" aria-label="Remove document" title="Remove document"><span aria-hidden="true">🗑</span></button></div>';
      item.querySelector('.investor-title-input').value = row.title || '';
      item.querySelector('.investor-url-input').value = row.file_url || '';
      item.querySelector('.investor-file-note').textContent = row.file_url ? row.file_url.split('/').pop() : 'No PDF selected';
      item.querySelector('.investor-title-input').addEventListener('input', (event) => { row.title = event.target.value; });
      item.querySelector('.investor-url-input').addEventListener('input', (event) => { row.file_url = event.target.value; });
      item.querySelector('input[type=file]').addEventListener('change', async (event) => { if (!event.target.files[0]) return; try { row.file_url = await uploadPdf(event.target.files[0], row); render(); showStatus('PDF uploaded. Save to Supabase to keep the document.'); } catch (error) { showStatus('PDF upload failed: ' + error.message); } });
      item.querySelector('.row-remove').addEventListener('click', () => { const index = state.rows[state.language].indexOf(row); if (index >= 0) state.rows[state.language].splice(index, 1); render(); });
      list.appendChild(item);
    });
  }
  async function uploadPdf(file, row) { const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-'); const path = 'investors/' + state.language + '/' + state.category + '/' + Date.now() + '-' + safeName; const { error } = await client.storage.from('pccs-media').upload(path, file, { contentType: 'application/pdf', upsert: true }); if (error) throw error; return client.storage.from('pccs-media').getPublicUrl(path).data.publicUrl; }
  async function save() { for (const language of ['en', 'zh']) { const { error: deleteError } = await client.from('pccs_investor_documents').delete().eq('language', language); if (deleteError) throw deleteError; const rows = state.rows[language].map((row, index) => ({ language, category: row.category, title: row.title, file_url: row.file_url, sort_order: index, published: row.published !== false })); if (rows.length) { const { error } = await client.from('pccs_investor_documents').insert(rows); if (error) throw error; } } showStatus('Investor documents saved to Supabase.'); }
  const authScreen = $('#auth-screen'); const adminApp = $('#admin-app'); let shown = false;
  function showAdmin(user) { if (shown) return; shown = true; authScreen.hidden = true; authScreen.style.display = 'none'; adminApp.hidden = false; adminApp.style.display = 'flex'; $('#user-email').textContent = user.email || 'Admin'; load().catch((error) => showStatus(error.message)); }
  function showLogin() { authScreen.hidden = false; authScreen.style.display = 'grid'; adminApp.hidden = true; adminApp.style.display = 'none'; }
  $('#login-form').addEventListener('submit', async (event) => { event.preventDefault(); const button = $('#login-form button[type=submit]'); button.disabled = true; button.textContent = 'Signing in…'; try { const result = await Promise.race([client.auth.signInWithPassword({ email: $('#login-email').value, password: $('#login-password').value }), new Promise((_, reject) => setTimeout(() => reject(new Error('Supabase did not respond.')), 12000))]); if (result.error) showStatus(result.error.message, $('#login-status')); else showAdmin(result.data.user); } catch (error) { showStatus(error.message, $('#login-status')); } finally { button.disabled = false; button.textContent = 'Sign in'; } });
  $('#logout-button').addEventListener('click', async () => { await client.auth.signOut(); shown = false; showLogin(); });
  document.querySelectorAll('[data-language]').forEach((tab) => tab.addEventListener('click', () => { state.language = tab.dataset.language; document.querySelectorAll('[data-language]').forEach((item) => item.classList.toggle('is-active', item === tab)); render(); }));
  document.querySelectorAll('[data-category]').forEach((tab) => tab.addEventListener('click', () => { state.category = tab.dataset.category; render(); }));
  $('#add-document').addEventListener('click', () => { state.rows[state.language].push({ language: state.language, category: state.category, title: '', file_url: '', sort_order: state.rows[state.language].length, published: true }); render(); });
  $('#save-button').addEventListener('click', () => save().catch((error) => showStatus('Save failed: ' + error.message)));
  $('#reset-button').addEventListener('click', () => load().catch((error) => showStatus('Reset failed: ' + error.message)));
  client.auth.onAuthStateChange((_event, session) => { if (session) showAdmin(session.user); });
  client.auth.getSession().then(({ data }) => data.session ? showAdmin(data.session.user) : showLogin()).catch(() => showLogin());
}());
