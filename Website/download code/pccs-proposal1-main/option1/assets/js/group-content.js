(function () {
  'use strict';
  if (!window.supabase || !window.PCCS_SUPABASE_URL || !document.querySelector('[data-leadership-component]')) return;
  const client = window.supabase.createClient(window.PCCS_SUPABASE_URL, window.PCCS_SUPABASE_ANON_KEY);
  const language = document.documentElement.lang === 'zh-CN' ? 'zh' : 'en';
  const hasStory = Boolean(document.querySelector('.story-sec'));
  Promise.all([
    hasStory ? client.from('pccs_group_story').select('*').eq('language', language).eq('published', true).maybeSingle() : Promise.resolve({ data: null, error: null }),
    client.from('pccs_group_leaders').select('*').eq('language', language).eq('published', true).order('sort_order')
  ]).then(([storyResult, leadersResult]) => {
    if (leadersResult.error || (hasStory && (storyResult.error || !storyResult.data))) return;
    const story = storyResult.data;
    if (story) {
      const kicker = document.querySelector('.story-kicker');
      if (kicker) kicker.textContent = story.kicker;
      const headers = document.querySelectorAll('.timeline thead th');
      if (headers[0]) headers[0].textContent = story.year_label;
      if (headers[1]) headers[1].textContent = story.milestone_label;
      const body = document.querySelector('.timeline tbody');
      if (body && Array.isArray(story.milestones)) {
        body.replaceChildren(...story.milestones.map((item, index) => {
          const row = document.createElement('tr');
          if (index === story.milestones.length - 1) row.className = 'tl-today';
          const year = document.createElement('td'); year.textContent = item.year || '';
          const milestone = document.createElement('td'); milestone.className = 'tl-en'; milestone.textContent = item.text || '';
          row.append(year, milestone); return row;
        }));
      }
      const leadershipKicker = document.querySelector('.leadership-kicker');
      const leadershipIntro = document.querySelector('.leadership-intro');
      if (story.leadership_kicker && leadershipKicker) leadershipKicker.textContent = story.leadership_kicker;
      if (story.leadership_intro && leadershipIntro) leadershipIntro.textContent = story.leadership_intro;
    }
    const leaders = leadersResult.data || [];
    const grid = document.querySelector('.leaders-grid');
    let cards = [...document.querySelectorAll('.leader-card')];
    cards.slice(leaders.length).forEach((card) => card.remove());
    if (grid) {
      leaders.slice(cards.length).forEach((leader) => {
        const card = document.createElement('button');
        card.className = 'leader-card'; card.type = 'button'; card.setAttribute('role', 'listitem');
        card.innerHTML = '<span class="leader-photo"><img alt=""></span><span class="leader-card-body"><span class="leader-card-name"></span><span class="leader-card-role"></span></span>';
        grid.appendChild(card); cards.push(card);
      });
    }
    cards.forEach((card, index) => {
      const leader = leaders[index]; if (!leader) return;
      card.dataset.leaderName = leader.name; card.dataset.leaderRole = leader.role; card.dataset.leaderBio = leader.bio;
      if (leader.image_path) card.dataset.leaderImage = leader.image_path;
      const name = card.querySelector('.leader-card-name'); const role = card.querySelector('.leader-card-role'); const image = card.querySelector('img');
      if (name) name.textContent = leader.name; if (role) role.textContent = leader.role; if (image) { image.alt = leader.name; if (leader.image_path) image.src = leader.image_path; }
    });
    const modal = document.querySelector('[data-leader-modal]');
    const modalImage = modal?.querySelector('[data-leader-modal-image]');
    const modalName = modal?.querySelector('[data-leader-modal-name]');
    const modalRole = modal?.querySelector('[data-leader-modal-role]');
    const modalBio = modal?.querySelector('[data-leader-modal-bio]');
    const modalClose = modal?.querySelector('[data-leader-close]');
    cards.slice(8).forEach((card) => card.addEventListener('click', () => {
      if (!modal) return;
      modalImage.src = card.dataset.leaderImage || ''; modalImage.alt = card.dataset.leaderName || '';
      modalName.textContent = card.dataset.leaderName || ''; modalRole.textContent = card.dataset.leaderRole || ''; modalBio.textContent = card.dataset.leaderBio || '';
      modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); document.documentElement.classList.add('leader-modal-open'); modalClose?.focus();
    }));
    const count = document.querySelector('.leaders-count'); if (count && leaders.length) count.textContent = leaders.length + (language === 'zh' ? ' 位董事' : ' profiles');
  }).catch(function () { /* Static HTML remains the fallback. */ });
}());
