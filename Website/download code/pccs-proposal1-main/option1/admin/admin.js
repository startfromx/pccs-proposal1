(function () {
  'use strict';

  const supabase = window.supabase.createClient(window.PCCS_SUPABASE_URL, window.PCCS_SUPABASE_ANON_KEY);
  const dataUrl = new URL('../content/home-faq.json', document.currentScript.src).href;
  const state = { data: { en: [], zh: [] }, language: 'en' };
  const authScreen = document.querySelector('#auth-screen');
  const adminApp = document.querySelector('#admin-app');
  const loginForm = document.querySelector('#login-form');
  const loginStatus = document.querySelector('#login-status');
  const list = document.querySelector('#faq-list');
  const empty = document.querySelector('#empty-state');
  const status = document.querySelector('#status');
  const heading = document.querySelector('#language-heading');

  function showStatus(message, target = status) {
    target.textContent = message;
    window.clearTimeout(target._timer);
    target._timer = window.setTimeout(() => { target.textContent = ''; }, 4000);
  }

  function buttonFeedback(button, workingLabel, successLabel, action) {
    const originalLabel = button.textContent;
    button.disabled = true;
    button.textContent = workingLabel;
    return Promise.resolve()
      .then(action)
      .then(() => {
        button.textContent = successLabel;
        window.setTimeout(() => {
          button.disabled = false;
          button.textContent = originalLabel;
        }, 1400);
      })
      .catch((error) => {
        button.disabled = false;
        button.textContent = originalLabel;
        throw error;
      });
  }

  function showAdmin(user) {
    authScreen.hidden = true;
    adminApp.hidden = false;
    authScreen.style.display = 'none';
    adminApp.style.display = 'flex';
    document.querySelector('#user-email').textContent = user.email || 'Admin';
    loadRemoteData();
  }

  function showLogin() {
    authScreen.hidden = false;
    adminApp.hidden = true;
    authScreen.style.display = 'grid';
    adminApp.style.display = 'none';
  }

  async function loadRemoteData() {
    const { data, error } = await supabase
      .from('pccs_faq')
      .select('id, language, question, answer, email, sort_order, published')
      .order('sort_order', { ascending: true });

    if (!error && data && data.length) {
      state.data = { en: [], zh: [] };
      data.forEach((item) => state.data[item.language].push(item));
      render();
      showStatus('FAQ content loaded from Supabase.');
      return;
    }

    if (error) {
      showStatus('Unable to load Supabase data: ' + error.message);
      return;
    }

    try {
      const response = await fetch(dataUrl);
      state.data = await response.json();
      render();
      showStatus('Supabase is empty. Showing local FAQ copy; save to import it.');
    } catch (loadError) {
      showStatus('Unable to load FAQ data.');
    }
  }

  async function saveRemote() {
    const rows = ['en', 'zh'].flatMap((language) => (state.data[language] || []).map((item, index) => ({
      ...(item.id ? { id: item.id } : {}),
      language,
      question: item.question.trim(),
      answer: item.answer.trim(),
      email: item.email || null,
      sort_order: index,
      published: item.published !== false
    })));

    const { data: existing, error: readError } = await supabase.from('pccs_faq').select('id');
    if (readError) throw readError;
    const keepIds = new Set(rows.filter((row) => row.id).map((row) => row.id));
    const deleted = (existing || []).filter((row) => !keepIds.has(row.id)).map((row) => row.id);
    if (deleted.length) {
      const { error } = await supabase.from('pccs_faq').delete().in('id', deleted);
      if (error) throw error;
    }
    const existingRows = rows.filter((row) => row.id);
    const newRows = rows
      .filter((row) => !row.id)
      .map(({ id, ...row }) => row);
    const savedRows = [];

    if (existingRows.length) {
      const { data, error } = await supabase
        .from('pccs_faq')
        .upsert(existingRows, { onConflict: 'id' })
        .select();
      if (error) throw error;
      savedRows.push(...(data || []));
    }

    if (newRows.length) {
      const { data, error } = await supabase
        .from('pccs_faq')
        .insert(newRows)
        .select();
      if (error) throw error;
      savedRows.push(...(data || []));
    }

    state.data = { en: [], zh: [] };
    savedRows
      .sort((a, b) => a.sort_order - b.sort_order)
      .forEach((item) => state.data[item.language].push(item));
    render();
    showStatus('Saved to Supabase.');
  }

  function render() {
    let entries;
    if (state.language === 'all') {
      const english = state.data.en || [];
      const chinese = state.data.zh || [];
      const pairCount = Math.max(english.length, chinese.length);
      entries = [];
      for (let index = 0; index < pairCount; index += 1) {
        if (english[index]) entries.push({ item: english[index], language: 'en' });
        if (chinese[index]) entries.push({ item: chinese[index], language: 'zh' });
      }
    } else {
      entries = (state.data[state.language] || []).map((item) => ({ item, language: state.language }));
    }
    heading.textContent = state.language === 'zh'
      ? '中文问题'
      : state.language === 'all'
        ? 'English + Chinese questions'
        : 'English questions';
    list.replaceChildren();
    empty.hidden = entries.length > 0;

    entries.forEach(({ item, language }, index) => {
      const card = document.createElement('article');
      card.className = 'faq-card';
      if (state.language === 'all') {
        const languageTag = document.createElement('span');
        languageTag.className = 'language-tag';
        languageTag.textContent = language === 'zh' ? '中文' : 'English';
        card.appendChild(languageTag);
      }
      const questionField = field('Question', item.question, 'input');
      const answerField = field('Answer', item.answer, 'textarea');
      const actions = document.createElement('div');
      actions.className = 'card-actions';
      if (state.language !== 'all') {
        const items = state.data[state.language] || [];
        actions.append(
          actionButton('↑', 'Move up', () => move(index, -1), index === 0),
          actionButton('↓', 'Move down', () => move(index, 1), index === items.length - 1),
          actionButton('×', 'Delete question', () => remove(index), false, true)
        );
      }
      questionField.control.addEventListener('input', (event) => { item.question = event.target.value; });
      answerField.control.addEventListener('input', (event) => {
        item.answer = event.target.value;
        resizeTextarea(event.target);
      });
      card.append(questionField.wrapper, answerField.wrapper, actions);
      list.appendChild(card);
      resizeTextarea(answerField.control);
    });
  }

  function resizeTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  function field(labelText, value, type) {
    const wrapper = document.createElement('div');
    wrapper.className = 'field';
    const label = document.createElement('label');
    label.textContent = labelText;
    const control = document.createElement(type);
    control.value = value || '';
    wrapper.append(label, control);
    return { wrapper, control };
  }

  function actionButton(text, label, onClick, disabled, danger) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'icon-button' + (danger ? ' delete' : '');
    button.textContent = text;
    button.title = label;
    button.setAttribute('aria-label', label);
    button.disabled = disabled;
    button.addEventListener('click', onClick);
    return button;
  }

  function move(index, direction) {
    const items = state.data[state.language];
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    [items[index], items[target]] = [items[target], items[index]];
    render();
    showStatus('Order updated. Click Save to Supabase to keep it.');
  }

  function remove(index) {
    state.data[state.language].splice(index, 1);
    render();
    showStatus('Question removed. Click Save to Supabase to keep it.');
  }

  function add() {
    if (state.language === 'all') {
      showStatus('Choose English or 中文 before adding a question.');
      return;
    }
    const item = {
      question: state.language === 'zh' ? '新问题' : 'New question',
      answer: state.language === 'zh' ? '请输入答案。' : 'Enter the answer.'
    };
    state.data[state.language].push(item);
    render();
    const firstField = list.lastElementChild && list.lastElementChild.querySelector('input');
    if (firstField) {
      firstField.focus();
      firstField.select();
    }
    showStatus('New question added. Fill it in, then click Save to Supabase.');
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(state.data, null, 2) + '\n'], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'home-faq.json';
    link.click();
    URL.revokeObjectURL(link.href);
    showStatus('JSON exported.');
  }

  document.querySelectorAll('[data-language]').forEach((tab) => {
    tab.addEventListener('click', () => {
      state.language = tab.dataset.language;
      document.querySelectorAll('[data-language]').forEach((item) => {
        const active = item === tab;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', String(active));
      });
      document.querySelector('#add-button').disabled = state.language === 'all';
      render();
    });
  });

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = loginForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Signing in…';
    showStatus('Signing in…', loginStatus);
    try {
      const result = await Promise.race([
        supabase.auth.signInWithPassword({
          email: document.querySelector('#login-email').value,
          password: document.querySelector('#login-password').value
        }),
        new Promise((_, reject) => window.setTimeout(() => reject(new Error('Supabase did not respond. Check your internet connection and project URL.')), 12000))
      ]);
      if (result.error) {
        showStatus(result.error.message, loginStatus);
        return;
      }
      showAdmin(result.data.user);
    } catch (error) {
      showStatus(error.message, loginStatus);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Sign in';
    }
  });

  document.querySelector('#logout-button').addEventListener('click', async () => {
    await supabase.auth.signOut();
    showLogin();
  });
  document.querySelector('#add-button').addEventListener('click', () => {
    const button = document.querySelector('#add-button');
    buttonFeedback(button, 'Adding…', 'Added!', add);
  });
  document.querySelector('#save-button').addEventListener('click', () => {
    const button = document.querySelector('#save-button');
    buttonFeedback(button, 'Saving…', 'Saved!', saveRemote)
      .catch((error) => showStatus('Save failed: ' + error.message));
  });
  document.querySelector('#export-button').addEventListener('click', () => {
    const button = document.querySelector('#export-button');
    buttonFeedback(button, 'Exporting…', 'Exported!', exportJson)
      .catch((error) => showStatus('Export failed: ' + error.message));
  });
  document.querySelector('#reset-button').addEventListener('click', () => {
    const button = document.querySelector('#reset-button');
    buttonFeedback(button, 'Loading…', 'Reset!', loadRemoteData)
      .catch((error) => showStatus('Reset failed: ' + error.message));
  });

  supabase.auth.getSession().then(({ data }) => {
    if (data.session) showAdmin(data.session.user);
    else showLogin();
  });
})();
