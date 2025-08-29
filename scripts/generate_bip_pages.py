#!/usr/bin/env python3
"""
自动生成 BIP 翻译页面的脚本
"""

import os
import json
import shutil
from string import Template

# BIP 模板
BIP_TEMPLATE = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BIP-$number: $title - 比特币改进提案中文版</title>
  <link rel="stylesheet" href="../assets/css/style.css">
  <link rel="stylesheet" href="../assets/css/bip.css">
</head>
<body>
  <header>
    <h1>BIP-$number: $title</h1>
    <p><a href="../index.html">返回首页</a></p>
  </header>

  <main class="bip-content">
    <div class="bip-meta">
      <p><strong>BIP:</strong> $number</p>
      <p><strong>标题:</strong> $title</p>
      <p><strong>作者:</strong> $author</p>
      <p><strong>状态:</strong> $status</p>
      <p><strong>类型:</strong> $type</p>
      <p><strong>层级:</strong> $layer</p>
    </div>

    <section id="abstract">
      <h2>摘要</h2>
      <p>此 BIP 的中文翻译正在进行中。您可以通过贡献翻译来帮助完成此文档。</p>
      <p>原始 BIP 可在 <a href="https://github.com/bitcoin/bips/blob/master/bip-$padded_number.mediawiki" target="_blank">GitHub</a> 上找到。</p>
    </section>

    <section id="translation-progress">
      <h2>翻译进度</h2>
      <p>此 BIP 的翻译尚未完成。如果您想贡献翻译，请参阅 <a href="../CONTRIBUTING.md">贡献指南</a>。</p>
    </section>
  </main>

  <footer>
    <p>本文档是 <a href="https://github.com/bitcoin/bips/blob/master/bip-$padded_number.mediawiki" target="_blank">BIP-$number</a> 的中文翻译版本。如发现翻译错误或有改进建议，请提交 Issue 或 Pull Request。</p>
    <p>&copy; 比特币改进提案中文版</p>
  </footer>
</body>
</html>
"""

def main():
    # 确保输出目录存在
    output_dir = "../bip-translations"
    os.makedirs(output_dir, exist_ok=True)
    
    # 读取 BIP 数据
    with open("../assets/data/bips.json", "r", encoding="utf-8") as f:
        bips = json.load(f)
    
    # 生成每个 BIP 的页面
    for bip in bips:
        number = bip["number"]
        padded_number = str(number).zfill(4)
        
        # 填充模板
        content = Template(BIP_TEMPLATE).substitute(
            number=number,
            padded_number=padded_number,
            title=bip["title"],
            author=bip["author"],
            status=bip.get("status", "未知"),
            type=bip.get("type", "未知"),
            layer=bip.get("layer", "未知")
        )
        
        # 写入文件
        output_file = os.path.join(output_dir, f"bip-{padded_number}.html")
        
        # 如果文件已存在，跳过
        if os.path.exists(output_file):
            print(f"跳过已存在的文件: {output_file}")
            continue
            
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(content)
            
        print(f"已生成: {output_file}")
    
    print("完成!")

if __name__ == "__main__":
    main()