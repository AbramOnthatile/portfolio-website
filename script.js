const toast = document.getElementById('toast');

const setupHeaderScroll = () => {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 12);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
};

const setupToastTriggers = () => {
  document.querySelectorAll('[data-toast]').forEach((element) => {
    element.addEventListener('click', () => {
      const message = element.dataset.toast || 'Action triggered';
      showToast(message);
    });
  });
};

const showToast = (message) => {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    toast.classList.remove('visible');
  }, 2200);
};

const setupPlaceholderLinks = () => {
  document.querySelectorAll('[data-placeholder]').forEach((element) => {
    const href = element.getAttribute('href');
    if (href && href !== '#') {
      return;
    }

    element.addEventListener('click', (event) => {
      const placeholderType = element.dataset.placeholder;
      event.preventDefault();

      if (placeholderType === 'GitHub') {
        showToast('GitHub link to be added');
      } else if (placeholderType === 'Demo') {
        showToast('Live demo to be added');
      } else if (placeholderType === 'CV') {
        showToast('CV download link to be added');
      } else if (placeholderType === 'Certificate') {
        showToast('Certificate file to be added');
      } else if (placeholderType === 'Portfolio') {
        showToast('Portfolio deployment URL to be added');
      } else if (placeholderType === 'Email') {
        showToast('Email address to be added');
      } else if (placeholderType === 'LinkedIn') {
        showToast('LinkedIn profile link to be added');
      }
    });
  });
};

const setupCertificateModal = () => {
  const modal = document.getElementById('certificateModal');
  const modalFrame = document.getElementById('certificateFrame');
  const modalTitle = document.getElementById('certificateModalTitle');
  const closeButton = document.querySelector('.certificate-modal-close');

  if (!modal || !modalFrame || !closeButton) return;

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    modalFrame.src = '';
  };

  document.querySelectorAll('.certificate-link').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const pdfUrl = link.getAttribute('href');
      const certName = link.dataset.certName || 'Certificate';
      modalTitle.textContent = certName;
      modalFrame.src = pdfUrl;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  closeButton.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target.matches('[data-close-modal="true"]') || event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
};

const setActiveNav = () => {
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
  const navLinks = document.querySelectorAll('.nav-menu a');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    const normalized = href === '/' ? '/' : href.replace(/\/+$/, '');
    const matches = normalized === currentPath || (currentPath.startsWith('/projects') && normalized === '/projects');
    link.classList.toggle('active', matches);
  });
};

const setupMobileMenu = () => {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
};

const revealOnScroll = () => {
  const revealElements = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('visible'));
    return;
  }

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

  revealElements.forEach((element) => observer.observe(element));
};

const setupProjectFilters = () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterButtons.length || !projectCards.length) return;

  const applyFilter = (selectedFilter) => {
    filterButtons.forEach((button) => {
      const isActive = button.dataset.filter === selectedFilter;
      button.classList.toggle('active', isActive);
    });

    projectCards.forEach((card) => {
      const categories = card.dataset.category || '';
      const shouldShow = selectedFilter === 'all' || categories.includes(selectedFilter);
      card.style.display = shouldShow ? '' : 'none';
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => applyFilter(button.dataset.filter));
  });

  applyFilter('all');
};

const setupProjectDrawer = () => {
  const drawer = document.getElementById('projectDrawer');
  const title = document.getElementById('drawerTitle');
  const summary = document.getElementById('drawerSummary');
  const tags = document.getElementById('drawerTags');
  const action = document.getElementById('drawerAction');

  if (!drawer || !title || !summary || !tags || !action) return;

  const closeDrawer = () => {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
  };

  document.querySelectorAll('.project-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const card = trigger.closest('.project-card');
      if (!card) return;

      const projectName = card.dataset.projectName || 'Project';
      const projectSummary = card.dataset.projectSummary || 'Project overview';
      const projectDescription = card.dataset.projectDescription || card.dataset.projectSummary || 'Project overview';
      const projectTags = (card.dataset.projectTags || '').split(',').map((tag) => tag.trim()).filter(Boolean);
      const projectLink = card.dataset.projectLink || '#';

      title.textContent = projectName;
      summary.textContent = projectDescription || projectSummary;
      tags.innerHTML = projectTags.map((tag) => `<span>${tag}</span>`).join('');
      action.href = projectLink;
      action.textContent = 'Open project';

      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      showToast(`${projectName} opened`);
    });
  });

  document.querySelectorAll('[data-close-drawer="true"]').forEach((element) => {
    element.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
};

const setupContactForm = () => {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('contactFormStatus');
  if (!form) return;

  if (status) {
    status.hidden = true;
    status.style.display = 'none';
    status.classList.remove('error');
    status.textContent = '';
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = (formData.get('name') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const message = (formData.get('message') || '').toString().trim();

    if (!name || !email || !message) {
      showToast('Please fill in your name, email, and message before sending.');
      if (status) {
        status.hidden = false;
        status.style.display = 'flex';
        status.textContent = 'Please complete all fields before sending.';
        status.classList.add('error');
      }
      return;
    }

    if (status) {
      status.hidden = false;
      status.style.display = 'flex';
      status.classList.remove('error');
      status.textContent = 'Sending your message...';
    }

    try {
      const response = await fetch('https://formsubmit.co/ajax/onthatileabram@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Portfolio enquiry from ${name}`
        })
      });

      if (!response.ok) {
        throw new Error('Send failed');
      }

      form.reset();

      if (status) {
        status.hidden = false;
        status.style.display = 'flex';
        status.classList.remove('error');
        status.textContent = 'Message sent successfully.';
      }

      showToast('Message sent successfully.');
    } catch (error) {
      if (status) {
        status.hidden = false;
        status.style.display = 'flex';
        status.textContent = 'Unable to send right now. Please email onthatileabram@gmail.com directly.';
        status.classList.add('error');
      }
      showToast('Message could not be sent. Please try again or email directly.');
    }
  });
};

setActiveNav();
setupHeaderScroll();
setupToastTriggers();
setupPlaceholderLinks();
setupMobileMenu();
setupProjectFilters();
setupProjectDrawer();
setupContactForm();
setupCertificateModal();
revealOnScroll();

const legacyScriptUrl = new URL('.', document.currentScript.src);
const legacyPath = window.location.pathname.slice(legacyScriptUrl.pathname.length).split('/').filter(Boolean);
const legacyRoute = legacyPath.filter((part) => part !== 'index.html').join('/');

if (legacyRoute) {
  window.location.replace(`${legacyScriptUrl.pathname}#/${legacyRoute}`);
}
