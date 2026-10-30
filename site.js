(() => {
  'use strict';
  const root = document.documentElement;
  root.classList.add('js');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const openLinkedDetail = () => {
    let id;
    try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
    if (!id) return;
    const detail = document.getElementById(id)?.closest('details');
    if (detail) detail.open = true;
  };
  openLinkedDetail();
  window.addEventListener('hashchange', openLinkedDetail);
  const header = document.querySelector('.site-header');
  const updateHeader = () => { header.dataset.scrolled = String(window.scrollY > 35); };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  const closeMenu = (restoreFocus = false) => {
    toggle.setAttribute('aria-expanded', 'false');
    nav.dataset.open = 'false';
    document.body.classList.remove('menu-is-open');
    if (restoreFocus) toggle.focus();
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.dataset.open = String(open);
    document.body.classList.toggle('menu-is-open', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
    if (event.key === 'Tab' && toggle.getAttribute('aria-expanded') === 'true') {
      const links = [...nav.querySelectorAll('a')];
      const first = toggle, last = links[links.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  window.matchMedia('(min-width: 761px)').addEventListener('change', e => { if (e.matches) closeMenu(); });

  if ('IntersectionObserver' in window) {
    const reveals = document.querySelectorAll('.reveal');
    if (!reducedMotion.matches) {
      const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }), { threshold: 0.08, rootMargin: '0px 0px -25px 0px' });
      reveals.forEach(el => {
        if (el.getBoundingClientRect().top > window.innerHeight * 0.9) el.classList.add('will-reveal');
        observer.observe(el);
      });
    }
  }

  const steps = [...document.querySelectorAll('[data-story-step]')];
  const storyLinks = [...document.querySelectorAll('[data-story-link]')];
  const views = [...document.querySelectorAll('[data-case-view]')];
  let activeStep = -1;
  function activateStep(index) {
    if (index === activeStep) return;
    activeStep = index;
    steps.forEach((step, i) => step.classList.toggle('active', i === index));
    views.forEach((view, i) => { view.hidden = i !== index; });
    storyLinks.forEach((link, i) => {
      link.classList.toggle('active', i === index);
      if (i === index) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    });
  }
  activateStep(0);
  let queued = false;
  function syncStory() {
    queued = false;
    if (window.matchMedia('(max-width: 760px)').matches) return;
    const target = window.innerHeight * 0.45;
    let index = 0;
    steps.forEach((step, i) => { if (step.getBoundingClientRect().top <= target) index = i; });
    activateStep(index);
  }
  const requestSync = () => { if (!queued) { queued = true; window.requestAnimationFrame(syncStory); } };
  window.addEventListener('scroll', requestSync, { passive: true });
  window.addEventListener('resize', requestSync, { passive: true });
  storyLinks.forEach((link, index) => link.addEventListener('click', () => activateStep(index)));
  syncStory();

  const tabs = [...document.querySelectorAll('[data-horizon]')];
  const marker = document.querySelector('#horizon-marker');
  function setHorizon(tab, focus = false) {
    tabs.forEach((item, index) => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
      if (selected) marker.style.left = `${((index + 1) / 3) * 100}%`;
    });
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => setHorizon(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); setHorizon(tabs[next], true); }
    });
  });

  // Denial Recovery Intake Message Form Handling
  const intakeForm = document.getElementById('denial-intake-form');
  const intakeSuccess = document.getElementById('intake-success');
  const intakeResetBtn = document.getElementById('intake-reset-btn');

  if (intakeForm && intakeSuccess) {
    intakeForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = intakeForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Transmitting Message...';
      }

      const practice = intakeForm.querySelector('#intake-practice')?.value || '';
      const contact = intakeForm.querySelector('#intake-contact')?.value || '';
      const backlog = intakeForm.querySelector('#intake-backlog')?.value || '';
      const message = intakeForm.querySelector('#intake-message')?.value || '';

      const subject = encodeURIComponent(`Payer Delta Recovery Inquiry — ${practice}`);
      const body = encodeURIComponent(
        `Inbound Denial Recovery Inquiry for Payer Delta Arizona:\n\n` +
        `Practice / Name: ${practice}\n` +
        `Email or Direct Phone: ${contact}\n` +
        `Estimated Denial Backlog / Payers: ${backlog}\n\n` +
        `Message:\n${message}\n\n` +
        `Sent from https://payerdelta.josephjilovec.com/`
      );

      setTimeout(() => {
        intakeForm.style.display = 'none';
        intakeSuccess.style.display = 'block';
        window.location.href = `mailto:hello@josephjilovec.com?subject=${subject}&body=${body}`;
      }, 500);
    });

    if (intakeResetBtn) {
      intakeResetBtn.addEventListener('click', () => {
        intakeForm.reset();
        intakeSuccess.style.display = 'none';
        intakeForm.style.display = 'block';
        const submitBtn = intakeForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Send Message &amp; Request Recovery Intake</span><svg aria-hidden="true"><use href="#north-east"/></svg>';
        }
      });
    }
  }
})();
