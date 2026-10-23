/* =====================================================================
   Engineering page — hero load animation + chain drag rail + scroll reveal
   All animations respect prefers-reduced-motion via CSS (transition:none)
   and via JS guard below.
   ===================================================================== */
(function () {
  'use strict';

  /* ── prefers-reduced-motion guard ── */
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Scroll reveal ── */
  if ('IntersectionObserver' in window && !reducedMotion) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    document.querySelectorAll('.rv').forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    /* Fallback: show everything */
    document.querySelectorAll('.rv').forEach(function (el) {
      el.classList.add('in');
    });
  }

  /* ── Chain drag rail ── */
  var overflow = document.getElementById('chainRailOverflow');
  var rail = document.getElementById('chainRail');
  var prevBtn = document.getElementById('chainPrev');
  var nextBtn = document.getElementById('chainNext');
  var progressFill = document.getElementById('chainProgressFill');
  var progressBar = document.getElementById('chainProgressBar');

  if (!overflow || !rail || !prevBtn || !nextBtn) return;

  var isDragging = false;
  var startX = 0;
  var scrollStart = 0;
  var CARD_STEP = 0; /* computed below */
  var currentOffset = 0;
  var maxOffset = 0;

  function getCardStep() {
    var first = rail.querySelector('.chain-card');
    if (!first) return 280;
    return first.offsetWidth + 16; /* card width + gap */
  }

  function getMaxOffset() {
    return Math.max(0, rail.scrollWidth - overflow.offsetWidth);
  }

  function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  function applyOffset(offset, animate) {
    maxOffset = getMaxOffset();
    offset = clamp(offset, 0, maxOffset);
    currentOffset = offset;
    rail.style.transition = animate ? 'transform .5s cubic-bezier(.22,.61,.36,1)' : 'none';
    rail.style.transform = 'translateX(' + (-offset) + 'px)';
    updateControls();
  }

  function updateControls() {
    maxOffset = getMaxOffset();
    prevBtn.disabled = currentOffset <= 0;
    nextBtn.disabled = currentOffset >= maxOffset;
    var pct = maxOffset > 0 ? (currentOffset / maxOffset) * 100 : 0;
    progressFill.style.width = pct + '%';
    if (progressBar) {
      progressBar.setAttribute('aria-valuenow', Math.round(pct));
    }
  }

  /* Pointer / mouse drag */
  overflow.addEventListener('pointerdown', function (e) {
    isDragging = true;
    startX = e.clientX;
    scrollStart = currentOffset;
    overflow.classList.add('grabbing');
    overflow.setPointerCapture(e.pointerId);
  });

  overflow.addEventListener('pointermove', function (e) {
    if (!isDragging) return;
    var delta = startX - e.clientX;
    applyOffset(scrollStart + delta, false);
  });

  function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    overflow.classList.remove('grabbing');
    /* Snap to nearest card */
    CARD_STEP = getCardStep();
    var snapped = Math.round(currentOffset / CARD_STEP) * CARD_STEP;
    applyOffset(snapped, true);
  }

  overflow.addEventListener('pointerup', endDrag);
  overflow.addEventListener('pointercancel', endDrag);

  /* Touch passthrough (for mobile momentum feel) */
  overflow.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
    scrollStart = currentOffset;
  }, { passive: true });

  overflow.addEventListener('touchmove', function (e) {
    var delta = startX - e.touches[0].clientX;
    applyOffset(scrollStart + delta, false);
  }, { passive: true });

  overflow.addEventListener('touchend', endDrag);

  /* Arrow button navigation */
  prevBtn.addEventListener('click', function () {
    CARD_STEP = getCardStep();
    applyOffset(currentOffset - CARD_STEP * 3, true);
  });

  nextBtn.addEventListener('click', function () {
    CARD_STEP = getCardStep();
    applyOffset(currentOffset + CARD_STEP * 3, true);
  });

  /* Keyboard navigation on the overflow container */
  overflow.addEventListener('keydown', function (e) {
    CARD_STEP = getCardStep();
    if (e.key === 'ArrowRight') { applyOffset(currentOffset + CARD_STEP, true); e.preventDefault(); }
    if (e.key === 'ArrowLeft')  { applyOffset(currentOffset - CARD_STEP, true); e.preventDefault(); }
    if (e.key === 'Home')       { applyOffset(0, true); e.preventDefault(); }
    if (e.key === 'End')        { applyOffset(getMaxOffset(), true); e.preventDefault(); }
  });

  /* Prevent link/click fire after drag */
  overflow.addEventListener('click', function (e) {
    if (Math.abs(currentOffset - scrollStart) > 4) {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  /* Resize recalc */
  window.addEventListener('resize', function () {
    applyOffset(currentOffset, false);
  });

  /* Init */
  updateControls();

})();
