(function () {
  'use strict';

  const dataUrl = '../content/home-faq.json';
  const storageKey = 'pccs-home-faq-draft-v1';
  const state = { data: { en: [], zh: [] }, language: 'en' };
  const list = document.querySelector('#faq-list');
  const empty = document.querySelector('#empty-state');
  const status = document.querySelector('#status');
  const heading = document.querySelector('#language-heading');

  function showStatus(message) {
    status.textContent = message;
    window.clearTimeout(showStatus.timer);
    showStatus.timer = window.setTimeout(() => { status.textContent = ''; }, 3500);
  }

  function saveDraft() {
    localStorage.setItem(storageKey, JSON.stringify(state.data));
    showStatus('Draft saved in this browser.');
  }

  function render() {
    const items = state.data[state.language] || [];
    heading.textContent = state.language === 'zh' ? '中文问题' : 'English questions';
    list.replaceChildren();
    empty.hidden = items.length > 0;

    items.forEach((item, index) => {
      const card = document.createElement('article');
      card.className = 'faq-card';

      const questionField = field('Question', item.question, 'input');
      const answerField = field('Answer', item.answer, 'textarea');
      const actions = document.createElement('div');
      actions.className = 'card-actions';
      actions.append(
        actionButton('↑', 'Move up', () => move(index, -1), index === 0),
        actionButton('↓', 'Move down', () => move(index, 1), index === items.length - 1),
        actionButton('×', 'Delete question', () => remove(index), false, true)
      );

      questionField.control.addEventListener('input', (event) => { item.question = event.target.value; });
      answerField.control.addEventListener('input', (event) => { item.answer = event.target.value; });
      card.append(questionField.wrapper, answerField.wrapper, actions);
      list.appendChild(card);
    });
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
    saveDraft();
  }

  function remove(index) {
    state.data[state.language].splice(index, 1);
    render();
    saveDraft();
  }

  function add() {
    state.data[state.language].push({
      question: state.language === 'zh' ? '新问题' : 'New question',
      answer: state.language === 'zh' ? '请输入答案。' : 'Enter the answer.'
    });
    render();
    saveDraft();
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

  function reset() {
    localStorage.removeItem(storageKey);
    loadData();
  }

  function loadData() {
    fetch(dataUrl)
      .then((response) => {
        if (!response.ok) throw new Error('FAQ data request failed');
        return response.json();
      })
      .then((data) => {
        const draft = localStorage.getItem(storageKey);
        state.data = draft ? JSON.parse(draft) : data;
        render();
        showStatus(draft ? 'Draft restored from this browser.' : 'FAQ content loaded.');
      })
      .catch(() => showStatus('Unable to load FAQ data. Open this page through a local web server.'));
  }

  document.querySelectorAll('[data-language]').forEach((tab) => {
    tab.addEventListener('click', () => {
      state.language = tab.dataset.language;
      document.querySelectorAll('[data-language]').forEach((item) => {
        const active = item === tab;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', String(active));
      });
      render();
    });
  });

  document.querySelector('#add-button').addEventListener('click', add);
  document.querySelector('#save-button').addEventListener('click', saveDraft);
  document.querySelector('#export-button').addEventListener('click', exportJson);
  document.querySelector('#reset-button').addEventListener('click', reset);
  loadData();
})();
