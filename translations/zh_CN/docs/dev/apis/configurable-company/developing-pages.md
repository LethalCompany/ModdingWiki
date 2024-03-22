---
prev: true
next: true
description: 如何为插件创建 Configurable Company 页面以及如何使用这些页面。
---

# 使用 Configurable Company 开发页面

在这里，你将了解什么是页面、如何创建和使用页面。

## 什么是页面

游戏内菜单提供了一种简便的方法，可将配置和类别分配到**页面**中，这样用户就能看到是哪个插件添加了某些配置，而开发者也能拥有一个保留面板，这样就不会与其他插件发生冲突。

## 创建页面

创建页面是最简单的操作。 调用 `LethalConfiguration.CreatePage()` ，它将为你提供所需的生成器。

下面是一个如何创建页面的示例：

:::info
如果不知道某个参数的作用，请查看 [参数](#parameters) 部分。
:::

```csharp
ConfigurationPage page = LethalConfiguration.CreatePage()
    .SetName("My plugin page")
    .Build();
```

:::tip
如果将构建器分配给 `ConfigurationPage`，则不必调用 `Build()` ，因为它会隐式调用构建方法来创建页面。
:::

## 参数

- `SetName(string)`：将显示在游戏内菜单上的名称。

## 使用页面

要使用页面，需要存储页面变量本身，并为其分配[配置类别](/dev/apis/configurable-company/developing-categories.md)。

`ConfigurationCategoryBuilder.SetPage(page)`

:::tip
你可以将页面声明为 `internal static readonly` 变量，以便在项目中的任何位置访问它们。
:::
