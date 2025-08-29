# 项目部署指南

本文档将指导您如何将比特币改进提案（BIPs）中文版网站部署到 GitHub 仓库并通过 Cloudflare Pages 进行发布。

## 1. 将代码推送到 GitHub 仓库

您已经创建了 GitHub 仓库 `https://github.com/lovexw/btc-bips-cn`，现在需要将本地代码推送到该仓库。

### 初始化 Git 仓库并推送代码

```bash
# 初始化 Git 仓库
git init

# 添加远程仓库
git remote add origin https://github.com/lovexw/btc-bips-cn.git

# 添加所有文件到暂存区
git add .

# 提交更改
git commit -m "初始提交：比特币改进提案（BIPs）中文版网站"

# 推送到主分支
git push -u origin main
```

如果您的默认分支是 `master` 而不是 `main`，请使用以下命令：

```bash
git push -u origin master
```

## 2. 在 Cloudflare Pages 上部署网站

### 步骤 1: 登录 Cloudflare 账户

1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 使用您的账户登录

### 步骤 2: 创建新的 Pages 项目

1. 在左侧导航栏中点击 "Pages"
2. 点击 "创建项目" 按钮
3. 选择 "连接到 Git" 选项
4. 授权 Cloudflare 访问您的 GitHub 账户
5. 从列表中选择 `lovexw/btc-bips-cn` 仓库
6. 点击 "开始设置" 按钮

### 步骤 3: 配置构建设置

由于这是一个静态网站，您可以使用以下设置：

- **项目名称**: `btc-bips-cn`（或您喜欢的任何名称）
- **生产分支**: `main`（或 `master`，取决于您的默认分支）
- **构建命令**: 留空（因为这是纯静态网站，无需构建）
- **构建输出目录**: 留空（使用根目录）
- **环境变量**: 无需添加

### 步骤 4: 部署网站

1. 点击 "保存并部署" 按钮
2. 等待部署完成（通常只需几分钟）
3. 部署完成后，Cloudflare 会提供一个 URL（通常是 `https://项目名称.pages.dev`）

### 步骤 5: 配置自定义域名（可选）

如果您想使用自定义域名：

1. 在项目页面中，点击 "自定义域" 选项卡
2. 点击 "设置自定义域" 按钮
3. 输入您的域名（例如 `bips.yourwebsite.com`）
4. 按照 Cloudflare 提供的说明配置 DNS 记录

## 3. 自动部署设置

Cloudflare Pages 会自动监听您的 GitHub 仓库变更。每当您推送新的提交到主分支时，Cloudflare 会自动重新部署您的网站。

## 4. 本地开发与测试

在推送更改之前，您可以在本地测试您的网站：

```bash
# 使用 Python 的内置 HTTP 服务器
python3 -m http.server 8000
```

然后在浏览器中访问 `http://localhost:8000` 查看网站。

## 5. 维护与更新

### 添加新的 BIP 翻译

1. 在 `bip-translations` 目录中创建新的 HTML 文件（例如 `bip-0008.html`）
2. 更新 `assets/data/bips.json` 文件，添加新的 BIP 信息
3. 如果是重要的 BIP，可以在首页的 "热门 BIP" 部分添加链接

### 使用自动化脚本

您可以使用项目中的自动化脚本来帮助生成新的 BIP 翻译页面：

```bash
# 生成 BIP 翻译页面模板
python3 scripts/generate_bip_pages.py

# 更新网站内容
bash scripts/update_website.sh
```

## 6. 贡献指南

如果您希望其他人参与翻译工作，可以在 GitHub 仓库的 README.md 中添加贡献指南，说明如何提交翻译和改进建议。

## 7. 故障排除

如果您在部署过程中遇到问题，请检查：

1. GitHub 仓库是否成功推送了所有文件
2. Cloudflare Pages 的构建日志是否有错误信息
3. 确保所有文件路径和链接都是相对路径，而不是绝对路径

如需进一步帮助，可以参考 [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)。