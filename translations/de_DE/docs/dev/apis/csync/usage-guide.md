---
prev: false
next: false
description: The main guide to using CSync.
---

# Guide to using CSync

## 1. Creating a serializable config class

To begin, we will create a new class that will inherit from `SyncedConfig`.<br>
We must then add the `[DataContract]` attribute for this to be synced with clients.

```cs
[DataContract]
public class ExampleConfig : SyncedConfig<ExampleConfig>
```

Within this class, we can now begin writing out our config entries that we want to sync using `SyncedEntry`.
We must also mark them with the `[DataMember]` attribute for the serializer to recognize them.

```cs
[DataContract]
public class ExampleConfig : SyncedConfig<ExampleConfig> {
    public ConfigEntry<float> DISPLAY_DEBUG_INFO { get; private set; }

    [DataMember] public SyncedEntry<float> MOVEMENT_SPEED { get; private set; } // [!code ++]
    [DataMember] public SyncedEntry<float> CLIMB_SPEED { get; private set; } // [!code ++]
}
```

## 2. Binding config entries

Before binding, we must do a few things.<br>
To begin, make sure your config constructor implements `base()` with the GUID of your mod.

```cs
public ExampleConfig(ConfigFile cfg) : base("MyModName")
```

Then, add the following line at the top of this constructor.

```cs
ConfigManager.Register(this);
```

We can now bind our entries to the **BepInEx** config file like usual, however we will use the dedicated `BindSyncedEntry` extension method provided by **CSync**.

```cs
public ExampleConfig(ConfigFile cfg) : base("MyModName") {
    ConfigManager.Register(this);

    MOVEMENT_SPEED = cfg.BindSyncedEntry("Movement", "fMovementSpeed", 4.1f,
        "The base speed at which the player moves. This is NOT a multiplier."
    );

    CLIMB_SPEED = cfg.BindSyncedEntry("Movement", "fClimbSpeed", 3.9f,
        "The base speed at which the player climbs. This is NOT a multiplier."
    );
}
```

## Finalizing and Publishing

It is recommended you inform **BepInEx** that you depend upon **CSync**.<br>
You can do this by adding a `BepInDependency` attribute and specifying the GUID of this library.

```cs
[BepInPlugin(PluginInfo.PLUGIN_GUID, PluginInfo.PLUGIN_NAME, PluginInfo.PLUGIN_VERSION)]
[BepInDependency("io.github.CSync")] // [!code ++]
public class MyPlugin : BaseUnityPlugin
```

If you plan to upload your mod to **Thunderstore**, make sure you also specify the dependency within your `manifest.json` file by adding its **Thunderstore** ID to the array.

```json
"dependencies": ["BepInEx-BepInExPack-5.4.2100", "Owen3H-CSync-2.0.0"]
```

:::info NOTE
Please ensure your manifest contains the latest version, the one seen above may be outdated!
:::
