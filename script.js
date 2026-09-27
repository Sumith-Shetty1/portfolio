const nav = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const themeToggle = document.getElementById('themeToggle');
const progressBar = document.getElementById('scrollProgress');
const revealItems = document.querySelectorAll('.reveal');
const skillTabs = document.querySelectorAll('.skill-tab');
const skillGrid = document.getElementById('skillGrid');
const contactForm = document.getElementById('contactForm');
const THEME_KEY = 'portfolio-theme';

function getPreferredTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);

  if (!themeToggle) return;

  const isDark = theme === 'dark';
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  themeToggle.querySelector('.theme-icon').textContent = isDark ? '☾' : '☀';
  themeToggle.querySelector('.theme-text').textContent = isDark ? 'Dark' : 'Light';
}

function initThemeToggle() {
  if (!themeToggle) return;

  applyTheme(getPreferredTheme());

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });
}

const skillData = {
  Programming: ['C', 'C++', 'Java', 'Python', 'JavaScript'],
  Web: ['HTML', 'CSS', 'JavaScript', 'React'],
  Backend: ['Node.js', 'Express', 'FastAPI'],
  Database: ['MongoDB', 'MySQL', 'PostgreSQL'],
  Cybersecurity: ['Nmap', 'Burp Suite', 'Wireshark', 'OWASP', 'Web Security'],
  Tools: ['Git', 'GitHub', 'Linux', 'Kali Linux', 'VS Code']
};

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = height > 0 ? (scrollTop / height) * 100 : 0;
  if (progressBar) progressBar.style.width = `${progress}%`;
}

function updateNavState() {
  if (nav) {
    nav.classList.toggle('scrolled', window.scrollY > 8);
  }
}

function setActiveNav() {
  const sections = document.querySelectorAll('main section[id]');
  const scrollPosition = window.scrollY + 120;

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
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function renderSkillGroup(key) {
  const chips = (skillData[key] || []).map((skill) => `<span class="skill-chip">${skill}</span>`).join('');
  skillGrid.innerHTML = chips;
}

function initSkillTabs() {
  if (!skillGrid) return;

  renderSkillGroup('Programming');

  skillTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      skillTabs.forEach((button) => button.classList.toggle('active', button === tab));
      renderSkillGroup(tab.dataset.skill);
    });
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

function typeTerminal() {
  const terminalOutput = document.getElementById('terminalOutput');
  if (!terminalOutput) return;

  const lines = [
    '$ whoami',
    'sumith@developer:~$ student',
    'builder',
    'security enthusiast',
    '',
    '$ current_focus',
    'cybersecurity',
    'web development',
    'AI',
    ''
  ];

  let index = 0;
  let lineIndex = 0;
  let charIndex = 0;

  const tick = () => {
    const currentLine = lines[lineIndex] || '';
    if (index < currentLine.length) {
      terminalOutput.textContent += currentLine.charAt(index);
      index += 1;
      setTimeout(tick, 28);
      return;
    }

    if (lineIndex < lines.length - 1) {
      terminalOutput.textContent += '\n';
      lineIndex += 1;
      index = 0;
      setTimeout(tick, 180);
      return;
    }
  };

  tick();
}

function initProjectPanels() {
  const projectPanels = document.querySelectorAll('.project-panel');

  projectPanels.forEach((panel) => {
    const togglePanel = () => {
      const isExpanded = panel.classList.contains('expanded');
      projectPanels.forEach((item) => {
        item.classList.toggle('expanded', item === panel && !isExpanded);
      });
    };

    panel.addEventListener('click', (event) => {
      if (event.target.closest('a')) return;
      togglePanel();
    });

    panel.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        togglePanel();
      }
    });
  });
}

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

function animateStats() {
  const statValues = document.querySelectorAll('.stat-value');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = el.dataset.target;
      const isFloat = target.includes('.');
      const duration = 1200;
      const start = performance.now();

      function update(timestamp) {
        const progress = Math.min((timestamp - start) / duration, 1);
        const value = isFloat
          ? (Number(target) * progress).toFixed(1)
          : Math.floor(Number(target.replace(/[^0-9]/g, '')) * progress);

        const final = target === '8.4' ? value : target === '05' ? String(value).padStart(2, '0') : target === 'CSE' ? 'CSE' : String(value);
        el.textContent = final;

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  statValues.forEach((value) => observer.observe(value));
}

function initFormValidation() {
  if (!contactForm) return;

  const fieldMap = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    message: document.getElementById('message')
  };

  const errorMap = {
    name: document.getElementById('nameError'),
    email: document.getElementById('emailError'),
    message: document.getElementById('messageError')
  };

  const validateField = (name) => {
    const field = fieldMap[name];
    const error = errorMap[name];
    const value = field.value.trim();

    if (name === 'name' && !value) {
      field.classList.add('input-error');
      error.textContent = 'Please enter your name.';
      return false;
    }

    if (name === 'email') {
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!value) {
        field.classList.add('input-error');
        error.textContent = 'Please enter your email.';
        return false;
      }
      if (!valid) {
        field.classList.add('input-error');
        error.textContent = 'Please enter a valid email.';
        return false;
      }
    }

    if (name === 'message' && !value) {
      field.classList.add('input-error');
      error.textContent = 'Please write a message.';
      return false;
    }

    field.classList.remove('input-error');
    error.textContent = '';
    return true;
  };

  Object.keys(fieldMap).forEach((key) => {
    fieldMap[key].addEventListener('input', () => validateField(key));
  });

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const valid = Object.keys(fieldMap).every((key) => validateField(key));
    if (!valid) return;

    const existingSuccess = contactForm.querySelector('.form-success');
    if (existingSuccess) existingSuccess.remove();

    const successMessage = document.createElement('p');
    successMessage.className = 'form-success';
    successMessage.textContent = 'Thanks — your message is ready to send.';
    contactForm.appendChild(successMessage);
    contactForm.reset();
  });
}

window.addEventListener('scroll', () => {
  updateScrollProgress();
  updateNavState();
  setActiveNav();
});

window.addEventListener('load', () => {
  updateScrollProgress();
  updateNavState();
  setActiveNav();
  typeTerminal();
});

initThemeToggle();
initRevealAnimations();
initSkillTabs();
initMobileNav();
initProjectPanels();
initTimeline();
animateStats();
initFormValidation();
