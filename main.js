/* ===========================
   CONTENT SQUAD — MAIN JS
   =========================== */

(function () {
  'use strict';

  /* ───────────────────────────
     PRELOADER
  ─────────────────────────── */
  const preloader = document.getElementById('preloader');
  const preloaderFill = document.querySelector('.preloader-fill');

  let progress = 0;
  const fillInterval = setInterval(() => {
    progress += Math.random() * 18 + 4;
    if (progress >= 100) {
      progress = 100;
      clearInterval(fillInterval);
      setTimeout(hidePreloader, 300);
    }
    if (preloaderFill) preloaderFill.style.width = progress + '%';
  }, 60);

  function hidePreloader() {
    if (!preloader) return;
    gsap.to(preloader, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power3.inOut',
      onComplete: () => {
        preloader.style.display = 'none';
        initRevealAnimations();
      }
    });
  }

  

  /* ───────────────────────────
     CUSTOM CURSOR
  ─────────────────────────── */
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');

  if (dot && ring && window.matchMedia('(hover: hover)').matches) {
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top  = mouseY + 'px';
    });

    (function animateRing() {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      requestAnimationFrame(animateRing);
    })();

    document.querySelectorAll('a, button, .faq-q, .stab, .sc-btn, .nav-cta').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
  }

  /* ───────────────────────────
     NAVBAR SCROLL BEHAVIOUR
  ─────────────────────────── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ───────────────────────────
     HAMBURGER / FULLSCREEN MENU
  ─────────────────────────── */
  const hamburger     = document.getElementById('hamburger');
  const fullscreenMenu = document.getElementById('fullscreenMenu');
  const fsmLinks      = document.querySelectorAll('.fsm-link');

  if (hamburger && fullscreenMenu) {
    hamburger.addEventListener('click', toggleMenu);

    fullscreenMenu.querySelectorAll('.fsm-link').forEach(link => {
      link.addEventListener('click', () => {
        if (fullscreenMenu.classList.contains('open')) closeMenu();
      });
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && fullscreenMenu.classList.contains('open')) closeMenu();
    });
  }

  function toggleMenu() {
    if (fullscreenMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    hamburger.classList.add('open');
    fullscreenMenu.classList.add('open');
    if (lenis) lenis.stop();

    gsap.fromTo(fsmLinks,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0,
        stagger: 0.07,
        duration: 0.55,
        delay: 0.35,
        ease: 'power3.out'
      }
    );
    gsap.fromTo('.fsm-footer',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, delay: 0.7, ease: 'power2.out' }
    );
  }

  function closeMenu() {
    hamburger.classList.remove('open');

    gsap.to(fsmLinks, { opacity: 0, y: -30, stagger: 0.04, duration: 0.3, ease: 'power2.in' });
    gsap.to('.fsm-footer', { opacity: 0, duration: 0.25 });

    setTimeout(() => {
      fullscreenMenu.classList.remove('open');
      if (lenis) lenis.start();
      // Reset link positions for next open
      gsap.set(fsmLinks, { opacity: 0, y: 50 });
      gsap.set('.fsm-footer', { opacity: 0, y: 20 });
    }, 400);
  }

  // Hover effect on fsm links
  fsmLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      gsap.to(link, { color: 'var(--yellow)', x: 12, duration: 0.25, ease: 'power2.out' });
    });
    link.addEventListener('mouseleave', () => {
      gsap.to(link, { color: 'var(--gray)', x: 0, duration: 0.25, ease: 'power2.out' });
    });
  });

  /* ───────────────────────────
     GSAP SCROLL REVEAL
  ─────────────────────────── */
  function initRevealAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // reveal-up
    gsap.utils.toArray('.reveal-up').forEach(el => {
      const delay = parseFloat(el.dataset.delay || 0) / 1000;
      gsap.fromTo(el,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0,
          duration: 0.85,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true
          }
        }
      );
    });

    // reveal-left
    gsap.utils.toArray('.reveal-left').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

    // reveal-right
    gsap.utils.toArray('.reveal-right').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true
          }
        }
      );
    });
  }

  /* ───────────────────────────
     HERO ENTRANCE (index only)
  ─────────────────────────── */
  function initHeroAnimations() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const tl = gsap.timeline({ delay: 0.1 });

    tl.fromTo('.hero-badge',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    )
    .fromTo('.ht-line',
      { opacity: 0, y: 60, skewY: 3 },
      { opacity: 1, y: 0, skewY: 0, duration: 0.75, ease: 'power3.out', stagger: 0.1 },
      '-=0.3'
    )
    .fromTo('.hero-sub',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo('.hero-ctas',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo('.hero-stats',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
      '-=0.35'
    )
    .fromTo('.hero-scroll-hint',
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '-=0.3'
    );

    // Parallax glow on scroll
    gsap.to('.hero-glow', {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  /* ───────────────────────────
     MARQUEE
  ─────────────────────────── */
  function initMarquee() {
    const track = document.querySelector('.marquee-track');
    if (!track) return;
    // CSS animation handles it; we just clone for seamless loop
    const clone = track.cloneNode(true);
    track.parentElement.appendChild(clone);
  }

  /* ───────────────────────────
     STAT NUMBER COUNT-UP
  ─────────────────────────── */
  function initCountUp() {
    const statNums = document.querySelectorAll('.stat-num');
    statNums.forEach(el => {
      const text   = el.textContent.trim();
      const numStr = text.replace(/[^0-9]/g, '');
      const suffix = text.replace(/[0-9]/g, '');
      if (!numStr) return;
      const target = parseInt(numStr, 10);

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.fromTo({ val: 0 }, { val: target }, {
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: function () {
              el.textContent = Math.round(this.targets()[0].val) + suffix;
            }
          });
        }
      });
    });
  }

  /* ───────────────────────────
     PAGE HERO ENTRANCE
  ─────────────────────────── */
  function initPageHero() {
    const ph = document.querySelector('.page-hero');
    if (!ph) return;
    gsap.fromTo('.ph-content .section-tag',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.15, ease: 'power3.out' }
    );
    gsap.fromTo('.page-title',
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.25, ease: 'power3.out' }
    );
    gsap.fromTo('.page-sub',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, delay: 0.5, ease: 'power2.out' }
    );
  }

  /* ───────────────────────────
     SERVICE TABS (services.html)
  ─────────────────────────── */
  function initServiceTabs() {
    const tabs    = document.querySelectorAll('.stab');
    const panels  = document.querySelectorAll('.tab-content');
    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        panels.forEach(p => {
          if (p.id === 'tab-' + target) {
            gsap.fromTo(p,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
            );
            p.classList.add('active');
          } else {
            p.classList.remove('active');
          }
        });
      });
    });
  }

  /* ───────────────────────────
     SERVICE MODAL (services.html)
     openServiceModal / closeServiceModal
     exposed globally for inline onclick
  ─────────────────────────── */
  const serviceData = {
    longform: {
      title: 'Long Form Video Editing',
      type: 'video',
      desc: 'Cinematic long-form YouTube videos, documentaries, podcasts, real estate, finance, and educational content.',
      samples: [
        { label: 'Documentary Style', icon: '🎬', detail: 'Cinematic b-roll, motion titles, color grading, professional sound design' },
        { label: 'YouTube Interview',  icon: '🎙️', detail: 'Multi-cam sync, dynamic cuts, graphic overlays, retention pacing' },
        { label: 'Real Estate',        icon: '🏠', detail: 'Aerial footage integration, property walkthroughs, elegant transitions' },
        { label: 'Educational / Finance', icon: '📈', detail: 'Data animations, infographics, clear visual hierarchy, clean editing' },
      ]
    },
    shortform: {
      title: 'Short Form Video Editing',
      type: 'video',
      desc: 'Viral YouTube Shorts, TikToks, Instagram Reels, and podcast highlights optimised for retention.',
      samples: [
        { label: 'Viral Shorts',     icon: '📱', detail: 'Hook-first editing, punchy cuts, trend-based effects, captions' },
        { label: 'Podcast Clips',    icon: '🎧', detail: 'Audio-reactive captions, b-roll cutaways, highlight extraction' },
        { label: 'TikTok / Reels',   icon: '🎵', detail: 'Fast pacing, text animations, trending audio sync' },
        { label: 'Product Promos',   icon: '🛒', detail: 'Clean promo cuts, motion text, CTA optimisation' },
      ]
    },
    'basic-thumb': {
      title: 'Basic Thumbnail Design',
      type: 'graphic',
      desc: 'Clean, well-composed thumbnails for beginner channels and talking-head content.',
      samples: [
        { label: 'Talking Head',  icon: '🖼️', detail: 'Clean subject cutout, minimal background, clear bold text' },
        { label: 'Simple Text',   icon: '🔤', detail: 'Typography-focused, high-contrast colour scheme' },
        { label: 'Social Post',   icon: '📣', detail: 'Instagram / YouTube community post design' },
        { label: 'Blog / Article', icon: '📰', detail: 'Clean layout, readable hierarchy, brand consistency' },
      ]
    },
    'edu-thumb': {
      title: 'Educational / Medium Thumbnails',
      type: 'graphic',
      desc: 'CTR-focused thumbnails for educational, finance, podcast, and business creators.',
      samples: [
        { label: 'Finance Channel',    icon: '💰', detail: 'Bold numbers, contrast backgrounds, clear value proposition' },
        { label: 'Educational',        icon: '🎓', detail: 'Clean infographic-style, trustworthy aesthetic' },
        { label: 'Podcast Cover',      icon: '🎙️', detail: 'Guest photo treatment, brand colours, professional layout' },
        { label: 'Business / Brand',   icon: '💼', detail: 'Corporate clean, authority positioning, premium feel' },
      ]
    },
    'highend-thumb': {
      title: 'High-End Creator Thumbnails',
      type: 'graphic',
      desc: 'Premium cinematic thumbnails with AI-enhanced workflows for large creators and viral channels.',
      samples: [
        { label: 'Cinematic Composite',  icon: '🏆', detail: 'Multi-layer photo manipulation, dramatic lighting, AI upscaling' },
        { label: 'Viral YouTube Style',  icon: '🔥', detail: 'Emotion-forward face expression, bold color grading, CTR-maximised' },
        { label: 'AI-Enhanced',          icon: '🤖', detail: 'Midjourney backgrounds, AI face enhancement, photorealistic composites' },
        { label: 'Brand Series System',  icon: '✦',  detail: 'Consistent template system, recognisable branding, scalable workflow' },
      ]
    },
    'branding-design': {
      title: 'Branding & Identity Design',
      type: 'graphic',
      desc: 'Complete brand identity systems — logos, social kits, banners, and marketing assets.',
      samples: [
        { label: 'Logo Design',          icon: '✦',  detail: 'Wordmark, icon mark, and combination logos with brand guidelines' },
        { label: 'YouTube Channel Kit',  icon: '▶️', detail: 'Banner, profile picture, end screen template, thumbnail system' },
        { label: 'Social Media Pack',    icon: '📸', detail: 'Post templates, story frames, highlight covers, profile branding' },
        { label: 'Marketing Assets',     icon: '📣', detail: 'Posters, flyers, banners, and promotional creative materials' },
      ]
    },
  };

  window.openServiceModal = function (serviceKey) {
    const data    = serviceData[serviceKey];
    const overlay = document.getElementById('modalOverlay');
    const content = document.getElementById('modalContent');
    if (!data || !overlay || !content) return;

    const samplesHTML = data.samples.map(s => `
      <div class="modal-sample-card">
        <div class="msc-icon">${s.icon}</div>
        <div class="msc-body">
          <h4>${s.label}</h4>
          <p>${s.detail}</p>
        </div>
      </div>
    `).join('');

    content.innerHTML = `
      <div class="modal-header">
        <span class="modal-type-tag">${data.type === 'video' ? '🎬 Video Editing' : '🎨 Graphic Design'}</span>
        <h2>${data.title}</h2>
        <p>${data.desc}</p>
      </div>
      <div class="modal-samples-label">Sample Work Categories</div>
      <div class="modal-samples-grid">${samplesHTML}</div>
      <div class="modal-cta-row">
        <a href="contact.html" class="btn-primary">Start This Project</a>
        <a href="https://wa.me/923027366693" class="btn-ghost" target="_blank">WhatsApp Us</a>
      </div>
    `;

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    gsap.fromTo('#serviceModal',
      { opacity: 0, scale: 0.9, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.4)' }
    );
    gsap.fromTo('.modal-sample-card',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.07, duration: 0.4, delay: 0.2, ease: 'power2.out' }
    );
  };

  window.closeServiceModal = function () {
    const overlay = document.getElementById('modalOverlay');
    gsap.to('#serviceModal', {
      opacity: 0, scale: 0.92, y: 20, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        if (overlay) overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  };

  // Close modal on overlay click
  document.addEventListener('click', e => {
    if (e.target.id === 'modalOverlay') window.closeServiceModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') window.closeServiceModal();
  });

  /* ───────────────────────────
     STORY CARDS STAGGER (about.html)
  ─────────────────────────── */
  function initStoryCards() {
    const cards = document.querySelectorAll('.sv-card');
    if (!cards.length) return;

    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.6, delay: i * 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%', once: true }
        }
      );
    });
  }

  /* ───────────────────────────
     TEAM CARD HOVER GLOW
  ─────────────────────────── */
  function initTeamCards() {
    document.querySelectorAll('.team-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { borderColor: 'rgba(255,247,119,0.25)', y: -6, duration: 0.3 });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { borderColor: 'var(--border)', y: 0, duration: 0.3 });
      });
    });
  }

  /* ───────────────────────────
     WHAT-CARDS HOVER TILT
  ─────────────────────────── */
  function initCardTilt() {
    document.querySelectorAll('.what-card, .service-card, .cp-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect   = card.getBoundingClientRect();
        const cx     = rect.left + rect.width  / 2;
        const cy     = rect.top  + rect.height / 2;
        const dx     = (e.clientX - cx) / (rect.width  / 2);
        const dy     = (e.clientY - cy) / (rect.height / 2);
        gsap.to(card, {
          rotateY: dx * 6,
          rotateX: -dy * 6,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 800
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'power2.out' });
      });
    });
  }

  /* ───────────────────────────
     COURSE CARD REVEAL (courses.html)
  ─────────────────────────── */
  function initCourseReveal() {
    gsap.utils.toArray('.course-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%', once: true }
        }
      );
    });

    gsap.utils.toArray('.prop-item').forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1,
          duration: 0.5,
          delay: i * 0.07,
          ease: 'back.out(1.6)',
          scrollTrigger: { trigger: item, start: 'top 90%', once: true }
        }
      );
    });
  }

  /* ───────────────────────────
     CONTACT FORM SUBTLE ANIM
  ─────────────────────────── */
  function initContactAnimations() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.querySelectorAll('.form-group').forEach((group, i) => {
      gsap.fromTo(group,
        { opacity: 0, x: 20 },
        {
          opacity: 1, x: 0,
          duration: 0.5,
          delay: 0.05 * i,
          ease: 'power2.out',
          scrollTrigger: { trigger: group, start: 'top 90%', once: true }
        }
      );
    });
  }

  /* ───────────────────────────
     HERO GLOW PARALLAX
  ─────────────────────────── */
  function initParallax() {
    const glow2 = document.querySelector('.hero-glow-2');
    if (glow2) {
      gsap.to(glow2, {
        yPercent: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    }
  }

  /* ───────────────────────────
     SCROLL-TO-TOP ON LOGO CLICK
  ─────────────────────────── */
  document.querySelectorAll('.nav-logo, .footer-logo').forEach(el => {
    el.addEventListener('click', e => {
      if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        e.preventDefault();
        if (lenis) lenis.scrollTo(0);
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  /* ───────────────────────────
     ACTIVE NAV LINK HIGHLIGHT
  ─────────────────────────── */
  function setActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }
  setActiveNav();

  /* ───────────────────────────
     INJECT MODAL STYLES
     (keeps CSS in one file but
     modal markup is JS-driven)
  ─────────────────────────── */
  function injectModalStyles() {
    if (document.getElementById('cs-modal-styles')) return;
    const style = document.createElement('style');
    style.id = 'cs-modal-styles';
    style.textContent = `
      .modal-overlay {
        position: fixed; inset: 0; z-index: 1000;
        background: rgba(8,13,26,0.85);
        backdrop-filter: blur(12px);
        display: none; align-items: center; justify-content: center;
        padding: 20px;
      }
      .modal-overlay.open { display: flex; }
      .service-modal {
        background: var(--bg2);
        border: 1px solid var(--border);
        border-radius: 20px;
        padding: clamp(28px, 5vw, 52px);
        max-width: 720px; width: 100%;
        max-height: 88vh; overflow-y: auto;
        position: relative;
        scrollbar-width: thin;
        scrollbar-color: var(--yellow) var(--bg);
      }
      .modal-close {
        position: absolute; top: 20px; right: 20px;
        width: 36px; height: 36px; border-radius: 50%;
        background: var(--bg3); border: 1px solid var(--border);
        color: var(--gray-light); font-size: 16px;
        display: flex; align-items: center; justify-content: center;
        transition: all .25s; cursor: pointer;
      }
      .modal-close:hover { background: var(--yellow); color: var(--bg); border-color: var(--yellow); }
      .modal-type-tag {
        font-family: var(--font-cond); font-size: 12px; font-weight: 700;
        letter-spacing: 3px; text-transform: uppercase;
        color: var(--yellow); display: block; margin-bottom: 12px;
      }
      .modal-header h2 {
        font-family: var(--font-cond); font-size: clamp(28px,5vw,44px);
        font-weight: 900; line-height: 1.05; margin-bottom: 12px;
      }
      .modal-header p { color: var(--gray-light); font-size: 15px; line-height: 1.65; margin-bottom: 32px; }
      .modal-samples-label {
        font-family: var(--font-cond); font-size: 13px; font-weight: 700;
        letter-spacing: 3px; text-transform: uppercase;
        color: var(--gray); margin-bottom: 16px;
      }
      .modal-samples-grid {
        display: grid; grid-template-columns: 1fr 1fr;
        gap: 14px; margin-bottom: 32px;
      }
      @media (max-width: 520px) { .modal-samples-grid { grid-template-columns: 1fr; } }
      .modal-sample-card {
        display: flex; align-items: flex-start; gap: 14px;
        background: var(--bg3); border: 1px solid var(--border);
        border-radius: var(--radius); padding: 18px 20px;
        transition: border-color .25s;
      }
      .modal-sample-card:hover { border-color: var(--yellow-mid); }
      .msc-icon { font-size: 22px; flex-shrink: 0; margin-top: 1px; }
      .msc-body h4 {
        font-family: var(--font-cond); font-size: 16px; font-weight: 800; margin-bottom: 4px;
      }
      .msc-body p { font-size: 13px; color: var(--gray-light); line-height: 1.55; }
      .modal-cta-row { display: flex; gap: 16px; flex-wrap: wrap; }
    `;
    document.head.appendChild(style);
  }

  /* ───────────────────────────
     INIT EVERYTHING
  ─────────────────────────── */
  function init() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    injectModalStyles();
    initPageHero();
    initHeroAnimations();
    initMarquee();
    initServiceTabs();
    initStoryCards();
    initTeamCards();
    initCardTilt();
    initCourseReveal();
    initContactAnimations();
    initParallax();

    if (typeof ScrollTrigger !== 'undefined') {
      initCountUp();
    }
  }

  // Wait for preloader — init is called after it hides
  // But also run immediately in case no preloader element exists
  if (!preloader) {
    init();
    initRevealAnimations();
  } else {
    // fallback: if preloader already removed by browser
    window.addEventListener('load', () => {
      if (preloader.style.display === 'none') {
        init();
        initRevealAnimations();
      } else {
        init();
      }
    });
  }

})();