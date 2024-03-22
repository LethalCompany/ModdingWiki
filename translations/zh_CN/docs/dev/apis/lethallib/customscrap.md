---
prev: false
next: false
description: 有关如何使用 LethalLib 添加自定义废料物品的教程。
---

# 使用 LethalLib 自定义废料

## 序言

确保你已经完成了 [LethalLib 主页](/dev/apis/lethallib) 中的所有操作。 This page will run through everything needed to make a new scrap item from scratch in the template project.

At bare minimum, you will need the following added to your template project to create a custom scrap item:

- A model of your scrap (and materials using the HDRP Lit shader)
- An icon for the scrap when in the hotbar

## 物品数据

The first thing you should create is the Item Data for your custom scrap, which can be created right-clicking in your asset window and going to create -> ScriptableObject -> Item
![Image of the context menu in the asset browser of Unity, directing to Create -> ScriptableObjects -> Item](/images/lethallib/customscrap/CreateItem.png)

This item data lets you configure basically everything about your item. There are a lot of options, but the important ones for scrap are:

- **Item Name**: the name of the item.
- **Spawn Position Types**: Spawn position types this item can spawn at. If the list is empty, the scrap can spawn anywhere (recommended to just leave this empty except for stuff like special scrap for custom moons).
- **Two Handed**: Whether the item gives the "Hands Full" message and prevents changing items.
- **Two Handed Animation**: Whether the item uses the two-handed animation for carrying or not.
- **Weight**: Determines the weight of the scrap. The weight in-game is equal to (this value - 1) \* 100 (e.g. 1.18 is 18 lb).
- **Item Spawns On Ground**: Should be true for scrap.
- **Highest Sale Percentage**: The maximum percentage (0-90) the item can go on sale in the terminals store; All items have this set to 80.
- **Is Conductive Metal**: Whether this item attracts lightning.
- **Max/Min Value**: The value range for the item. Does not directly correlate to the range in game; a scalar is applied based on the moon it spawns on. For reference, the Big Bolt uses the range Max-80, Min-50.
- **Spawn Prefab**: The prefab representing the item in the world. Creation of this is detailed later in this guide.
- **Resting Rotation**: How the scrap is rotated when laying on the ground.
- **Rotation/Position/Vertical Offset**: The offset values for holding the item in your hand. Mostly needs manual fiddling with until it looks right for a given item.
- **Grab SFX/Drop SFX**: The sound effect played when you pick up/drop a scrap item, respectively.
- **Item Icon**: The icon that appears in the hotbar while in the inventory.
- **Allow Dropping Ahead of Player**: Whether the item can be dropped in front of the player, as opposed to only dropping directly below their feet.
- **Is Defensive Weapon**: For scrap that also acts as weapons; requires more special scripting, so for most cases should be left off.

Everything else is optional, has no effect on scrap, or shouldn't be modified.

Note that you will have to enable some of the netcode variables if you want them to sync properly in multiplayer.

## 物品预制件

An item prefab needs to have a specific setup to work correctly with all the Lethal Company systems. The prefab should have only the root object and a child object called "ScanNode":
![Image of the Big Bolt scrap prefab structure.](/images/lethallib/customscrap/ScrapPrefab.png)

### 根对象

The root object should have the following:

- Mesh Renderer + Mesh Filter for your model
- Box collider roughly encompassing your model
- Physics Prop script (see below for configuration)
- Audio Source with no clip assigned (see below for output setup). This is necessary even if you don't have any SFX.
- Network Object (see below for configuration)

The root object will also need to have the tag "PhysicsProp" and the layer set to "Props".

The Physics Prop script component should have:

- The checkboxes for "Grabbable", "Is In Factory", and _optionally_ "Grabbable to Enemies" set to true
- The "Item Properties" assigned to the Item Data you created

The Network Object must only have the following options enabled, with everything else disabled:

- Synchronize Transform
- Scene Migration Synchronization
- Spawn With Observers
- Don't Destroy With Owner

The Audio source should use the "Diagetic" (Yes it's misspelled in the game files) audio mixing. If you're using a decompilation you can use the one already present, otherwise you can make an empty audio mixer with an _identical_ name, and use the utility function FixMixerGroups() to swap the mixer using LethalLib (see Loading and Registering code note below)

### ScanNode 对象

On the ScanNode child gameobject, you should have the following:

- Box collider tightly encompassing your model
- Scan Node script

The Scan Node script component should have:

- Max/Min range set to the max/min distance to have your scrap detectable (13, 1 are typical values)
- Have require LOS enabled
- Header text as the name to show when scanned
- Sub Text set exactly to "Value: " (note the space after the colon)
- Scrap Value should be 0 (this is modified by the game at runtime)
- Creature Scan ID set to -1
- Node Type set to 2

The ScanNode object will also need to have the layer set to "ScanNode".
![Image of the scan node object setup.](/images/lethallib/customscrap/ScanNode.png)

After you've done this, you should go back to your Item Data and assign the Spawn Prefab to be the item prefab.

After this, you should put your item data, prefab, any anything they rely on such as models into an asset bundle (See [Asset Bundling](/dev/intermediate/asset-bundling)). You can add multiple items to the same asset bundle if you're adding a collection of items.

## 加载与注册

After creating your asset bundle and loading it in, you need to register your item prefab as a network object and add the scrap item data via LethalLib. This can be done with the following code:

```cs
int iRarity = 30;
Item MyCustomItem = MyAssetBundle.LoadAsset<Item>("directory/to/itemdataasset.asset");
LethalLib.Modules.NetworkPrefabs.RegisterNetworkPrefab(MyCustomItem.spawnPrefab);
LethalLib.Modules.Items.RegisterScrap(MyCustomItem, iRarity, LethalLib.Modules.Levels.LevelTypes.All);
```

::: info
If you're using an empty audio mixer with the name "Diagetic" for the Audio Source, add the following line to fix the mixer:

```cs
Item MyCustomItem = MyAssetBundle.LoadAsset<Item>("directory/to/itemdataasset.asset");
LethalLib.Modules.Utilities.FixMixerGroups(MyCustomItem.spawnPrefab); // [!code ++]
LethalLib.Modules.NetworkPrefabs.RegisterNetworkPrefab(MyCustomItem.spawnPrefab);
```

This may also fix issues with sounds playing twice, if that issue is occuring for you.
:::

Rarity is a weight value that determines how likely the scrap is to spawn, with higher numbers meaning more likely to spawn. All scrap in the base game varies from 1 to 100 differing per-moon, and the value should be kept in that range.

LevelTypes is a flag enum which provides some basic pre-defined options for moons, such as All, Vanilla, or any of the default moons individually. The enum supports bitwise operations, for example `(LethalLib.Modules.Levels.LevelTypes.March | LethalLib.Modules.Levels.LevelTypes.Dine)` will register the scrap for both March and Dine.

There is a third optional parameter taking in an array of strings. Each string is compared to the internal moon name of all registered moons and adds the scrap to that moon if they match, allowing you to add scrap to custom moons. The names are mod-dependent; check with the custom moon author or check their source code for the name of the selectable level data asset for that moon.

The vanilla moons can also be included through this third parameter, where all vanilla moons' selectable level data follow the naming scheme "MoonnameLevel", like "ExperimentationLevel". It is recommended to follow this naming scheme if you intend on creating a custom moon for consistency.

Scrap can be registered multiple times to have the rarity be different for specific moons, such as being more common on paid moons.

## 结语

If you've done everything right, you should now find your custom scrap on the moons you've assigned it to. If you have any problems, you can reach out on the [Lethal Company Discord](https://discord.gg/lethal-company).
