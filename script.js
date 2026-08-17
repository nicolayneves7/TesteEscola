/**
 * Escola Crescer & Aprender - Interatividades e Lógica da Landing Page
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Menu Mobile Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      mobileToggle.innerHTML = isOpen ? '✕' : '☰';
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileToggle.innerHTML = '☰';
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Header Efeito ao Rolar (Sticky Shadow)
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Scroll Reveal Animação
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  reveals.forEach(reveal => revealObserver.observe(reveal));

  // 4. Accordion FAQ Interativo
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Fecha todos os outros accordions abertos
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      // Alterna o estado do item clicado
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
      } else {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      }
    });
  });

  // 5. Contador Animado para Estatísticas
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsStarted = false;

  const statsSection = document.querySelector('.stats-banner');
  if (statsSection && statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !statsStarted) {
          statsStarted = true;
          statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const suffix = stat.getAttribute('data-suffix') || '';
            const duration = 1600; // ms
            const stepTime = 25;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                stat.textContent = target + suffix;
                clearInterval(timer);
              } else {
                stat.textContent = Math.floor(current) + suffix;
              }
            }, stepTime);
          });
        }
      },
      { threshold: 0.3 }
    );

    statsObserver.observe(statsSection);
  }

  // 6. Formulário de Agendamento e Contato com Notificação Toast
  const visitForm = document.getElementById('visitForm');
  const toast = document.getElementById('toastNotification');

  if (visitForm) {
    visitForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('parentName').value.trim();
      const phone = document.getElementById('parentPhone').value.trim();
      const childAge = document.getElementById('childAge').value;
      const period = document.getElementById('periodSelect').value;
      const message = document.getElementById('messageText').value.trim();

      if (!name || !phone) {
        showToast('⚠️ Por favor, preencha seu nome e telefone.');
        return;
      }

      // Feedback visual no botão
      const submitBtn = visitForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Enviando... ⏳';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '✅ Agendamento Solicitado!';
        showToast(`🎉 Obrigado, ${name}! Recebemos seu pedido de visita. Entraremos em contato pelo WhatsApp!`);
        visitForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 3500);
      }, 1000);
    });
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show', 'success');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }
});
