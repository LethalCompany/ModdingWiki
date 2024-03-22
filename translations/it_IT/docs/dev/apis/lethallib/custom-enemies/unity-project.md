---
prev: true
next: true
description: A tutorial on configuring your Unity project for custom enemies.
---

# `ExampleEnemy` Unity Project

:::warning IMPORTANT
The Unity project this page references is in the [LC-ExampleEnemy](https://github.com/Hamunii/LC-ExampleEnemy) repository! So if you didn't already download your copy of the project, now is the time to do it!
:::

You can open the Unity project from Unity Hub by choosing to open a project from disk, and selecting the `UnityProject` folder. When Unity has loaded the project, look into the `ExampleEnemy` folder for the assets that make up our asset bundle.

## Setting Up Our Unity Project

:::tip
You must have git installed for the AssetBundle Browser extension.\
Also, the `SETUP-PROJECT.py` script will copy all of the dlls files for you! So if you run it, you can ignore this section almost entirely.
:::

The Unity project we have is based off of Evaisa's [Lethal Company Unity Template](https://github.com/EvaisaDev/LethalCompanyUnityTemplate/). However, just like with our dlls in the root directory of our project, we need to add some dll files into our `UnityProject/Assets/Plugins` folder. These are listed in the README of Evaisa's repository, but here's the list so you don't miss it:

:::details List of game DLLs

- `AmazingAssets.TerrainToMesh.dll`
- `ClientNetworkTransform.dll`
- `DissonanceVoip.dll`
- `Facepunch Transport for Netcode for GameObjects.dll`
- `Facepunch.Steamworks.Win64.dll`
- `Newtonsoft.Json.dll`
- `Assembly-CSharp-firstpass.dll`D
  :::

We also want to add various DLL files our own DLL files might depend on, so let's add the following DLL files from `Lethal Company/BepInEx/core`:
::: details List of BepInEx Core DLLs

- `0Harmony20.dll`
- `0Harmony.dll`
- `BepInEx.dll`
- `BepInEx.Preloader.dll`
- `HarmonyXInterop.dll`
- `Mono.Cecil.dll`
- `Mono.Cecil.Mdb.dll`
- `Mono.Cecil.Pdb.dll`
- `Mono.Cecil.Rocks.dll`
- `MonoMod.RuntimeDetour.dll`
- `MonoMod.Utils.dll`
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

## Our Example Enemy Assets in Unity

:::tip
The way we figure out how enemies are configured in Unity is done by looking at the Asset Ripper's Unity project output of the game files. You can use [AssetRipper Guid Patcher](https://github.com/nomnomab/lc-project-patcher/) to get a Unity project based on the game files!
:::

We have made an `ExampleEnemy` folder in our Unity project. Everything that goes into our asset bundle is in there.
The first thing we did was import our fbx model into Unity. This is as simple as dragging our fbx file into our assets, or right clicking and choosing `Import New Asset...` and choosing our fbx file. The exported fbx model contains all our materials, textures and animations when first imported, but it is good to separate some of that stuff into their own folders. We have extracted our materials into the `Materials` folder.

We have also copied the individual animations into the `Animations` folder, because I don't know how to separate them properly, but we can just ignore the animations embedded in the fbx file and use the copies inside the `Animations` folder anyways.

Anyways, how do we make the game see our assets as an enemy? Well, we create a new `ScriptableObject` of type `EnemyType`. This can be done by right clicking in your asset files, and doing `Create` -> `ScriptableObjects` -> `EnemyType`. This is what the game uses, so we need it too. Do note that these `ScriptableObjects` come from the Lethal Company Unity Template this is based off of. Do also note that our UnityProject in this repository is already configured properly.

The `EnemyType` `ScriptableObject` has some configuration options, and the most important thing is the "Enemy Prefab" part of it. This is where we tell it what the model and whatever stuff our `EnemyType` has. Also note the "Enemy Name" thingy, this will be the name of the example enemy in the coding side of things.

### The `EnemyType` Scriptable Object

#### Spawning Logic

![Screenshot: PinkGiant EnemyType in inspector](/images/lethallib/custom-enemies/unity/PinkGiantEnemyTypeInspector.png)
Enemy Type options:

- Probability Curve:
  - Y-axis: Probability from 1 to 0, presumably 100% to 0% of the enemy's rarity or spawn weight given when registering the enemy.
  - X-axis: Probability from 1 to 0, presumably 100% to 0% of the daytime cycle, e.g. from 8am to 11:59pm ingame.\
    So if you wanted your enemy to be spawning from 3pm to 6pm with 50% spawn weight on 3pm and linearly increasing to 75% onto 6pm, you'd do something like this: (43.15% to 62.5% so 0.4315 to 0.625 on the X-axis, which controls what time of day | 50% to 75% so 0.5 to 0.75 on the Y-axis, which controls the percent of spawn weight used).
    ![Screenshot: PinkGiant EnemyType ProbabilityCurve in inspector](/images/lethallib/custom-enemies/unity/ExampleEnemyTypeProbabilityCurve.png)
- Spawning Disabled: disables the natural spawning of your enemy.
- Number Spawned Falloff: hard to explain mathematically, but the use case is for when you'd want to reduce the probability of your monster spawning for every other of the same monster spawned, this is used for beehive code wherein the more beehives spawned, the lower the chance for the next beehive to spawn.
  ![Screenshot: PinkGiant EnemyType Number spawned Falloff in inspector](/images/lethallib/custom-enemies/unity/ExampleEnemyTypeFalloff.png)
- Use Number Spawned Falloff: Whether to use just the Probability Curve or to use both the Probability Curve and the Number Spawned Falloff to dynamically affect the enemy's spawn weight mid-round.
- Enemy Prefab: The prefab.
- Power Level: How much this enemy contributes to the moon's internal max power level.
- Max Count: The max number of this enemy which can naturally spawn.
- Number Spawned: _this should be a private value, ignore_
- Is Outside Enemy: decides if the enemy is an "outside" creature.
- Is Daytime Enemy: decides if the enemy is a "daytime" creature.
- Normalized Time In Day To Leave: a value in the range [0, 1] showing the percenage of each day for which the enemy is calling a method (e.g. at `0.5`, the daytime enemy runs the method at 4pm) // check pls

#### Misc. ingame properties

- Stun Time Multiplier: (`float`) Multiplier that changes how long an enemy is stunned for based on the default Stun-grenade stun time of 7.5 seconds.
- Door Speed Multiplier: (`float`) Multiplier for how fast the enemy opens doors.
- Stun Game Difficulty Multiplier: (`float`) Multiplier that exponentially increases the difficulty for Zap Gun minigame against the enemy.
- Can Be Stunned (`bool`)
- Can Die (`bool`)
- Destroy On Death: Whether or not the `GameObject` is destroyed upon enemy death.
- Can See Through Fog: (`bool`) Whether the enemy's line of sight gets clamped to a range between 0 and 30 near fog/on foggy area.

#### Vent Properties

- Time To Play Audio: (`float`) Time it takes to play an audio before/while exiting the vent (specific to `inside` enemies only) //unsure about this one
- Loudness Multiplier: (`float`) the volume multiplier for the Vent SFX.
- Override Vent SFX: (`AudioClip`) The audio clip which replaces the vent sound. Leave as `None` to use the default audio sound. (e.g. "kwoosh")
- Hit Body SFX: (`AudioClip`) For when the enemy's body is hit (e.g. "tushhh")
- Hit Enemy Voice SFX: (`AudioClip`) For when the enemy hits "something" (e.g. "aaah")
- Death SFX: (`AudioClip`) For when the enemy dies (e.g. "Aaaah!")
- Stun SFX: (`AudioClip`) For when the enemy is stunned (e.g. "Bzzzzt")
- Misc Animations: Unused
- Audio Clips: (`AudioClip`) The other audio clips you want to use (e.g. footstep sounds e.g. "badoosh.... badoosh..." (loops<sup>\*<sup>1</sup></sup>))

<sup>\*<sup>1</sup></sup> Well, technically you would use an `AnimationEvent`, not loops.

### The `ExampleEnemy` Prefab

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
       - **Notice:** The `Creature Scan ID` property is overridden by LethalLib, so it does not matter what we set it as. Same goes for the `Creature File ID` on the bestiary `TerminalNode`.
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
   - Does nothing by itself, but we have a reference to this in the [`ExampleEnemyAI.cs`](https://github.com/Hamunii/LC-ExampleEnemy/blob/main/Plugin/src/ExampleEnemyAI.cs) script to make the enemy looking at player a bit easier.
5. AttackArea
   - Does nothing by itself, but we take its position and scale and check if the player exists inside that area for the head swing attack.
6. CreatureSFX
   - We play the creature's sound effects through this.
7. CreatureVoice
   - We play the creature's voice through this.
8. Eye
   - The point from which the game checks for line of sight in some methods. Make sure to reference this as the `Eye` in your AI script in Unity.

### `Animator`

To access and use the `Animator` for a simple walking animation:

1. Create an `Animator Controller` and assign the prefab the `Animator` component.
2. Double click the `Animator Conroller` to go into its edit menu and create one layer.
3. Start off by doing something simple, like having a spawning into walking animation by right-clicking the green Entry button and making a transition to the first animation you want to start it off with (the spawning animation, or idle animation in the below example), then make another empty state by right-clicking nothingness and make a `sub-state` and naming it walkCycle or something similar, make sure to make two transition arrows pointing between eachother if you'd like to go from one animation to another later, it should look something like this now:
   ![Screenshot: PinkGiant Animator in inspector](/images/lethallib/custom-enemies/unity/PinkGiantAnimator.png)
4. Click the `sub-state`'s and make sure that attributes such as `Motion` are filled in with a .anim file, and that speed is set to the default 1.
5. Now make some animation conditions, to do this, go to the parameters tab, next to the layers tab under Animator, press the "+" sign and add a `trigger`, this is what you'll call on your code to transition between animations, for now, make a couple like "startWalk" and "stopWalk".
6. Then click the arrows in-between the `sub-state` (e.g. idleCycle into walkCycle, ignoring the arrow from entry), there should be a menu on the side with a lot of options. First, if you would like the walkCycle to loop, then press the `Has Exit Time` attribute, as it'll allow for looping. Second, Work on the transitions between the actual animations such as the idleCycle animation and the walkCycle animation, this will take a bit of fiddling to get the right transition timings. Third, add a condition such as "startWalk" as you're transition from a spawning animation or idle animation, into a walking animation.
   ![Screenshot: idleCycle to walkCycle animation in Animator](/images/lethallib/custom-enemies/unity/PinkGiantAnimatorTransition.png)
   That should be good enough to get you started, this tool is very self-intuitive and takes a bit of practise getting used to, to wrap up this section, I'll be explaining how the `Any State` `sub-state` works, and `AnimationEvent`'s.

#### `Any State`

- `Any State` simply allows you to set a transition from every state into another `sub-state` without making a lot of disorganising connections, each animation transition is edit-able but requires all transition having either `Has Exit Time` turned on, or a global condition such as "stopWalk" inserted, this makes it ideal for animations such as "startDeath" where the enemy dies and needs to interrupt any animation to start its death animation.

#### `AnimationEvents`

1. `AnimationEvents` allow you to call functions during animations, using the `Animator` section as reference, during the walking animation, to simulate the sound of footsteps, assuming you have access to an `AudioClip` of the footstep sound, create a function that plays the footstep sound.
2. Make sure your enemy prefab is selected, then go down to the menu that says "Project Console", right-click "Project", hover over "Add Tab" and press "Animation", This adds an interactable Animation tab to the bottom, now select it.
3. The tab contains the following:

- An animation player with record, preview, pause, start, etc.
- A few buttons to add keyframes for animation and add events, we'll be focusing on "Add Events" option.
- A drop-down menu that contains all the animations connected to the `Animator` which is connected to the prefab, use that to select the walking animation.

4. To add an `AnimationEvent`, you'd need to first find the frame in which the foot just barely connects to the ground, and press the "Add Event." button, this creates an `Animation Event` in the inspector.
5. Press the "Function:" drop-down menu, select your `EnemyAI`, and find the function that you created to play footstep sounds.

:::warning IMPORTANT
For whatever reason, a function may not be displayed within your `EnemyAI` in `AnimationEvent` if it contains a parameter such as `AudioClip`, I'm not sure what parameters are not accepted, but making a void function seems to work best.
:::

### ExampleEnemy Terminal Entry

We need a `TerminalNode` `ScriptableObject` for our entry in the bestiary. This contains the bestiary's `Display Text` field that may contain sigurd's notes and enemy lore, and `Creature Name` field that shows when the user inputs `bestiary` into the terminal.

We also have a `TerminalKeyword` `ScriptableObject`, which has the word that the user needs to write in the terminal to find the page.

:::warning
If an existing item in the game starts with the same word as your enemy's name, that can cause the game to think we are trying to buy that item and not being able to open the bestiary entry. As a workaround, you can try changing the name that is shown and used for opening the terminal entry.
Additionally, the `Word` attribute can not have any capital letters in it, they seem to not handle capitals well.
:::

The enemy spinning animation on the bestiary entry background is a video file, and you can make one yourself in Blender by for example using the decimate (if you have a lot of geometry) and wireframe modifiers.

:::warning IMPORTANT
Unity Editor on Linux has [bad support for video files](https://docs.unity3d.com/Manual/VideoSources-FileCompatibility.html), so if you are using Linux, you might want to [encode your video to VP8 using FFmpeg](https://trac.ffmpeg.org/wiki/Encode/VP8). Unfortunately, Blender does not have an option to encode to VP8.
:::

### Asset Bundling

We need to package our assets into an Asset Bundle in order to be able to load them from our plugin. See [Asset Bundling](/dev/intermediate/asset-bundling) to find out how this is done.

::: tip
We have a `SETUP-PROJECT.py` script in our project which generates a `csproj.user` file. This file will copy your mod DLL and Asset Bundle to the path you specified when running the setup script, each time you build your plugin.

Just make sure to keep the asset bundle name the default, or you'll have to edit your `csproj.user` file to look for the new name, in which case you may also want to edit our setup script to look for this new name in the file it generates.
:::
