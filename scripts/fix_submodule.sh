#!/bin/bash

# 修复子模块问题的脚本

echo "开始修复子模块问题..."

# 检查 bips 目录是否存在
if [ -d "bips" ]; then
  echo "删除现有的 bips 目录..."
  rm -rf bips
  echo "bips 目录已删除。"
fi

# 添加 bips 作为子模块
echo "添加 bips 作为 Git 子模块..."
git submodule add https://github.com/bitcoin/bips.git bips
echo "子模块添加完成。"

# 提交更改
echo "提交更改..."
git add .gitmodules bips
git commit -m "修复：将 bips 正确配置为 Git 子模块"

# 推送到远程仓库
echo "推送到远程仓库..."
git push origin main

echo "修复完成！您的代码已经更新并推送到 GitHub 仓库。"
echo "现在 Cloudflare Pages 应该能够正确部署您的网站了。"