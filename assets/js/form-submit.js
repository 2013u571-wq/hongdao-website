document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const btn = form.querySelector('button[type="submit"]');
  const redirectInput = document.getElementById('redirectUrl');

  if (redirectInput) {
    const isLocal =
      location.hostname === '127.0.0.1' ||
      location.hostname === 'localhost';

    redirectInput.value = isLocal
      ? `${location.origin}/thanks.html`
      : 'https://www.honedao.com/thanks.html';
  }

  form.addEventListener('submit', () => {
    if (!btn) return;
    btn.disabled = true;
    btn.textContent = '提交中…';
  });
});
