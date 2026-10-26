(function () {
  'use strict';
  if (!window.supabase || !window.PCCS_SUPABASE_URL) return;
  const client = window.supabase.createClient(window.PCCS_SUPABASE_URL, window.PCCS_SUPABASE_ANON_KEY);
  Promise.all([
    client.from('pccs_investor_documents_shared').select('category').eq('published', true),
    client.from('pccs_faq').select('id', { count: 'exact', head: true }),
    client.from('pccs_group_story').select('language, milestones'),
    client.from('pccs_group_leaders').select('language, id'),
    client.from('pccs_career_jobs').select('id', { count: 'exact', head: true }).eq('status', 'published')
  ]).then(([investors, faq, stories, leaders, careers]) => {
    const data = investors.data;
    const counts = { annual: 0, quarterly: 0, governance: 0, agm: 0 };
    (data || []).forEach((row) => { if (counts[row.category] !== undefined) counts[row.category] += 1; });
    document.querySelectorAll('[data-investor-count]').forEach((node) => { node.textContent = counts[node.dataset.investorCount]; });
    const total = document.querySelector('[data-investor-total]');
    if (total) total.textContent = Object.values(counts).reduce((sum, count) => sum + count, 0);
    const home = document.querySelector('[data-home-count]');
    if (home) home.textContent = faq.count || 0;
    const story = (stories.data || []).find((row) => row.language === 'en');
    const storyCount = Array.isArray(story?.milestones) ? story.milestones.length : 0;
    const leadershipCount = (leaders.data || []).filter((row) => row.language === 'en').length;
    document.querySelectorAll('[data-group-count="story"]').forEach((node) => { node.textContent = storyCount; });
    document.querySelectorAll('[data-group-count="leadership"]').forEach((node) => { node.textContent = leadershipCount; });
    const groupTotal = document.querySelector('[data-group-total]');
    if (groupTotal) groupTotal.textContent = 2;
    const careerTotal = document.querySelector('[data-career-total]');
    if (careerTotal) careerTotal.textContent = careers.count || 0;
  });
}());
