// 表单提交处理
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (!contactForm) {
    return;
  }

  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // 获取提交按钮
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton ? submitButton.textContent : '提交咨询';
    
    // 获取表单数据
    const formData = {
      name: document.getElementById('name').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      company: document.getElementById('company').value.trim(),
      message: document.getElementById('message').value.trim()
    };

    // 验证必填字段
    if (!formData.name || !formData.phone || !formData.company) {
      alert('请填写所有必填字段');
      return;
    }

    // 更新按钮状态
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = '提交中…';
    }

    try {
      // 提交到 Google Apps Script
      // ⚠️ 请将下面的 URL 中的 "YOUR_SCRIPT_KEY" 替换为实际的 Google Apps Script key
      const response = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=YOUR_SCRIPT_KEY', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.status === 'success') {
        // 提交成功，跳转到感谢页
        window.location.href = 'thanks.html';
      } else {
        // 提交失败
        throw new Error(result.message || '提交失败，请稍后重试');
      }
    } catch (error) {
      console.error('表单提交错误:', error);
      alert('提交失败，请稍后重试。错误信息：' + error.message);
      
      // 恢复按钮状态
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  });
});
