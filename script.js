const toast = document.getElementById('toast');

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

const setupContactForm = () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = (formData.get('name') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const message = (formData.get('message') || '').toString().trim();

    if (!name && !email && !message) {
      showToast('Please fill in the form before sending.');
      return;
    }

    const subject = encodeURIComponent(name ? `Portfolio enquiry from ${name}` : 'Portfolio enquiry');
    const body = encodeURIComponent(
      [
        name ? `Name: ${name}` : '',
        email ? `Email: ${email}` : '',
        '',
        message || 'Hello, I would like to connect with you.'
      ].filter(Boolean).join('\n')
    );

    const mailtoLink = `mailto:onthatileabram@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    form.reset();

    setTimeout(() => {
      const confirmed = window.confirm('Your email app has opened. Did you send the message?');
      showToast(
        confirmed
          ? 'Thank you. Your email was sent.'
          : 'Your email app opened. Please send the message manually if needed.'
      );
    }, 500);
  });
};

setActiveNav();
setupPlaceholderLinks();
setupMobileMenu();
setupProjectFilters();
setupContactForm();
setupCertificateModal();
revealOnScroll();
