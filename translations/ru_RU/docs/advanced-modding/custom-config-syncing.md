---
prev: true
next: false
description: An intermediate overview of how to sync custom configs for your Lethal Company mods.
---

# Custom Config Syncing

:::warning
**This is an advanced article. While this introduces some C# concepts, it is highly recommended to understand C# and the basics of modding this game <i>before</i> reading this article.**
:::

## Preface

A very common case for many mod developers is wanting to synchronize the host's configuration file with all other players.

There are many different ways you could achieve this, but we will only go through the most straightforward approach that should work for most cases.

## Manually Syncing Instances

For this approach, we will take advantage of [Custom Messages](https://docs-multiplayer.unity3d.com/netcode/current/advanced-topics/message-system/custom-messages/#named-messages), specifically Named Messages.
They are unbound to any GameObject, meaning **NetcodeWeaver** and **NetworkBehaviour** are **NOT necessary**.

:::info
Before you proceed, it is recommended you familiarize yourself with [Custom configs](/advanced-modding/custom-configs).
:::

### Prerequisites

Add an **Assembly Reference** to the following files:<br>
`Unity.Netcode.Runtime.dll`<br>
`Unity.Collections.dll`

These can be found at `.../Lethal Company/Lethal Company_Data/Managed`.

Now create a `SyncedInstance.cs` file which your config will inherit from, this handles the serialization/de-serialization of data.<br>
It also provides some helper methods to prevent repeating ourselves.

```cs
[Serializable]
public class SyncedInstance<T> {
    internal static CustomMessagingManager MessageManager => NetworkManager.Singleton.CustomMessagingManager;
    internal static bool IsClient => NetworkManager.Singleton.IsClient;
    internal static bool IsHost => NetworkManager.Singleton.IsHost;

    [NonSerialized]
    protected static int IntSize = 4;

    public static T Default { get; private set; }
    public static T Instance { get; private set; }

    public static bool Synced { get; internal set; }

    protected void InitInstance(T instance) {
        Default = instance;
        Instance = instance;
        
        // Makes sure the size of an integer is correct for the current system.
        // We use 4 by default as that's the size of an int on 32 and 64 bit systems.
        IntSize = sizeof(int);
    }

    internal static void SyncInstance(byte[] data) {
        Instance = DeserializeFromBytes(data);
        Synced = true;
    }

    internal static void RevertSync() {
        Instance = Default;
        Synced = false;
    }

    public static byte[] SerializeToBytes(T val) {
        BinaryFormatter bf = new();
        using MemoryStream stream = new();

        try {
            bf.Serialize(stream, val);
            return stream.ToArray();
        }
        catch (Exception e) {
            Plugin.Logger.LogError($"Error serializing instance: {e}");
            return null;
        }
    }

    public static T DeserializeFromBytes(byte[] data) {
        BinaryFormatter bf = new();
        using MemoryStream stream = new(data);

        try {
            return (T) bf.Deserialize(stream);
        } catch (Exception e) {
            Plugin.Logger.LogError($"Error deserializing instance: {e}");
            return default;
        }
    }
}
```

### 1. Inherit SyncedInstance

We will now make use of the config class file made prior by changing this line:

```cs
public class Config
```

Into a synced alternative that can be serialized.

```cs
[Serializable]
public class Config : SyncedInstance<Config>
```

In addition, we need to make sure 'Instance' is a reference to this class by adding another line in the **constructor**.

```cs
public Config(ConfigFile cfg) {
    InitInstance(this); // Add this line

    // ...
}
```

### 2. Setup request/receiver methods

Now simply paste the three following methods within the class.
While these might look intimidating, they will hopefully start to make more sense in step 3.

```cs
public static void RequestSync() {
    if (!IsClient) return;

    using FastBufferWriter stream = new(IntSize, Allocator.Temp);
    MessageManager.SendNamedMessage("ModName_OnRequestConfigSync", 0uL, stream);
}
```

```cs
public static void OnRequestSync(ulong clientId, FastBufferReader _) {
    if (!IsHost) return;

    Plugin.Logger.LogInfo($"Config sync request received from client: {clientId}");

    byte[] array = SerializeToBytes(Instance);
    int value = array.Length;

    using FastBufferWriter stream = new(value + IntSize, Allocator.Temp);

    try {
        stream.WriteValueSafe(in value, default);
        stream.WriteBytesSafe(array);

        MessageManager.SendNamedMessage("ModName_OnReceiveConfigSync", clientId, stream);
    } catch(Exception e) {
        Plugin.Logger.LogInfo($"Error occurred syncing config with client: {clientId}\n{e}");
    }
}
```

```cs
public static void OnReceiveSync(ulong _, FastBufferReader reader) {
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

    SyncInstance(data);

    Plugin.Logger.LogInfo("Successfully synced config with host.");
}
```

### 3. Apply patch to PlayerControllerB

Add in the following method, replacing "ModName" with the name (or abbreviation) of your mod.

Keep in mind that `ConnectClientToPlayerObject` is run just before the player is spawned.
This means if you are patching `SpawnPlayerAnimation`, you might find it gets called before the config has finished syncing!

```cs
[HarmonyPostfix]
[HarmonyPatch(typeof(PlayerControllerB), "ConnectClientToPlayerObject")]
public static void InitializeLocalPlayer() {
    if (IsHost) {
        MessageManager.RegisterNamedMessageHandler("ModName_OnRequestConfigSync", OnRequestSync);
        Synced = true;

        return;
    }

    Synced = false;
    MessageManager.RegisterNamedMessageHandler("ModName_OnReceiveConfigSync", OnReceiveSync);
    RequestSync();
}
```

If you are having issues with this patch, you may want to try **GameNetworkManager** instead.

```cs
[HarmonyPatch(typeof(GameNetworkManager), "SteamMatchmaking_OnLobbyMemberJoined")]
```

Finally, we need to make sure the client reverts back to their own config upon leaving.

```cs
[HarmonyPostfix]
[HarmonyPatch(typeof(GameNetworkManager), "StartDisconnect")]
public static void PlayerLeave() {
    Config.RevertSync();
}
```

## Synced Config Usage

Every client will now have their config synchronized to the hosts upon joining the game.
All that's left to do is use the synced variables where appropriate.

We can do this by referencing `Config.Instance` from any class.
Here's an example that sets the local player's movement speed.

```cs
public static void ExamplePatch(PlayerControllerB __instance) {
    if (__instance == null)
        return;

    float syncedSpeed = Config.Instance.MOVEMENT_SPEED;
    if (__instance.IsOwner && __instance.isPlayerControlled) {
        __instance.movementSpeed = syncedSpeed;
        Plugin.Logger.LogInfo("Movement speed synced with host config.");
    }
}
```

To use client-side variables (not the synced instance), we can access `Config.Default`.

```cs
public static void ExamplePatch(PlayerControllerB __instance) {
    if (!__instance) return;
    
    // Sets current stamina, regardless of host config.
    __instance.sprintMeter = Config.Default.STAMINA;
}
```

## Troubleshooting

> Syncing doesnt work when I patch manually.

If you're using `PatchAll()` with type parameters, make sure to patch the `Config` class like other files.<br>
Example:

```cs
harmony.PatchAll(typeof(StartMatchLeverPatch));
harmony.PatchAll(typeof(GameNetworkManagerPatch));
harmony.PatchAll(typeof(Config)); // Add this line
```

> I am not seeing any logs from the request/receiver methods?

Harmony may refuse to patch the `InitializeLocalPlayer` method inside `Config.cs` if you have already have a dedicated patch file for `PlayerControllerB`. You can try placing the method there instead.

```cs
[HarmonyPatch(typeof(PlayerControllerB))]
internal class PlayerControllerBPatch
{
    [HarmonyPostfix]
    [HarmonyPatch("ConnectClientToPlayerObject")]
    public static void InitializeLocalPlayer() {
        if (Config.IsHost) {
            try {
                Config.MessageManager.RegisterNamedMessageHandler("ModName_OnRequestConfigSync", Config.OnRequestSync);
                Config.Synced = true;
            }
            catch (Exception e) {
                Plugin.Logger.LogError(e);
            }

            return;
        }

        Config.Synced = false;
        Config.MessageManager.RegisterNamedMessageHandler("ModName_OnReceiveConfigSync", Config.OnReceiveSync);
        Config.RequestSync();
    }
}
```

<br>If you incounter any other issues with custom configs, please ask on the [community discord](https://discord.gg/nYcQFEpXfU)!
