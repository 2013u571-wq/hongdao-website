document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form[name="contact"]');
  if (!form) return;

  const btn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', () => {
    if (!btn) return;
    btn.disabled = true;
    btn.textContent = '提交中…';
  });
});
