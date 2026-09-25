// Header background + logo/nav contrast on scroll
const header = document.getElementById('siteHeader');
const navToggle = document.getElementById('navToggle');
const onScroll = () => {
  const scrolled = window.scrollY > 30;
  header.classList.toggle('scrolled', scrolled);
  navToggle.classList.toggle('forced-dark', scrolled);
};
window.addEventListener('scroll', onScroll);
onScroll();

// Mobile nav toggle
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});
document.querySelectorAll('[data-close]').forEach(el => {
  el.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Scroll-reveal
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// Contact form — submits to Web3Forms via fetch, so the page never reloads
// and the person sees an inline success/error message instead.
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitBtn = contactForm.querySelector('.form-submit');
  submitBtn.disabled = true;
  formStatus.textContent = 'Sending…';
  formStatus.className = 'form-status';

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' },
    });
    const result = await response.json();

    if (response.ok && result.success) {
      formStatus.textContent = "Thanks — we've received your message and will be in touch soon.";
      formStatus.classList.add('success');
      contactForm.reset();
    } else {
      formStatus.textContent = 'Something went wrong sending that — please try again, or email us directly.';
      formStatus.classList.add('error');
    }
  } catch (err) {
    formStatus.textContent = 'Something went wrong sending that — please try again, or email us directly.';
    formStatus.classList.add('error');
  } finally {
    submitBtn.disabled = false;
  }
});
