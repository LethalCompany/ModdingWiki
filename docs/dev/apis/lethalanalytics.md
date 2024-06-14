---
prev: false
next: true
description: How modders can use LethalAnalytics to see how their mods are used, easily catch errors, and learn about their audience.
---

# LethalAnalytics 📈

[![Thunderstore Version](https://img.shields.io/thunderstore/v/RB007/LethalAnalytics?style=for-the-badge&logo=thunderstore&logoColor=white)](https://thunderstore.io/c/lethal-company/p/RB007/LethalAnalytics/)

[![Thunderstore Downloads](https://img.shields.io/thunderstore/dt/RB007/LethalAnalytics?style=for-the-badge&logo=thunderstore&logoColor=white)](https://thunderstore.io/c/lethal-company/p/RB007/LethalAnalytics/)

[![GitHub Issues](https://img.shields.io/github/issues/RoosterBooster007/LethalAnalytics?style=for-the-badge&logo=github&logoColor=white)](https://github.com/RoosterBooster007/LethalAnalytics/)

Allows mod creators to see how their mods are used, easily catch errors, and learn about their audience.

## Overview
- [Supported Analytics Sites](/dev/apis/lethalanalytics/supported-analytics-sites/)
- [Usage Guide](/dev/apis/lethalanalytics/usage-guide/)
	- [Creating a GA session](/dev/apis/lethalanalytics/usage-guide/creating-a-ga-session/)
	- [Sending GA events](/dev/apis/lethalanalytics/usage-guide/sending-ga-events/)
	- [Creating a GA4 property](/dev/apis/lethalanalytics/usage-guide/creating-a-ga4-property/)
- [README & User Privacy](/dev/apis/lethalanalytics/readme-and-user-privacy/)

## Requirements
In order to use LethalAnalytics, you must have the following mods/libraries installed:
| Required | Name | Version |
|:--------:|:-------------|:------|
| ✅ | [LethalConfig](https://thunderstore.io/c/lethal-company/p/AinaVT/LethalConfig/versions/#1.4.2:~:text=1.4.2) | 1.4.2 |
| ✅ | [BepInExPack](https://thunderstore.io/c/lethal-company/p/BepInEx/BepInExPack/versions/#:~:text=5.4.2100) | 5.4.2100 |

## Setup
::: info
Please check to make sure you have completed the below steps before moving on.
:::

- Reference the ``LethalAnalytics.dll`` file (downloaded from [Thunderstore](https://thunderstore.io/c/lethal-company/p/RB007/LethalAnalytics/) or [Github](https://github.com/RoosterBooster007/LethalAnalytics/)) from your project.
- Use the ``LethalAnalytics`` namespace to gain access to the LethalAnalytics API.
```c#
using LethalAnalytics;
```
- Include LethalAnalytics as a ``BepInDependency`` of your mod so that BepInEx can work its dependency graphing magic (and properly load LethalAnalytics).
```c#{2}
[BepInPlugin(modGUID, modName, modVersion)]
[BepInDependency("net.RB007.LethalAnalytics")]
public class YourHopefullyErrorFreeModOrSmth : BaseUnityPlugin { ... }
```
- If uploading your mod to Thunderstore, make sure to include LethalAnalytics in your ``manifest.json`` file.