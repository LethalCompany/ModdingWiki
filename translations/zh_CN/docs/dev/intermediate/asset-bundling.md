---
prev: false
next: false
description: An overview of how to create and load asset bundles in your plugin.
---

# Asset Bundling

In order to add custom assets to your mods, you will need to create an asset bundle and load it with your plugin code. In order to do this, you will need to have a Unity project with your assets contained in it. Using the [Lethal Company Unity template project](https://github.com/EvaisaDev/LethalCompanyUnityTemplate/tree/main#readme) is recommended so you can use scripts from the game in your prefabs.

## Marking Assets For Bundling

Once you have the custom assets you want to include in a bundle, you have to mark them to be included in the asset bundle. This can be done by selecting your asset in Unity, and in the inspector window at the bottom either selecting or creating a new bundle name.
![Image of the asset bundle name selection at the bottom of the inspector.](/images/asset-bundling/AssetBundleMark.png)

## Creating The Asset Bundle

Asset bundling requires the use of a package. The aforementioned template already includes the package, if you're using a decompiled project you can add it by going to `Window -> Package Manager -> Add package from git URL` and entering the following URL: `https://github.com/Unity-Technologies/AssetBundles-Browser.git`

The asset bundling window can be opened by going to `Window -> Asset Bundle Browser` and clicking the Build tab. Here you can pick an output path for your asset bundle(s), then click Build. This will generate and place all the asset bundles into that folder as extensionless files with the name of the bundle (you can ignore the .manifest files).

:::warning
**For security reasons, asset bundles cannot contain scripts. To create new scripts, you should write them in your plugin code. If you need to access them in your assets, you can add your mod .dll to the project which will let you use/add scripts such as MonoBehaviours in your mod. Any dependencies will also need to be added to the project.**
:::

## Using Your Asset Bundle

After making your asset bundle, you will need to access it via plugin code. The easiest way to do this is by simply copying the asset bundle that was generated in the above steps into the same folder as your plugin .dll and load it with the following code:

```cs
using UnityEngine;
// ... In your plugin class ...
public static AssetBundle MyCustomAssets;
// ... Later in your plugin Awake() code ...
private void Awake() {
    string sAssemblyLocation = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

    MyCustomAssets = AssetBundle.LoadFromFile(Path.Combine(sAssemblyLocation, "mymodbundle"));
    if (MyCustomAssets == null) {
        mls.LogError("Failed to load custom assets."); // ManualLogSource for your plugin
        return;
    }
}
```

You can now access it via plugin code to do whatever you need to, such as spawning it in, registering it in the network manager, or whatever else you might need to do like so:

```cs
Item MyTestItem = SCPCBAssets.LoadAsset<Item>("assets/Mods/TestItem");
```

As a final note, make sure you include your asset bundle alongside the .dll of your mod when publishing.
