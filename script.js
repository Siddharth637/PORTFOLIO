/* =================================================================
   PAPAI CHATRI — PORTFOLIO SCRIPT
   Navbar state, mobile menu, scrollspy, back-to-top, contact form
   ================================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Navbar scroll state + back-to-top visibility ---------- */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    backToTop.classList.toggle('visible', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Mobile menu ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navBackdrop = document.getElementById('navBackdrop');

  const closeMenu = () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('open');
    navBackdrop.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  };

  const toggleMenu = () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    navBackdrop.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('no-scroll', isOpen);
  };

  navToggle.addEventListener('click', toggleMenu);
  navBackdrop.addEventListener('click', closeMenu);
  navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

  /* ---------- Scrollspy: highlight the nav link for the visible section ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(section => spyObserver.observe(section));

  /* ---------- Contact form ---------- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const showStatus = (message, type) => {
    status.textContent = message;
    status.className = `form-status ${type}`;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      showStatus('Please fill in every field before sending.', 'error');
      return;
    }
    if (!emailPattern.test(email)) {
      showStatus('Please enter a valid email address.', 'error');
      return;
    }

    // NOTE: This form is front-end only. To actually deliver messages,
    // connect it to a form backend such as Formspree, EmailJS, or Netlify
    // Forms, and replace the block below with that service's submit call.
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalLabel = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    setTimeout(() => {
      showStatus('Thank you — your message has been sent.', 'success');
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalLabel;
    }, 800);
  });

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

});
