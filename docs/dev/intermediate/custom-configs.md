---
prev: false
next: true
description: An intermediate overview of how to implement custom configs for your Lethal Company mods.
---

# Custom Configs

::: warning
**This is an advanced article. While this introduces some C# concepts, it is highly recommended to understand C# and the basics of modding this game <i>before</i> reading this article.**
:::

::: info
This tutorial is taken and adapted from the [BepInEx Configuration Documentation](https://docs.bepinex.dev/articles/dev_guide/plugin_tutorial/4_configuration.html).<br> 
For more information refer to those docs.
:::

## 1. Create the Config
Begin by creating a `Config` class, then write out all the variables you want to be configurable.

```cs
public class Config
{
    public bool PLUGIN_ENABLED { get; private set; }
    public float MOVEMENT_SPEED { get; private set; }

    // ...
}
```

Implement the constructor with a parameter referencing the file that is created by **BepInEx**.<br>
Then we can start binding our config entries to the properties we just created.

```cs
public Config(ConfigFile cfg)
{
    PLUGIN_ENABLED = cfg.Bind(MyPluginInfo.GUID, "bPluginEnabled", true,
        "Enable or disable the plugin globally."
    ).Value;

    MOVEMENT_SPEED = cfg.Bind(MyPluginInfo.GUID, "fMovementSpeed", 6.9f,
        "The speed at which the local player moves."
    ).Value;
}
```

## 2. Initialize a new Config instance
In your main class (usually Plugin.cs), define a 'Config' property that will be initialized when the plugin is loaded.
You should have something similar to the following:

```cs
public class Plugin : BaseUnityPlugin {
    public static new Config Config { get; private set; }
    internal static new ManualLogSource Logger { get; private set; }

    private Harmony patcher;

    private void Awake() {
        Logger = base.Logger;
        Config = new(base.Config);

        try {
            patcher = new(MyPluginInfo.GUID);
            patcher.PatchAll();

            Logger.LogInfo("Plugin loaded.");
        } catch(Exception e) {
            Logger.LogError(e);
        }
    }
}
```

## 3. Using config variables
We can now use these client-side variables from any class by referencing `Plugin.Config`.

```cs
private void ExamplePatch(PlayerControllerB __instance) {
    __instance.movementSpeed = Plugin.Config.MOVEMENT_SPEED;
}
```

::: danger STOP
Your config file **Will Not Be Created** until your mod has been loaded by booting the game **at least once**.
See the [r2modman Configs Page](/installation/configuration) on how to to use configuration files.
:::

Now you have config files for your mods! If it's extremely important that your mod has a config value that's the same for every player, you may want to consider reading the page on [custom config syncing](/dev/intermediate/custom-config-syncing).
