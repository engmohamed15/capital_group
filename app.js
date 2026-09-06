/**
 * Ù…ÙƒØªØ¨ Ø§Ù„Ø¹Ø§ØµÙ…Ø© Ø§Ù„Ù‡Ù†Ø¯Ø³ÙŠ â€” Capital Group Engineering Consultants
 * Main Application Script
 * All animations, interactions, form handling
 */

'use strict';

/* ============================================================
   UTILITIES
============================================================ */
var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
var isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

function lerp(a, b, t) { return a + (b - a) * t; }
function clamp(v, min, max) { return Math.min(Math.max(v, min), max); }
function map(v, in1, in2, out1, out2) { return out1 + ((v - in1) / (in2 - in1)) * (out2 - out1); }

function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

/* ============================================================
   CUSTOM CURSOR
============================================================ */
(function initCursor() {
  if (isTouchDevice) return;

  var cursor = qs('#cursor');
  var dot = qs('#cursor-dot');
  var ring = qs('#cursor-ring');
  if (!cursor || !dot || !ring) return;

  var mx = window.innerWidth / 2, my = window.innerHeight / 2;
  var rx = mx, ry = my;

  document.addEventListener('mousemove', function(e) {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = 'translate(' + mx + 'px, ' + my + 'px) translate(-50%, -50%)';
  });

  function animateRing() {
    rx = lerp(rx, mx, 0.12);
    ry = lerp(ry, my, 0.12);
    ring.style.transform = 'translate(' + rx + 'px, ' + ry + 'px) translate(-50%, -50%)';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Expand on interactive elements
  var interactiveEls = qsa('a, button, .service-card, .why-item, .deliver-card, .form-input, .form-select, .form-textarea');
  interactiveEls.forEach(function(el) {
    el.addEventListener('mouseenter', function() { document.body.classList.add('cursor-expanded'); });
    el.addEventListener('mouseleave', function() { document.body.classList.remove('cursor-expanded'); });
  });
})();

/* ============================================================
   NAVBAR â€” SCROLL BEHAVIOR + MOBILE MENU
============================================================ */
(function initNavbar() {
  var navbar = qs('#navbar');
  var toggle = qs('#navToggle');
  var menu = qs('#navMenu');
  if (!navbar) return;

  // Scroll glass effect
  var ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        if (window.scrollY > 60) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Mobile toggle
  if (toggle && menu) {
    toggle.addEventListener('click', function() {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('open', !expanded);
    });

    // Close menu on link click
    qsa('.nav-link', menu).forEach(function(link) {
      link.addEventListener('click', function() {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', function(e) {
      if (!navbar.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
      }
    });
  }

  // Active link on scroll
  var sections = qsa('section[id]');
  var links = qsa('.nav-link');

  function updateActiveLink() {
    var scrollY = window.scrollY + 100;
    sections.forEach(function(section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        links.forEach(function(link) {
          link.style.color = link.getAttribute('href') === '#' + id
            ? 'var(--gold)'
            : '';
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveLink, { passive: true });
})();

/* ============================================================
   LANGUAGE SWITCHER
============================================================ */
(function initLang() {
  var btn = qs('#langSwitcher');
  var label = qs('#langLabel');
  if (!btn) return;

  var isAr = true;

  btn.addEventListener('click', function() {
    isAr = !isAr;
    document.documentElement.setAttribute('lang', isAr ? 'ar' : 'en');
    document.documentElement.setAttribute('dir', isAr ? 'rtl' : 'ltr');
    document.body.classList.toggle('lang-en', !isAr);
    label.textContent = isAr ? 'EN' : 'Ø¹Ø±';
  });
})();

/* ============================================================
   PARTICLE CANVAS â€” HERO
============================================================ */
(function initParticles() {
  var canvas = qs('#particle-canvas');
  if (!canvas || prefersReducedMotion || isMobile) return;

  var ctx = canvas.getContext('2d');
  var particles = [];
  var count = 60;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  function Particle() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.pulse = Math.random() * Math.PI * 2;
    this.pulseSpeed = Math.random() * 0.02 + 0.01;
  }

  for (var i = 0; i < count; i++) particles.push(new Particle());

  var frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;

    particles.forEach(function(p) {
      p.x += p.speedX;
      p.y += p.speedY;
      p.pulse += p.pulseSpeed;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      var alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(156, 122, 60, ' + alpha + ')';
      ctx.fill();

      // Draw connections
      particles.forEach(function(p2) {
        var dx = p.x - p2.x;
        var dy = p.y - p2.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = 'rgba(156, 122, 60, ' + (0.05 * (1 - dist / 120)) + ')';
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(animate);
  }
  animate();
})();

/* ============================================================
   HERO â€” INTRO TIMELINE ANIMATION
============================================================ */
(function initHeroAnimation() {
  var heroContent = qs('#heroContent');
  var heroLogo = qs('#heroLogo');
  var words = qsa('.word-reveal');
  var drawLines = qsa('.draw-line, .draw-circle, .draw-ellipse, .draw-corner');

  if (!heroContent) return;

  if (prefersReducedMotion) {
    heroContent.style.opacity = '1';
    if (heroLogo) { heroLogo.style.opacity = '1'; heroLogo.style.transform = 'none'; }
    words.forEach(function(w) { w.style.opacity = '1'; w.style.transform = 'none'; });
    drawLines.forEach(function(l) { l.style.strokeDashoffset = '0'; });
    return;
  }

  // Phase 1: Draw SVG lines (0 - 0.8s)
  setTimeout(function() {
    drawLines.forEach(function(line, i) {
      setTimeout(function() {
        line.style.transition = 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        line.style.strokeDashoffset = '0';
      }, i * 60);
    });
  }, 100);

  // Phase 2: Logo appears (0.5s)
  setTimeout(function() {
    heroContent.style.opacity = '1';
    if (heroLogo) {
      heroLogo.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      heroLogo.style.opacity = '1';
      heroLogo.style.transform = 'scale(1)';
    }
  }, 500);

  // Phase 3: Headline words reveal (0.9s+)
  words.forEach(function(word, i) {
    setTimeout(function() {
      word.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
      word.style.opacity = '1';
      word.style.transform = 'translateY(0)';
    }, 900 + i * 200);
  });
})();

/* ============================================================
   SCROLL ANIMATIONS â€” INTERSECTION OBSERVER
============================================================ */
(function initScrollAnimations() {
  var observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  // Generic reveal observer
  var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        el.classList.add('visible');
        revealObserver.unobserve(el);
      }
    });
  }, observerOptions);

  qsa('.reveal-up, .reveal-from-right, .stagger-card, .stagger-problem, .why-item, .deliver-card').forEach(function(el) {
    revealObserver.observe(el);
  });

  // Intro section â€” line reveal
  var introObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      var lines = qsa('.line-reveal', entry.target);
      lines.forEach(function(line, i) {
        setTimeout(function() {
          line.style.transition = 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
          line.style.transform = 'translateY(0)';
        }, i * 150);
      });
      // SVG line draw
      var svgLine = qs('.scroll-draw-line', entry.target);
      if (svgLine) {
        setTimeout(function() {
          svgLine.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
          svgLine.style.strokeDashoffset = '0';
        }, 200);
      }
      introObs.unobserve(entry.target);
    });
  }, { threshold: 0.2 });
  var introSection = qs('.intro-section');
  if (introSection) introObs.observe(introSection);

  // About â€” image mask reveal
  var aboutObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      var mask = qs('.about-img-mask', entry.target);
      if (mask) mask.classList.add('revealed');
      var line = qs('.about-gold-line', entry.target);
      if (line) setTimeout(function() { line.classList.add('drawn'); }, 400);
      aboutObs.unobserve(entry.target);
    });
  }, { threshold: 0.25 });
  var aboutSection = qs('.about-section');
  if (aboutSection) aboutObs.observe(aboutSection);

  // Journey â€” animated line and step activation
  var journeyObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      var steps = qsa('.journey-step', entry.target);
      var journeyLine = qs('#journeyLine', entry.target);

      if (journeyLine) {
        journeyLine.style.transition = 'stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1)';
        journeyLine.style.strokeDashoffset = '0';
      }

      steps.forEach(function(step, i) {
        setTimeout(function() {
          step.classList.add('active');
        }, 300 + i * 250);
      });

      journeyObs.unobserve(entry.target);
    });
  }, { threshold: 0.3 });
  var journeySection = qs('.journey-section');
  if (journeySection) journeyObs.observe(journeySection);

  // Solution line draw
  var solutionObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      var sLine = qs('#solutionLine', entry.target);
      if (sLine) {
        setTimeout(function() {
          sLine.style.transition = 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
          sLine.style.strokeDashoffset = '0';
        }, 300);
      }
      solutionObs.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  var solutionReveal = qs('.solution-reveal');
  if (solutionReveal) solutionObs.observe(solutionReveal);

  // Contact lines draw
  var contactObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      qsa('.contact-draw-line', entry.target).forEach(function(line, i) {
        setTimeout(function() {
          line.style.transition = 'stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)';
          line.style.strokeDashoffset = '0';
        }, i * 200);
      });
      contactObs.unobserve(entry.target);
    });
  }, { threshold: 0.1 });
  var contactSection = qs('.contact-section');
  if (contactSection) contactObs.observe(contactSection);

  // Footer gold line
  var footerObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      var fLine = qs('#footerLine');
      if (fLine) {
        fLine.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
        fLine.style.strokeDashoffset = '0';
      }
      footerObs.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  var footer = qs('.site-footer');
  if (footer) footerObs.observe(footer);
})();

