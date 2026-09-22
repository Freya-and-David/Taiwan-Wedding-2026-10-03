(() => {
  const START = new Date('2026-10-03T17:30:00+08:00');
  const END = new Date('2026-10-03T21:30:00+08:00');
  const UNITS = { days: 864e5, hours: 36e5, minutes: 6e4, seconds: 1e3 };

  // Countdown
  const box = document.getElementById('countdown');
  const msg = document.getElementById('countdown-msg');
  const cells = Object.fromEntries(
    Object.keys(UNITS).map((k) => [k, box.querySelector(`[data-unit="${k}"]`)])
  );

  function tick() {
    const now = Date.now();
    let diff = START - now;
    if (diff <= 0) {
      box.hidden = true;
      msg.hidden = false;
      msg.textContent = now < END ? '婚宴進行中，期待與您相見！' : '謝謝您的祝福與陪伴 ♡';
      return now < END;
    }
    for (const [unit, ms] of Object.entries(UNITS)) {
      const value = Math.floor(diff / ms);
      diff -= value * ms;
      cells[unit].textContent = unit === 'days' ? value : String(value).padStart(2, '0');
    }
    return true;
  }

  if (tick()) {
    const timer = setInterval(() => { if (!tick()) clearInterval(timer); }, 1000);
  }

  // Nav border once scrolled
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
    return;
  }

  // Reveal sections on scroll
  const revealer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealer.unobserve(entry.target);
      }
    }
  }, { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.reveal').forEach((el) => revealer.observe(el));

  // Highlight the nav link of the section in view
  const links = new Map(
    [...nav.querySelectorAll('a[href^="#"]')].map((a) => [a.getAttribute('href').slice(1), a])
  );
  const sectionToLink = { invite: 'home' };
  const spy = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const id = sectionToLink[entry.target.id] || entry.target.id;
      links.forEach((a, key) => a.classList.toggle('is-active', key === id));
    }
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main > section').forEach((s) => spy.observe(s));
})();
