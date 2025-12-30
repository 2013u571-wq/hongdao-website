document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const btn = form.querySelector('button[type="submit"]');
  if (!btn) return;

  form.addEventListener('submit', () => {
    btn.disabled = true;
    btn.textContent = '提交中…';
  });
});
