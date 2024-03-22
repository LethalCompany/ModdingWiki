---
prev: false
next: true
description: 关于如何为致命公司模组实现自定义配置的中间概述。
---

# 自定义配置

:::warning
**这是一篇进阶文章。 虽然本文介绍了一些 C# 概念，但强烈建议在阅读本文<i>之前</i>了解 C# 和修改此游戏的基础知识。**
:::

:::info
本教程摘录并改编自 [BepInEx 配置文档](https://docs.bepinex.dev/articles/dev_guide/plugin_tutorial/4_configuration.html)。 更多资源请参阅。
:::

## 创建配置条目

创建一个配置类并为你想要配置的任何变量添加条目。

```cs
public class Config
{
    public static ConfigEntry<string> configGreeting;
    public static ConfigEntry<bool> configDisplayGreeting;

    // ...
}
```

然后我们可以开始将配置条目绑定到我们刚刚在类构造函数中创建的字段。

```cs
public Config(ConfigFile cfg)
{
    configGreeting = cfg.Bind(
            "General",                          // 配置部分
            "GreetingText",                     // 此配置的键
            "Hello, world!",                    // 默认值
            "Greeting text upon game launch"    // Description
    );
    
    configDisplayGreeting = cfg.Bind(
            "General.Toggles",                  // 配置子部分
            "DisplayGreeting",                  // 此配置的键
            true,                               // 默认值
            "To show the greeting text"         // 描述
    );
}
```

然后，我们需要运行所述构造函数，将所述配置绑定到用户的正确值和属性。<br><br>
在主类（通常为 `Plugin.cs`）中，使用引用将由 BepInEx 创建的文件的参数来实现构造函数。

```cs
public class MyExampleMod : BaseUnityPlugin
{
    public static new Config MyConfig { get; internal set; }

    // ...

    private void Awake()
    {
        MyConfig = new(base.Config);
    }
}
```

## 使用配置条目

现在，你可以使用 `.Value` 属性从创建的配置变量中获取数据。

```cs
private void MyExamplePatch()
{
    private void MyExampleMethod()
    {
        // 而不仅仅是 Logger.LogInfo("Hello, world!")
        if(Config.configDisplayGreeting.Value)
            Logger.LogInfo(Config.configGreeting.Value);
    }
}
```

:::danger 停
注意你的配置文件**不会被创建**，直到模组在游戏中加载**至少一次**。 请参阅 [r2modman 配置页面](/installation/configuration) 以了解如何使用你的配置。
:::

现在你已经有了模组的配置文件！ 如果你的模组有一个对每个玩家都相同的配置值及其重要，请考虑阅读 [自定义配置同步](/dev/intermediate/custom-config-syncing) 上的页面。
