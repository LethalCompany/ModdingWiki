---
prev: false
next: false
description: 从 CSync v1 迁移到 v2 的指南。
---

# v2.0.0 迁移指南

The boilerplate from previous versions is now redundant as **CSync** will handle things itself.<br>
This means Steps 3 and 4 of the outdated guide are no longer necessary.

开始更新前，请将 `SyncedInstance` 替换为 `SyncedConfig`。<br>

```cs
MyConfig : SyncedInstance<MyConfig> // [!code --]
MyConfig : SyncedConfig<MyConfig> // [!code ++]
```

We will now register our config with **CSync** through `ConfigManager` instead of `InitInstance(this)`.
Notice how we specify our mod's GUID through `base()` to ensure it doesn't overlap with others behind the scenes.

```cs
public ExampleConfig(ConfigFile cfg) : base("MyModName") {
    InitInstance(this); // [!code --]
    ConfigManager.Register(this); // [!code ++]

    EXAMPLE_VAR = cfg.BindSyncedEntry("General", "bExampleVar", true, "这是一个将被同步的变量示例。");
}
```

**我们大功告成了！** 如果你以前有加入/留下补丁和请求/接收方法，你应该删除它们以防任何可能的问题。

**可选**<br>
此次更新还提供了 `SyncComplete` 事件，你可以根据需要挂接到该事件。

```cs
public ExampleConfig(ConfigFile cfg) : base("MyModName") {
    ConfigManager.Register(this);

    EXAMPLE_VAR = cfg.BindSyncedEntry("General", "bExampleVar", true, "这是一个将被同步的变量示例。");

    SyncComplete += DoSomethingAfterSync; // [!code ++]
}

public void DoSomethingAfterSync(object sender, EventArgs args) { // [!code ++]
    // 在此处运行一些逻辑 // [!code ++]
} // [!code ++]
```
