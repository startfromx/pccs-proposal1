(function () {
  'use strict';

  var root = document.querySelector('[data-leadership-component]');
  if (!root) return;

  var bios = window.PCCS_LEADER_BIOS || {};
  var leaders = [
    ['Piong Yew Peng', 'Senior Independent Non-Executive Chairman', 'piong-yew-peng.jpg'],
    ['Chan Wee Kiang', 'Group Managing Director', 'chan-wee-kiang.jpg'],
    ['Chan Wee Boon', 'Executive Director', 'chan-wee-boon.jpg'],
    ['Chan Chow Tek', 'Non-Independent Non-Executive Director', 'chan-chow-tek.jpg'],
    ['Dato’ Chan Chor Ngiak', 'Non-Independent Non-Executive Director', 'chan-chor-ngiak.jpg'],
    ['Chan Chor Ang', 'Non-Independent Non-Executive Director', 'chan-chor-ang.jpg'],
    ['Joyce Wong Ai May', 'Independent Non-Executive Director', 'joyce-wong-ai-may.jpg'],
    ['Tang Lai Huat', 'Corporate Controller', 'tang-lai-huat.jpg']
  ];

  var cards = leaders.map(function (leader) {
    var name = leader[0];
    var role = leader[1];
    var image = '../images/group/leaders/' + leader[2];
    var bio = bios[name] || 'PCCS Group leadership profile.';
    return '<button class="leader-card" type="button" role="listitem"' +
      ' data-leader-image="' + image + '"' +
      ' data-leader-name="' + name.replace(/&/g, '&amp;') + '"' +
      ' data-leader-role="' + role + '"' +
      ' data-leader-bio="' + bio.replace(/&/g, '&amp;').replace(/"/g, '&quot;') + '">' +
      '<span class="leader-photo"><img src="' + image + '" alt="' + name + '"></span>' +
      '<span class="leader-card-body"><span class="leader-card-name">' + name + '</span>' +
      '<span class="leader-card-role">' + role + '</span></span></button>';
  }).join('');

  root.innerHTML =
    '<div class="leadership-wrap">' +
      '<div class="leadership-head rv-g">' +
        '<div class="leadership-kicker">Leadership</div>' +
        '<h2 class="leadership-h2" id="leadership-h2">The people behind<br>the decisions.</h2>' +
        '<p class="leadership-intro">Eight directors. One standard of care, accountability and long-term judgment.</p>' +
      '</div>' +
      '<div class="leaders-meta rv-g" style="--d:.08s"><span class="leaders-filter">Board of Directors</span><span class="leaders-count">8 profiles</span></div>' +
      '<div class="leaders-grid rv-g" style="--d:.1s" role="list">' + cards + '</div>' +
      '<div class="leader-modal" data-leader-modal aria-hidden="true">' +
        '<div class="leader-modal-panel" role="dialog" aria-modal="true" aria-labelledby="leader-modal-name">' +
          '<button class="leader-modal-close" type="button" data-leader-close aria-label="Close">&times;</button>' +
          '<div class="leader-modal-top" aria-hidden="true"><span>Board of Directors</span><span class="leader-modal-company">PCCS Group Berhad</span></div>' +
          '<h3 class="leader-modal-name" id="leader-modal-name" data-leader-modal-name></h3>' +
          '<div class="leader-modal-photo"><img data-leader-modal-image src="" alt=""></div>' +
          '<div class="leader-modal-copy"><div class="leader-modal-kicker">Board of Directors</div>' +
            '<div class="leader-modal-role" data-leader-modal-role></div>' +
            '<p class="leader-modal-bio" data-leader-modal-bio></p></div>' +
        '</div>' +
      '</div>' +
    '</div>';

  var modal = root.querySelector('[data-leader-modal]');
  var image = modal.querySelector('[data-leader-modal-image]');
  var name = modal.querySelector('[data-leader-modal-name]');
  var role = modal.querySelector('[data-leader-modal-role]');
  var bio = modal.querySelector('[data-leader-modal-bio]');
  var close = modal.querySelector('[data-leader-close]');
  var lastCard = null;

  function open(card) {
    lastCard = card;
    image.src = card.dataset.leaderImage;
    image.alt = card.dataset.leaderName;
    name.textContent = card.dataset.leaderName;
    role.textContent = card.dataset.leaderRole;
    bio.textContent = card.dataset.leaderBio;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('leader-modal-open');
    close.focus();
  }

  function dismiss() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('leader-modal-open');
    if (lastCard) lastCard.focus();
  }

  root.querySelectorAll('.leader-card').forEach(function (card) {
    card.addEventListener('click', function () { open(card); });
  });
  close.addEventListener('click', dismiss);
  modal.addEventListener('click', function (event) {
    if (event.target === modal) dismiss();
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) dismiss();
  });
}());
