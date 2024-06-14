---
prev: false
next: false
description: Learn the best practices in logging!
---

# Logging

Logging is a very useful debugging tool for developers. You can look at the console or the log file to see if everything ran correctly, or if errors occured.

Where you have to be careful though is the fact that writing to the console can create game lag/stuttering due to how the console works. This article goes through the best practices in utilizing the Logger.

## Logger Setup

When using BepInEx, you may notice that it typically comes with the following `Awake` method:

```csharp
private void Awake() 
{
    // Plugin startup logic
    Logger.LogInfo($"Plugin {PluginInfo.PLUGIN_GUID} is loaded!"); // [!code highlight]
}
```

The highlighted line uses the Logger to log to the console and log file that your plugin has loaded. In the console, this may look like the following:

![A Plugin Loaded Log called from Awake in the Console](/images/logging/examplebepinexlog.png)

There's an issue currently present, you can only access the `Logger` from the `Plugin` class. If you want to access it from any patch or behaviour classes, it's currently inaccessible!

To solve that, we have to make a field that can be accessed internally:

```csharp
internal new static ManualLogSource Logger; // [!code highlight]

private void Awake() 
{
    Logger = base.Logger; // [!code highlight]
    
    // Plugin startup logic
    Logger.LogInfo($"Plugin {PluginInfo.PLUGIN_GUID} is loaded!");
}
```

Two things happen here; first we create the field that can be referenced by our other classes in our mod.

Doing so, we use the `internal` access modifier to only allow our project code to access the field. We also use `static` to allow our other classes to easily access the logger by doing `Plugin.Logger`; and finally we use `new` to tell the compiler that we are intentionally overriding the `Logger` field from the `BaseUnityPlugin` class.

```csharp
internal new static ManualLogSource Logger;
```

Next, we set that field to the Logger given by BepInEx. Since we are overriding it, we use `base.Logger` to reference `Logger` from the `BaseUnityPlugin` we inherit from.

```csharp
private void Awake() 
{
    Logger = base.Logger; // [!code focus]
    
    // Plugin startup logic
    Logger.LogInfo($"Plugin {PluginInfo.PLUGIN_GUID} is loaded!");
}
```

Now that we done that, we can access the Logger!

## Using the Logger

So, you have a patch and want to log info to the console during it. For example, we want to log the item name when an item is picked up. We can patch the `GrabbableObject.EquipItem` method, and then get the item's name:

```csharp
[HarmonyPostfix]
[HarmonyPatch(typeof(GrabbableObject), nameof(GrabbableObject.EquipItem))]
private void EquipItemPostfix(GrabbableObject __instance)
{
    var itemName = __instance.itemProperties.itemName;
}
```

Now we can log it! To do so, we just add one line:

```csharp
[HarmonyPostfix]
[HarmonyPatch(typeof(GrabbableObject), nameof(GrabbableObject.EquipItem))]
private void EquipItemPostfix(GrabbableObject __instance)
{
    var itemName = __instance.itemProperties.itemName;
    Plugin.Logger.LogDebug(itemName); // [!code ++]
}
```

Notice how we use `.LogDebug()` here instead of `.LogInfo()`. This is where the best practices come into play.

## Best Practices

### Debug Logging

Because logging to the console can cause the game to stutter, we'd like to avoid doing so whenever possible. However, we still would like to know what we log!

We can do so by using `.LogDebug()`. This will log to the console, but with a lower "priority" so that it is only visible if we specify so in our BepInEx config.

To view debug logs, you can change the following in your BepInEx config located at `BepInEx/config/BepInEx.cfg`:

```yaml
[Logging.Console]

#...

## Which log levels to show in the console output.
# Setting type: LogLevel
# Default value: Fatal, Error, Warning, Message, Info
# Acceptable values: None, Fatal, Error, Warning, Message, Info, Debug, All
# Multiple values can be set at the same time by separating them with , (e.g. Debug, Warning)
LogLevels = Fatal, Error, Warning, Message, Info // [!code --]
LogLevels = All // [!code ++]

[Logging.Disk]

#...

## Which log levels are saved to the disk log output.
# Setting type: LogLevel
# Default value: Fatal, Error, Warning, Message, Info
# Acceptable values: None, Fatal, Error, Warning, Message, Info, Debug, All
# Multiple values can be set at the same time by separating them with , (e.g. Debug, Warning)
LogLevels = Fatal, Error, Warning, Message, Info // [!code --]
LogLevels = All // [!code ++]
```

By default, if a player uses the BepInEx version pinned on Thunderstore, the `[Logging.Disk]` `LogLevels` setting will automatically be set to `All`, more easily allowing you to debug based off "hidden" logs in the log file.

### Warning Logging

Sometimes you may have code that may not be used as intended, but will still function normally. To let users know this has occured, you can use `.LogWarning()`.

You may commonly see warnings logged by Unity when landing the ship, and this is a case where something isn't working right, but it can still continue functioning.

### Error Logging

Sometimes you need to log errors so that you can easily find it when someone runs into an issue and posts a log file. You can use `.LogError()` to do so.

:::warning
`LogError()` should only be used when an error occurs.
:::

Often times, there will be C# or Unity errors that display when an error occurs, limiting the need to use the method. But it can still be a useful piece of information when debugging.
