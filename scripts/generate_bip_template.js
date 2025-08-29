#!/usr/bin/env node

/**
 * 这个脚本用于生成 BIP 翻译模板
 * 使用方法: node generate_bip_template.js <BIP编号>
 * 例如: node generate_bip_template.js 32
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// 检查命令行参数
if (process.argv.length < 3) {
  console.error('请提供 BIP 编号');
  console.error('使用方法: node generate_bip_template.js <BIP编号>');
  process.exit(1);
}

// 获取 BIP 编号
const bipNumber = process.argv[2];
const paddedBipNumber = bipNumber.padStart(4, '0');

// 创建输出目录（如果不存在）
const outputDir = path.join(__dirname, '..', 'bip-translations');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 输出文件路径
const outputFile = path.join(outputDir, `bip-${paddedBipNumber}.html`);

// 检查文件是否已存在
if (fs.existsSync(outputFile)) {
  console.error(`错误: 文件 ${outputFile} 已存在。如果要覆盖，请先删除该文件。`);
  process.exit(1);
}

// 从 GitHub 获取原始 BIP 内容
const url = `https://raw.githubusercontent.com/bitcoin/bips/master/bip-${paddedBipNumber}.mediawiki`;

https.get(url, (res) => {
  if (res.statusCode !== 200) {
    console.error(`错误: 无法获取 BIP-${bipNumber}。状态码: ${res.statusCode}`);
    process.exit(1);
  }

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    // 解析 BIP 内容
    const titleMatch = data.match(/Title:\s*(.*)/);
    const authorMatch = data.match(/Author:\s*(.*)/);
    const statusMatch = data.match(/Status:\s*(.*)/);
    const typeMatch = data.match(/Type:\s*(.*)/);
    const createdMatch = data.match(/Created:\s*(.*)/);

    const title = titleMatch ? titleMatch[1] : 'Unknown Title';
    const author = authorMatch ? authorMatch[1] : 'Unknown Author';
    const status = statusMatch ? statusMatch[1] : 'Unknown Status';
    const type = typeMatch ? typeMatch[1] : 'Unknown Type';
    const created = createdMatch ? createdMatch[1] : 'Unknown Date';

    // 生成 HTML 模板
    const htmlTemplate = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BIP-${paddedBipNumber}: ${title} - 比特币改进提案中文版</title>
  <link rel="stylesheet" href="../assets/css/style.css">
  <link rel="stylesheet" href="../assets/css/bip.css">
</head>
<body>
  <header>
    <h1>BIP-${paddedBipNumber}: ${title}</h1>
    <p><a href="../index.html">返回首页</a></p>
  </header>

  <main class="bip-content">
    <div class="bip-meta">
      <p><strong>BIP:</strong> ${bipNumber}</p>
      <p><strong>标题:</strong> ${title}</p>
      <p><strong>作者:</strong> ${author}</p>
      <p><strong>状态:</strong> ${status}</p>
      <p><strong>类型:</strong> ${type}</p>
      <p><strong>创建日期:</strong> ${created}</p>
    </div>

    <section>
      <h2>摘要</h2>
      <p>[在此处添加中文摘要]</p>
    </section>

    <section>
      <h2>动机</h2>
      <p>[在此处添加中文动机描述]</p>
    </section>

    <section>
      <h2>规范</h2>
      <p>[在此处添加中文规范描述]</p>
    </section>

    <!-- 根据原始 BIP 内容添加更多部分 -->

  </main>

  <footer>
    <p>本文档是 <a href="https://github.com/bitcoin/bips/blob/master/bip-${paddedBipNumber}.mediawiki">BIP-${paddedBipNumber}</a> 的中文翻译版本。</p>
    <p>原始内容采用 <a href="https://creativecommons.org/licenses/by/3.0/">创作共用署名 3.0 许可证</a>授权。</p>
    <p>翻译内容采用相同许可证授权。</p>
  </footer>
</body>
</html>`;

    // 写入文件
    fs.writeFileSync(outputFile, htmlTemplate);
    console.log(`成功生成 BIP-${bipNumber} 翻译模板: ${outputFile}`);
  });
}).on('error', (err) => {
  console.error(`错误: ${err.message}`);
  process.exit(1);
});