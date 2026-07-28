/* =========================================================
   Nouman Parvaiz — QA Engineer Portfolio
   Vanilla JS (ES6): nav, scroll progress, console test-run
   animation, coverage bars, back-to-top.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.classList.toggle('active', isOpen);
    });

    // Close mobile nav after selecting a link
    mainNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- sticky header shadow + scroll progress ---------- */
  const header = document.getElementById('siteHeader');
  const progressFill = document.getElementById('scrollFill');
  const backToTop = document.getElementById('backToTop');

  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressFill) progressFill.style.width = `${progress}%`;
    if (header) header.classList.toggle('scrolled', scrollTop > 8);
    if (backToTop) backToTop.classList.toggle('visible', scrollTop > 500);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- resume download placeholder ---------- */
  const resumeBtn = document.getElementById('resumeBtn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
      // Replace 'resume.pdf' with the real file path once available.
      const resumeHref = 'resume.pdf';
      fetch(resumeHref, { method: 'HEAD' })
        .then(res => {
          if (!res.ok) {
            e.preventDefault();
            alert('Resume file not found yet. Add resume.pdf to the project folder to enable this button.');
          }
        })
        .catch(() => {
          e.preventDefault();
          alert('Resume file not found yet. Add resume.pdf to the project folder to enable this button.');
        });
    });
  }

  /* ---------- hero console: simulated test run ---------- */
  const consoleBody = document.getElementById('consoleBody');

  const testLines = [
    { text: '<span class="tick">✓</span> loading profile <span class="pass">... ok</span>', delay: 500 },
    { text: '<span class="tick">✓</span> verifying skills matrix <span class="pass">... ok</span>', delay: 500 },
    { text: '<span class="tick">✓</span> validating experience <span class="pass">... ok</span>', delay: 500 },
    { text: '<span class="tick">✓</span> checking certifications <span class="pass">... ok</span>', delay: 500 },
    { text: '<span class="tick">✓</span> compiling portfolio <span class="pass">... ok</span>', delay: 500 },
  ];

  const summaryLine = '5 passed, 0 failed — <span class="pass">ready to hire</span>';

  function typeConsole() {
    if (!consoleBody) return;
    let index = 0;

    function addNextLine() {
      if (index >= testLines.length) {
        const summary = document.createElement('p');
        summary.className = 'console-line summary';
        summary.innerHTML = summaryLine;
        consoleBody.appendChild(summary);
        return;
      }
      const line = document.createElement('p');
      line.className = 'console-line';
      line.innerHTML = testLines[index].text;
      consoleBody.appendChild(line);
      index += 1;
      setTimeout(addNextLine, testLines[index - 1].delay);
    }

    setTimeout(addNextLine, 400);
  }

  typeConsole();

  /* ---------- coverage bars: animate on scroll into view ---------- */
  const coverageFills = document.querySelectorAll('.coverage-fill');

  if ('IntersectionObserver' in window && coverageFills.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const value = el.getAttribute('data-fill') || '0';
          el.style.width = `${value}%`;
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.4 });

    coverageFills.forEach(el => observer.observe(el));
  } else {
    // Fallback: fill immediately if IntersectionObserver isn't available
    coverageFills.forEach(el => {
      el.style.width = `${el.getAttribute('data-fill') || 0}%`;
    });
  }

  /* ---------- contact form validation ---------- */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const messageInput = document.getElementById('messageInput');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formSuccess = document.getElementById('formSuccess');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setError(input, errorEl, message) {
      input.closest('.form-row').classList.toggle('has-error', Boolean(message));
      errorEl.textContent = message || '';
    }

    function validateForm() {
      let isValid = true;

      if (!nameInput.value.trim()) {
        setError(nameInput, nameError, 'Full name is required.');
        isValid = false;
      } else {
        setError(nameInput, nameError, '');
      }

      if (!emailInput.value.trim()) {
        setError(emailInput, emailError, 'Email is required.');
        isValid = false;
      } else if (!emailPattern.test(emailInput.value.trim())) {
        setError(emailInput, emailError, 'Please enter a valid email address.');
        isValid = false;
      } else {
        setError(emailInput, emailError, '');
      }

      if (!messageInput.value.trim()) {
        setError(messageInput, messageError, 'Message is required.');
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        setError(messageInput, messageError, 'Message should be at least 10 characters.');
        isValid = false;
      } else {
        setError(messageInput, messageError, '');
      }

      return isValid;
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formSuccess.hidden = true;

      if (validateForm()) {
        // No backend is wired up yet; this simulates a successful submission.
        formSuccess.hidden = false;
        contactForm.reset();
      }
    });

    // Clear a field's error as soon as the user starts fixing it
    [nameInput, emailInput, messageInput].forEach((input) => {
      input.addEventListener('input', () => {
        input.closest('.form-row').classList.remove('has-error');
      });
    });
  }

  /* ---------- current year in footer (safety net if year changes) ---------- */
  const footerBuild = document.querySelector('.footer-build');
  if (footerBuild) {
    const year = new Date().getFullYear();
    footerBuild.textContent = footerBuild.textContent.replace(/\d{4}/, String(year));
  }

});
