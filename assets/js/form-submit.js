document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton ? submitButton.textContent : '';

    const formData = {
      name: document.getElementById('name')?.value.trim(),
      phone: document.getElementById('phone')?.value.trim(),
      company: document.getElementById('company')?.value.trim(),
      message: document.getElementById('message')?.value.trim()
    };

    if (!formData.name || !formData.phone || !formData.company) {
      alert('请填写所有必填字段');
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = '提交中...';
    }

    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbznn5eP4MWwEh4EhMNXmR8HW7xd-VJPYG9J3GEVeXsAYoHN-L-EIhrvYFgiIFYJs4DN/exec',
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      );

      if (!response.ok) {
        throw new Error('网络请求失败');
      }

      const result = await response.json();

      if (result.status === 'ok') {
        window.location.href = 'thanks.html';
      } else {
        throw new Error(result.message || '提交失败');
      }

    } catch (err) {
      console.error('表单提交错误：', err);
      alert('提交失败，请稍后再试');

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    }
  });
});
