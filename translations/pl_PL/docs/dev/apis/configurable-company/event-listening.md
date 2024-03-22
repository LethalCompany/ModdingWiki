---
prev: true
next: false
description: How to listen to Configurable Company raised events and what events you can listen to.
---

# Developing Events with Configurable Company

## What is an Event

Events are functions that allow developers to trigger actions when a specific action happens.

Configurable company allows the developer to listen to some useful events related to the configurations and the workflow of the plugin itself.

## Listening to events

There are multiple events you can listen to. All of them inside the `Events` class inside the `Amrv.ConfigurableCompany` namespace.

To start listening a certain event, you need to subscribe to it. To do you can follow the code below:

```csharp

Events.ConfigurationChanged.AddListener(MyMethodListener);

void MyMethodListener(object sender, ConfigurationChanged configChangedEvent) {
    // Insert something you want to execute when a configuration changes it's value.
}

```

The provided event `ConfigurationChanged` contains all the information you might need to use the event properly.

:::info
Note that all the events have `object sender` as their first argument.
:::

## Events

| Event name           | Description                                                                                                                                               | Argument Type        |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| ConfigurationChanged | Listens to any change on a configuration value and holds the reason on why did it change among the configuration that changed and the old and new values. | ConfigurationChanged |
| ConfigurationCreated | Listens to any creation of configuration and holds the configuration that was created.                                                                    | ConfigurationCreated |
| PluginInitialized    | Called once, this event triggers when the **ConfigurableCompany** plugin ended initializating all the resources that needed.                              | EventArgs            |
| PluginSetup          | Called once, this event triggers when the **ConfigurableCompany** plugin ended setting up the content and patching methods.                               | EventArgs            |
| PluginEnabled        | Called once, this even triggers when the **ConfigurableCompany** plugin completed the boot up and is ready to work.                                       | EventArgs            |
| BeforeMenuDisplay    | Called every time the in-game configuration menu starts to display.                                                                                       | EventArgs            |
| AfterMenuDisplay     | Called every time the in-game configuration menu is displayed.                                                                                            | EventArgs            |

:::tip
If you want an in-depth guide on how this event pattern works, you can follow [this microsoft guide](https://learn.microsoft.com/en-us/dotnet/standard/events/#event-handlers).
:::
