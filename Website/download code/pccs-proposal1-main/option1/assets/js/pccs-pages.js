(function(){
  var icon = document.querySelector('link[rel="icon"]') || document.createElement('link');
  icon.rel = 'icon';
  icon.type = 'image/svg+xml';
  icon.href = new URL('../../images/PCCS_logo.svg', document.currentScript.src).href;
  if (!icon.parentNode) document.head.appendChild(icon);

  var toggle = document.querySelector('[data-page-menu-toggle]');
  var menu = document.querySelector('[data-page-menu]');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', function(){
    var open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  menu.addEventListener('click', function(event){
    if (event.target.closest('a')) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();
