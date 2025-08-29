# 本地测试指南

本文档提供了如何在本地测试比特币改进提案(BIPs)中文版网站的详细说明。

## 方法1：使用提供的脚本

我们提供了一个简单的脚本来启动本地测试服务器：

```bash
./start-local-server.sh
```

然后在浏览器中访问 http://localhost:8000

## 方法2：手动启动服务器

### 使用Python 3

```bash
python3 -m http.server 8000
```

### 使用Python 2

```bash
python -m SimpleHTTPServer 8000
```

### 使用Node.js

```bash
npx http-server -p 8000
```

## 测试页面

我们提供了一个简单的测试页面，用于验证服务器是否正常工作：

http://localhost:8000/test.html

如果您能看到"测试成功！"的消息，说明本地服务器运行正常。

## 主要页面

- 首页：http://localhost:8000/index.html
- BIP-0001：http://localhost:8000/bip-translations/bip-0001.html
- 404页面：http://localhost:8000/404.html

## 常见问题

### 端口被占用

如果8000端口已被占用，您可以尝试使用其他端口，例如：

```bash
python3 -m http.server 8080
```

然后在浏览器中访问 http://localhost:8080

### 无法访问页面

确保您在项目的根目录下启动服务器。您可以通过以下命令检查当前目录：

```bash
pwd
```

确保输出显示的是项目的根目录路径。