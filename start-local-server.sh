#!/bin/bash

echo "正在启动本地测试服务器..."
echo "请在浏览器中访问 http://localhost:8000"

# 尝试使用不同的HTTP服务器
if command -v python3 &> /dev/null; then
    echo "使用 Python 3 HTTP服务器"
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "使用 Python 2 HTTP服务器"
    python -m SimpleHTTPServer 8000
elif command -v npx &> /dev/null; then
    echo "使用 Node.js HTTP服务器"
    npx http-server -p 8000
else
    echo "错误：未找到可用的HTTP服务器。"
    echo "请安装Python或Node.js。"
    exit 1
fi