---
prev: true
next: true
description: 有关为自定义敌人配置 Unity 项目的教程。
---

# ExampleEnemy Unity 项目

:::warning 重要
The Unity project this page references is in the [LC-ExampleEnemy](https://github.com/Hamunii/LC-ExampleEnemy) repository! So if you didn't already download your copy of the project, now is the time to do it!
:::

You can open the Unity project from Unity Hub by choosing to open a project from disk, and selecting the `UnityProject` folder. When Unity has loaded the project, look into the `ExampleEnemy` folder for the assets that make up our asset bundle.

## 建立 Unity 项目

:::tip
You must have git installed for the AssetBundle Browser extension.\
Also, the `SETUP-PROJECT.py` script will copy all of the dlls files for you! So if you run it, you can ignore this section almost entirely.
:::

The Unity project we have is based off of Evaisa's [Lethal Company Unity Template](https://github.com/EvaisaDev/LethalCompanyUnityTemplate/). However, just like with our dlls in the root directory of our project, we need to add some dll files into our `UnityProject/Assets/Plugins` folder. These are listed in the README of Evaisa's repository, but here's the list so you don't miss it:

:::details List of game DLLs

- AmazingAssets.TerrainToMesh.dll
- ClientNetworkTransform.dll
- DissonanceVoip.dll
- Facepunch Transport for Netcode for GameObjects.dll
- Facepunch.Steamworks.Win64.dll
- Newtonsoft.Json.dll
- Assembly-CSharp-firstpass.dll
  :::

We also want to add various DLL files our own DLL files might depend on, so let's add the following DLL files from `Lethal Company/BepInEx/core`:
::: details List of BepInEx Core DLLs

- 0Harmony20.dll
- 0Harmony.dll
- BepInEx.dll
- BepInEx.Preloader.dll
- HarmonyXInterop.dll
- Mono.Cecil.dll
- Mono.Cecil.Mdb.dll
- Mono.Cecil.Pdb.dll
- Mono.Cecil.Rocks.dll
- MonoMod.RuntimeDetour.dll
- MonoMod.Utils.dll
  :::

It seems that `BepInEx.Harmony.dll` causes Unity to crash, so we don't include it.

We also depend on LethalLib by Evaisa (which is already included in the project), and it depends on MMHOOK, so you need to run the game once with MMHOOK so these dll files are generated:
::: details List of MMHOOK DLLs

> - MMHOOK_AmazingAssets.TerrainToMesh.dll
> - MMHOOK_Assembly-CSharp.dll
> - MMHOOK_ClientNetworkTransform.dll
> - MMHOOK_DissonanceVoip.dll
> - MMHOOK_Facepunch.Steamworks.Win64.dll
> - MMHOOK_Facepunch Transport for Netcode for GameObjects.dll
>   :::

The dll file of our mod also needs to be there so we can reference [ExampleEnemyAI.cs](https://github.com/Hamunii/LC-ExampleEnemy/blob/main/Plugin/src/ExampleEnemyAI.cs) from a component of the ExampleEnemy prefab in Unity. We need to do this via a dll file, we cannot just copy and paste the ExampleEnemyAI.cs file in the Unity project because asset bundles cannot contain scripts, and it just doesn't get the reference otherwise. You know it doesn't get the reference in the form of a yellow warning text if you launch the game with the mod and you have unity logging enabled in the `BepInEx.cfg` file.

## Unity 中的 ExampleEnemy 资源

:::tip
The way we figure out how enemies are configured in Unity is done by looking at the Asset Ripper's Unity project output of the game files. You can use [AssetRipper Guid Patcher](https://github.com/ChrisFeline/AssetRipperGuidPatcher) to get a Unity project based on the game files!
:::

We have made an ExampleEnemy folder in our Unity project. Everything that goes into our asset bundle is in there.
The first thing we did was import our fbx model into Unity. This is as simple as dragging our fbx file into our assets, or right clicking and choosing `Import New Asset...` and choosing our fbx file. The exported fbx model contains all our materials, textures and animations when first imported, but it is good to separate some of that stuff into their own folders. We have extracted our materials into the `Materials` folder.

We have also copied the individual animations into the `Animations` folder, because I don't know how to separate them properly, but we can just ignore the animations embedded in the fbx file and use the copies inside the `Animations` folder anyways.

Anyways, how do we make the game see our assets as an enemy? Well, we create a new ScriptableObject of type EnemyType. This can be done by right clicking in your asset files, and doing `Create` -> `ScriptableObjects` -> `EnemyType`. This is what the game uses, so we need it too. Do note that these ScriptableObjects come from the Lethal Company Unity Template this is based off of. Do also note that our UnityProject in this repository is already configured properly.

The EnemyType ScriptableObject has some configuration options, and the most important thing is the "Enemy Prefab" part of it. This is where we tell it what the model and whatever stuff our EnemyType has. Also note the "Enemy Name" thingy, this will be the name of the example enemy in the coding side of things.

### ExampleEnemy 预制件

:::tip
If you don't know what prefabs are, see https\://docs.unity3d.com/Manual/Prefabs.html
:::

We have added these components to our prefab for everything to work properly:

![Screenshot: Example Enemy Prefab in inspector](/images/lethallib/custom-enemies/unity/ExampleEnemyInspector.png)

1. Example Enemy AI (Script)
   - This script can be found in `Plugin/src/ExampleEnemyAI.cs` at the root of this repository, and we have built our mod dll file and placed it inside `Assets/Plugins` in our Unity project so we can add it as a component to our prefab. We must do it that way because Asset Bundles cannot contain scripts, and by doing it this way, our mod's AI script will get recognized as the same script.
2. Network Object
   - Needs to be added so our enemy's position can sync in multiplayer. After you reference your AI script, Unity will automatically prompt you to add this component.
3. Nav Mesh Agent
   - Allows our enemy to act as a nav mesh agent, which is Unity's system for making easy pathfinding in 3D with the help of a nav mesh that the agents walk on.
4. Animator
   - This allows us to control the animations of our model. This deserves its own section, and I barely know anything about Unity's animation system.

We also have these as children of the prefab itself:

1. ScanNode
   - Allows us to scan the enemy. Make sure the following is set:
     - Tag: `DoNotSet`
     - Layer: `ScanNode`
   - It also should have the following components:
     - Scan Node Properties (Script)
       - **Notice:** The `Creature Scan ID` property is overridden by LethalLib, so it does not matter what we set it as. Same goes for the `Creature File ID` on the bestiary Terminal Node.
     - A collider, such as: `Box Collider`. While not necessary, it's a good idea to set `isTrigger: true` in order to avoid unwanted collisions with this object.
2. MapDot
   - Allows us to see the enemy on map. Make sure the following is set:
     - Tag: `DoNotSet`
     - Layer: `MapRadar`
   - It is also worth nothing that this object gets rendered only on the map cameras, and the size and color of the object will be what you set them as in Unity.
3. Collision
   - Allows our enemy to collide with the player and other things. Make sure the following is set:
     - Tag: `Enemy` (allows certain interactions, such as opening doors)
     - Layer: `Enemies`
   - Must also have the following components:
     - Enemy AI Collision Detect (Script)
     - A collider, such as: `Box Collider` with `isTrigger: true`
     - `Rigidbody`, so it can interact with certain colliders. This is also needed for our enemy to be able to open doors.
4. TurnCompass
   - Does nothing by itself, but we have a reference to this in the [ExampleEnemyAI.cs](https://github.com/Hamunii/LC-ExampleEnemy/blob/main/Plugin/src/ExampleEnemyAI.cs) script to make the enemy looking at player a bit easier.
5. AttackArea
   - Does nothing by itself, but we take its position and scale and check if the player exists inside that area for the head swing attack.
6. CreatureSFX
   - We play the creature's sound effects through this.
7. CreatureVoice
   - We play the creature's voice through this.
8. Eye
   - The point from which the game checks for line of sight in some methods. Make sure to reference this as the `Eye` in your AI script in Unity.

### ExampleEnemy 终端条目

We need a TerminalNode ScriptableObject for our entry in the bestiary. This contains the bestiary text and displayed enemy name.

:::warning
If an existing item in the game starts with the same word as your enemy's name, that can cause the game to think we are trying to buy that item and not being able to open the bestiary entry. As a workaround, you can try changing the name that is shown and used for opening the terminal entry.
:::

We also have a TerminalKeyword ScriptableObject, which has the word that the user needs to write in the terminal to find the page.

The enemy spinning animation on the bestiary entry background is a video file, and you can make one yourself in Blender by for example using the decimate (if you have a lot of geometry) and wireframe modifiers.

:::warning 重要
Unity Editor on Linux has [bad support for video files](https://docs.unity3d.com/Manual/VideoSources-FileCompatibility.html), so if you are using Linux, you might want to [encode your video to VP8 using FFmpeg](https://trac.ffmpeg.org/wiki/Encode/VP8). Unfortunately, Blender does not have an option to encode to VP8.
:::

### 资源打包

We need to package our assets into an Asset Bundle in order to be able to load them from our plugin. See [Asset Bundling](/dev/intermediate/asset-bundling) to find out how this is done.

::: tip
We have a `SETUP-PROJECT.py` script in our project which generates a `csproj.user` file. This file will copy your mod DLL and Asset Bundle to the path you specified when running the setup script, each time you build your plugin.

Just make sure to keep the asset bundle name the default, or you'll have to edit your `csproj.user` file to look for the new name, in which case you may also want to edit our setup script to look for this new name in the file it generates.
:::
