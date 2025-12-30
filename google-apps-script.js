// Google Apps Script 代码 - 已添加邮件通知功能
// 部署说明：
// 1. 在 Google Sheets 中打开扩展程序 > Apps 脚本
// 2. 粘贴此代码
// 3. 点击 部署 > 新建部署 > 选择"Web 应用"
// 4. 执行身份：我，访问权限：任何人
// 5. 复制部署后的 Web App URL，用于表单 action 属性

const SPREADSHEET_ID = '1wFy9FS7RQQQDt00H-xVnDSvKSX58eWdAxD6hH51vTQs';
const SHEET_NAME = '';
const NOTIFY_EMAIL = '453501359@qq.com'; // QQ 邮箱地址

function doGet(e) {
  return ContentService.createTextOutput('ok');
}

function doPost(e) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = SHEET_NAME ? ss.getSheetByName(SHEET_NAME) : ss.getSheets()[0];

    const p = (e && e.parameter) ? e.parameter : {};

    const name = String(p.name || '').trim();
    const phone = String(p.phone || '').trim();
    const company = String(p.company || '').trim();
    const message = String(p.message || '').trim();
    const source = String(p.source || 'website').trim();
    const redirect = String(p.redirect || 'https://www.honedao.com/thanks.html').trim();

    // 写入数据到 Google Sheets
    sheet.appendRow([new Date(), name, phone, company, message, source]);

    // 发送邮件通知到 QQ 邮箱
    try {
      const emailSubject = '【官网咨询】新的营销方案询盘';
      const emailBody = `
新的表单提交：

姓名：${name || '未填写'}
电话：${phone || '未填写'}
公司名称：${company || '未填写'}
项目需求：${message || '未填写'}
来源：${source}
提交时间：${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}

---
此邮件由网站表单自动发送
      `.trim();

      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: emailSubject,
        body: emailBody
      });
    } catch (emailError) {
      // 如果邮件发送失败，记录错误但不影响表单提交
      Logger.log('邮件发送失败: ' + emailError.toString());
    }

    const safeRedirect = escapeHtml(redirect);

    const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="refresh" content="0; url=${safeRedirect}" />
  <title>提交中...</title>
</head>
<body>
  提交中...
  <script>
    window.top.location.replace(${JSON.stringify(redirect)});
  </script>
</body>
</html>`;

    return HtmlService
      .createHtmlOutput(html)
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

  } catch (err) {
    const html = `<!doctype html>
<html>
<head><meta charset="utf-8" /><title>错误</title></head>
<body>
  <h3>提交失败</h3>
  <pre>${escapeHtml(String(err))}</pre>
</body>
</html>`;
    return HtmlService.createHtmlOutput(html);
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