/* ============================================================
   PARALLAX â€” SUBTLE BACKGROUND MOVEMENT
============================================================ */
(function initParallax() {
  if (prefersReducedMotion || isMobile) return;

  var heroGrid = qs('.hero-blueprint-grid');
  var introGrid = qs('.intro-grid-bg');

  window.addEventListener('scroll', function() {
    var sy = window.scrollY;
    if (heroGrid) {
      heroGrid.style.transform = 'translateY(' + (sy * 0.15) + 'px)';
    }
    if (introGrid) {
      var introTop = qs('.intro-section').offsetTop;
      var offset = (sy - introTop) * 0.08;
      introGrid.style.transform = 'translateY(' + offset + 'px)';
    }
  }, { passive: true });
})();

/* ============================================================
   BLUEPRINT SECTION â€” ANIMATED SVG DRAWING
============================================================ */
(function initBlueprint() {
  var bpCanvas = qs('#blueprintCanvas');
  if (!bpCanvas) return;

  // Inject blueprint SVG
  var w = bpCanvas.offsetWidth || 1200;
  var h = bpCanvas.offsetHeight || 500;

  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('id', 'blueprintSvg');
  svg.setAttribute('viewBox', '0 0 1440 500');
  svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
  svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';

  var content = '';

  // Background grid
  for (var x = 0; x <= 1440; x += 50) {
    content += '<line class="bp-line" x1="' + x + '" y1="0" x2="' + x + '" y2="500" opacity="0.4"/>';
  }
  for (var y = 0; y <= 500; y += 50) {
    content += '<line class="bp-line" x1="0" y1="' + y + '" x2="1440" y2="' + y + '" opacity="0.4"/>';
  }

  // Floor plan outline
  var planPaths = [
    'M200 100 L700 100 L700 400 L200 400 Z',
    'M200 100 L200 250 L350 250 L350 100',
    'M350 250 L350 400',
    'M500 100 L500 250',
    'M200 250 L500 250',
  ];
  planPaths.forEach(function(d) {
    var len = 600 + Math.random() * 400;
    content += '<path class="bp-dim" d="' + d + '" stroke-dasharray="' + len + '" stroke-dashoffset="' + len + '" style="transition:stroke-dashoffset 1.5s cubic-bezier(0.16,1,0.3,1)"/>';
  });

  // Dimension lines
  var dims = [
    { x1: 200, y1: 80, x2: 700, y2: 80 },
    { x1: 200, y1: 420, x2: 700, y2: 420 },
    { x1: 720, y1: 100, x2: 720, y2: 400 },
  ];
  dims.forEach(function(d) {
    content += '<line class="bp-dim" x1="' + d.x1 + '" y1="' + d.y1 + '" x2="' + d.x2 + '" y2="' + d.y2 + '" opacity="0.6" stroke-dasharray="500" stroke-dashoffset="500" style="transition:stroke-dashoffset 1.2s 0.5s cubic-bezier(0.16,1,0.3,1)"/>';
  });

  // Right side structural diagram
  var structPaths = [
    'M900 120 L1200 120 L1200 380 L900 380 Z',
    'M900 120 L1050 250 L1200 120',
    'M900 380 L1050 250 L1200 380',
    'M1050 120 L1050 380',
    'M900 250 L1200 250',
  ];
  structPaths.forEach(function(d) {
    var len = 400 + Math.random() * 400;
    content += '<path class="bp-dim" d="' + d + '" stroke-dasharray="' + len + '" stroke-dashoffset="' + len + '" style="transition:stroke-dashoffset 1.8s 0.3s cubic-bezier(0.16,1,0.3,1)" opacity="0.7"/>';
  });

  // Circles
  content += '<circle class="bp-dim" cx="1050" cy="250" r="80" stroke-dasharray="502" stroke-dashoffset="502" style="transition:stroke-dashoffset 1.5s 0.6s cubic-bezier(0.16,1,0.3,1)" opacity="0.5"/>';
  content += '<circle class="bp-line" cx="1050" cy="250" r="140" stroke-dasharray="880" stroke-dashoffset="880" style="transition:stroke-dashoffset 2s 0.4s cubic-bezier(0.16,1,0.3,1)" opacity="0.2"/>';

  svg.innerHTML = content;
  bpCanvas.appendChild(svg);

  // Animate on scroll
  var bpObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      qsa('[stroke-dashoffset]', svg).forEach(function(el) {
        el.style.strokeDashoffset = '0';
      });
      bpObs.unobserve(entry.target);
    });
  }, { threshold: 0.2 });
  bpObs.observe(bpCanvas);
})();

