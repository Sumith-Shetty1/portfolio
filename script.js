/* ==========================================================================
   SUMITH A. SHETTY — PORTFOLIO SCRIPT
   Playful micro-interactions, smooth motions & responsive state
   ========================================================================== */

(function () {
  'use strict';

  // DOM Elements
  const nav = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const themeToggle = document.getElementById('themeToggle');
  const progressBar = document.getElementById('scrollProgress');
  const revealItems = document.querySelectorAll('.reveal');
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillGrid = document.getElementById('skillGrid');
  const contactForm = document.getElementById('contactForm');
  const statusPill = document.getElementById('statusPill');
  const statusText = document.getElementById('statusText');
  const cursorGlow = document.getElementById('cursorGlow');
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const toastContainer = document.getElementById('toastContainer');
  const terminalOutput = document.getElementById('terminalOutput');
  const terminalBtns = document.getElementById('terminalBtns');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectPanels = document.querySelectorAll('.project-panel');
  const contributionGrid = document.getElementById('contributionGrid');
  const activityTooltip = document.getElementById('activityTooltip');

  const THEME_KEY = 'portfolio-theme';

  /* ==========================================================================
     1. Theme Management with Spin Animation
     ========================================================================== */
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme, animateIcon = false) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    if (!themeToggle) return;

    const isDark = theme === 'dark';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';

    const icon = themeToggle.querySelector('.theme-icon');
    const text = themeToggle.querySelector('.theme-text');

    if (icon) {
      if (animateIcon) {
        icon.classList.remove('spin');
        // Force reflow to restart CSS animation
        void icon.offsetWidth;
        icon.classList.add('spin');
      }
      icon.textContent = isDark ? '☾' : '☀';
    }
    if (text) {
      text.textContent = isDark ? 'Dark' : 'Light';
    }
  }

  function initThemeToggle() {
    if (!themeToggle) return;

    applyTheme(getPreferredTheme(), false);

    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme, true);
    });
  }

  /* ==========================================================================
     2. Interactive Playful Status Pill (Cycle on click)
     ========================================================================== */
  const funStatuses = [
    'Available for opportunities',
    'Brewing tea & learning systems',
    'Investigating security & exploits',
    'Building practical software tools',
    'Exploring AI & intelligent flows'
  ];
  let statusIndex = 0;

  function initStatusPill() {
    if (!statusPill || !statusText) return;

    statusPill.addEventListener('click', () => {
      statusIndex = (statusIndex + 1) % funStatuses.length;
      statusText.style.opacity = '0';
      statusText.style.transform = 'translateY(-4px)';

      setTimeout(() => {
        statusText.textContent = funStatuses[statusIndex];
        statusText.style.transition = 'all 200ms cubic-bezier(0.34, 1.56, 0.64, 1)';
        statusText.style.opacity = '1';
        statusText.style.transform = 'translateY(0)';
      }, 120);

      // Micro bounce
      statusPill.style.transform = 'scale(0.95)';
      setTimeout(() => {
        statusPill.style.transform = '';
      }, 150);
    });
  }

  /* ==========================================================================
     3. Ambient Cursor Spotlight (Desktop)
     ========================================================================== */
  function initCursorGlow() {
    if (!cursorGlow || window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let isMoving = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isMoving) {
        isMoving = true;
        requestAnimationFrame(renderCursor);
      }
    });

    function renderCursor() {
      // Gentle smoothing
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      cursorGlow.style.left = `${currentX}px`;
      cursorGlow.style.top = `${currentY}px`;

      if (Math.abs(mouseX - currentX) > 0.5 || Math.abs(mouseY - currentY) > 0.5) {
        requestAnimationFrame(renderCursor);
      } else {
        isMoving = false;
      }
    }
  }

  /* ==========================================================================
     4. Interactive 3D Card Tilt Physics (Smooth & Subtle)
     ========================================================================== */
  function initCardTilt() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const tiltCards = document.querySelectorAll('[data-tilt]');

    tiltCards.forEach((card) => {
      let isHovered = false;

      card.addEventListener('mouseenter', () => {
        isHovered = true;
        card.style.transition = 'transform 100ms ease-out, box-shadow 250ms ease';
      });

      card.addEventListener('mousemove', (e) => {
        if (!isHovered) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -4.5;
        const rotateY = ((x - centerX) / centerX) * 4.5;

        card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`;
      });

      card.addEventListener('mouseleave', () => {
        isHovered = false;
        card.style.transition = 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease';
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  /* ==========================================================================
     5. Interactive Terminal with Quick Commands
     ========================================================================== */
  const commandResponses = {
    whoami: [
      '$ whoami',
      'Sumith A. Shetty',
      'Computer Science & Engineering Student (2028)',
      'Location: Mangalore, India',
      'Focus: Cybersecurity · Web Engineering · AI'
    ],
    skills: [
      '$ cat skills.txt',
      'Languages : C, C++, Python, JavaScript, Java',
      'Security  : OWASP, Burp Suite, Nmap, Wireshark, OSINT',
      'Web/Stack : Node.js, Express, MongoDB, HTML/CSS'
    ],
    focus: [
      '$ cat current_focus.json',
      '{',
      '  "threat_intelligence": "Anveshan email forensics",',
      '  "vulnerability_scan": "WebGuard security tool",',
      '  "osint_graph": "Indra intelligence mapping"',
      '}'
    ],
    clear: []
  };

  let terminalBusy = false;

  function printToTerminal(lines, onComplete) {
    if (!terminalOutput) return;
    terminalOutput.textContent = '';
    let lineIdx = 0;
    let charIdx = 0;

    function step() {
      if (lineIdx >= lines.length) {
        terminalBusy = false;
        if (onComplete) onComplete();
        return;
      }

      const line = lines[lineIdx];
      if (charIdx < line.length) {
        terminalOutput.textContent += line.charAt(charIdx);
        charIdx++;
        setTimeout(step, 20);
      } else {
        terminalOutput.textContent += '\n';
        lineIdx++;
        charIdx = 0;
        setTimeout(step, 90);
      }
    }

    step();
  }

  function initTerminal() {
    if (!terminalOutput) return;

    // Initial greeting sequence
    const initialLines = [
      '$ whoami',
      'sumith@engineer:~$ student & developer',
      'interested in cybersecurity, software & AI',
      '',
      '$ current_status',
      'building practical tools & exploring security flows'
    ];

    printToTerminal(initialLines);

    if (!terminalBtns) return;

    terminalBtns.querySelectorAll('.term-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (terminalBusy) return;
        terminalBusy = true;
        const cmd = btn.dataset.cmd;

        if (cmd === 'clear') {
          terminalOutput.textContent = '$ _';
          terminalBusy = false;
          return;
        }

        const lines = commandResponses[cmd] || [`$ ${cmd}`, 'Command not recognized.'];
        printToTerminal(lines);
      });
    });
  }

  /* ==========================================================================
     6. Projects: Smooth Accordion & Domain Filter
     ========================================================================== */
  function initProjects() {
    // Accordion interaction
    projectPanels.forEach((panel) => {
      const toggle = () => {
        const isExpanded = panel.classList.contains('expanded');
        projectPanels.forEach((other) => {
          if (other === panel) {
            other.classList.toggle('expanded', !isExpanded);
          } else {
            other.classList.remove('expanded');
          }
        });
      };

      panel.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        toggle();
      });

      panel.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });
    });

    // Domain Filtering
    if (!filterBtns.length) return;

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.toggle('active', b === btn));
        const filter = btn.dataset.filter;

        let firstMatch = null;

        projectPanels.forEach((panel) => {
          const category = panel.dataset.category;
          const match = filter === 'all' || category === filter;

          if (match) {
            panel.classList.remove('is-hidden');
            panel.style.opacity = '0';
            panel.style.transform = 'translateY(12px)';
            setTimeout(() => {
              panel.style.transition = 'opacity 300ms ease, transform 300ms cubic-bezier(0.16, 1, 0.3, 1)';
              panel.style.opacity = '1';
              panel.style.transform = 'translateY(0)';
            }, 50);
            if (!firstMatch) firstMatch = panel;
          } else {
            panel.classList.add('is-hidden');
            panel.classList.remove('expanded');
          }
        });

        // Expand the first matching project for a clean presentation
        if (firstMatch && !document.querySelector('.project-panel.expanded:not(.is-hidden)')) {
          firstMatch.classList.add('expanded');
        }
      });
    });
  }

  /* ==========================================================================
     7. Technical Toolkit (Skills): Staggered Pop-In
     ========================================================================== */
  const skillData = {
    Programming: ['C', 'C++', 'Java', 'Python', 'JavaScript'],
    Web: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React', 'REST APIs'],
    Backend: ['Node.js', 'Express', 'FastAPI', 'API Design'],
    Database: ['MongoDB', 'MySQL', 'PostgreSQL', 'Data Modeling'],
    Cybersecurity: ['Nmap', 'Burp Suite', 'Wireshark', 'OWASP Top 10', 'Web Security', 'OSINT'],
    Tools: ['Git', 'GitHub', 'Linux', 'Kali Linux', 'VS Code', 'Postman']
  };

  function renderSkillGroup(key) {
    if (!skillGrid) return;
    const skills = skillData[key] || [];

    skillGrid.innerHTML = skills
      .map(
        (skill, index) =>
          `<span class="skill-chip" style="animation-delay: ${index * 35}ms">${skill}</span>`
      )
      .join('');
  }

  function initSkillTabs() {
    if (!skillGrid || !skillTabs.length) return;

    renderSkillGroup('Programming');

    skillTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        skillTabs.forEach((button) => button.classList.toggle('active', button === tab));
        renderSkillGroup(tab.dataset.skill);
      });
    });
  }

  /* ==========================================================================
     8. GitHub Activity Preview Matrix with Tooltips
     ========================================================================== */
  function initContributionMatrix() {
    if (!contributionGrid) return;

    // 35 activity cells with representative realistic commit data
    const activities = [
      { date: 'Jul 28', count: 2, note: 'SIH ideas & setup' },
      { date: 'Aug 02', count: 4, note: 'Cybersecurity case study' },
      { date: 'Aug 06', count: 1, note: 'Network packet analysis' },
      { date: 'Aug 10', count: 3, note: 'Internship documentation' },
      { date: 'Aug 14', count: 5, note: 'Anveshan threat engine' },
      { date: 'Aug 18', count: 2, note: 'Email header parsing tests' },
      { date: 'Aug 21', count: 0, note: 'Reading OWASP guidelines' },
      { date: 'Aug 25', count: 4, note: 'WebGuard scanner checks' },
      { date: 'Aug 29', count: 6, note: 'XSS vulnerability detector' },
      { date: 'Sep 02', count: 3, note: 'FastAPI endpoints' },
      { date: 'Sep 06', count: 1, note: 'Bug fix & refactoring' },
      { date: 'Sep 10', count: 4, note: 'Indra OSINT schema' },
      { date: 'Sep 13', count: 5, note: 'Knowledge graph entity linker' },
      { date: 'Sep 17', count: 2, note: 'Club management API' },
      { date: 'Sep 20', count: 3, note: 'MongoDB aggregation queries' },
      { date: 'Sep 23', count: 0, note: 'College semester exams' },
      { date: 'Sep 26', count: 2, note: 'Student Survival Hub UI' },
      { date: 'Sep 29', count: 4, note: 'Academic schedule tracker' },
      { date: 'Oct 02', count: 5, note: 'Portfolio polish & motions' },
      { date: 'Oct 05', count: 3, note: 'Burp suite lab exercises' },
      { date: 'Oct 08', count: 1, note: 'Git repo maintenance' },
      { date: 'Oct 12', count: 4, note: 'Email forensics scoring' },
      { date: 'Oct 15', count: 2, note: 'FastAPI middleware' },
      { date: 'Oct 18', count: 6, note: 'Interactive dashboard UI' },
      { date: 'Oct 21', count: 3, note: 'OWASP testing checklist' },
      { date: 'Oct 24', count: 1, note: 'Readme updates' },
      { date: 'Oct 27', count: 4, note: 'Linux tooling scripts' },
      { date: 'Oct 30', count: 2, note: 'Security report generator' },
      { date: 'Nov 02', count: 5, note: 'AI prompt chaining' },
      { date: 'Nov 05', count: 3, note: 'Code review & optimization' },
      { date: 'Nov 08', count: 1, note: 'Wireshark filter configs' },
      { date: 'Nov 12', count: 4, note: 'Student tool offline storage' },
      { date: 'Nov 15', count: 2, note: 'API authentication flow' },
      { date: 'Nov 18', count: 5, note: 'Threat report generator' },
      { date: 'Nov 22', count: 3, note: 'Final evaluation & tests' }
    ];

    contributionGrid.innerHTML = activities
      .map((item) => {
        let lvl = 0;
        if (item.count >= 5) lvl = 4;
        else if (item.count >= 3) lvl = 3;
        else if (item.count >= 2) lvl = 2;
        else if (item.count >= 1) lvl = 1;

        return `<span class="contrib-cell lvl-${lvl}" data-date="${item.date}" data-count="${item.count}" data-note="${item.note}"></span>`;
      })
      .join('');

    if (!activityTooltip) return;

    const cells = contributionGrid.querySelectorAll('.contrib-cell');
    cells.forEach((cell) => {
      cell.addEventListener('mouseenter', () => {
        const count = cell.dataset.count;
        const date = cell.dataset.date;
        const note = cell.dataset.note;

        activityTooltip.textContent = `${date} · ${count} commit${count === '1' ? '' : 's'} (${note})`;
        activityTooltip.classList.add('visible');

        const rect = cell.getBoundingClientRect();
        const panelRect = contributionGrid.closest('.activity-panel').getBoundingClientRect();

        const left = rect.left - panelRect.left + rect.width / 2;
        const top = rect.top - panelRect.top - 36;

        activityTooltip.style.left = `${Math.max(10, Math.min(panelRect.width - 240, left - 110))}px`;
        activityTooltip.style.top = `${top}px`;
      });

      cell.addEventListener('mouseleave', () => {
        activityTooltip.classList.remove('visible');
      });
    });
  }

  /* ==========================================================================
     9. Copy Email Feature with Toast Feedback
     ========================================================================== */
  function showToast(message) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${message}</span>`;
    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  function initCopyEmail() {
    if (!copyEmailBtn) return;
    const emailToCopy = 'sumithgo17@gmail.com';
    const copyIcon = document.getElementById('copyIcon');
    const copyText = document.getElementById('copyText');

    copyEmailBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(emailToCopy);
        } else {
          // Fallback
          const ta = document.createElement('textarea');
          ta.value = emailToCopy;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          ta.remove();
        }

        if (copyIcon) copyIcon.textContent = '✓';
        if (copyText) copyText.textContent = 'Copied!';
        showToast('Email copied to clipboard: ' + emailToCopy + ' ✨');

        setTimeout(() => {
          if (copyIcon) copyIcon.textContent = '📋';
          if (copyText) copyText.textContent = 'Copy';
        }, 2200);
      } catch (err) {
        showToast('Address: ' + emailToCopy);
      }
    });
  }

  /* ==========================================================================
     10. Animated Counter for Stats
     ========================================================================== */
  function animateStats() {
    const statValues = document.querySelectorAll('.stat-value');
    if (!statValues.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          const target = el.dataset.target;
          if (!target || target === 'CSE') {
            observer.unobserve(el);
            return;
          }

          const isFloat = target.includes('.');
          const targetNum = Number(target);
          const duration = 1400;
          const start = performance.now();

          function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out expo
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            if (isFloat) {
              el.textContent = (targetNum * eased).toFixed(1);
            } else if (target === '05') {
              const val = Math.floor(targetNum * eased);
              el.textContent = String(val).padStart(2, '0');
            } else {
              el.textContent = Math.floor(targetNum * eased);
            }

            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              el.textContent = target;
            }
          }

          requestAnimationFrame(update);
          observer.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );

    statValues.forEach((el) => observer.observe(el));
  }

  /* ==========================================================================
     11. Timeline Toggle
     ========================================================================== */
  function initTimeline() {
    const timelineNodes = document.querySelectorAll('.timeline-node');
    timelineNodes.forEach((node) => {
      node.addEventListener('click', () => {
        const item = node.closest('.timeline-item');
        if (!item) return;
        const isActive = item.classList.contains('active');
        node.setAttribute('aria-expanded', String(!isActive));
        item.classList.toggle('active', !isActive);
      });
    });
  }

  /* ==========================================================================
     12. Navigation & Scroll Tracking
     ========================================================================== */
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = height > 0 ? (scrollTop / height) * 100 : 0;
    if (progressBar) progressBar.style.width = `${progress}%`;
  }

  function updateNavState() {
    if (nav) {
      nav.closest('.site-header')?.classList.toggle('scrolled', window.scrollY > 12);
    }
  }

  function setActiveNav() {
    const sections = document.querySelectorAll('main section[id]');
    const scrollPosition = window.scrollY + 140;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach((link) => {
          const active = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('active', active);
        });
      }
    });
  }

  function initMobileNav() {
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ==========================================================================
     13. Smooth Reveal on Scroll
     ========================================================================== */
  function initRevealAnimations() {
    if (!revealItems.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealItems.forEach((item) => observer.observe(item));
  }

  /* ==========================================================================
     14. Contact Form Validation with Tactile States
     ========================================================================== */
  function initContactForm() {
    if (!contactForm) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    const validate = () => {
      let valid = true;

      // Name
      if (!nameInput.value.trim()) {
        nameInput.classList.add('input-error');
        nameError.textContent = 'Please enter your name.';
        valid = false;
      } else {
        nameInput.classList.remove('input-error');
        nameError.textContent = '';
      }

      // Email
      const emailVal = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal) {
        emailInput.classList.add('input-error');
        emailError.textContent = 'Please enter your email.';
        valid = false;
      } else if (!emailRegex.test(emailVal)) {
        emailInput.classList.add('input-error');
        emailError.textContent = 'Please enter a valid email address.';
        valid = false;
      } else {
        emailInput.classList.remove('input-error');
        emailError.textContent = '';
      }

      // Message
      if (!messageInput.value.trim()) {
        messageInput.classList.add('input-error');
        messageError.textContent = 'Please write a message.';
        valid = false;
      } else {
        messageInput.classList.remove('input-error');
        messageError.textContent = '';
      }

      return valid;
    };

    [nameInput, emailInput, messageInput].forEach((input) => {
      if (input) {
        input.addEventListener('input', () => {
          input.classList.remove('input-error');
          const err = document.getElementById(`${input.id}Error`);
          if (err) err.textContent = '';
        });
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate()) return;

      const submitText = submitBtn.querySelector('.submit-text');
      const originalText = submitText ? submitText.textContent : 'Send Message';

      if (submitText) submitText.textContent = 'Sending... ✈️';
      submitBtn.disabled = true;

      setTimeout(() => {
        const existingSuccess = contactForm.querySelector('.form-success');
        if (existingSuccess) existingSuccess.remove();

        const successMessage = document.createElement('p');
        successMessage.className = 'form-success';
        successMessage.innerHTML = '<span>✓</span> Thanks! Your message is ready to send.';
        contactForm.appendChild(successMessage);

        contactForm.reset();
        if (submitText) submitText.textContent = originalText;
        submitBtn.disabled = false;

        showToast('Message sent! Looking forward to connecting. 🎉');
      }, 700);
    });
  }

  /* ==========================================================================
     Global Event Listeners & Bootstrapping
     ========================================================================== */
  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        updateScrollProgress();
        updateNavState();
        setActiveNav();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });

  window.addEventListener('load', () => {
    updateScrollProgress();
    updateNavState();
    setActiveNav();
  });

  // Initialize all features
  initThemeToggle();
  initStatusPill();
  initCursorGlow();
  initCardTilt();
  initTerminal();
  initProjects();
  initSkillTabs();
  initContributionMatrix();
  initCopyEmail();
  animateStats();
  initTimeline();
  initMobileNav();
  initRevealAnimations();
  initContactForm();
})();
