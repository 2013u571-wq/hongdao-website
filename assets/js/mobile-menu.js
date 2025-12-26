document.addEventListener('DOMContentLoaded', () => {

  const toggle = document.querySelector('.nav-toggle');

  const nav = document.querySelector('.nav-main');



  if (!toggle || !nav) return;



  const open = () => {

    nav.classList.add('is-open');

    toggle.setAttribute('aria-expanded', 'true');

    document.documentElement.classList.add('nav-open');

  };



  const close = () => {

    nav.classList.remove('is-open');

    toggle.setAttribute('aria-expanded', 'false');

    document.documentElement.classList.remove('nav-open');

  };



  toggle.addEventListener('click', (e) => {

    e.preventDefault();

    e.stopPropagation();

    nav.classList.contains('is-open') ? close() : open();

  });



  document.addEventListener('click', (e) => {

    if (!nav.classList.contains('is-open')) return;

    if (nav.contains(e.target) || toggle.contains(e.target)) return;

    close();

  });



  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));



  document.addEventListener('keydown', (e) => {

    if (e.key === 'Escape') close();

  });

});

