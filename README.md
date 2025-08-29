# 比特币改进提案（BIPs）中文版

这个项目是 [Bitcoin Improvement Proposals (BIPs)](https://github.com/bitcoin/bips) 的中文翻译版本，旨在为中文比特币社区提供更好的技术文档支持。

## 项目介绍

比特币改进提案（BIP）是为比特币社区提供信息，或描述比特币或其流程或环境的新功能的设计文档。BIP 应该提供该功能的简明技术规范和该功能的基本原理。BIP 作者负责在社区内建立共识并记录不同意见。

本项目将所有重要的 BIP 文档翻译成中文，并提供一个易于浏览和搜索的网站界面。

## 网站功能

- **完整的 BIP 列表**：显示所有重要的 BIP，包括编号、层级、类型、状态、标题和作者
- **筛选功能**：可以按层级（共识、应用、流程）、类型（标准、信息、流程）和状态（草稿、提议、活跃等）筛选
- **搜索功能**：可以在 BIP 列表中搜索关键词
- **排序功能**：可以点击表头对 BIP 列表进行排序
- **翻译页面**：提供重要 BIP 的中文翻译

## 如何使用

1. 访问网站：[比特币改进提案中文版](https://btc-bips-cn.pages.dev)（部署后的链接）
2. 使用搜索框查找特定的 BIP
3. 使用筛选功能按层级、类型或状态筛选 BIP
4. 点击 BIP 编号查看详细的中文翻译

## 本地开发

如果您想在本地运行此项目：

```bash
# 克隆仓库
git clone https://github.com/lovexw/btc-bips-cn.git
cd btc-bips-cn

# 使用 Python 的内置 HTTP 服务器
python3 -m http.server 8000
```

然后在浏览器中访问 `http://localhost:8000` 查看网站。

## 贡献指南

我们欢迎社区成员参与翻译和改进工作。如果您想贡献，请遵循以下步骤：

1. Fork 这个仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-translation`)
3. 提交您的更改 (`git commit -m '添加了 BIP-XXX 的翻译'`)
4. 推送到分支 (`git push origin feature/amazing-translation`)
5. 创建一个 Pull Request

## 翻译规范

为了保持翻译质量和一致性，请遵循以下规范：

1. 保持专业术语的一致性，参考已有翻译
2. 保留原文中的代码示例和技术参数
3. 确保翻译准确表达原文的技术含义
4. 对于难以翻译的专业术语，可以保留英文原文并在首次出现时提供中文解释

## 许可证

本项目采用与原始 BIPs 相同的许可证：[创作共用署名 3.0 许可证](https://creativecommons.org/licenses/by/3.0/)。

## 联系方式

如有问题或建议，请通过 GitHub Issues 与我们联系。

## 致谢

感谢所有为比特币生态系统做出贡献的开发者和翻译者。