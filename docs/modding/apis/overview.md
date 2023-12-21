---
prev: false
next: false
description: A list of specific modding APIs for Lethal Company, and documentation on how to use them.
---

# Modding APIs Overview

There are two types of API that will be covered in this overview:

- Asset API: An API or custom content mod that can be used without writing any code. Good if you want something simple that even non-programmers can create something with.
- Programming API: A user-created modding API that can be intergrated into your C# Lethal Company mod.

There may be multiple APIs for a single concept, each with their own pros and cons.

APIs marked with a `Gold Star ⭐` have a tutorial on this wiki.

## Asset APIs

### Cosmetics
- [MoreCompany by notnotnotswipez](https://thunderstore.io/c/lethal-company/p/notnotnotswipez/MoreCompany/) has a feature that adds custom cosmetics (hats, badges, etc). You can learn how to create your own through the official [Cosmetic Creation Guide](https://github.com/notnotnotswipez/MoreCompany/wiki/Cosmetic-Creation).

### Custom Suits
- [MoreSuits by x753](https://thunderstore.io/c/lethal-company/p/x753/More_Suits/) allows you to create your own custom ingame suits using only a .png file. [The README](https://thunderstore.io/c/lethal-company/p/x753/More_Suits/) has a basic section on how to format your suit mod for upload.

### Items & Scrap
- [LethalExpansion by HolographicWings](https://thunderstore.io/c/lethal-company/p/HolographicWings/LethalExpansion/) allows you to create your own scrap using a custom Unity SDK. [The SDK's README](https://github.com/HolographicWings/LethalSDK-Unity-Project) has a basic usage tutorial.

### Posters
- [LethalPosters by femboytv](https://thunderstore.io/c/lethal-company/p/femboytv/LethalPosters/) allows you to create your own custom posters that appear in the ship. [The README](https://thunderstore.io/c/lethal-company/p/femboytv/LethalPosters/) has a basic section on how to format your poster for upload.

### Sound Replacement
- [CustomSounds by Clementinise](https://thunderstore.io/c/lethal-company/p/Clementinise/CustomSounds/) allows you to replace ingame sounds using your own .wav file. [This guide by milleroski](https://github.com/milleroski/Lethal-Company-Sound-Modding-Guide) covers the process of creating your own Custom Sound using CustomSounds.
<!-- Add a gold star when #28 is merged -->

## Programming APIs

### Enemies
- [LethalLib by Evaisa](https://thunderstore.io/c/lethal-company/p/Evaisa/LethalLib/) allows you to add new enemies, although the process is fairly involved and not currently well documented.

### Input
- [InputUtils by Rune580](https://thunderstore.io/c/lethal-company/p/Rune580/LethalCompany_InputUtils/) allows you to easily initialize input/keybinds with ingame rebinding. [The README](https://thunderstore.io/c/lethal-company/p/Rune580/LethalCompany_InputUtils/) has a developer quickstart.

### Items & Scrap
- [LethalLib by Evaisa](https://thunderstore.io/c/lethal-company/p/Evaisa/LethalLib/) allows you to add new Scrap & Shop Items.

### Model Replacement
- [ModelReplacementAPI by BunyaPineTree](https://thunderstore.io/c/lethal-company/p/BunyaPineTree/ModelReplacementAPI/) allows you to create your own custom player models, and swaps them out at runtime. [The mod's official wiki](https://github.com/BunyaPineTree/LethalCompany_ModelReplacementAPI/wiki) explains how to set up a player model.

### Sound Replacement 
- [LCSoundTool by no00ob](https://thunderstore.io/c/lethal-company/p/no00ob/LCSoundTool/wiki/828-audio-logging/) allows you to replace sounds at runtime. [The mod's Thunderstore wiki](https://thunderstore.io/c/lethal-company/p/no00ob/LCSoundTool/wiki/) covers how to use it.

### Terminal
- [TerminalApi by NotAtomicBomb](https://github.com/NotAtomicBomb/TerminalApi) adds a nice and easy way to add and modify terminal keywords. [The mod's GitHub README](https://github.com/NotAtomicBomb/TerminalApi) has documentation and an example plugin to reference.


## Adding APIs to the wiki

If you're an API developer and want to get your API added to this list, feel free to make a [pull request](https://github.com/LethalCompany/ModdingWiki), assuming your API meets the following criteria:

- Open source
- Fairly well documented - even better if you write a wiki article<sup>1</sup>

<sup>1</sup>: Some exceptions may be made if it's an especially groundbreaking API, or it's the only existing solution.