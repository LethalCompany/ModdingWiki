---
prev: false
next: false
description: An list of entries for LethalLib modding topics and the basis for all LethalLib guides on this wiki.
---

# LethalLib mod creation basics

This page will go over all the basics needed to start making mods using LethalLib. At the bottom of this page you can branch out to whatever specific part of the game you'd like to mod from there.

## LethalLib requirements

To begin with LethalLib development, you will need the following mods:

- [BepinExPack by BepInEx](https://thunderstore.io/c/lethal-company/p/BepInEx/BepInExPack/)

- [HookGenPatcher by Evaisa](https://thunderstore.io/c/lethal-company/p/Evaisa/HookGenPatcher/)

- [LethalLib by Evaisa](https://thunderstore.io/c/lethal-company/p/Evaisa/LethalLib/)

These can be installed with a mod manager such as r2modman or Thunderstore manager, or installed manually. A mod manager will let you automatically update LethalLib, but a manual install makes it easier to do LAN multiplayer testing. The guides below will assume a manual install for simplicity.

## Development environment

You will need to start by creating a plugin (see [Starting a Mod](/dev/starting-a-mod)) and adding the LethalLib .dll as a dependency. You do this in the same way you add the game assembly (see Starting a Mod again). If you manually installed LethalLib, you'd find it somewhere in `...\steamapps\common\Lethal Company\BepInEx\plugins`. If you installed via a mod manager, you can get to the mod profile folder where it will be located in a similar path like so:

![Image of r2modman, highlighting the 'Browse profile folder' option](/images/lethallib/ProfileFolderModman.png)

You'll also want to add the LethalLib mod ID as a BepinEx dependency, which can be done by adding a `BepInDependency` attribute, like so:

```cs
[BepInPlugin(PluginInfo.PLUGIN_GUID, PluginInfo.PLUGIN_NAME, PluginInfo.PLUGIN_VERSION)]
[BepInDependency(LethalLib.Plugin.ModGUID)] // [!code ++]
public class MyPlugin : BaseUnityPlugin
```

This is also a quick way of ensuring you've correctly added the LethalLib .dll as a dependency, as otherwise this will give you an error.

## Lethal Company Unity project

In order to make mods for LethalLib, you will almost certainly need to use a decompiled Lethal Company Unity project so you can access the game scripts. You can either do a decompilation yourself with a program like [Asset Ripper](https://github.com/AssetRipper/AssetRipper), or use this [template project](https://github.com/EvaisaDev/LethalCompanyUnityTemplate/tree/main#readme), which provides stub scripts and no assets for a clean modding environment. A decompile is much harder to do but will give you all the games' data and assets to examine and use as a base for anything you make.

## Specific tutorials

Each page below goes through the full process of creating a mod for the given part of Lethal Company via LethalLib. These will use the template project above as a base.

- [Custom Scrap](/dev/apis/lethallib/customscrap)

- Custom Dungeons [WIP]
