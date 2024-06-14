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

### Items & Scrap {#asset-items-and-scrap}
- [LethalExpansion by HolographicWings](https://thunderstore.io/c/lethal-company/p/HolographicWings/LethalExpansion/) allows you to create your own scrap using a custom Unity SDK. [The SDK's README](https://github.com/HolographicWings/LethalSDK-Unity-Project) has a basic usage tutorial.

### Posters
- [LethalPosters by femboytv](https://thunderstore.io/c/lethal-company/p/femboytv/LethalPosters/) allows you to create your own custom posters that appear in the ship. [The README](https://thunderstore.io/c/lethal-company/p/femboytv/LethalPosters/) has a basic section on how to format your poster for upload.

### Sound Replacement
- ⭐ [CustomSounds by Clementinise](https://thunderstore.io/c/lethal-company/p/Clementinise/CustomSounds/) allows you to replace ingame sounds using your own .wav file. [The wiki page on CustomSounds](/dev/apis/customsounds) covers the process of creating of swapping out sounds.


## Programming APIs

### Configuration
- ⭐ [ConfigurableCompany by Ansuz/Amrv](https://thunderstore.io/c/lethal-company/p/AMRV/ConfigurableCompany/) implements an in-game menu that allows developers to create file-dependant configurations in a simple way that will automatically synchronize when needed. [Learn how to develop with mod](/dev/apis/configurable-company.md).

- ⭐ [CSync](https://thunderstore.io/c/lethal-company/p/Sigurd/CSync/) is a compact library/API enabling mod authors to synchronize the host's configuration file with all other clients. [The wiki page on CSync](/dev/apis/csync) will guide you through the process of implementing this into your own mod.

### Dungeons
- ⭐ [LethalLib by Evaisa](https://thunderstore.io/c/lethal-company/p/Evaisa/LethalLib/) allows you to add new dungeons.

### Enemies
- ⭐ [LethalLib by Evaisa](https://thunderstore.io/c/lethal-company/p/Evaisa/LethalLib/) allows you to add new enemies, although the process is fairly involved and not currently well documented.

### Input
- [InputUtils by Rune580](https://thunderstore.io/c/lethal-company/p/Rune580/LethalCompany_InputUtils/) allows you to easily initialize input/keybinds with ingame rebinding. [The README](https://thunderstore.io/c/lethal-company/p/Rune580/LethalCompany_InputUtils/) has a developer quickstart.

### Items & Scrap {#programming-items-and-scrap}
- ⭐ [LethalLib by Evaisa](https://thunderstore.io/c/lethal-company/p/Evaisa/LethalLib/) allows you to add new Scrap & Shop Items. [The wiki page on LethalLib](/dev/apis/lethallib) links to a full tutorial to build off.

### Model Replacement
- [ModelReplacementAPI by BunyaPineTree](https://thunderstore.io/c/lethal-company/p/BunyaPineTree/ModelReplacementAPI/) allows you to create your own custom player models, and swaps them out at runtime. [The mod's official wiki](https://github.com/BunyaPineTree/LethalCompany_ModelReplacementAPI/wiki) explains how to set up a player model.

### Networking
- [LC-API by 2018](https://thunderstore.io/c/lethal-company/p/2018/LC_API/) allows you send and receive messages of any serializable type. [The mod's GitHub wiki](https://github.com/steven4547466/LC-API/wiki/Networking) explains how to use its messaging service.
- [LethalNetworkAPI by xilophor](https://thunderstore.io/c/lethal-company/p/xilophor/LethalNetworkAPI/) allows you to create, send, and receive messages, events, and variables over the network. [The mod's official wiki](https://xilophor.github.io/lethal-network-api-docs/) explains how to use them.

### Sound Replacement 
- [LCSoundTool by no00ob](https://thunderstore.io/c/lethal-company/p/no00ob/LCSoundTool/wiki/828-audio-logging/) allows you to replace sounds at runtime. [The mod's Thunderstore wiki](https://thunderstore.io/c/lethal-company/p/no00ob/LCSoundTool/wiki/) covers how to use it.

### Terminal
- [TerminalApi by NotAtomicBomb](https://github.com/NotAtomicBomb/TerminalApi) adds a nice and easy way to add and modify terminal keywords. [The mod's GitHub README](https://github.com/NotAtomicBomb/TerminalApi) has documentation and an example plugin to reference.

### Analytics
- ⭐ [LethalAnalytics by RoosterBooster007](https://thunderstore.io/c/lethal-company/p/RB007/LethalAnalytics/) allows mod creators to see how their mods are used, easily catch errors, and learn about their audience. [The mod's GitHub README](https://github.com/RoosterBooster007/LethalAnalytics/) has documentation and examples to reference.

## Adding APIs to the wiki

If you're an API developer and want to get your API added to this list, feel free to make a [pull request](https://github.com/LethalCompany/ModdingWiki), assuming your API meets the following criteria:

- Open source
- Fairly well documented - even better if you write a wiki article<sup>[1](#fn-1)</sup>

<b id="fn-1" style="color: var(--vp-c-brand-1);">1</b>: Some exceptions may be made if it's an especially groundbreaking API, or it's the only existing solution.
