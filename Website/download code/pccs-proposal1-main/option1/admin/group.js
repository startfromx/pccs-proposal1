(function () {
  'use strict';
  const client = window.supabase.createClient(window.PCCS_SUPABASE_URL, window.PCCS_SUPABASE_ANON_KEY);
  const state = { language: 'en', section: new URLSearchParams(location.search).get('section') === 'leadership' ? 'leadership' : 'story', story: { en: blankStory(), zh: blankStory() }, leaders: { en: [], zh: [] }, classificationReady: false };
  const $ = (selector) => document.querySelector(selector);
  const authScreen = $('#auth-screen');
  const adminApp = $('#admin-app');
  const loginForm = $('#login-form');
  const loginStatus = $('#login-status');
  const status = $('#status');
  function blankStory() { return { kicker: '', headline: '', year_label: 'Year', milestone_label: 'Milestone', milestones: [], leadership_kicker: '', leadership_headline: '', leadership_intro: '' }; }
  function classificationFor(leader) { return leader.classification || ((leader.name === 'Tang Lai Huat' || /Corporate Controller|企业财务总监/i.test(leader.role || '')) ? 'management' : 'board'); }
  function syncClassificationsFrom(language) {
    const otherLanguage = language === 'en' ? 'zh' : 'en';
    state.leaders[language].forEach((leader, index) => {
      const matchingLeader = state.leaders[otherLanguage].find((candidate) => candidate.name === leader.name) || state.leaders[otherLanguage][index];
      if (matchingLeader) matchingLeader.classification = classificationFor(leader);
    });
  }
  function showStatus(message, target = status) { target.textContent = message; clearTimeout(target._timer); target._timer = setTimeout(() => { target.textContent = ''; }, 4500); }
  function setSection(section) { state.section = section; $('#story-editor').hidden = section !== 'story'; $('#leadership-editor').hidden = section !== 'leadership'; $('.language-tabs').hidden = section === 'leadership'; document.querySelectorAll('.group-tab').forEach((tab) => tab.classList.toggle('is-active', tab.dataset.section === section)); $('#page-title').textContent = section === 'story' ? 'Our Story.' : 'Leadership.'; $('#breadcrumb-section').textContent = section === 'story' ? 'Our Story' : 'Leadership'; render(); }
  function setLanguage(language) { state.language = language; document.querySelectorAll('[data-language]').forEach((tab) => tab.classList.toggle('is-active', tab.dataset.language === language)); render(); }

  async function load() {
    const [storyResult, leaderResult, classificationResult] = await Promise.all([
      client.from('pccs_group_story').select('*').order('language'),
      client.from('pccs_group_leaders').select('*').order('language').order('sort_order'),
      client.from('pccs_group_leaders').select('classification').limit(1)
    ]);
    if (storyResult.error || leaderResult.error) { showStatus('Group tables are not ready. Run supabase-pccs-group.sql first.'); return; }
    state.classificationReady = !classificationResult.error;
    state.story = { en: blankStory(), zh: blankStory() }; state.leaders = { en: [], zh: [] };
    (storyResult.data || []).forEach((row) => { state.story[row.language] = { ...blankStory(), ...row, milestones: Array.isArray(row.milestones) ? row.milestones : [] }; });
    (leaderResult.data || []).forEach((row) => state.leaders[row.language].push(row));
    await loadMissingStaticContent();
    render();
    showStatus((storyResult.data?.length || leaderResult.data?.length ? 'Our Group content loaded from Supabase.' : 'Existing website content loaded. Save to Supabase to create the Group records.') + (state.classificationReady ? '' : ' Run the leadership classification migration to edit Board / Management labels.'));
  }

  async function loadMissingStaticContent() {
    const pages = { en: '../pages/group.html', zh: '../pages/group-cn.html' };
    await Promise.all(Object.entries(pages).map(async ([language, url]) => {
      const story = state.story[language];
      const response = await fetch(url);
      if (!response.ok) return;
      const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
      if (!story.kicker) story.kicker = doc.querySelector('.story-kicker')?.textContent.trim() || '';
      if (!story.headline) story.headline = doc.querySelector('#story-h2')?.textContent.trim().replace(/\s+/g, ' ') || '';
      if (!story.milestones.length) story.milestones = [...doc.querySelectorAll('.timeline tbody tr')].map((row) => ({ year: row.children[0]?.textContent.trim() || '', text: row.children[1]?.textContent.trim() || '' }));
      if (!story.leadership_kicker) story.leadership_kicker = doc.querySelector('.leadership-kicker')?.textContent.trim() || '';
      if (!story.leadership_headline) story.leadership_headline = doc.querySelector('#leadership-h2')?.textContent.trim().replace(/\s+/g, ' ') || '';
      if (!story.leadership_intro) story.leadership_intro = doc.querySelector('.leadership-intro')?.textContent.trim() || '';
      if (!state.leaders[language].length) state.leaders[language] = [...doc.querySelectorAll('.leader-card')].map((card, index) => ({
        language, sort_order: index, name: card.dataset.leaderName || '', role: card.dataset.leaderRole || '', bio: card.dataset.leaderBio || '', image_path: card.dataset.leaderImage || null, classification: card.dataset.leaderClassification || ((card.dataset.leaderName === 'Tang Lai Huat' || /Corporate Controller|企业财务总监/i.test(card.dataset.leaderRole || '')) ? 'management' : 'board')
      }));
    }));
  }

  function render() {
    const story = state.story[state.language];
    $('#story-kicker').value = story.kicker || '';
    const milestones = $('#milestone-list'); milestones.replaceChildren();
    story.milestones.forEach((item, index) => {
      const row = document.createElement('div'); row.className = 'milestone-row';
      row.innerHTML = '<input aria-label="Year"><textarea rows="2" aria-label="Milestone"><\/textarea><button class="row-remove" type="button" aria-label="Remove milestone" title="Remove milestone"><span aria-hidden="true">×</span><\/button>';
      row.children[0].value = item.year || ''; row.children[1].value = item.text || '';
      row.children[0].addEventListener('input', (event) => { item.year = event.target.value; }); row.children[1].addEventListener('input', (event) => { item.text = event.target.value; });
      row.children[2].addEventListener('click', () => { story.milestones.splice(index, 1); render(); }); milestones.appendChild(row);
    });
    const leaders = $('#leader-list'); leaders.replaceChildren();
    $('#leadership-kicker-en').value = state.story.en.leadership_kicker || ''; $('#leadership-kicker-zh').value = state.story.zh.leadership_kicker || '';
    $('#leadership-intro-en').value = state.story.en.leadership_intro || ''; $('#leadership-intro-zh').value = state.story.zh.leadership_intro || '';
    state.leaders.en.forEach((leaderEn, index) => {
      let leaderZh = state.leaders.zh.find((candidate) => candidate.name === leaderEn.name) || state.leaders.zh[index];
      if (!leaderZh) { leaderZh = { language:'zh', sort_order:index, name:leaderEn.name || '', role:'', bio:'', image_path:leaderEn.image_path || null, classification:classificationFor(leaderEn) }; state.leaders.zh.splice(index, 0, leaderZh); }
      leaderZh.classification = classificationFor(leaderEn);
      const row = document.createElement('div'); row.className = 'leader-row leader-row-combined';
      row.innerHTML = '<div class="leader-profile-fields"><div class="leader-shared-fields"><label>Name<input data-field="name"></label><label>Card classification<select data-field="classification"><option value="board">Board of Directors / 董事会</option><option value="management">Management / 管理层</option></select></label></div><div class="leader-bilingual-fields"><section class="leader-language-panel"><h3>English</h3><label>Role<input data-field="role-en"></label><label>Biography<textarea data-field="bio-en" rows="5"></textarea></label></section><section class="leader-language-panel"><h3>中文</h3><label>职位<input data-field="role-zh"></label><label>简介<textarea data-field="bio-zh" rows="5"></textarea></label></section></div></div><div class="leader-media-panel"><label>Profile photo<input type="file" accept="image/*"></label><div class="leader-image-preview"></div><button class="row-remove" type="button" aria-label="Remove profile" title="Remove profile"><span aria-hidden="true">×</span> Remove profile</button></div>';
      const nameInput = row.querySelector('[data-field=name]'); const roleEnInput = row.querySelector('[data-field=role-en]'); const roleZhInput = row.querySelector('[data-field=role-zh]'); const classificationInput = row.querySelector('[data-field=classification]'); const bioEnInput = row.querySelector('[data-field=bio-en]'); const bioZhInput = row.querySelector('[data-field=bio-zh]');
      nameInput.value = leaderEn.name || leaderZh.name || ''; roleEnInput.value = leaderEn.role || ''; roleZhInput.value = leaderZh.role || ''; classificationInput.value = classificationFor(leaderEn); classificationInput.disabled = !state.classificationReady; classificationInput.title = state.classificationReady ? 'Shared card classification' : 'Run the leadership classification database migration first'; bioEnInput.value = leaderEn.bio || ''; bioZhInput.value = leaderZh.bio || '';
      const imagePreview = row.querySelector('.leader-image-preview');
      const currentImage = leaderEn.image_path || leaderZh.image_path;
      if (currentImage) {
        const image = document.createElement('img'); image.src = currentImage; image.alt = nameInput.value ? nameInput.value + ' current image' : 'Current profile image'; imagePreview.appendChild(image);
        const path = document.createElement('span'); path.textContent = currentImage.split('/').pop(); imagePreview.appendChild(path);
      } else {
        imagePreview.textContent = 'No image uploaded';
      }
      nameInput.addEventListener('input', (event) => { leaderEn.name = event.target.value; leaderZh.name = event.target.value; }); roleEnInput.addEventListener('input', (event) => { leaderEn.role = event.target.value; }); roleZhInput.addEventListener('input', (event) => { leaderZh.role = event.target.value; }); classificationInput.addEventListener('change', (event) => { leaderEn.classification = event.target.value; leaderZh.classification = event.target.value; }); bioEnInput.addEventListener('input', (event) => { leaderEn.bio = event.target.value; }); bioZhInput.addEventListener('input', (event) => { leaderZh.bio = event.target.value; });
      row.querySelector('input[type=file]').addEventListener('change', async (event) => { if (event.target.files[0]) { const imagePath = await uploadWebp(event.target.files[0], leaderEn.name || 'profile'); leaderEn.image_path = imagePath; leaderZh.image_path = imagePath; showStatus('WebP image uploaded. Save to Supabase to keep the profile.'); render(); } });
      row.querySelector('.row-remove').addEventListener('click', () => { state.leaders.en.splice(index, 1); const zhIndex = state.leaders.zh.indexOf(leaderZh); if (zhIndex >= 0) state.leaders.zh.splice(zhIndex, 1); render(); }); leaders.appendChild(row);
    });
  }

  function updateStoryFields() { const story = state.story[state.language]; story.kicker = $('#story-kicker').value; state.story.en.leadership_kicker = $('#leadership-kicker-en').value; state.story.zh.leadership_kicker = $('#leadership-kicker-zh').value; state.story.en.leadership_intro = $('#leadership-intro-en').value; state.story.zh.leadership_intro = $('#leadership-intro-zh').value; }
  async function save() { updateStoryFields(); syncClassificationsFrom(state.language); for (const language of ['en', 'zh']) { const story = state.story[language]; const { error: storyError } = await client.from('pccs_group_story').upsert({ language, kicker: story.kicker, headline: story.headline, year_label: language === 'zh' ? '年份' : 'Year', milestone_label: language === 'zh' ? '里程碑' : 'Milestone', milestones: story.milestones, leadership_kicker: story.leadership_kicker, leadership_headline: story.leadership_headline, leadership_intro: story.leadership_intro, published: true }, { onConflict: 'language' }); if (storyError) throw storyError; const { error: deleteError } = await client.from('pccs_group_leaders').delete().eq('language', language); if (deleteError) throw deleteError; if (state.leaders[language].length) { const rows = state.leaders[language].map((leader, index) => { const row = { language, sort_order: index, name: leader.name, role: leader.role, bio: leader.bio, image_path: leader.image_path || null, published: true }; if (state.classificationReady) row.classification = classificationFor(leader); return row; }); const { error: leaderError } = await client.from('pccs_group_leaders').insert(rows); if (leaderError) throw leaderError; } } showStatus('Our Group content saved to Supabase.' + (state.classificationReady ? ' Board / Management labels were synchronized across English and Chinese.' : ' Board / Management labels remain role-based until the database migration is run.')); }
  async function uploadWebp(file, name) { const bitmap = await createImageBitmap(file); const scale = Math.min(1, 1800 / bitmap.width); const canvas = document.createElement('canvas'); canvas.width = Math.round(bitmap.width * scale); canvas.height = Math.round(bitmap.height * scale); canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height); const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', .86)); const safeName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'director'; const path = 'group/leaders/' + safeName + '-' + Date.now() + '.webp'; const { error } = await client.storage.from('pccs-media').upload(path, blob, { contentType: 'image/webp', upsert: true }); if (error) throw error; return client.storage.from('pccs-media').getPublicUrl(path).data.publicUrl; }

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = $('#login-form button[type="submit"]');
    button.disabled = true;
    button.textContent = 'Signing in…';
    showStatus('Signing in…', $('#login-status'));
    try {
      const result = await Promise.race([
        client.auth.signInWithPassword({ email: $('#login-email').value, password: $('#login-password').value }),
        new Promise((_, reject) => window.setTimeout(() => reject(new Error('Supabase did not respond. Check your internet connection and project URL.')), 12000))
      ]);
      if (result.error) { showStatus(result.error.message, $('#login-status')); return; }
      showAdmin(result.data.user);
    } catch (error) {
      showStatus(error.message || 'Unable to sign in. Check the Supabase connection.', $('#login-status'));
    } finally {
      button.disabled = false;
      button.textContent = 'Sign in';
    }
  });
  function showAdmin(user) { authScreen.hidden = true; adminApp.hidden = false; authScreen.style.display = 'none'; adminApp.style.display = 'flex'; $('#user-email').textContent = user.email || 'Admin'; setSection(state.section); load(); }
  function showLogin() { authScreen.hidden = false; adminApp.hidden = true; authScreen.style.display = 'grid'; adminApp.style.display = 'none'; }
  $('#logout-button').addEventListener('click', async () => { await client.auth.signOut(); showLogin(); });
  document.querySelectorAll('[data-language]').forEach((tab) => tab.addEventListener('click', () => setLanguage(tab.dataset.language)));
  document.querySelectorAll('.group-tab').forEach((tab) => tab.addEventListener('click', () => setSection(tab.dataset.section)));
  document.querySelectorAll('.sidebar-nav a[href*="group.html"]').forEach((link) => link.addEventListener('click', (event) => {
    event.preventDefault();
    const section = new URL(link.href, window.location.href).searchParams.get('section') || 'story';
    history.replaceState({}, '', 'group.html?section=' + section);
    setSection(section);
  }));
  $('#add-milestone').addEventListener('click', () => { state.story[state.language].milestones.push({ year: '', text: '' }); render(); });
  $('#add-leader').addEventListener('click', () => { const index = state.leaders.en.length; state.leaders.en.push({ language:'en', sort_order:index, name:'', role:'', bio:'', image_path:null, classification:'board' }); state.leaders.zh.push({ language:'zh', sort_order:index, name:'', role:'', bio:'', image_path:null, classification:'board' }); render(); });
  $('#save-button').addEventListener('click', () => save().catch((error) => showStatus('Save failed: ' + error.message)));
  $('#reset-button').addEventListener('click', () => load().catch((error) => showStatus('Reset failed: ' + error.message)));
  let sessionShown = false;
  function restoreSession(session) {
    if (session && !sessionShown) { sessionShown = true; showAdmin(session.user); }
  }
  client.auth.onAuthStateChange((_event, session) => restoreSession(session));
  client.auth.getSession().then(({ data }) => { if (data.session) restoreSession(data.session); else showLogin(); }).catch((error) => showStatus(error.message || 'Unable to check the Supabase session.', loginStatus));
})();
