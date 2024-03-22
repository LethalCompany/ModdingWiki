---
prev: true
next: false
description: Troubleshooting section for problems using CSync.
---

# Troubleshooting

This page is intended to answer common questions and address frequently encountered issues.<br>
If you encounter an issue that isn't here, please report it within the [CSync forum](https://discord.com/channels/1168655651455639582/1199756974368227439) in the modding discord.

## Syncing doesn't work when I patch manually.

If you're using `PatchAll()` with type parameters, make sure to patch the `Config` class like other files.<br>
Example:

```cs
harmony.PatchAll(typeof(StartMatchLeverPatch));
harmony.PatchAll(typeof(GameNetworkManagerPatch));
harmony.PatchAll(typeof(Config)); // [!code ++]
```

## I am not seeing any logs from the request/receiver methods?

Harmony may refuse to patch the `InitializeLocalPlayer` method inside `Config.cs` if you have already have a dedicated patch file for `PlayerControllerB`. You can try placing the method there instead.

```cs
[HarmonyPatch(typeof(PlayerControllerB))]
internal class PlayerControllerBPatch {
    [HarmonyPostfix]
    [HarmonyPatch("ConnectClientToPlayerObject")]
    public static void InitializeLocalPlayer() {
        if (Config.IsHost) {
            try {
                Config.MessageManager.RegisterNamedMessageHandler($"{PluginInfo.PLUGIN_GUID}_OnRequestConfigSync", Config.OnRequestSync);
                Config.Synced = true;
            }
            catch (Exception e) {
                Plugin.Logger.LogError(e);
            }

            return;
        }

        Config.Synced = false;
        Config.MessageManager.RegisterNamedMessageHandler($"{PluginInfo.PLUGIN_GUID}_OnReceiveConfigSync", Config.OnReceiveSync);
        Config.RequestSync();
    }
}
```
