---
prev: true
next: false
description: 如何监听 Configurable Company 引发的事件，以及可以监听哪些事件。
---

# 使用 Configurable Company 开发事件

## 什么是事件

Events are functions that allow developers to trigger actions when a specific action happens.

Configurable company allows the developer to listen to some useful events related to the configurations and the workflow of the plugin itself.

## 监听事件

There are multiple events you can listen to. All of them inside the `Events` class inside the `Amrv.ConfigurableCompany` namespace.

To start listening a certain event, you need to subscribe to it. To do you can follow the code below:

```csharp

Events.ConfigurationChanged.AddListener(MyMethodListener);

void MyMethodListener(object sender, ConfigurationChanged configChangedEvent) {
    // 当配置值发生变化时，插入你希望执行的内容。
}

```

The provided event `ConfigurationChanged` contains all the information you might need to use the event properly.

:::info
请注意，所有事件的第一个参数都是 `object sender`。
:::

## 事件

| 事件名称                 | 描述                                                                                                                                                        | 参数类型                 |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| ConfigurationChanged | Listens to any change on a configuration value and holds the reason on why did it change among the configuration that changed and the old and new values. | ConfigurationChanged |
| ConfigurationCreated | Listens to any creation of configuration and holds the configuration that was created.                                                                    | ConfigurationCreated |
| PluginInitialized    | Called once, this event triggers when the **ConfigurableCompany** plugin ended initializating all the resources that needed.                              | EventArgs            |
| PluginSetup          | Called once, this event triggers when the **ConfigurableCompany** plugin ended setting up the content and patching methods.                               | EventArgs            |
| PluginEnabled        | Called once, this even triggers when the **ConfigurableCompany** plugin completed the boot up and is ready to work.                                       | EventArgs            |
| BeforeMenuDisplay    | Called every time the in-game configuration menu starts to display.                                                                                       | EventArgs            |
| AfterMenuDisplay     | Called every time the in-game configuration menu is displayed.                                                                                            | EventArgs            |

:::tip
如果你想深入了解该事件模式的工作原理，可以参考 [这份 Microsoft 指南](https://learn.microsoft.com/zh-cn/dotnet/standard/events/#event-handlers)。
:::
