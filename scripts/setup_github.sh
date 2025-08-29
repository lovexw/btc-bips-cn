#!/bin/bash

# 比特币改进提案（BIPs）中文版网站 - GitHub 设置脚本

echo "开始设置 GitHub 仓库..."

# 检查是否已经初始化了 Git 仓库
if [ -d ".git" ]; then
  echo "Git 仓库已经存在，跳过初始化步骤。"
else
  echo "初始化 Git 仓库..."
  git init
  echo "Git 仓库初始化完成。"
fi

# 检查远程仓库是否已经设置
if git remote | grep -q "origin"; then
  echo "远程仓库 'origin' 已经设置，正在更新 URL..."
  git remote set-url origin https://github.com/lovexw/btc-bips-cn.git
else
  echo "添加远程仓库..."
  git remote add origin https://github.com/lovexw/btc-bips-cn.git
fi

echo "远程仓库设置完成。"

# 添加所有文件到暂存区
echo "添加文件到暂存区..."
git add .

# 提交更改
echo "提交更改..."
git commit -m "初始提交：比特币改进提案（BIPs）中文版网站"

# 确定默认分支名称
default_branch=$(git symbolic-ref --short HEAD 2>/dev/null || echo "main")
echo "检测到默认分支: $default_branch"

# 推送到远程仓库
echo "推送到远程仓库..."
git push -u origin $default_branch

echo "设置完成！您的代码已经推送到 GitHub 仓库: https://github.com/lovexw/btc-bips-cn"
echo "现在您可以按照 SETUP.md 中的说明在 Cloudflare Pages 上部署您的网站。"