/* ============================================================
   MAGNETIC BUTTONS
============================================================ */
(function initMagneticButtons() {
  if (isTouchDevice || prefersReducedMotion) return;

  qsa('.magnetic-btn').forEach(function(btn) {
    btn.addEventListener('mousemove', function(e) {
      var rect = btn.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      var dx = (e.clientX - cx) * 0.25;
      var dy = (e.clientY - cy) * 0.25;
      btn.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
    });
    btn.addEventListener('mouseleave', function() {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(function() { btn.style.transition = ''; }, 400);
    });
  });
})();

/* ============================================================
   LEAD FORM â€” VALIDATION + WHATSAPP SUBMISSION
============================================================ */
(function initLeadForm() {
  var form = qs('#leadForm');
  var submitBtn = qs('#formSubmit');
  var submitText = qs('.submit-text', submitBtn);
  var submitLoading = qs('.submit-loading', submitBtn);
  var formSuccess = qs('#formSuccess');
  if (!form) return;

  var projectLabels = {
    'villa': 'ÙÙŠÙ„Ø§', 'commercial': 'Ù…Ø¨Ù†Ù‰ ØªØ¬Ø§Ø±ÙŠ',
    'residential': 'Ù…Ø´Ø±ÙˆØ¹ Ø³ÙƒÙ†ÙŠ', 'investment': 'Ù…Ø´Ø±ÙˆØ¹ Ø§Ø³ØªØ«Ù…Ø§Ø±ÙŠ', 'other': 'Ù…Ø´Ø±ÙˆØ¹ Ø¢Ø®Ø±'
  };
  var serviceLabels = {
    'architectural': 'Ø§Ù„ØªØµÙ…ÙŠÙ… Ø§Ù„Ù…Ø¹Ù…Ø§Ø±ÙŠ', 'structural': 'Ø§Ù„ØªØµÙ…ÙŠÙ… Ø§Ù„Ø¥Ù†Ø´Ø§Ø¦ÙŠ',
    'mep': 'Ø§Ù„Ø£Ø¹Ù…Ø§Ù„ Ø§Ù„ÙƒÙ‡Ø±ÙˆÙ…ÙŠÙƒØ§Ù†ÙŠÙƒÙŠØ©', 'infrastructure': 'Ø§Ù„Ø¨Ù†ÙŠØ© Ø§Ù„ØªØ­ØªÙŠØ©',
    'urban': 'Ø§Ù„ØªØ®Ø·ÙŠØ· ÙˆØ§Ù„ØªØµÙ…ÙŠÙ… Ø§Ù„Ø­Ø¶Ø±ÙŠ', 'management': 'Ø¥Ø¯Ø§Ø±Ø© ÙˆØªÙ†Ø³ÙŠÙ‚ Ø§Ù„Ù…Ø´Ø§Ø±ÙŠØ¹', 'other': 'Ø®Ø¯Ù…Ø© Ø£Ø®Ø±Ù‰'
  };

  function validateField(input) {
    var errEl = input.parentElement.querySelector('.field-error');
    var val = input.value.trim();
    var valid = true;
    var msg = '';
    input.classList.remove('error');
    if (errEl) errEl.textContent = '';
    if (input.required && !val) { valid = false; msg = 'Ù‡Ø°Ø§ Ø§Ù„Ø­Ù‚Ù„ Ù…Ø·Ù„ÙˆØ¨'; }
    else if (input.type === 'tel' && val && !/^[+\d\s()-]{7,20}$/.test(val)) {
      valid = false; msg = 'Ø£Ø¯Ø®Ù„ Ø±Ù‚Ù… Ø¬ÙˆØ§Ù„ ØµØ­ÙŠØ­';
    }
    if (!valid) { input.classList.add('error'); if (errEl) errEl.textContent = msg; }
    return valid;
  }

  qsa('.form-input, .form-select', form).forEach(function(input) {
    input.addEventListener('blur', function() { validateField(input); });
    input.addEventListener('input', function() {
      if (input.classList.contains('error')) validateField(input);
    });
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var inputs = qsa('[required]', form);
    var allValid = true;
    inputs.forEach(function(input) { if (!validateField(input)) allValid = false; });
    if (!allValid) return;

    // Read values
    var fullName    = (qs('#fullName', form).value || '').trim();
    var phone       = (qs('#phone', form).value || '').trim();
    var city        = (qs('#city', form).value || '').trim();
    var projectType = qs('#projectType', form).value;
    var service     = qs('#service', form).value;
    var details     = (qs('#details', form).value || '').trim();

    // Build WhatsApp message
    var msg = 'ðŸ“‹ *Ø·Ù„Ø¨ Ø§Ø³ØªØ´Ø§Ø±Ø© Ù‡Ù†Ø¯Ø³ÙŠØ© Ø¬Ø¯ÙŠØ¯*\n';
    msg += 'â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”\n';
    msg += 'ðŸ‘¤ *Ø§Ù„Ø§Ø³Ù…:* ' + fullName + '\n';
    msg += 'ðŸ“± *Ø§Ù„Ø¬ÙˆØ§Ù„:* ' + phone + '\n';
    if (city) msg += 'ðŸ“ *Ø§Ù„Ù…Ø¯ÙŠÙ†Ø©:* ' + city + '\n';
    msg += 'ðŸ—ï¸ *Ù†ÙˆØ¹ Ø§Ù„Ù…Ø´Ø±ÙˆØ¹:* ' + (projectLabels[projectType] || projectType) + '\n';
    msg += 'ðŸ”§ *Ø§Ù„Ø®Ø¯Ù…Ø© Ø§Ù„Ù…Ø·Ù„ÙˆØ¨Ø©:* ' + (serviceLabels[service] || service) + '\n';
    if (details) msg += 'ðŸ“ *Ø§Ù„ØªÙØ§ØµÙŠÙ„:* ' + details + '\n';
    msg += 'â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”\n';
    msg += 'ðŸŒ Ù…ÙƒØªØ¨ Ø§Ù„Ø¹Ø§ØµÙ…Ø© Ø§Ù„Ù‡Ù†Ø¯Ø³ÙŠ | Capital Group';

    // Loading state
    submitBtn.disabled = true;
    if (submitText) submitText.style.display = 'none';
    if (submitLoading) submitLoading.style.display = 'block';

    Analytics.track('lead_form_submit', { project_type: projectType, service: service });
    Analytics.track('whatsapp_click');

    setTimeout(function() {
      submitBtn.disabled = false;
      if (submitText) submitText.style.display = '';
      if (submitLoading) submitLoading.style.display = 'none';

      // Open WhatsApp with pre-filled message
      var waNumber = COMPANY_CONFIG.WHATSAPP_NUMBER || '';
      if (waNumber) {
        window.open('https://wa.me/' + waNumber + '?text=' + encodeURIComponent(msg), '_blank');
      }

      // Show success animation
      form.style.display = 'none';
      if (formSuccess) {
        formSuccess.style.display = 'block';
        var checkPath = qs('.check-path', formSuccess);
        if (checkPath) {
          setTimeout(function() {
            checkPath.style.transition = 'stroke-dashoffset 0.6s cubic-bezier(0.16,1,0.3,1)';
            checkPath.style.strokeDashoffset = '0';
          }, 200);
        }
      }
    }, 800);
  });
})();

