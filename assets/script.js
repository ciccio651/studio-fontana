// Script di interazione per Studio Fontana
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuBtn = document.getElementById('menuToggleBtn');
  const siteNav = document.getElementById('site-navigation');
  const menuIcon = menuBtn ? menuBtn.querySelector('.menu-icon-menu') : null;
  const closeIcon = menuBtn ? menuBtn.querySelector('.menu-icon-close') : null;

  if (menuBtn && siteNav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('site-nav--open');
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', isOpen ? 'Chiudi il menu' : 'Apri il menu');
      if (menuIcon && closeIcon) {
        menuIcon.style.display = isOpen ? 'none' : 'block';
        closeIcon.style.display = isOpen ? 'block' : 'none';
      }
    });

    // Chiudi il menu al click su un link di navigazione
    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('site-nav--open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'Apri il menu');
        if (menuIcon && closeIcon) {
          menuIcon.style.display = 'block';
          closeIcon.style.display = 'none';
        }
      });
    });
  }

  // 2. Cookie Consent Banner (GDPR compliant)
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAcceptBtn = document.getElementById('cookieAcceptBtn');
  const cookieEssentialBtn = document.getElementById('cookieEssentialBtn');

  if (cookieBanner) {
    const consent = localStorage.getItem('studioFontanaCookieConsent');
    if (!consent) {
      cookieBanner.classList.remove('hidden');
    }

    const setConsent = (choice) => {
      localStorage.setItem('studioFontanaCookieConsent', choice);
      cookieBanner.classList.add('hidden');
    };

    if (cookieAcceptBtn) cookieAcceptBtn.addEventListener('click', () => setConsent('all'));
    if (cookieEssentialBtn) cookieEssentialBtn.addEventListener('click', () => setConsent('essential'));
  }

  // 3. Configuratore Condominio Interattivo
  const unitsSlider = document.getElementById('unitsSlider');
  const unitsVal = document.getElementById('unitsVal');
  const chkElevator = document.getElementById('chkElevator');
  const chkHeating = document.getElementById('chkHeating');
  const chkGarden = document.getElementById('chkGarden');
  const chkCaf = document.getElementById('chkCaf');
  const calcSummaryText = document.getElementById('calcSummaryText');
  const calcApplyBtn = document.getElementById('calcApplyBtn');
  const formUnitsInput = document.getElementById('formUnitsInput');
  const formNotesText = document.getElementById('formNotesText');

  function updateCalcSummary() {
    if (!unitsSlider || !unitsVal || !calcSummaryText) return;
    const count = unitsSlider.value;
    unitsVal.textContent = count;

    const features = [];
    if (chkElevator && chkElevator.checked) features.push('ascensore');
    if (chkHeating && chkHeating.checked) features.push('riscaldamento comune');
    if (chkGarden && chkGarden.checked) features.push('aree verdi/cortile');
    if (chkCaf && chkCaf.checked) features.push('servizi fiscali CAF');

    let desc = `Condominio da <strong>${count} unità immobiliari</strong>`;
    if (features.length > 0) {
      desc += ` con ${features.join(', ')}.`;
    } else {
      desc += ' con gestione ordinaria.';
    }
    calcSummaryText.innerHTML = desc;
  }

  if (unitsSlider) {
    unitsSlider.addEventListener('input', updateCalcSummary);
    [chkElevator, chkHeating, chkGarden, chkCaf].forEach(chk => {
      if (chk) chk.addEventListener('change', updateCalcSummary);
    });
  }

  if (calcApplyBtn) {
    calcApplyBtn.addEventListener('click', () => {
      if (formUnitsInput && unitsSlider) {
        formUnitsInput.value = unitsSlider.value;
      }
      if (formNotesText && unitsSlider) {
        const features = [];
        if (chkElevator && chkElevator.checked) features.push('ascensore');
        if (chkHeating && chkHeating.checked) features.push('riscaldamento centralizzato');
        if (chkGarden && chkGarden.checked) features.push('giardino/cortile');
        if (chkCaf && chkCaf.checked) features.push('servizio CAF');

        const note = `[Configurazione rapida dal sito]\nNumero unità: ${unitsSlider.value}\nDotazioni: ${features.join(', ') || 'Gestione ordinaria'}`;
        formNotesText.value = note;
      }
    });
  }

  // 4. Moduli di contatto e preventivo
  const forms = document.querySelectorAll('.lead-form');
  // Se desideri impostare l'email di ricezione (es: "info@studiofontana.it"), inseriscila qui:
  const studioEmail = ""; 

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const statusNote = form.querySelector('.form-note');
      const isQuote = form.dataset.type === 'preventivo';
      const formData = new FormData(form);

      if (isQuote) {
        const services = formData.getAll('Servizi richiesti');
        if (services.length === 0) {
          if (statusNote) {
            statusNote.textContent = 'Seleziona almeno un servizio per inviare una richiesta di preventivo.';
            statusNote.style.color = '#c53030';
          }
          return;
        }
      }

      if (!studioEmail || studioEmail.trim().length === 0) {
        if (statusNote) {
          statusNote.textContent = 'Dati pronti! Per trasmetterli direttamente dallo smartphone o PC va configurata l’email dello studio.';
          statusNote.style.color = '#174b46';
        }
        return;
      }

      const subject = isQuote ? 'Richiesta preventivo condominiale' : 'Richiesta informazioni / contatto';
      const body = Array.from(formData.entries())
        .filter(([k]) => k !== 'privacyConsent')
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n');

      const mailtoUrl = `mailto:${encodeURIComponent(studioEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;

      if (statusNote) {
        statusNote.textContent = 'Si aprirà la tua applicazione di posta per verificare e inviare il messaggio.';
        statusNote.style.color = '#174b46';
      }
    });
  });
});
