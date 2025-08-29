#!/bin/bash
# 更新比特币改进提案中文版网站的脚本

# 确保脚本在正确的目录中运行
cd "$(dirname "$0")/.." || exit

echo "正在更新比特币改进提案中文版网站..."

# 1. 从原始 BIP 仓库获取最新更新
if [ -d "bips" ]; then
  echo "更新原始 BIP 仓库..."
  cd bips || exit
  git pull
  cd ..
else
  echo "克隆原始 BIP 仓库..."
  git clone https://github.com/bitcoin/bips.git
fi

# 2. 生成 BIP 翻译页面
echo "生成 BIP 翻译页面..."
cd scripts || exit
python3 generate_bip_pages.py
cd ..

# 3. 提交更改
echo "提交更改到 Git..."
git add .
git commit -m "更新网站内容 $(date +%Y-%m-%d)"

echo "完成! 现在您可以推送更改到 GitHub:"
echo "git push origin main"