/* ============================================================
   ANALYTICS CLICK TRACKING
============================================================ */
(function initTracking() {
  document.addEventListener('click', function(e) {
    var el = e.target.closest('[data-track]');
    if (!el) return;
    var event = el.getAttribute('data-track');
    if (event) Analytics.track(event);
  });
})();

/* ============================================================
   SMOOTH ANCHOR SCROLL
============================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      var target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();

      var navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
      var top = target.getBoundingClientRect().top + window.scrollY - navH;

      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();

/* ============================================================
   MOBILE STICKY BAR â€” SHOW/HIDE ON HERO
============================================================ */
(function initMobileStickyBar() {
  var bar = qs('#mobileStickyBar');
  if (!bar) return;

  var hero = qs('#hero');
  if (!hero) return;

  function updateBar() {
    var heroBottom = hero.offsetTop + hero.offsetHeight;
    if (window.scrollY > heroBottom - 100) {
      bar.style.display = 'flex';
    } else {
      bar.style.display = 'flex'; // Always show on mobile for accessibility
    }
  }

  window.addEventListener('scroll', updateBar, { passive: true });
})();

/* ============================================================
   FOOTER YEAR
============================================================ */
(function() {
  var el = qs('#currentYear');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ============================================================
   SERVICE CARD â€” ADVANCED HOVER (CSS does most of it, JS for border draw)
============================================================ */
(function initServiceCards() {
  qsa('.service-card').forEach(function(card) {
    var rect = qs('.card-border-svg rect', card);
    if (!rect) return;

    card.addEventListener('mouseenter', function() {
      rect.style.transition = 'stroke-dashoffset 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      rect.style.strokeDashoffset = '0';
    });

    card.addEventListener('mouseleave', function() {
      rect.style.transition = 'stroke-dashoffset 0.4s ease-in';
      rect.style.strokeDashoffset = '400';
    });
  });
})();

/* ============================================================
   PROBLEM ITEMS â€” STAGGER INDEX FIX
============================================================ */
(function() {
  qsa('.stagger-problem').forEach(function(el, i) {
    el.setAttribute('data-index', i);
  });
})();

console.log('%c Ù…ÙƒØªØ¨ Ø§Ù„Ø¹Ø§ØµÙ…Ø© Ø§Ù„Ù‡Ù†Ø¯Ø³ÙŠ | Capital Group ', 'background:#1F2A24;color:#9C7A3C;font-size:14px;font-weight:bold;padding:8px 16px;border-radius:4px;');


