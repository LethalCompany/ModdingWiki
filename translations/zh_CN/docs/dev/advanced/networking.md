---
prev: false
next: false
description: 有关如何使用 Unity Netcode Patcher 将网络添加到致命公司模组的进阶概述。
---

# 网络

:::warning
**这是一篇进阶文章。 虽然本文介绍了一些 C# 概念，但强烈建议在阅读本文<i>之前</i>了解 C# 和修改此游戏的基础知识。**
:::

:::info
本文并非关于如何使用 Unity 的 [Netcode for GameObjects](https://docs-multiplayer.unity3d.com/netcode/1.5.2/about/) RPC 和网络变量的教程。 本文仅用于了解<i>如何</i>在游戏中实现自定义网络。
:::

## 前言

本教程需要使用 [@EvaisaDev](https://github.com/EvaisaDev/) 的 [Unity Netcode Patcher](https://github.com/EvaisaDev/UnityNetcodePatcher)（非常感谢 Evaisa！）。 本教程仅介绍使用此工具的基础知识；如果你遇到任何问题，请在 [Unofficial Lethal Company Community Discord](https://discord.gg/nYcQFEpXfU) 上的 [NetcodePatcher Forum Post](https://discord.com/channels/1169792572382773318/1175504315029389343) 中提问。

### 为什么使用 Unity Netcode Patcher？ {#why-netcode-patcher}

Unity Netcode Patcher 复制了 Unity 在使用 Netcode for GameObjects 包编译代码时执行的 IL 后处理。 这将在后处理步骤之前转到 C# 代码：

```cs
[ClientRpc]
public void EventClientRPC(string eventType)
{
    // 代码在这里
}
```

变成不太清晰的东西，但允许联网：

```cs
[ClientRpc]
public void EventClientRPC(string eventType)
{
    NetworkManager networkManager = base.NetworkManager; // [!code ++]
    if (networkManager == null || !networkManager.IsListening) // [!code ++]
    { // [!code ++]
        return; // [!code ++]
    } // [!code ++]
    if (this.__rpc_exec_stage != NetworkBehaviour.__RpcExecStage.Client && (networkManager.IsServer || networkManager.IsHost)) // [!code ++]
    { // [!code ++]
        ClientRpcParams clientRpcParams; // [!code ++]
        FastBufferWriter fastBufferWriter = base.__beginSendClientRpc(1302598205U, clientRpcParams, RpcDelivery.Reliable); // [!code ++]
        bool flag = eventType != null; // [!code ++]
        fastBufferWriter.WriteValueSafe<bool>(flag, default(FastBufferWriter.ForPrimitives)); // [!code ++]
        if (flag) // [!code ++]
        { // [!code ++]
            fastBufferWriter.WriteValueSafe(eventType, false); // [!code ++]
        } // [!code ++]
        base.__endSendClientRpc(ref fastBufferWriter, 1302598205U, clientRpcParams, RpcDelivery.Reliable); // [!code ++]
    } // [!code ++]
    if (this.__rpc_exec_stage != NetworkBehaviour.__RpcExecStage.Client || (!networkManager.IsClient && !networkManager.IsHost)) // [!code ++]
    { // [!code ++]
        return; // [!code ++]
    } // [!code ++]
    // 代码在这里
}
```

本质上，这允许你创建和使用 RPC、网络变量等。

### 其他所需设置

**必须**有一个对 `Unity.Netcode.Runtime.dll` 的项目引用才能将 Netcode 用于 GameObjects。 你可以参考本 Wiki 的[此节](/dev/starting-a-mod#adding-game-assemblies)来添加它。

## 介绍

使用 Netcode for GameObjects (NGO) 制作模组有两个部分，以允许在主机和客户端之间传输信息。

1. 创建 `NetworkHandler` 类
2. 将 `NetworkHandler` 游戏对象生成到游戏中

第一部分比较简单，只需制作一个脚本，并将其作为组件附加到游戏对象上。 第二部分更加复杂，因为需要从 AssetBundle 加载 GameObject - 本教程中未对此进行解释。

本教程不会详细介绍如何将其用于自定义对象或生物，但基础内容大体是相同的。

### ExampleMod

作为示例，本教程会介绍将网络添加到「将新级别事件添加到游戏中的模组」的过程。 这些事件无法在每个客户端上复制，而必须从服务器/主机接收有关要播放的事件的信息。 由于我们处理的是事件，因此 RPC 比网络变量更可取。

## 创建 NetworkHandler

`NetworkHandler` 包含 RPC、网络变量以及任何其他允许通过网络传递信息的方法。 我建议尽可能将此脚本与任何补丁分开，以避免 Unity 出现潜在错误。 这可以通过在脚本中不包含/使用任何外部方法和变量来轻松完成。

创建 `NetworkHandler` 时，必须继承 `NetworkBehaviour` 类。 这允许脚本利用网络方法。

```cs:line-numbers {11}
using System;
using Unity.Netcode;
using UnityEngine;
using Object = UnityEngine.Object;

namespace ExampleMod;

public class ExampleNetworkHandler : NetworkBehaviour // [!code focus:5]
{

    public static ExampleNetworkHandler Instance { get; private set; }
}
```

我们还添加了一行代码，以允许脚本轻松访问任何方法或变量，因为在我们的 ExampleMod 中，该类只有一个版本。

此时你可以使用：

```cs
public static ExampleNetworkHandler Instance;
```

使用上述方法执行此操作将防止任何类覆写 Instance 变量，确保只要 ExampleNetworkHandler 存在，它就可以始终被引用。

### ClientRpc

我们已经有了基本的组件！ 从此处开始，我们需要添加 RPC 和度量以避免重复信号。 由于事件信息仅由服务器发送，因此我们不必处理 ServerRpc，只需要设置 ClientRpc。 这是我们的示例模组使用的：

```cs
public static event Action<String> LevelEvent;

[ClientRpc]
public void EventClientRpc(string eventName)
{
    LevelEvent?.Invoke(eventName); // 如果事件有订阅者（不等于 null），则调用该事件
}
```

根据 [Unity Docs](https://docs-multiplayer.unity3d.com/netcode/current/advanced-topics/message-system/clientrpc/#declaring-a-clientrpc)，RPC 之前必须有一个属性 ，并且 RPC 方法名称_**必须**_以 ClientRpc 结尾。

### ServerRpc

虽然在我们的教程模组中不是必需的，但服务器 RPC 方法是类似的且易于设置。 但是，默认情况下，任何不是游戏对象所有者的客户端都无法调用该方法。 为了避免这种情况并允许任何客户端调用此方法，我们可以将 `(RequireOwnership = false)` 添加到属性中，从而产生以下方法：

```cs
[ServerRpc(RequireOwnership = false)]
public void EventServerRPC(/*parameters here*/)
{
    // 代码在这里
}
```

### C# 事件 {#csharp-events}

现在，你可能会问，什么是 `public static event Action<String> LevelEvent`？ 这使用 C# 的事件/委托系统来创建可读事件。 虽然乍一看可能很复杂，但事实证明非常简单！ 脚本可以订阅该事件（稍后将会显示），然后，当调用该事件时，将运行任何指定的方法。

你可能还会看到 `LevelEvent?.Invoke(eventName)` 并想知道这些字母和符号到底有啥用。 它只是以下代码的简化版本：

```cs
if (LevelEvent != null)
{
    LevelEvent(eventName);
}
```

所有这些 if 语句检查事件是否不等于 null，如果不等于 null，则调用该事件。 _如果事件没有订阅者_，则该事件将为 null。

### 防止事件和实例重复 {#preventing-duplication}

由于我们在定义 C# 事件时使用 `static`，因此可能会出现边缘情况。 如果事件没有取消订阅，并且玩家加入了新服务器，会发生什么呢？ 任何在不知情的情况下第二次订阅事件的代码都将运行两次！ 我们如何确保这种情况不会发生呢？ 我们将 C# 事件设置为等于 null。 这样做的最佳时间是当 NetworkHandler 生成时：

```cs
public override void OnNetworkSpawn()
{
    LevelEvent = null;

    base.OnNetworkSpawn();
}
```

这将移除所有订阅者，并继续调用基本 OnNetworkSpawn 方法，以允许在该方法中运行的任何代码仍然发生。

但是我们的 Instance 变量呢？ 如果我们不将其设置为任何值，则任何尝试使用此处理程序的脚本将无法使用 .Instance！ 在这里，我们可以将 `Instance` 变量指定为当前对象。 我们还需要使用 `ExampleNetworkHandler` 类来移除任何以前存在的 GameObject，这只能通过服务器完成。

```cs
public override void OnNetworkSpawn()
{
    LevelEvent = null;

    if (NetworkManager.Singleton.IsHost || NetworkManager.Singleton.IsServer) // [!code ++]
        Instance?.gameObject.GetComponent<NetworkObject>().Despawn(); // [!code ++]
    Instance = this; // [!code ++]

    base.OnNetworkSpawn();
}
```

### 最终确定的网络处理程序

我们完成了！ 剩下的就是将所有内容整合到一个脚本中：

```cs:line-numbers
using System;
using Unity.Netcode;
using UnityEngine;
using Object = UnityEngine.Object;

namespace ExampleMod;

public class ExampleNetworkHandler : NetworkBehaviour // [!code focus:23]
{
    public override void OnNetworkSpawn()
    {
        LevelEvent = null;

        if (NetworkManager.Singleton.IsHost || NetworkManager.Singleton.IsServer)
            Instance?.gameObject.GetComponent<NetworkObject>().Despawn();
        Instance = this;

        base.OnNetworkSpawn();
    }

    [ClientRpc]
    public void EventClientRpc(string eventName)
    {
        LevelEvent?.Invoke(eventName); // 如果事件有订阅者（不等于 null），则调用该事件
    }

    public static event Action<String> LevelEvent;

    public static ExampleNetworkHandler Instance { get; private set; }
}
```

## 生成 NetworkHandler

在生成 ExampleNetworkHandler 之前，我们必须将其加载到游戏中。 为此，我们需要从 AssetBundle 加载处理程序。

我们作为资源生成的游戏对象需要一个网络对象。 我们将使用这个预制件作为我们的网络处理程序：

![ExampleNetworkHandler 预制件](/images/custom-networking/ExampleNetworkHandlerPrefab.png)

我们打包这个预制件，然后使用以下命令导入：

```cs
// Info 是 `BaseUnityPlugin` 类的实例成员字段。
var dllFolderPath = System.IO.Path.GetDirectoryName(Info.Location);
var assetBundleFilePath = System.IO.Path.Combine(dllFolderPath, "ExampleModAssets");
MainAssetBundle = AssetBundle.LoadFromFile(assetBundleFilePath);
```

必须将 AssetBundle 文件添加到模组的 .dll 文件旁边的 plugins 文件夹中（与模组的 .dll 文件位于同一文件夹）。

我们建议使用此方法，而不是将资源直接嵌入到 dll 文件中，原因如下：

- 用于资源的内存将重复：如果资源的大小为 1GB 并且嵌入在 DLL 中，则会分配 1GB 以将 DLL 加载到进程中，然后 `Unity` 使用另外 1GB 通过 `AssetBundle.LoadFromMemory` 加载包。

- 开发插件更容易：你不必在每次修改资源时都触发 DLL 的重新编译。

- 安装过程由模组管理器管理：只要您将 Asset Bundle 文件正确放置在上传到 Thunderstore 的 .zip 文件中的 dll 旁边，该资源就会在正确的位置，上面的代码就可以工作了。

完成此操作后，我们现在可以开始处理生成 NetworkHandler 的补丁了。

### 加载资源

在玩家启动或加入服务器之前，需要加载资源并将其作为 NetworkPrefab 提供给 NetworkManager。 如果不这样做，主机与客户端将不知道要生成什么对象，并且导致什么也不生成。

首先，我们需要加载资源，我们将其修补到 GameNetworkManager 的 Start 方法中来加载它：

```cs
[HarmonyPatch]
public class NetworkObjectManager
{

    [HarmonyPostfix, HarmonyPatch(typeof(GameNetworkManager), nameof(GameNetworkManager.Start))]
    public static void Init()
    {
        if (networkPrefab != null)
            return;
        
        networkPrefab = (GameObject)MainAssetBundle.LoadAsset("ExampleNetworkHandler");
    }

    static GameObject networkPrefab;
}
```

等一下！ Before we can send this to the NetworkManager, don't you think it's missing something? Right, the ExampleNetworkHandler component! While it is possible to add this to the prefab beforehand (you can ask to find out how), it's also simple to add it right here and now. All we must do is add it as a component:

```cs
[HarmonyPostfix, HarmonyPatch(typeof(GameNetworkManager), nameof(GameNetworkManager.Start))]
public static void Init()
{
    if (networkPrefab != null)
        return;
    
    networkPrefab = (GameObject)MainAssetBundle.LoadAsset("ExampleNetworkHandler");
    networkPrefab.AddComponent<ExampleNetworkHandler>(); // [!code ++]
}
```

### 将资源添加为网络预制件 {#adding-network-prefab}

Now that we have the prefab ready to be loaded, it's quite simple to give this to the NetworkManager as a prefab:

```cs
NetworkManager.Singleton.AddNetworkPrefab(networkPrefab);
```

:::warning
You can only add network prefabs to NetworkManager **before** the player creates or joins a server. You can also do so after the player leaves the server.<br><br>If you try to add a network prefab while the player is connected to a server, it will result in an error and your object <u>will not</u> be loaded.
:::

To prevent any errors, we do this shortly after the prefab is loaded:

```cs
[HarmonyPostfix, HarmonyPatch(typeof(GameNetworkManager), nameof(GameNetworkManager.Start))]
public static void Init()
{
    if (networkPrefab != null)
        return;
    
    networkPrefab = (GameObject)MainAssetBundle.LoadAsset("ExampleNetworkHandler");
    networkPrefab.AddComponent<ExampleNetworkHandler>();
    
    NetworkManager.Singleton.AddNetworkPrefab(networkPrefab); // [!code ++]
}
```

### 在运行时生成 GameObject {#spawning-the-gameobject}

Now that the game knows what to load when we tell it to load the ExampleNetworkHandler, all we have left is to spawn it! To do so, we just must Instantiate the prefab, then spawn it:

```cs
var networkHandlerHost = Object.Instantiate(networkPrefab, Vector3.zero, Quaternion.identity)
networkHandlerHost.GetComponent<NetworkObject>().Spawn();
```

:::tip
While you can put `destroyWithScene: false` as a parameter in the Spawn method to prevent the game from auto-deleting the object, you shouldn't in this case! The object stays loaded in `SampleSceneRelay`, which is the main ship scene.<br><br>This scene never gets unloaded until disconnecting from the server - <i>precisely</i> when we want the network object to be destroyed!
:::

But wait, there's a catch: Only the host/server is allowed to spawn the network object! To prevent clients from spawning the object, we can do something simple. We just check whether the game instance is a host or a client:

```cs
[HarmonyPostfix, HarmonyPatch(typeof(StartOfRound), nameof(StartOfRound.Awake))]
static void SpawnNetworkHandler()
{
    if(NetworkManager.Singleton.IsHost || NetworkManager.Singleton.IsServer) // [!code highlight]
    {
        var networkHandlerHost = Object.Instantiate(networkPrefab, Vector3.zero, Quaternion.identity)
        networkHandlerHost.GetComponent<NetworkObject>().Spawn();
    }
}
```

We want to attach this to `StartOfRound.Awake` as this method only runs when a new server is started by the host or loaded in by the client. Not only that, but it's one of the first methods to run when starting or joining a server.

### 最终确定的网络对象管理器

Once we throw everything together, we get a class looking like this:

```cs:line-numbers
using HarmonyLib;
using Unity.Netcode;
using UnityEngine;

namespace ExampleMod;

[HarmonyPatch]
public class NetworkObjectManager
{
    [HarmonyPostfix, HarmonyPatch(typeof(GameNetworkManager), nameof(GameNetworkManager.Start))] // [!code focus:23]
    public static void Init()
    {
        if (networkPrefab != null)
            return;
        
        networkPrefab = (GameObject)MainAssetBundle.LoadAsset("ExampleNetworkHandler");
        networkPrefab.AddComponent<ExampleNetworkHandler>();
        
        NetworkManager.Singleton.AddNetworkPrefab(networkPrefab);
    }

    [HarmonyPostfix, HarmonyPatch(typeof(StartOfRound), nameof(StartOfRound.Awake))]
    static void SpawnNetworkHandler()
    {
        if(NetworkManager.Singleton.IsHost || NetworkManager.Singleton.IsServer)
        {
            var networkHandlerHost = Object.Instantiate(networkPrefab, Vector3.zero, Quaternion.identity)
            networkHandlerHost.GetComponent<NetworkObject>().Spawn();
        }
    }

    static GameObject networkPrefab;
}
```

## 利用 NetworkHandler

终于！ 处理程序已经在游戏里了！ 现在我们可以利用它。 但要怎么做呢？ 很简单，我们订阅 C# 事件。 譬如，我们的模组只需要在回合开始时订阅，在回合结束时需要取消订阅。

```cs
[HarmonyPostfix, HarmonyPatch(typeof(RoundManager), nameof(RoundManager.GenerateNewFloor))]
static void SubscribeToHandler()
{
    ExampleNetworkHandler.LevelEvent += ReceivedEventFromServer;
}

[HarmonyPostfix, HarmonyPatch(typeof(RoundManager), nameof(RoundManager.DespawnPropsAtEndOfRound))]
static void UnsubscribeFromHandler()
{
    ExampleNetworkHandler.LevelEvent -= ReceivedEventFromServer;
}

static void ReceivedEventFromServer(string eventName)
{
    // 事件代码在这里
}

static void SendEventToClients(string eventName)
{
    if (!(NetworkManager.Singleton.IsHost || NetworkManager.Singleton.IsServer))
        return;

    ExampleNetworkHandler.Instance.EventClientRpc(eventName);
}
```

What does this all do? Well, `NetworkHandler.LevelEvent += ReceivedEventFromServer` simply tells C# that we want `ReceivedEventFromServer(string eventName)` to run when the `LevelEvent` event is invoked. `NetworkHandler.LevelEvent -= Received` tells C# that we no longer want `ReceivedEventFromServer` to run when the event is invoked.

:::tip
When subscribing and unsubscribing to an event, make sure that <i>both</i> the host and the client do so. Both `GenerateNewFloor` and `DespawnPropsAtEndOfRound` run on all game instances - even if the latter method immediately attempts to return if the game instance is not the host.<br><br>If you don't ensure both the host and clients subscribe/unsubscribe to an event, it very quickly leads to unwanted behavior. For example, if the client doesn't unsubscribe in our test mod, events will be duplicated on client instances since the event will be subscribed to multiple times.
:::

:::warning
Hooking to a ClientRpc can cause errors with code running multiple times on the host instance. Avoid hooking to any ClientRpcs - and if you must, consider adding a debounce.
:::

## 使用 Unity Netcode Patcher {#using-netcode-patcher}

Now that we've finished the networking code, all that's left is to patch the compiled mod assembly with Unity Netcode Patcher. Before we can do so, we need to prepare the mod for patching.

1. Make sure that `DebugSymbols` are set to `portable` (or `pdbonly`) or `embedded`. `Full` debug symbols **will not work** and NetcodePatcher will produce an uninterpretable error message.

2. Add the following code to your main Plugin.cs file, and make sure the method only runs **once**:

```cs
private static void NetcodePatcher()
{
    var types = Assembly.GetExecutingAssembly().GetTypes();
    foreach (var type in types)
    {
        var methods = type.GetMethods(BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.Static);
        foreach (var method in methods)
        {
            var attributes = method.GetCustomAttributes(typeof(RuntimeInitializeOnLoadMethodAttribute), false);
            if (attributes.Length > 0)
            {
                method.Invoke(null, null);
            }
        }
    }
}

static void Awake()
{
    NetcodePatcher(); // 仅运行一次 // [!code warning]
}
```

Before you can run Unity Netcode Patcher, make sure it's set up - specifically, run `dotnet tool install -g Evaisa.NetcodePatcher.Cli`.

Now, you just have to add the following `Target` element to your `.csproj`:

```xml
<Target Name="NetcodePatch" AfterTargets="PostBuildEvent">
    <Exec Command="netcode-patch &amp;quot;$(TargetPath)&amp;quot; @(ReferencePathWithRefAssemblies->'&amp;quot;%(Identity)&amp;quot;', ' ')"/>
</Target>
```

If this does not work, you can [follow the instructions on how to use Unity Netcode Patcher.](https://github.com/EvaisaDev/UnityNetcodePatcher#usage-from-command-line)

## 结语

现在你终于完成了所有代码并使用 Unity Netcode Patcher 对其进行了修补，你的模组中应该具有网络功能了！ 恭喜！ 拍拍自己的背吧！ 到达这个阶段并不容易，在继续你的模组之旅时总会遇到问题。 但别担心！ 你可以随时在 [Unofficial Lethal Company Community Discord](https://discord.gg/nYcQFEpXfU) 中取得帮助！
