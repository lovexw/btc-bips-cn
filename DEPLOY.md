# 部署指南

本文档提供了将比特币改进提案（BIP）中文版网站部署到 GitHub 和 Cloudflare Pages 的详细步骤。

## 部署到 GitHub

### 1. 创建 GitHub 仓库

1. 登录您的 GitHub 账户
2. 点击右上角的 "+" 图标，选择 "New repository"
3. 仓库名称设置为 "bip-bitcoin-cn"
4. 添加描述："比特币改进提案（BIP）中文版"
5. 选择公开仓库
6. 点击 "Create repository"

### 2. 初始化本地 Git 仓库并推送到 GitHub

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "初始提交：BIP 中文版网站"

# 添加远程仓库
git remote add origin https://github.com/您的用户名/bip-bitcoin-cn.git

# 推送到 GitHub
git push -u origin main
```

## 部署到 Cloudflare Pages

### 1. 注册 Cloudflare 账户

如果您还没有 Cloudflare 账户，请前往 [Cloudflare](https://dash.cloudflare.com/sign-up) 注册。

### 2. 设置 Cloudflare Pages

1. 登录 Cloudflare 控制面板
2. 点击左侧菜单中的 "Pages"
3. 点击 "创建项目" 按钮
4. 选择 "连接到 Git"
5. 授权 Cloudflare 访问您的 GitHub 账户
6. 选择 "bip-bitcoin-cn" 仓库
7. 配置构建设置：
   - 项目名称：bip-bitcoin-cn
   - 生产分支：main
   - 构建命令：留空（这是静态网站，不需要构建命令）
   - 构建输出目录：/（根目录）
8. 点击 "保存并部署"

### 3. 配置自定义域名（可选）

1. 在 Cloudflare Pages 项目中，点击 "自定义域"
2. 点击 "设置自定义域"
3. 输入您想要使用的域名（例如 bip-cn.example.com）
4. 按照 Cloudflare 的指示配置 DNS 记录
5. 等待 DNS 传播完成

## 持续集成/持续部署 (CI/CD)

Cloudflare Pages 会自动监控您的 GitHub 仓库。每当您推送更改到 main 分支时，Cloudflare Pages 会自动重新部署您的网站。

## 本地测试

在推送到 GitHub 之前，您可以在本地测试网站：

```bash
# 使用 Python 启动本地服务器
python3 -m http.server 8000

# 或者使用 Node.js 的 http-server（需要先安装）
npx http-server -p 8000
```

然后在浏览器中访问 http://localhost:8000 查看网站。

## 更新网站

1. 添加或修改文件
2. 提交更改：
   ```bash
   git add .
   git commit -m "更新：添加新的 BIP 翻译"
   git push
   ```
3. Cloudflare Pages 将自动重新部署您的网站

## 故障排除

如果您在部署过程中遇到问题，请检查：

1. GitHub 仓库是否公开
2. Cloudflare Pages 构建日志中是否有错误
3. 文件权限是否正确
4. HTML、CSS 和 JavaScript 文件是否有语法错误

如需进一步帮助，请参考 [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)。