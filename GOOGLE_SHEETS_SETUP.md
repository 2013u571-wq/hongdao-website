# Google Sheets 表单集成部署说明

## 📋 步骤 1：部署 Google Apps Script

1. **打开 Google Sheets**
   - 访问：https://sheets.google.com
   - 打开你的表格（ID: `1wFy9FS7RQQQDt00H-xVnDSvKSX58eWdAxD6hH51vTQs`）

2. **打开 Apps Script**
   - 点击菜单：`扩展程序` → `Apps 脚本`

3. **粘贴代码**
   - 删除默认代码
   - 复制 `google-apps-script.js` 文件中的完整代码
   - 粘贴到编辑器

4. **保存项目**
   - 点击 `保存` 图标（或按 `Ctrl+S` / `Cmd+S`）
   - 给项目命名（例如：`网站表单处理器`）

5. **部署为 Web 应用**
   - 点击 `部署` → `新建部署`
   - 点击 `选择类型` → 选择 `Web 应用`
   - 设置：
     - **说明**：网站表单提交（可选）
     - **执行身份**：选择 `我`
     - **具有访问权限的用户**：选择 `任何人`
   - 点击 `部署`
   - **重要**：复制生成的 Web App URL（类似：`https://script.google.com/macros/s/.../exec`）

6. **授权权限**
   - 首次部署会要求授权
   - 点击 `查看权限` → 选择你的 Google 账号
   - 点击 `高级` → `前往 [项目名称]（不安全）`
   - 点击 `允许` 授权

## 📋 步骤 2：配置网站表单

1. **打开 `index.html` 文件**

2. **找到表单代码**（约第 776 行）

3. **替换 Web App URL**
   - 找到：`action="YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL"`
   - 替换为你的实际 Web App URL
   - 例如：`action="https://script.google.com/macros/s/AKfycbz.../exec"`

## 📋 步骤 3：测试表单

1. **测试提交**
   - 在网站上填写表单并提交
   - 检查是否跳转到 `thanks.html` 页面

2. **检查 Google Sheets**
   - 打开你的 Google Sheets
   - 查看是否有新数据写入（包含：时间、姓名、电话、公司、需求、来源）

3. **检查邮箱**
   - 查看 `453501359@qq.com` 邮箱
   - 应该收到新表单提交的邮件通知

## ⚠️ 注意事项

1. **Google Sheets 表头**
   - 确保表格第一行有表头（如果没有，脚本会自动添加）
   - 建议表头顺序：`时间`、`姓名`、`电话`、`公司名称`、`项目需求`、`来源`

2. **邮件通知**
   - 首次发送邮件可能需要授权
   - 如果收不到邮件，检查：
     - QQ 邮箱的垃圾邮件文件夹
     - Google Apps Script 的执行日志（查看是否有错误）

3. **Web App URL 更新**
   - 如果修改了 Apps Script 代码，需要重新部署
   - 新部署会生成新的 URL，需要更新网站表单的 `action` 属性

4. **重定向 URL**
   - 当前设置为：`https://www.honedao.com/thanks.html`
   - 如需修改，编辑表单中的隐藏字段：`<input type="hidden" name="redirect" value="...">`

## 🔍 调试方法

如果表单提交失败：

1. **检查浏览器控制台**
   - 按 `F12` 打开开发者工具
   - 查看 `Console` 标签是否有错误

2. **检查 Google Apps Script 日志**
   - 在 Apps Script 编辑器中
   - 点击 `执行` → 查看执行日志

3. **测试 Web App**
   - 在浏览器中直接访问你的 Web App URL
   - 应该显示 `ok`（表示 GET 请求正常）

## 📧 邮件通知格式

邮件将包含以下信息：
- 姓名
- 电话
- 公司名称
- 项目需求
- 来源
- 提交时间

邮件主题：`【官网咨询】新的营销方案询盘`

---

✅ 完成以上步骤后，表单即可正常工作！

