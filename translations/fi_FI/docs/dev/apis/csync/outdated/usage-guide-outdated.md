---
prev: false
next: true
description: The main guide to using CSync.
---

# Guide to using CSync

## 1. Creating a serializable config class

To begin, we will create a new class that will inherit from `SyncedInstance`.<br>
We must then add the `[DataContract]` attribute for this to be synced with clients.

```cs
[DataContract]
public class Config : SyncedInstance<Config>
```

Within this class, we can now begin writing out our config entries that we want to sync.<br>
We must also mark them with the `[DataMember]` attribute for the serializer to recognize them.

```cs
[DataContract]
public class Config : SyncedInstance<Config> {
    public ConfigEntry<float> DISPLAY_DEBUG_INFO { get; private set; }

    [DataMember] public SyncedEntry<float> MOVEMENT_SPEED { get; private set; }
    [DataMember] public SyncedEntry<float> CLIMB_SPEED { get; private set; }
}
```

:::warning
When using client side and synced entries in the same class, any instance of `ConfigEntry` should **NOT** be marked with `[DataMember]` to avoid BepInEx runtime errors.
:::

## 2. Binding config entries

Before binding, we will add the following line at the top of the constructor.

```cs
InitInstance(this);
```

We can now bind our entries to the **BepInEx** config file like usual, however we will use the dedicated `BindSyncedEntry` extension method provided by **CSync**.

```cs
public Config(ConfigFile cfg) {
    InitInstance(this);

    MOVEMENT_SPEED = cfg.BindSyncedEntry("Movement", "fMovementSpeed", 4.1f,
        "The base speed at which the player moves. This is NOT a multiplier."
    );

    CLIMB_SPEED = cfg.BindSyncedEntry("Movement", "fClimbSpeed", 3.9f,
        "The base speed at which the player climbs. This is NOT a multiplier."
    );
}
```

## 3. Adding synchronization methods

We will now place the following methods within the class, making sure to replace `PluginInfo.PLUGIN_GUID` if it is defined elsewhere.

:::warning
If you specify a GUID that is not unique, your mod will conflict with other mods that use **CSync**.
:::

```cs
internal static void RequestSync() {
    if (!IsClient) return;

    using FastBufferWriter stream = new(IntSize, Allocator.Temp);

    // Method `OnRequestSync` will then get called on host.
    stream.SendMessage($"{PluginInfo.PLUGIN_GUID}_OnRequestConfigSync");
}

internal static void OnRequestSync(ulong clientId, FastBufferReader _) {
    if (!IsHost) return;

    byte[] array = SerializeToBytes(Instance);
    int value = array.Length;

    using FastBufferWriter stream = new(value + IntSize, Allocator.Temp);

    try {
        stream.WriteValueSafe(in value, default);
        stream.WriteBytesSafe(array);

        stream.SendMessage($"{PluginInfo.PLUGIN_GUID}_OnReceiveConfigSync", clientId);
    } catch(Exception e) {
        Plugin.Logger.LogError($"Error occurred syncing config with client: {clientId}\n{e}");
    }
}

internal static void OnReceiveSync(ulong _, FastBufferReader reader) {
    if (!reader.TryBeginRead(IntSize)) {
        Plugin.Logger.LogError("Config sync error: Could not begin reading buffer.");
        return;
    }

    reader.ReadValueSafe(out int val, default);
    if (!reader.TryBeginRead(val)) {
        Plugin.Logger.LogError("Config sync error: Host could not sync.");
        return;
    }

    byte[] data = new byte[val];
    reader.ReadBytesSafe(ref data, val);

    try {
        SyncInstance(data);
    } catch(Exception e) {
        Plugin.Logger.LogError($"Error syncing config instance!\n{e}");
    }
}
```

## 4. Apply Harmony patches

Add in the following method and make sure the GUID is defined just like the previous step.

```cs
[HarmonyPostfix]
[HarmonyPatch(typeof(PlayerControllerB), "ConnectClientToPlayerObject")]
public static void InitializeLocalPlayer() {
    if (IsHost) {
        MessageManager.RegisterNamedMessageHandler($"{PluginInfo.PLUGIN_GUID}_OnRequestConfigSync", OnRequestSync);
        Synced = true;

        return;
    }

    Synced = false;
    MessageManager.RegisterNamedMessageHandler($"{PluginInfo.PLUGIN_GUID}_OnReceiveConfigSync", OnReceiveSync);
    RequestSync();
}
```

Finally, we need to make sure the client reverts back to their own config upon leaving.

```cs
[HarmonyPostfix]
[HarmonyPatch(typeof(GameNetworkManager), "StartDisconnect")]
public static void PlayerLeave() {
    Config.RevertSync();
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
"dependencies": ["BepInEx-BepInExPack-5.4.2100", "Owen3H-CSync-1.0.8"]
```

:::info NOTE
Please ensure your manifest contains the latest version, the one seen above may be outdated!
:::
