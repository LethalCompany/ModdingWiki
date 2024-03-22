---
prev: true
next: false
description: 使用 CSync 出现问题时的故障排除部分。
---

# 故障排除

本页面旨在回答常见问题并解决经常遇到的问题。<br>
如果你遇到的问题不在这里，请在模组 Discord 中的 [CSync forum](https://discord.com/channels/1168655651455639582/1199756974368227439) 报告。

## 手动修补时无法同步。

如果使用带有类型参数的 `PatchAll()` ，请务必像修补其他文件一样修补 `Config` 类。<br>
示例：

```cs
harmony.PatchAll(typeof(StartMatchLeverPatch));
harmony.PatchAll(typeof(GameNetworkManagerPatch));
harmony.PatchAll(typeof(Config)); // [!code ++]
```

## 我没有看到请求/接收器方法的任何日志？

如果你已经有 `PlayerControllerB` 的专用补丁文件，Harmony 可能会拒绝修补 `Config.cs` 中的 `InitializeLocalPlayer` 方法。 你可以尝试将该方法放在此处。

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
