  /* ============ GLOBAL NAV INJECTION ============
     Single source of truth for nav + mobile menu.
     Auto-detects root (index.html) vs pages/ subpages.
     To add/change a nav item, edit only this block.
  ============================================== */
  (function(){
    var loc  = window.location.pathname;
    var file = loc.split('/').pop() || 'index.html';
    var englishFile = file.replace(/-cn\.html$/, '.html');
    var sub  = loc.indexOf('/pages/') !== -1;
    var r    = sub ? '../' : '';          // prefix to reach site root
    var p    = sub ? '' : 'pages/';      // prefix to reach pages/
    var isCnPage = /-cn\.html$/.test(file);
    var home = r + (isCnPage ? 'index-cn.html' : 'index.html');
    var langEn = sub ? englishFile : 'index.html';
    var langCn = sub ? englishFile.replace(/\.html$/, '-cn.html') : 'index-cn.html';
    var contact = sub ? home + '#contact' : '#' + 'contact';
    var story   = home;
    var page = function(name) { return p + (isCnPage ? name.replace(/\.html$/, '-cn.html') : name); };
    var storyCurrent = (!sub && (file === 'index.html' || file === 'index-cn.html')) ? ' aria-current="page"' : '';

    function lnk(href, key, match) {
      return '<a href="' + href + '" data-t="' + key + '"' +
             (match && englishFile === match ? ' aria-current="page"' : '') + '></a>';
    }

    var nav =
      '<nav id="siteNav"><div class="nav-in">' +
        '<a class="nav-logo" href="' + home + '"><img src="' + r + 'images/PCCS_logo.svg" alt="PCCS Group"></a>' +
        '<div class="nav-links">' +
          '<a href="' + story + '" data-t="nav.story"' + storyCurrent + '></a>' +
          lnk(page('engineering.html'),   'nav.whatwedo',      'engineering.html') +
          lnk(page('our-work.html'),      'nav.ourwork',       'our-work.html') +
          lnk(page('group.html'),         'nav.ourgroup',      'group.html') +
          lnk(page('sustainability.html'),'nav.sustainability', 'sustainability.html') +
          lnk(page('investors.html'),     'nav.investors',     'investors.html') +
          lnk(page('careers.html'),       'nav.careers',       'careers.html') +
          '<span class="lang">' +
            '<a class="lang-btn" data-lang="en" href="' + langEn + '">EN</a>&nbsp;·&nbsp;' +
            '<a class="lang-btn" data-lang="cn" href="' + langCn + '">中文</a>' +
          '</span>' +
          '<a class="nav-cta" href="' + contact + '" data-t="nav.contact"></a>' +
        '</div>' +
        '<button class="nav-menu-toggle" id="menuToggle" type="button" aria-expanded="false" aria-controls="mobileMenu">' +
          '<span data-t="nav.menu"></span><span class="menu-symbol" aria-hidden="true">+</span>' +
        '</button>' +
      '</div></nav>' +
      '<div class="mobile-menu" id="mobileMenu" aria-hidden="true"><div class="mobile-menu-inner">' +
        '<div class="mobile-menu-links">' +
          '<a href="' + story + '" data-t="nav.story"' + storyCurrent + '></a>' +
          lnk(page('engineering.html'), 'nav.whatwedo', 'engineering.html') +
          lnk(page('our-work.html'), 'nav.ourwork', 'our-work.html') +
          lnk(page('group.html'), 'nav.ourgroup', 'group.html') +
          lnk(page('sustainability.html'), 'nav.sustainability', 'sustainability.html') +
          lnk(page('investors.html'), 'nav.investors', 'investors.html') +
          lnk(page('careers.html'), 'nav.careers', 'careers.html') +
          '<a href="' + contact + '" data-t="nav.contact"></a>' +
        '</div>' +
        '<div class="mobile-menu-foot">' +
          '<span>Engineering Future</span>' +
          '<span>' +
            '<a class="lang-btn" data-lang="en" href="' + langEn + '">EN</a> · ' +
            '<a class="lang-btn" data-lang="cn" href="' + langCn + '">中文</a>' +
          '</span>' +
        '</div>' +
      '</div></div>';

    document.body.insertAdjacentHTML('afterbegin', nav);
  })();

  /* ============ HOME ENTRY POSITION ============
     The browser can restore the last scroll position when a page is opened
     again. A logo click is a Home-page entry, so Home must always begin at
     the hero. Hash links such as Story keep their intended anchor position.
  ============================================== */
  (function(){
    var path = window.location.pathname;
    var isHome = /(?:^|\/)index(?:-cn)?\.html$/.test(path) || /\/$/.test(path);
    if (!isHome) return;

    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';

    function resetHomePosition(){
      if (!window.location.hash) window.scrollTo(0, 0);
    }

    window.addEventListener('pageshow', resetHomePosition);
    window.addEventListener('load', resetHomePosition);
  })();

  /* ============ GLOBAL FOOTER INJECTION ============
     The Home footer is the single footer template for every page.
  ============================================== */
  (function(){
    var sub = window.location.pathname.indexOf('/pages/') !== -1;
    var r = sub ? '../' : '';
    var p = sub ? '' : 'pages/';
    var file = window.location.pathname.split('/').pop() || 'index.html';
    var isCnPage = /-cn\.html$/.test(file);
    var englishFile = file.replace(/-cn\.html$/, '.html');
    var home = r + (isCnPage ? 'index-cn.html' : 'index.html');
    var page = function(name) { return p + (isCnPage ? name.replace(/\.html$/, '-cn.html') : name); };
    var story = home;
    var contact = sub ? home + '#contact' : '#contact';
    var footer =
      '<footer class="foot" id="contact">' +
        '<div class="foot-wrap">' +
          '<div class="foot-top"><div><div class="foot-logo"><img src="' + r + 'images/PCCS_logo.svg" alt="PCCS Group"></div><div class="foot-belief" data-t="foot.belief">Engineering Future</div></div>' +
          '<div class="foot-nav">' +
            '<a href="' + story + '" data-t="foot.nav.story">Story</a>' +
            '<a href="' + page('engineering.html') + '" data-t="foot.nav.whatwedo">What We Do</a>' +
            '<a href="' + page('our-work.html') + '" data-t="foot.nav.ourwork">Our Work</a>' +
            '<a href="' + page('group.html') + '" data-t="foot.nav.ourgroup">Our Group</a>' +
            '<a href="' + page('investors.html') + '" data-t="foot.nav.investors">Investors <span class="ar">↗</span></a>' +
            '<a href="' + page('careers.html') + '" data-t="foot.nav.careers">Careers</a>' +
            '<a href="' + contact + '" data-t="foot.nav.contact">Contact</a>' +
          '</div></div>' +
          '<div class="foot-lower"><div><div class="foot-desc" data-t="foot.desc">The trusted hand behind the world’s top brands. For fifty years we’ve designed, decorated and delivered the marks worth wearing with pride.</div><div class="foot-social"><span>✉  @pccs-group-berhad-pccs</span><span>in  linkedin.com/company/pccs-group-berhad-pccs</span></div></div>' +
          '<div class="foot-lower-right"><div class="foot-col"><h4 data-t="foot.h4.company">Company</h4><a href="' + story + '" data-t="foot.link.story">Story</a><a href="' + page('engineering.html') + '" data-t="foot.link.whatwedo">What We Do</a><a href="' + page('our-work.html') + '" data-t="foot.link.ourwork">Our Work</a><a href="' + page('group.html') + '" data-t="foot.link.ourgroup">Our Group</a><a href="' + page('group.html') + '#footprint" data-t="foot.link.footprint">Global Footprint</a></div>' +
          '<div class="foot-col"><h4 data-t="foot.h4.stakeholders">Stakeholders</h4><a href="' + page('investors.html') + '" data-t="foot.link.investors">Investors</a><a href="' + page('careers.html') + '" data-t="foot.link.careers">Careers</a><a href="' + page('sustainability.html') + '" data-t="foot.link.sustainability">Sustainability</a><a href="#" data-t="foot.link.newsroom">Newsroom</a></div>' +
          '<div class="foot-col"><h4 data-t="foot.h4.contact">Contact</h4><a href="' + contact + '" data-t="foot.link.hq">Kuala Lumpur HQ</a><a href="mailto:enquiry@pccsgroup.net">enquiry@pccsgroup.net</a><span class="foot-lang"><a class="lang-btn" data-lang="en" href="' + (sub ? englishFile : 'index.html') + '">EN</a> · <a class="lang-btn" data-lang="cn" href="' + (sub ? englishFile.replace(/\.html$/, '-cn.html') : 'index-cn.html') + '">中文</a></span></div></div></div>' +
          '<div class="foot-bottom"><span data-t="foot.copyright">© 2026 PCCS Group Berhad (Bursa: 6068). All rights reserved.</span><span data-t="foot.proposal">Proposal by Startfrom X Sdn Bhd. Design mockup — for internal review only.</span></div>' +
        '</div>' +
      '</footer>';
    document.body.insertAdjacentHTML('beforeend', footer);
  })();

  /* ============ FAVICON ============ */
  (function(){
    var icon = document.querySelector('link[rel="icon"]') || document.createElement('link');
    icon.rel = 'icon';
    icon.type = 'image/svg+xml';
    icon.href = new URL('../../images/PCCS_logo.svg', document.currentScript.src).href;
    if (!icon.parentNode) document.head.appendChild(icon);
  })();

  /* ============ i18n ============ */
  const DEFAULT_LANG = 'en';

  const T = {
    en: {
      'nav.story': 'Story',
      'nav.whatwedo': 'What We Do',
      'nav.ourwork': 'Our Work',
      'nav.ourgroup': 'Our Group',
      'nav.sustainability': 'Sustainability',
      'nav.investors': 'Investors',
      'nav.careers': 'Careers',
      'nav.contact': 'Contact',
      'nav.menu': 'Menu',

      'hero.eyebrow': 'PCCS Group',
      'hero.line1': 'Engineering',
      'hero.line2': '<span class="g">Future</span>',
      'hero.subline': 'The world wears our work.',
      'news.tag': 'The Engineering',
      'news.headline': 'Your concept. Our engineering.',
      'hero.foot1': 'PCCS Group  ·  Est. 1973  ·  Bursa 6068',
      'hero.foot2': 'Design  ·  Craft  ·  Delivery',

      'belief.body': 'Behind the brands people wear is a chain of ideas, details and delivery. From the kit on the pitch to the label inside the collar, we help turn concepts into products people can trust.',
      'belief.btn': 'The Engineering <span>→</span>',

      'badge.eyebrow': 'The Mark',
      'badge.h2': 'You own the badge.<br>We make it worthy of it.',
      'badge.quote': '<span class="w">A badge has to survive years of wear and fifty washes</span> <span class="g">without cracking, lifting or fading.</span>',
      'badge.cite': 'Engineering, not decoration',
      'badge.body1': 'A logo has to survive years of wear and fifty washes without cracking, lifting, or losing its edge. That’s engineering, not decoration.',
      'badge.body2': 'Anyone can cut cloth. The official crest is entrusted only to a maker who meets the brand’s standards — that’s us.',

      'wtd.eyebrow': 'The Engineering',
      'wtd.h2': 'You bring the concept.<br>We engineer everything after it.',
      'wtd.btn': 'The full Engineering <span>→</span>',
      'wtd1.title': 'Development',
      'wtd1.body': 'An idea isn’t a product until it’s engineered. We turn your brief, sketch, or reference into a technical package a factory can build and samples you can approve.',
      'wtd2.title': 'Material / Fabric',
      'wtd2.body': 'Performance starts at the yarn. Stretch, wicking, weight, durability — every property is decided in the fabric, before a panel is cut.',
      'wtd3.title': 'Make & Quality',
      'wtd3.body': 'Quality isn’t a final inspection — it’s built in from the cut. We check inline, during production, and before shipment.',

      'nums.eyebrow': 'The Engineering — a preview',
      'nums.h2': 'Measured. Proven.<br>Built to last.',
      'nums.stat1': 'patents',
      'nums.stat2': 'R&amp;D staff',
      'nums.stat3': 'styles / yr',
      'nums.stat4': 'samples / yr',

      'sus.eyebrow': 'Sustainability',
      'sus.h2': '<span class="line">Made responsibly.</span><span class="line g">Measured honestly.</span>',
      'sus.body': 'PCCS has reported sustainability since FY2018, to Bursa Malaysia’s standard. The numbers are audited, not aspirational.',
      'sus.stat1': 'tCO₂e GHG',
      'sus.stat2': 'GJ energy',
      'sus.stat3': 'kWh renewable solar',
      'sus.focus': 'Focus areas',
      'sus.focus1': 'Ethical Business',
      'sus.focus2': 'Environmental Sustainability',
      'sus.focus3': 'Social Stability',
      'sus.focus4': 'Reporting & Metrics',
      'sus.cert': 'Frameworks & certifications: GRS · RCS · OEKO-TEX · ZDHC · Higg FEM · WRAP Gold 2025 · Cambodia Green Industry Awards 2025 (Silver).',
      'sus.note': 'Community examples and milestone actions: NEEDS PCCS INPUT',

      'grp.eyebrow': 'One system — “Engineering Future”',
      'grp.h2': 'One discipline.<br>Many futures.',
      'grp1.tag': 'Engineering Apparel',
      'grp1.title': 'Technical sportswear',
      'grp1.body': 'From fibre to the mark — engineered, developed, prototyped, crafted, verified, manufactured, and delivered.',
      'grp2.tag': 'Engineering Health',
      'grp2.title': 'La Prima Medical',
      'grp2.body': 'Medical devices and healthcare technologies, developed for better care across Asia-Pacific.',
      'grp3.tag': 'Finance',
      'grp3.title': 'EZFY',
      'grp3.body': 'A simpler way to access auto, personal and medical equipment financing, with insurance support.',

      'inv.eyebrow': 'Investors',
      'inv.h2': 'We own more of the chain<br><span class="g">than the market pays for.</span>',
      'inv.body': 'PCCS manufactures technical sportswear for the world’s biggest brands — and increasingly owns the higher-value parts of the chain: development, the mark, and now fabric. This expanding capability gives PCCS a clear path from cut-and-sew manufacturing to a broader product and materials platform.',
      'inv.btn': 'Investor Relations <span>→</span>',
      'snap.title': 'NEEDS PCCS INPUT',
      'snap.tick': 'PCCS Group Berhad <b>6068</b>',
      'snap.lab1': 'Day’s High',
      'snap.lab2': 'Day’s Low',
      'snap.lab3': 'Day’s Volume',
      'snap.lab4': 'Last Updated',

      'career.eyebrow': 'Careers',
      'career.h2': 'Come engineer what<br>the world wears.',
      'career.body': 'The world’s biggest sports brands are made here — by the people who cut, knit, print, sew, test and ship them. That’s not factory work. That’s engineering, at the scale of millions.',
      'career.btn': 'Explore Careers <span>→</span>',

      'foot.belief': 'Engineering Future',
      'foot.nav.story': 'Story',
      'foot.nav.whatwedo': 'What We Do',
      'foot.nav.ourwork': 'Our Work',
      'foot.nav.ourgroup': 'Our Group',
      'foot.nav.investors': 'Investors <span class="ar">↗</span>',
      'foot.nav.careers': 'Careers',
      'foot.nav.contact': 'Contact',
      'foot.desc': 'The trusted hand behind the world’s top brands. For fifty years we’ve designed, decorated and delivered the marks worth wearing with pride.',
      'foot.h4.company': 'Company',
      'foot.h4.stakeholders': 'Stakeholders',
      'foot.h4.contact': 'Contact',
      'foot.link.story': 'Story',
      'foot.link.whatwedo': 'What We Do',
      'foot.link.ourwork': 'Our Work',
      'foot.link.ourgroup': 'Our Group',
      'foot.link.footprint': 'Global Footprint',
      'foot.link.investors': 'Investors',
      'foot.link.careers': 'Careers',
      'foot.link.sustainability': 'Sustainability',
      'foot.link.newsroom': 'Newsroom',
      'foot.link.hq': 'Kuala Lumpur HQ',
      'foot.copyright': '© 2026 PCCS Group Berhad (Bursa: 6068). All rights reserved.',
      'foot.proposal': 'Proposal by Startfrom X Sdn Bhd. Design mockup — for internal review only.',
    }
  };

  // CN — full Simplified Chinese copy (2026-07-09). Untranslated keys fall back to T.en.
  T.cn = Object.assign({}, T.en, {
    'nav.story': '品牌故事',
    'nav.whatwedo': '核心业务',
    'nav.ourwork': '合作案例',
    'nav.ourgroup': '集团架构',
    'nav.sustainability': '永续未来',
    'nav.investors': '投资者关系',
    'nav.careers': '加入我们',
    'nav.contact': '联系我们',
    'nav.menu': '菜单',

    'hero.eyebrow': 'PCCS集团',
    'hero.line1': '以工程，',
    'hero.line2': '<span class="g">创造可能</span>',
    'hero.subline': '世界穿着我们的作品。',
    'news.tag': '工程能力',
    'news.headline': '你的概念。我们的工程能力。',
    'hero.foot1': 'PCCS集团 · 创立于1973年 · 马交所代码 6068',
    'hero.foot2': '设计 · 精工 · 交付',

    'belief.body': '人们所穿的品牌背后，是由创意、细节与交付组成的完整链路。从球场上的球衣到领口里的标签，我们帮助客户将概念转化为值得信赖的产品。',
    'belief.btn': '工程能力 <span>→</span>',

    'badge.eyebrow': '标识工艺',
    'badge.h2': '你赋予徽章意义，<br>我们赋予它品质。',
    'badge.quote': '<span class="w">一枚徽章，须经得起长年穿着与五十次洗涤，</span> <span class="g">不开裂、不翘边、不褪色。</span>',
    'badge.cite': '这是工程，不是装饰',
    'badge.body1': '一枚标识，最见真章。一个标志须经得起长年穿着与五十次洗涤，不开裂、不翘边、不褪色。这是工程，而非装饰。',
    'badge.body2': '裁布人人皆可，官方队徽却只托付给达到品牌标准的制造者——而这份资格，属于我们。',

    'wtd.eyebrow': '工程能力',
    'wtd.h2': '你负责构想，<br>技术实现交给我们。',
    'wtd.btn': '完整工程能力 <span>→</span>',
    'wtd1.title': '产品开发',
    'wtd1.body': '好点子，只有变成可量产的技术方案，才算真正的好产品。我们将需求、草图或参考转化为工厂可投产的技术流程，以及供你审定的实物样品。',
    'wtd2.title': '材料选型',
    'wtd2.body': '性能，始于纱线。弹力、吸湿、克重、耐用——每项性能都在面料中定型，早于第一片衣片的裁剪。',
    'wtd3.title': '制造与质量',
    'wtd3.body': '质量并非最后一道检验，而是从裁剪起就融入每一道工序。我们于产线在线检验、生产途中抽检、出货之前终检。',

    'nums.eyebrow': '工程能力预览',
    'nums.h2': '量过，证过，<br>经得起时间。',
    'nums.stat1': '专利',
    'nums.stat2': '研发人员',
    'nums.stat3': '款 / 年',
    'nums.stat4': '样品 / 年',

    'sus.eyebrow': '永续未来',
    'sus.h2': '<span class="line">说到做到。</span><span class="line g">数字为证。</span>',
    'sus.body': '从 FY2018 起，PCCS 就按大马交易所的标准做可持续报告。数字是审过的，不是喊出来的。',
    'sus.stat1': '吨 CO₂e 温室气体',
    'sus.stat2': '吉焦能源',
    'sus.stat3': '千瓦时可再生太阳能',
    'sus.focus': '四大焦点',
    'sus.focus1': '商业道德',
    'sus.focus2': '环境可持续',
    'sus.focus3': '社会稳定',
    'sus.focus4': '报告与指标',
    'sus.cert': '框架与认证：GRS · RCS · OEKO-TEX · ZDHC · Higg FEM · 柬埔寨 Better Factories · WRAP 金奖 2025 · 柬埔寨绿色工业奖 2025（银奖）。',
    'sus.note': '社区案例与里程碑实际行动：NEEDS PCCS INPUT',

    'grp.eyebrow': '一套体系 ——「以工程，创造可能」',
    'grp.h2': '一门专业，<br>多种未来。',
    'grp1.tag': '每一件，皆以工程铸就',
    'grp1.title': '科技运动服',
    'grp1.body': '从纤维到标识，一手包办——设计、研发、打样、制作、验证、生产与交付。',
    'grp2.tag': '以专业，护生命',
    'grp2.title': 'La Prima 医疗',
    'grp2.body': '专注医疗器械与健康科技，为亚太地区带来更好的医疗方案。',
    'grp3.tag': '金融',
    'grp3.title': 'EZFY',
    'grp3.body': '让信贷更简单，提供汽车、个人及医疗设备融资与保险服务。',

    'inv.eyebrow': '投资者',
    'inv.h2': '这条产业链，我们握得<br><span class="g">比股价更长。</span>',
    'inv.body': 'PCCS 为全球最大的品牌制造技术运动服——并正逐步掌握产业链中更具价值的环节：开发、标识，如今还有面料。随着能力边界不断拓展，PCCS 正从裁剪缝纫制造商，走向更完整的产品与材料平台。',
    'inv.btn': '投资者关系 <span>→</span>',
    'snap.title': 'NEEDS PCCS INPUT',
    'snap.lab1': '当前股价',
    'snap.lab2': '财务数据',
    'snap.lab3': '实时数据接入',
    'snap.lab4': '发布审批',

    'career.eyebrow': '人才招聘',
    'career.h2': '来吧，让世界<br>穿上你的作品。',
    'career.body': '全球最大的运动品牌，就在这里铸就出来——由那些裁剪、织造、印花、缝制、测试和发货的人。那不是工厂活，那是工程，以百万计的规模。',
    'career.btn': '探索职业机会 <span>→</span>',

    'foot.belief': '以工程，创造可能',
    'foot.nav.story': '品牌故事',
    'foot.nav.whatwedo': '核心业务',
    'foot.nav.ourwork': '合作案例',
    'foot.nav.ourgroup': '集团架构',
    'foot.nav.investors': '投资者关系 <span class="ar">↗</span>',
    'foot.nav.careers': '加入我们',
    'foot.nav.contact': '联系我们',
    'foot.desc': '全球顶级品牌信赖的幕后之手。五十年来，我们设计、装饰、交付那些值得被骄傲穿上的标志。',
    'foot.h4.company': '公司',
    'foot.h4.stakeholders': '利益相关方',
    'foot.h4.contact': '联系方式',
    'foot.link.story': '品牌故事',
    'foot.link.whatwedo': '核心业务',
    'foot.link.ourwork': '合作案例',
    'foot.link.ourgroup': '集团架构',
    'foot.link.footprint': '全球布局',
    'foot.link.investors': '投资者关系',
    'foot.link.careers': '加入我们',
    'foot.link.sustainability': '可持续发展',
    'foot.link.newsroom': '新闻中心',
    'foot.link.hq': '吉隆坡总部',
    'foot.copyright': '© 2026 PCCS Group Berhad（马交所代码：6068）。保留所有权利。',
  });

  function setLang(lang) {
    var dict = T[lang] || T.en;
    document.querySelectorAll('[data-t]').forEach(function(el) {
      var key = el.getAttribute('data-t');
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    try { localStorage.setItem('pccs-lang', lang); } catch(e) {}
    document.documentElement.lang = lang === 'cn' ? 'zh-CN' : 'en';
  }

  // init language
  (function(){
    var stored = null;
    try { stored = localStorage.getItem('pccs-lang'); } catch(e) {}
    var currentFile = window.location.pathname.split('/').pop() || 'index.html';
    var pageLang = document.documentElement.getAttribute('data-lang') || (/-cn\.html$/.test(currentFile) ? 'cn' : 'en');
    setLang(pageLang || stored || DEFAULT_LANG);

    document.addEventListener('click', function(e) {
      var btn = e.target.closest('.lang-btn');
      if (btn) {
        if (!btn.getAttribute('href')) {
          e.preventDefault();
          setLang(btn.getAttribute('data-lang'));
        }
      }
    });
  })();

  /* ============ CHINESE PAGE COPY ============
     Chinese pages have their own HTML files. This small page layer translates
     the page-specific headings that are not part of the shared dictionary.
  ============================================== */
  (function(){
    function html(sel, value) {
      var el = document.querySelector(sel);
      if (el) el.innerHTML = value;
    }
    function textAll(sel, values) {
      document.querySelectorAll(sel).forEach(function(el, i) {
        if (values[i] !== undefined) el.textContent = values[i];
      });
    }
    if (document.documentElement.getAttribute('lang') === 'en') {
      if (document.querySelector('.ow-hero')) {
        html('.ow-eyebrow', 'Our Work');
        html('.ow-badge-kicker', 'The Badge');
        html('.ow-sectors-kicker', 'Sectors We Serve');
        html('.ow-how-kicker', 'How We Work');
        html('.ow-manifesto-kicker', 'Engineering Future');
        textAll('.ow-stat-l', ['Indoor sports apparel vendor','Countries shipped to','Patents held','Manufacturing countries']);
      }
      if (document.querySelector('.grp-hero')) {
        html('.grp-hero-eyebrow', 'PCCS Group');
        html('.grp-hero-card-label', 'The Group');
        html('.manifesto-kicker', 'The Manifesto');
        html('.onesys-kicker', 'One system');
        html('.story-kicker', 'Our Story');
        html('.footprint-kicker', 'Global Footprint');
        html('.leadership-kicker', 'Leadership');
        html('.values-kicker', 'Our Values');
        html('.values-intro', 'Our values spell our name.');
        textAll('.values-name', ['Passion','Care','Commitment','Sustainability']);
        textAll('.values-desc', ['We solve what others just supply.','We leave nothing to chance.','We hold the standard, order after order.','We build without costing tomorrow.']);
      }
      if (document.querySelector('.inv-hero')) {
        html('.inv-kicker', 'Equity Story');
        html('.inv-hero-kicker', 'Investors · Bursa Malaysia 6068');
      }
      if (document.querySelector('.careers-page')) document.title = 'Careers at PCCS';
      return;
    }
    if (document.documentElement.getAttribute('lang') !== 'zh-CN') return;
    function htmlAll(sel, values) {
      document.querySelectorAll(sel).forEach(function(el, i) {
        if (values[i] !== undefined) el.innerHTML = values[i];
      });
    }

    if (document.body.classList.contains('engineering-page')) {
      document.title = '工程能力 · PCCS Group';
      html('.eng-hero-kicker', '工程能力');
      html('.eng-hero-h1', '<span class="line">你的概念。</span><span class="line"><span class="accent">我们的工程能力。</span></span>');
      html('.eng-hero-lead', '你的概念，是一切的起点。真正的挑战，在于把它转化为百万件成品：有品牌、有技术、能承受五十次洗涤。面料、版型、标识，缺一不可。这条链，PCCS 自有的环节正越来越精。');
      if (document.querySelector('.eng-hero-lead')) document.querySelector('.eng-hero-lead').style.fontSize = 'clamp(15px,1.35vw,22px)';
      html('.eng-chain-header .sec-k', '全链路');
      html('.eng-chain-header .sec-h2', '从概念到交付，<br>PCCS 工程化掌控全链路。');
      textAll('.chain-card-name', ['概念与需求','设计与技术规格','面料开发','纸样与样品','标识与辅料','测试与合规','生产与质检','后整与交付']);
      textAll('.chain-card-tag', ['客户负责','已工程化','已开发','已打样','已制作','已验证','已生产','已交付']);
      textAll('.eng-pill', ['100+ 名研发人员','每年 3,000+ 款样品','每年 340+ 个 3D 纸样','覆盖 30+ 个国家','约 1,500 吨面料 / 月','GRS','RCS','OEKO-TEX','ZDHC','Higg FEM','越南面料厂扩建中','50+ 项专利','刺绣','印花','热升华','无缝工艺','官方队徽','在生产一线 50 年','10+ 个生产基地','360+ 条生产线','每月约 470 万件成衣']);
      textAll('.eng-subsec-kicker', ['产品开发','材料选型','工程未来','标识工艺','制造与质量','后整与交付']);
      htmlAll('.eng-subsec-h2', ['好点子，只有变成<br>可量产的技术方案。','性能，<br>始于纱线。','这条链的强度，<br>取决于最薄弱的一环。','一枚标识，须经得起<br>长年穿着与五十次洗涤。','质量并非最后一道<br>检验，而是从裁剪起就融入。','零售即用，<br>准时交付。']);
      html('.eng-statement-body', '这正是 PCCS 不断扩大自主掌控环节的原因——我们多掌控一个环节，你的品牌就少承担一份风险。');
      html('.eng-explore-grid .eng-explore-card:nth-child(1) .eng-explore-h3', '我们的作品');
      html('.eng-explore-grid .eng-explore-card:nth-child(1) .eng-explore-p', '那些响亮的名字，背后都是我们。足球、运动、生活方式——五十年来，我们一直在制造别人引以为傲的产品。');
      html('.eng-explore-grid .eng-explore-card:nth-child(1) .pill-btn', '查看我们的作品 <span>&rarr;</span>');
      html('.eng-explore-grid .eng-explore-card:nth-child(2) .eng-explore-h3', '永续未来');
      html('.eng-explore-grid .eng-explore-card:nth-child(2) .eng-explore-p', '说到做到，数字为证。自 FY2018 起，按照 Bursa 标准持续报告。');
      html('.eng-explore-grid .eng-explore-card:nth-child(2) .pill-btn', '查看我们的承诺 <span>&rarr;</span>');
      html('.eng-explore-grid .eng-explore-card:nth-child(3) .eng-explore-h3', '加入我们');
      html('.eng-explore-grid .eng-explore-card:nth-child(3) .eng-explore-p', '参与创造世界所穿的产品。无论身处哪个岗位，你的每个决定都是工程。');
      html('.eng-explore-grid .eng-explore-card:nth-child(3) .pill-btn', '查看职位 <span>&rarr;</span>');
    }

    if (document.body.classList.contains('page-document') && document.querySelector('.ow-hero')) {
      document.title = '我们的作品 · PCCS Group';
      html('.ow-eyebrow', '我们的作品');
      html('.ow-hero-h1', '<span class="line">我们的作品。</span><span class="line g">成就他们的品牌。</span>');
      html('.ow-hero-sub', '五十年来，PCCS 为全球顶尖品牌制造专业运动服。他们的名字印在产品上，我们的标准融入产品中。这就是我们的工作。');
      html('.ow-hero-statline', '<span>室内运动服供应商排名前三</span><span class="sep" aria-hidden="true">·</span><span>覆盖 30+ 个国家</span><span class="sep" aria-hidden="true">·</span><span>50+ 项专利</span><span class="sep" aria-hidden="true">·</span><span>四个生产国</span>');
      html('.ow-belief-quote', '他们的名字印在产品上。<br><em>我们的标准融入产品中。</em>');
      html('.ow-badge-h2', '你赋予徽章意义。<br>我们赋予它品质。');
      html('.ow-badge-glass-quote', '一枚徽章，须经得起长年穿着与五十次洗涤，不开裂、不翘边、不褪色。这是工程，不是装饰。');
      textAll('.ow-badge-item h3', ['这是工程，不是装饰','官方队徽，交给值得信赖的人','把标识工艺做成一门生意']);
      textAll('.ow-stat-l', ['室内运动服供应商排名前三','出口至 30 多个国家与地区','拥有 50 多项专利','四个生产国']);
      html('.ow-sectors-kicker', '业务领域');
      html('.ow-sectors-h2', '我们的作品，<br>遍布每个角落。');
      html('.ow-how-kicker', '协作方式');
      html('.ow-how-h2', '带着问题来找我们，<br>不只是带着规格。');
      html('.ow-how-p', '多数制造商等待一份完整的技术规格；而在 PCCS，你只需说清楚想实现什么性能、什么产量、什么交期，如何落地，由我们攻克。');
      html('.ow-how .pill-btn', '了解工程能力 <span>&rarr;</span>');
      html('.ow-manifesto-h2', '五十年的验证。<br>融入每一针每一线。');
      html('.ow-manifesto-sub', '如果你的下一件产品需要规模化的精准制造，我们已经准备了五十年。欢迎与我们谈谈。');
      html('.ow-manifesto-btns .pill-btn-light', '了解工程能力 <span>&rarr;</span>');
    }

    if (document.body.classList.contains('page-document') && document.querySelector('.grp-hero')) {
      document.title = 'PCCS 集团 · PCCS Group';
      html('.grp-hero-eyebrow', 'PCCS 集团');
      html('.grp-hero-h1', '<span class="line"><span class="line-inner">一套体系。</span></span><span class="line"><span class="line-inner"><em>创造无限未来。</em></span></span>');
      html('.grp-hero-card-label', '关于集团');
      html('.grp-hero-foot', '<span>PCCS 集团 · 创立于 1973 年 · Bursa 6068</span><span>热忱 · 关怀 · 担当 · 永续</span>');
      html('.manifesto-kicker', '企业宣言');
      html('.manifesto-h2', '有些企业追逐未来。<br>我们，工程化创造未来。');
      html('.onesys-kicker', '一套体系');
      html('.onesys-h2', '以工程，<br><em>创造可能。</em>');
      html('.proof-statement', '五十年。<br><em>工程化积淀，</em><br>不是偶然继承。');
      html('.story-kicker', '我们的故事');
      html('.story-h2', '从三台缝纫机，<br>走到世界的球场。');
      html('.footprint-kicker', '全球布局');
      html('.footprint-h2', '业务遍布<br>六个地区。');
      html('.leadership-kicker', '领导层');
      html('.leadership-h2', '懂制造的人掌舵。');
      html('.values-kicker', '我们的价值观');
      html('.values-intro', '我们的价值观，拼出我们的名字。');
      html('.group-cta-h2', '工程能力，<br>远不止于布料。');
      html('.group-cta-sub', '探索 PCCS 背后的业务、数据与机会。');
      textAll('.values-name', ['热忱','关怀','担当','永续']);
      textAll('.values-desc', ['我们解决问题，而非仅仅供货。','我们不留任何侥幸。','一单接一单，守住标准。','建设，但不花掉明天。']);
      html('.values-vision', '愿景 —— 一家让每位利益相关者都安心的永续企业集团。<br>使命 —— 为更美好的世界而投资。');
      textAll('.onesys-card h3', ['工程服装','工程医疗','金融 —— EZFY','酒店 · 餐饮']);
      textAll('.proof-num-l', ['项专利','名研发人员','每年款数','每年样品']);
      textAll('.timeline th', ['年份','里程碑','里程碑']);
      textAll('.footprint-role', ['制造 · 设计','制造 · 装饰工艺','制造 · 面料厂','总部 · 市场 · 医疗 · 金融','金融枢纽','医疗 —— La Prima Medicare']);
      textAll('.footprint-detail', ['苏州 · 山东 · 江苏东周 · 上海设计研发中心','Wan He Da · Dong Du · Thirty Three','平顺服装 · 面料厂扩建中','总部 · 市场 · 医疗 · 金融；峇株巴辖，柔佛','金融枢纽','医疗 —— La Prima Medicare']);
      document.querySelectorAll('.group-cta-pills .pill-btn').forEach(function(el, i) {
        var labels = ['工程能力','我们的作品','永续未来','投资者关系','加入我们'];
        if (labels[i]) el.innerHTML = labels[i] + ' <span>→</span>';
      });
    }

    if (document.body.classList.contains('page-document') && document.querySelector('.inv-hero')) {
      document.title = '投资者关系 · PCCS Group';
      html('.inv-hero-kicker', '投资者关系 · Bursa Malaysia 6068');
      html('.inv-hero-h1', '<span class="line">掌控更多。</span><span class="line"><span class="accent">创造价值。</span></span>');
      html('.inv-hero-sub', 'PCCS 正从成衣制造商，成长为掌控开发、标识与面料的综合平台。我们拥有的价值链越完整，业务的长期潜力越清晰。');
      if (document.querySelector('.inv-hero-sub')) document.querySelector('.inv-hero-sub').style.fontSize = 'clamp(14px,1.15vw,19px)';
      html('.inv-kicker', '股权故事');
      html('.inv-thesis-pull', '从成衣制造，<br>走向<span class="accent">综合平台。</span>');
      html('.inv-fin-headline', '量过。<br>证过。<br><span class="accent">经得起时间。</span>');
      textAll('.inv-thesis-body > p:not(.zh-tag)', ['PCCS 起初是一家成衣代工企业。五十年来，我们持续向价值链上游延伸：先加入装饰工艺，再拓展产品开发，最终进入面料。每增加一个环节，客户就少一项需要外包的工作。','市场仍将 PCCS 视为成衣制造商，但我们的业务正在成为掌控开发、装饰与面料的综合平台。市场定价与企业实际掌控价值之间的差距，正是投资故事所在。']);
      html('.inv-contact-intro', '想了解 PCCS 的下一步？<br><span class="accent">欢迎联系投资者关系团队。</span>');
      textAll('.inv-chain-label', ['步骤','状态']);
    }

    if (document.body.classList.contains('sustainability-page')) {
      document.title = '永续未来 · PCCS Group';
      html('.sustainability-hero .eyebrow', '永续未来');
      html('.sustainability-hero h1', '<span class="line">说到做到。</span><span class="line g">数字为证。</span>');
      html('.belief-copy p', '永续，不只是我们衡量的事情。更是我们回馈的行动。');
      textAll('.sec-k', ['报告指标','重点领域','社区案例与里程碑行动','超越生产线']);
      html('.giving-back-heading', '回馈社会。');
    }

    if (document.body.classList.contains('careers-page')) {
      document.title = '加入 PCCS · PCCS Group';
    }
  })();

  /* ============ ORIGINAL JS ============ */
  const stage = document.getElementById('heroStage');
  const siteHeroes = Array.prototype.slice.call(document.querySelectorAll('.site-hero:not(#heroStage)'));
  const nav = document.getElementById('siteNav');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  function setMenu(open){
    nav.classList.toggle('menu-open', open);
    mobileMenu.classList.toggle('open', open);
    mobileMenu.setAttribute('aria-hidden', String(!open));
    menuToggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  }

  menuToggle.addEventListener('click', function(){
    setMenu(!nav.classList.contains('menu-open'));
  });
  mobileMenu.addEventListener('click', function(e){
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && nav.classList.contains('menu-open')) setMenu(false);
  });

  // set the nav's full-width start value precisely, so the pill shrink is a smooth px->px transition
  function setNavFull(){
    const padX = innerWidth <= 900 ? 22 : 80;
    document.documentElement.style.setProperty('--nav-full', (innerWidth - padX * 2) + 'px');
  }
  setNavFull();
  addEventListener('resize', function(){
    setNavFull();
    if (innerWidth > 900 && nav.classList.contains('menu-open')) setMenu(false);
  });

  window.addEventListener('load', () => {
    setTimeout(() => {
      if (stage) stage.classList.add('expanded');
      siteHeroes.forEach(hero => hero.classList.add('hero-expanded'));
      setTimeout(() => nav.classList.add('nav-visible'), 550);
    }, 250);
  });

  let lastY = 0;
  addEventListener('scroll', () => {
    const y = scrollY;
    if (y > 80) nav.classList.add('nav-scrolled');
    else if (y < 40) nav.classList.remove('nav-scrolled');

    if (y > 600) {
      if (y > lastY) nav.classList.add('nav-hidden');
      else nav.classList.remove('nav-hidden');
    } else {
      nav.classList.remove('nav-hidden');
    }
    lastY = y;
  }, {passive:true});

  // ---- scroll-driven parallax (zoom + downward drift) on tagged images ----
  (function(){
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const items = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]')).map(function(img){
      const parts = img.dataset.parallax.split(',').map(Number); // base, max, drift%
      const box = img.closest('.badge-image, .hero-frame, .site-hero, .careers-media') || img.parentElement;
      return { img: img, box: box, base: parts[0], max: parts[1], drift: parts[2] };
    });
    if (!items.length) return;
    let ticking = false;

    function update(){
      const vh = innerHeight;
      items.forEach(function(it){
        const r = it.box.getBoundingClientRect();
        let p = (vh - r.top) / (vh + r.height);   // 0 entering -> 1 leaving
        p = Math.max(0, Math.min(1, p));
        const scale = (it.base + p * it.max).toFixed(4);
        const ty = ((p - 0.5) * it.drift).toFixed(2);
        it.img.style.transform = 'translateY(' + ty + '%) scale(' + scale + ')';
      });
      ticking = false;
    }
    function onScroll(){ if (!ticking){ ticking = true; requestAnimationFrame(update); } }
    addEventListener('scroll', onScroll, {passive:true});
    addEventListener('resize', onScroll, {passive:true});
    update();
  })();

  // ---- global fade-up reveal on scroll (all images + text below the hero) ----
  (function(){
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sel = '.belief-copy, .badge-head, .badge-image, .badge-copy-col > p,'
      + '.wtd-head, .wtd-card, .nums-head, .num-cell, .grp-head, .grp-card,'
      + '.inv-head, .inv-copy, .snap, .careers-head, .careers-media,'
      + '.foot-top, .foot-lower, .foot-bottom, .logo-row';
    const els = Array.prototype.slice.call(document.querySelectorAll(sel));
    els.forEach(el => el.classList.add('rv'));
    // stagger children within grids
    document.querySelectorAll('.wtd-grid, .nums-grid, .grp-grid').forEach(grid => {
      Array.prototype.slice.call(grid.children).forEach((c, i) => c.style.setProperty('--d', (i * 0.1) + 's'));
    });
    if (reduce){ els.forEach(el => el.classList.add('in')); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(el => io.observe(el));
  })();

  // ---- count-up on the stats when scrolled into view ----
  (function(){
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        const el = e.target, to = +el.dataset.to, dur = 1500, t0 = performance.now();
        (function tick(t){
          const p = Math.min((t - t0) / dur, 1);
          el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * to).toLocaleString('en-US');
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold: 0.6 });
    document.querySelectorAll('.nv[data-to]').forEach(el => io.observe(el));
  })();

  // ---- sustainability community examples slider ----
  (function(){
    const track = document.querySelector('[data-community-track]');
    const prev = document.querySelector('[data-community-prev]');
    const next = document.querySelector('[data-community-next]');
    const count = document.querySelector('[data-community-count]');
    if (!track || !prev || !next) return;
    const cards = Array.prototype.slice.call(track.children);
    function step(){
      const card = cards[0];
      if (!card) return 0;
      return card.getBoundingClientRect().width + 24;
    }
    function updateCount(){
      if (!count) return;
      const index = Math.min(cards.length - 1, Math.round(track.scrollLeft / Math.max(step(), 1)));
      count.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(cards.length).padStart(2, '0');
    }
    prev.addEventListener('click', function(){ track.scrollBy({left:-step(), behavior:'smooth'}); });
    next.addEventListener('click', function(){ track.scrollBy({left:step(), behavior:'smooth'}); });
    track.addEventListener('scroll', updateCount, {passive:true});
    addEventListener('resize', updateCount, {passive:true});
    updateCount();
  })();
