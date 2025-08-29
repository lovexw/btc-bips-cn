#!/bin/bash

# 移除 bips 目录的脚本

echo "开始移除 bips 目录..."

# 检查 bips 目录是否存在
if [ -d "bips" ]; then
  echo "删除 bips 目录..."
  git rm -rf bips
  echo "bips 目录已从 Git 仓库中移除。"
else
  echo "bips 目录不存在，无需移除。"
fi

# 提交更改
echo "提交更改..."
git commit -m "移除：删除不必要的 bips 目录"

# 推送到远程仓库
echo "推送到远程仓库..."
git push origin main

echo "移除完成！您的代码已经更新并推送到 GitHub 仓库。"
echo "现在 Cloudflare Pages 应该能够正确部署您的网站了。"