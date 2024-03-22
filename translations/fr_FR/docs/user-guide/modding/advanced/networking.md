# Custom Networking

!> **Warning: This is an advanced article. While this introduces some C# concepts, it is highly recommended to understand C# and the basics of modding this game <i>before</i> reading this article.**

?>**Note:** This is not a tutorial on how to use Unity's [Netcode for GameObjects](https://docs-multiplayer.unity3d.com/netcode/1.5.2/about/) RPCs and Network Variables. This is only meant to be used to understand <i>how</i> to implement custom networking into the game.

## Preface

This tutorial requires using [@EvaisaDev](https://github.com/EvaisaDev/)'s [UnityNetcodeWeaver](https://github.com/EvaisaDev/UnityNetcodeWeaver) (Thank you very much Evaisa!). This tutorial will only go into the basics of using this tool; if you run into any issues, ask in the [NetcodePatcher Forum Post](https://discord.com/channels/1169792572382773318/1175504315029389343) on the [Unofficial Lethal Company Community Discord](https://discord.gg/nYcQFEpXfU).

### Why use Unity Netcode Weaver?

Unity Netcode Weaver replicates the IL Post Processing Unity performs when compiling code utilizing Netcode for GameObjects package. This turns the C# code before the post processing step:

```cs
[ClientRpc]
public void EventClientRPC(string eventType)
{
    // code here
}
```

Into something a bit less legible, but allows networking:

```cs
[ClientRpc]
public void EventClientRPC(string eventType)
{
    NetworkManager networkManager = base.NetworkManager;
    if (networkManager == null || !networkManager.IsListening)
    {
        return;
    }
    if (this.__rpc_exec_stage != NetworkBehaviour.__RpcExecStage.Client && (networkManager.IsServer || networkManager.IsHost))
    {
        ClientRpcParams clientRpcParams;
        FastBufferWriter fastBufferWriter = base.__beginSendClientRpc(1302598205U, clientRpcParams, RpcDelivery.Reliable);
        bool flag = eventType != null;
        fastBufferWriter.WriteValueSafe<bool>(flag, default(FastBufferWriter.ForPrimitives));
        if (flag)
        {
            fastBufferWriter.WriteValueSafe(eventType, false);
        }
        base.__endSendClientRpc(ref fastBufferWriter, 1302598205U, clientRpcParams, RpcDelivery.Reliable);
    }
    if (this.__rpc_exec_stage != NetworkBehaviour.__RpcExecStage.Client || (!networkManager.IsClient && !networkManager.IsHost))
    {
        return;
    }
    // code here
}
```

Essentially, this allows you to create and use RPCs, Network Variables, etc.

### Other Setup Required

There **must** be a project reference to `Unity.Netcode.Runtime.dll` to utilize Netcode for GameObjects. You can refer to [this section](./starting-a-mod?id=adding-game-assemblies) of this wiki to add it.

## Introduction

There are two parts to making a mod using Netcode for GameObjects (NGO) to allow the transmission of info between the host & clients.

1. Creating the `NetworkHandler` Class
2. Spawning the `NetworkHandler` Game Object into the game

The first part is simple, it just requires making a script that will be attached to a game object as a component. The second gets more complicated due to requiring loading a GameObject from an AssetBundle - something not explained in this tutorial.

This tutorial will not go into detail on how to use this for Custom Objects or Creatures, but the basics generally are the same.

### ExampleMod

As an example, this tutorial will go through the process of adding networking to a mod that adds new-level events into the game. These events are not able to be replicated on each client and must instead receive info from the server/host on what event is to be played. Since we are dealing with events, RPCs are preferable over Network Variables.

## Creating the NetworkHandler

The `NetworkHandler` houses the RPCs, Network Variables, and any other methods allowing information to be passed over the network. I recommend separating this script as far as possible from any patches to avoid potential errors through Unity. This can easily be done by not including/using any outside methods and variables in the script.

When creating the `NetworkHandler`, you must inherit the `NetworkBehaviour` class. This allows the script to utilize the networking methods.

```cs
using System;
using Unity.Netcode;
using UnityEngine;
using Object = UnityEngine.Object;

namespace ExampleMod
{
    public class ExampleNetworkHandler : NetworkBehaviour
    {

        public static ExampleNetworkHandler Instance { get; private set; }
    }
}
```

We also add the one line of code to allow scripts to easily access any methods or variables, since in the case of our ExampleMod, there is only one version of this class. While you can just use:

```cs
public static ExampleNetworkHandler Instance;
```

Doing it with the aforementioned method will prevent any classes from overriding the Instance variable, ensuring it can always be referenced as long as the ExampleNetworkHandler exists.

### ClientRpc

We have our basic component! From here, we need to add the RPCs and a measure to avoid duplicate signals. Since the event info is only sent by the server, we do not have to deal with a ServerRpc and only need to set up the ClientRpc. This is what our example mod uses:

```cs
public static event Action<String> LevelEvent;

[ClientRpc]
public void EventClientRpc(string eventName)
{
    LevelEvent?.Invoke(eventName); // If the event has subscribers (does not equal null), invoke the event
}
```

According to the [Unity Docs](https://docs-multiplayer.unity3d.com/netcode/current/advanced-topics/message-system/clientrpc/#declaring-a-clientrpc), there must be an attribute before the RPC, and the RPC method name _**must**_ end with ClientRpc.

### ServerRpc

Although not necessary in our tutorial mod, a server RPC method is similar and easy to set up as well. By default, however, any client that is not the owner of the game object will not be able to call the method. To avoid this and allow any client to call this method, we can add `(RequireOwnership = false)` to the attribute, resulting in the following method:

```cs
[ServerRpc(RequireOwnership = false)]
public void EventServerRPC(/*parameters here*/)
{
    // code here
}
```

### C# Events

Now, you may ask, what is `public static event Action<String> LevelEvent`? This uses C#'s event/delegate system to create a readable event. While it may look complex at first, it turns out to be quite simple! A script can subscribe to the event - which will be shown later - then, when the event is invoked, any specified method(s) will run.

You may also see `LevelEvent?.Invoke(eventName)` and wonder what the heck this mess of letters and symbols does. It's just a simplified version of the following code:

```cs
if (LevelEvent != null)
{
    LevelEvent(eventName);
}
```

All this if statement checks is whether the event is not equal to null and calls the event if so. The event will be null _if there are no subscribers to the event._

### Preventing Duplication of Events and Instance

Since we are using `static` when defining our C# event, an edge case can occur. What happens if the event is not unsubscribed from, and the player joins a new server? Any code that unknowingly subscribes to the event a second time will run twice! How do we make sure this does not occur? We set the C# event to equal null. The best time to do so is when the NetworkHandler gets spawned in:

```cs
public override void OnNetworkSpawn()
{
    LevelEvent = null;

    base.OnNetworkSpawn();
}
```

This removes any subscribers and continues to call the base OnNetworkSpawn method to allow any code that runs in that method to still occur.

But what about our Instance variable? If we don't set it to anything, any scripts attempting to use this handler won't be able to use .Instance! Here, we can assign the `Instance` variable to be the current object. We also need to remove any previously existing GameObject with our `ExampleNetworkHandler` class, which can only be done via the server.

```cs
public override void OnNetworkSpawn()
{
    LevelEvent = null;

    if (NetworkManager.Singleton.IsHost || NetworkManager.Singleton.IsServer)
        Instance?.gameObject.GetComponent<NetworkObject>().Despawn();
    Instance = this;

    base.OnNetworkSpawn();
}
```

### Finalized Network Handler

We finished! All that's left is to throw it all together into one script:

```cs
using System;
using Unity.Netcode;
using UnityEngine;
using Object = UnityEngine.Object;

namespace ExampleMod
{
    public class ExampleNetworkHandler : NetworkBehaviour
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
            LevelEvent?.Invoke(eventName); // If the event has subscribers (does not equal null), invoke the event
        }

        public static event Action<String> LevelEvent;

        public static ExampleNetworkHandler Instance { get; private set; }
    }
}
```

## Spawning the NetworkHandler

Before we can spawn the ExampleNetworkHandler, we must load it into the game. To do so, we need to load our handler from an AssetBundle.

The Game Object we spawn as an asset requires a network object. We will use this prefab for our Network Handler:

![ExampleNetworkHandler Prefab](../docs/files/custom-networking/ExampleNetworkHandlerPrefab.png)

We bundle this prefab up, embed the prefab as a resource in our ExampleMod project, and then import it using:

```cs
MainAssetBundle = AssetBundle.LoadFromStream(Assembly.GetExecutingAssembly().GetManifestResourceStream("ExampleMod.ExampleModAssets"))
```

We then can begin working on the patch that spawns the NetworkHandler.

One other method of importing the asset is with:

```cs
MainAssetBundle = AssetBundle.LoadFromFile(Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), "ExampleModAssets"));
```

The AssetBundle file has to be added to the Plugins folder with the mod's .dll file in this case. It won't work if it's nonexistant or in the Bundles folder of BepInEx.

?> While this method works, it's not recommended due to potential issues with the ExampleModAssets file not existing at that location, either from the mod not being installed correctly, or someone accidentally deleting the file.

### Loading the Asset

The asset needs to be loaded and given to the NetworkManager as a NetworkPrefab - before the player starts or joins a server. If this is not done, the host and/or clients will not know what object to spawn, and will result in nothing spawning.

First, we need to load the asset, which we will patch into GameNetworkManager's Start method to load it:

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

Wait! Before we can send this to the NetworkManager, don't you think it's missing something? Right, the ExampleNetworkHandler component! While it is possible to add this to the prefab beforehand (you can ask to find out how), it's also simple to add it right here and now. All we must do is add it as a component:

```cs
[HarmonyPostfix, HarmonyPatch(typeof(GameNetworkManager), nameof(GameNetworkManager.Start))]
public static void Init()
{
    if (networkPrefab != null)
        return;
    
    networkPrefab = (GameObject)MainAssetBundle.LoadAsset("ExampleNetworkHandler");
    networkPrefab.AddComponent<ExampleNetworkHandler>();
}
```

### Adding Asset as Network Prefab

Now that we have the prefab ready to be loaded, it's quite simple to give this to the NetworkManager as a prefab:

```cs
NetworkManager.Singleton.AddNetworkPrefab(networkPrefab);
```

?>**Note:** You can only add network prefabs to NetworkManager **before** the player creates or joins a server. You can also do so after the player leaves the server.<br><br>If you try to add a network prefab while the player is connected to a server, it will result in an error and your object <u>will not</u> be loaded.

To prevent any errors, we do this shortly after the prefab is loaded:

```cs
[HarmonyPostfix, HarmonyPatch(typeof(GameNetworkManager), nameof(GameNetworkManager.Start))]
public static void Init()
{
    if (networkPrefab != null)
        return;
    
    networkPrefab = (GameObject)MainAssetBundle.LoadAsset("ExampleNetworkHandler");
    networkPrefab.AddComponent<ExampleNetworkHandler>();
    
    NetworkManager.Singleton.AddNetworkPrefab(networkPrefab);
}
```

### Spawning the GameObject During Runtime

Now that the game knows what to load when we tell it to load the ExampleNetworkHandler, all we have left is to spawn it! To do so, we just must Instantiate the prefab, then spawn it:

```cs
var networkHandlerHost = Object.Instantiate(networkPrefab, Vector3.zero, Quaternion.identity)
networkHandlerHost.GetComponent<NetworkObject>().Spawn();
```

?>**Note:** While you can put <i>false</i> as a parameter in the Spawn method to prevent the game from auto-deleting the object, you shouldn't in this case! The object stays loaded in `SampleSceneRelay`, which is the main ship scene.<br><br>This scene never gets unloaded until disconnecting from the server - <i>precisely</i> when we want the network object to be destroyed!

But wait, there's a catch: Only the host/server is allowed to spawn the network object! To prevent clients from spawning the object, we can do something simple. We just check whether the game instance is a host or a client:

```cs
[HarmonyPostfix, HarmonyPatch(typeof(StartOfRound), nameof(StartOfRound.Awake))]
static void SpawnNetworkHandler()
{
    if(NetworkManager.Singleton.IsHost || NetworkManager.Singleton.IsServer)
    {
        var networkHandlerHost = Object.Instantiate(networkPrefab, Vector3.zero, Quaternion.identity)
        networkHandlerHost.GetComponent<NetworkObject>().Spawn();
    }
}
```

We want to attach this to `StartOfRound.Awake` as this method only runs when a new server is started by the host or loaded in by the client. Not only that, but it's one of the first methods to run when starting or joining a server.

### Finalized Network Object Manager

Once we throw everything together, we get a class looking like this:

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

## Utilizing the NetworkHandler

Finally! The handler is in the game! Now we can utilize it. But how? Easy, we subscribe to the C# event. For example, our mod only needs to subscribe when the round starts and needs to unsubscribe when the round ends.

```cs
[HarmonyPostfix, HarmonyPatch(typeof(RoundManager), nameof(RoundManager.GenerateNewLevelClientRpc))]
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
    // Event Code Here
}

static void SendEventToClients(string eventName)
{
    if (!(NetworkManager.Singleton.IsHost || NetworkManager.Singleton.IsHost))
        return;

    ExampleNetworkHandler.Instance.EventClientRpc(eventName);
}
```

What does this all do? Well, `NetworkHandler.LevelEvent += ReceivedEventFromServer` simply tells C# that we want `ReceivedEventFromServer(string eventName)` to run when the `LevelEvent` event is invoked. `NetworkHandler.LevelEvent -= Received` tells C# that we no longer want `ReceivedEventFromServer` to run when the event is invoked.

?>**Note:** When subscribing and unsubscribing to an event, make sure that <i>both</i> the host and the client do so. Both `GenerateNewLevelClientRpc` and `DespawnPropsAtEndOfRound` run on all game instances - even if the latter method immediately attempts to return if the game instance is not the host.<br><br>If you don't ensure both the host and clients subscribe/unsubscribe to an event, it very quickly leads to unwanted behavior. For example, if the client doesn't unsubscribe in our test mod, events will be duplicated on client instances since the event will be subscribed to multiple times.

## Using UnityNetcodeWeaver

Now that we've finished the networking code, all that's left is to patch the compiled mod assembly with Unity Netcode Weaver/Patcher. Before we can do so, we need to prepare the mod for patching.

1. Make sure that there is a .pdb file when you build your plugin. If it is not there, make sure that Debug Symbols is set to `Portable` and not embedded.

2. Add the following code to your main Plugin.cs file, and make sure the method only runs **once**:

```cs
private static void NetcodeWeaver()
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
    NetcodeWeaver(); // ONLY RUN ONCE
}
```

Before you can run Unity Netcode Weaver, make sure it's set up - specifically, copy the contents of `Lethal Company/Lethal Company_Data/Managed` into `NetcodePatcher/deps`.

Now, you just have to add the following Post-Build Event to your project:

```cmd
cd <NetcodePatcher Folder Directory Here>
NetcodePatcher.dll $(TargetDir) deps/
```

If this does not work, you can [follow the instructions on how to use UnityNetcodeWeaver from the command line.](https://github.com/EvaisaDev/UnityNetcodeWeaver#usage-from-command-line)

## Conclusion

Now that you've finally finished all the code and patched it with UnityNetcodeWeaver, you should have networking in your mod! Congrats! Pat yourself on the back! It's not easy getting to this stage, and you will always run into issues as you continue your modding journey. But don't fret! You can always get help in the [Unofficial Lethal Company Community Discord!](https://discord.gg/nYcQFEpXfU)
