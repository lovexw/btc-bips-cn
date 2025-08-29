#!/bin/bash

# 部署脚本 - 用于将网站部署到 Cloudflare Pages

# 确保脚本在错误时退出
set -e

echo "开始部署到 Cloudflare Pages..."

# 检查是否安装了 Cloudflare CLI
if ! command -v wrangler &> /dev/null; then
    echo "错误: 未找到 wrangler CLI。请先安装 Cloudflare Wrangler CLI。"
    echo "可以通过运行 'npm install -g wrangler' 来安装。"
    exit 1
fi

# 构建网站（如果需要的话）
echo "构建网站..."
# 如果有构建步骤，可以在这里添加

# 部署到 Cloudflare Pages
echo "部署到 Cloudflare Pages..."
wrangler pages publish . --project-name=bip-bitcoin-cn

echo "部署完成！"