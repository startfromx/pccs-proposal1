(function () {
  'use strict';

  const grid = document.querySelector('[data-faq-grid]');
  if (!grid) return;

  const lang = document.documentElement.lang === 'zh-CN' ? 'zh' : 'en';
  const source = 'content/home-faq.json';

  const fallback = () => fetch(source)
    .then((response) => {
      if (!response.ok) throw new Error('FAQ data request failed');
      return response.json();
    })
    .then((data) => render(data[lang] || data.en));

  function render(items) {
    const fragment = document.createDocumentFragment();

    items.forEach((item) => {
      const details = document.createElement('details');
      details.className = 'faq-item';

      const summary = document.createElement('summary');
      summary.textContent = item.question;

      const answer = document.createElement('div');
      answer.className = 'faq-answer';
      answer.appendChild(document.createTextNode(item.answer));

      if (item.email) {
        answer.textContent = '';
        answer.appendChild(document.createTextNode(item.answer.replace(item.email, '')));
        const link = document.createElement('a');
        link.href = 'mailto:' + item.email;
        link.textContent = item.email;
        answer.appendChild(link);
        answer.appendChild(document.createTextNode('。'));
      }

      details.append(summary, answer);
      fragment.appendChild(details);
    });

    grid.replaceChildren(fragment);
  }

  const useSupabase = window.supabase && window.PCCS_SUPABASE_URL && window.PCCS_SUPABASE_ANON_KEY;

  if (!useSupabase) {
    fallback().catch(() => {
      // Keep the server-rendered FAQ as a graceful fallback when opened offline.
    });
    return;
  }

  const client = window.supabase.createClient(
    window.PCCS_SUPABASE_URL,
    window.PCCS_SUPABASE_ANON_KEY
  );

  client
    .from('pccs_faq')
    .select('question, answer, email, sort_order, published')
    .eq('language', lang)
    .eq('published', true)
    .order('sort_order', { ascending: true })
    .then(({ data, error }) => {
      if (error || !data || data.length === 0) throw error || new Error('No published FAQ rows');
      render(data);
    })
    .catch(() => fallback().catch(() => {
      // Keep the server-rendered FAQ as a graceful fallback when both sources fail.
    }));
})();
