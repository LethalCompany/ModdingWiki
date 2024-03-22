---
prev: false
next: true
description: 使用 CSync 库在主机和客户端之间同步 BepInEx 配置文件的指南。
---

# CSync（配置同步库）

## 设置

有两种方法可以依赖 **CSync**，但我推荐使用 [NuGet 包](https://www.nuget.org/packages/Owen3H.BepInEx.CSync)。<br>
与 Thunderstore 不同的是，这将自动包含程序集引用和文档。

### NuGet（推荐）

**1**. 在 Visual Studio 中打开终端。<br>
**2**. 运行以下命令。

```console
dotnet add package Owen3H.BepInEx.CSync
```

此外，你也可以通过 **NuGet** 软件包管理器以可视方式安装。

**1**. 前往“`项目 > 管理 NuGet 软件包`”。<br>
**2**. 搜索并选择 `Owen3H.BepInEx.CSync` 软件包。<br>
**3**. 选择最新版本并点击安装。

### Thunderstore（手动）

**1**. 在 [Thunderstore 页面](https://thunderstore.io/c/lethal-company/p/Owen3H/CSync/)上下载最新版本的库。<br>
**2**. 将 ZIP 解压到你的游戏目录根目录中。<br>
**3**. 在你的模组项目中，将**程序集引用**添加到 `../BepInEx/plugins/CSync.dll`。

## 概述

- [使用指南](/dev/apis/csync/usage-guide) - 该库的使用指南/教程。
- [迁移至 v2](/dev/apis/csync/v2-migration) - 如何从 v1 更新到 v2。
- [故障排除](/dev/apis/csync/outdated/troubleshooting) - 常见问题及其解决方案。 （v2 以前）
