#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
BIP 翻译页面生成器

这个脚本用于生成 BIP 翻译页面的模板，方便翻译工作。
它会读取 assets/data/bips.json 文件，为每个 BIP 生成一个基本的 HTML 模板。
"""

import json
import os
import sys
from datetime import datetime

# 配置
BIPS_JSON_PATH = 'assets/data/bips.json'
OUTPUT_DIR = 'bip-translations'
TEMPLATE = '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BIP-{bip_number_padded}: {bip_title} - 比特币改进提案中文版</title>
  <link rel="stylesheet" href="../assets/css/style.css">
  <link rel="stylesheet" href="../assets/css/bip.css">
  <meta name="description" content="BIP-{bip_number} {bip_title} 的中文翻译 - 比特币改进提案(BIPs)中文版">
</head>
<body>
  <header>
    <h1>BIP-{bip_number_padded}: {bip_title}</h1>
    <p><a href="../index.html">返回首页</a></p>
  </header>

  <main class="bip-content">
    <div class="bip-meta">
      <p><strong>BIP:</strong> {bip_number}</p>
      <p><strong>标题:</strong> {bip_title}</p>
      <p><strong>作者:</strong> {bip_author}</p>
      <p><strong>状态:</strong> {bip_status}</p>
      <p><strong>类型:</strong> {bip_type}</p>
      <p><strong>层级:</strong> {bip_layer}</p>
      <p><strong>创建日期:</strong> [待填写]</p>
    </div>

    <div class="bip-abstract">
      <h2>摘要</h2>
      <p>[在此处添加 BIP 的摘要翻译]</p>
    </div>

    <div class="bip-motivation">
      <h2>动机</h2>
      <p>[在此处添加 BIP 的动机翻译]</p>
    </div>

    <div class="bip-description">
      <h2>描述</h2>
      <p>[在此处添加 BIP 的详细描述翻译]</p>
    </div>

    <div class="bip-rationale">
      <h2>基本原理</h2>
      <p>[在此处添加 BIP 的基本原理翻译]</p>
    </div>

    <div class="bip-compatibility">
      <h2>向后兼容性</h2>
      <p>[在此处添加 BIP 的向后兼容性翻译]</p>
    </div>

    <div class="bip-reference">
      <h2>参考实现</h2>
      <p>[在此处添加 BIP 的参考实现翻译或链接]</p>
    </div>

    <div class="bip-copyright">
      <h2>版权</h2>
      <p>本 BIP 采用 <a href="https://creativecommons.org/licenses/by/3.0/">创作共用署名 3.0 许可证</a>授权。</p>
    </div>
  </main>

  <footer>
    <p>翻译日期: {current_date}</p>
    <p>原文链接: <a href="https://github.com/bitcoin/bips/blob/master/bip-{bip_number_padded}.mediawiki">BIP-{bip_number}</a></p>
    <p>本网站是 <a href="https://github.com/bitcoin/bips">比特币 BIPs</a> 的中文翻译版本。</p>
    <p>原始内容采用 <a href="https://creativecommons.org/licenses/by/3.0/">创作共用署名 3.0 许可证</a>授权。</p>
    <p>翻译内容采用相同许可证授权。</p>
  </footer>
</body>
</html>
'''

def main():
    # 确保输出目录存在
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
    
    # 读取 BIPs 数据
    try:
        with open(BIPS_JSON_PATH, 'r', encoding='utf-8') as f:
            bips = json.load(f)
    except Exception as e:
        print(f"错误：无法读取 BIPs 数据文件：{e}")
        sys.exit(1)
    
    # 获取当前日期
    current_date = datetime.now().strftime('%Y-%m-%d')
    
    # 生成 BIP 翻译页面
    for bip in bips:
        bip_number = bip['number']
        bip_number_padded = str(bip_number).zfill(4)
        bip_title = bip['title']
        bip_author = bip['author']
        bip_status = bip['status']
        bip_type = bip['type']
        bip_layer = bip['layer']
        
        # 生成文件名
        filename = f"bip-{bip_number_padded}.html"
        filepath = os.path.join(OUTPUT_DIR, filename)
        
        # 如果文件已经存在，跳过
        if os.path.exists(filepath):
            print(f"跳过已存在的文件：{filename}")
            continue
        
        # 生成 HTML 内容
        html_content = TEMPLATE.format(
            bip_number=bip_number,
            bip_number_padded=bip_number_padded,
            bip_title=bip_title,
            bip_author=bip_author,
            bip_status=bip_status,
            bip_type=bip_type,
            bip_layer=bip_layer,
            current_date=current_date
        )
        
        # 写入文件
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(html_content)
            print(f"已生成：{filename}")
        except Exception as e:
            print(f"错误：无法写入文件 {filename}：{e}")
    
    print("完成！")

if __name__ == "__main__":
    main()