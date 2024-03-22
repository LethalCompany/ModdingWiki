---
prev: false
next: true
description: A guide to synchronizing a BepInEx config file between host and clients using the CSync library.
---

# CSync (Config Syncing Library)

## Setup

There are two ways to depend upon **CSync**, but I recommend using the [NuGet package](https://www.nuget.org/packages/Owen3H.BepInEx.CSync).<br>
This will automatically include both an assembly reference and documentation as opposed to Thunderstore.

### NuGet (Recommended)

**1**. Open the terminal in Visual Studio.<br>
**2**. Run the following command.

```console
dotnet add package Owen3H.BepInEx.CSync
```

Alternatively, you can install it visually via the **NuGet** package manager.

**1**. Head to `Project > Manage NuGet Packages`.<br>
**2**. Search and select the `Owen3H.BepInEx.CSync` package.<br>
**3**. Choose the latest version and hit Install.

### Thunderstore (Manual)

**1**. Download the latest version of the library on the [Thunderstore page](https://thunderstore.io/c/lethal-company/p/Owen3H/CSync/).<br>
**2**. Extract the zip into your game directory root.<br>
**3**. In your mod's project, add an **Assembly Reference** to `../BepInEx/plugins/CSync.dll`.

## Overview

- [Usage Guide](/dev/apis/csync/usage-guide) - The guide/tutorial to using this library.
- [Migrating to v2](/dev/apis/csync/v2-migration) - How to update from v1 to v2.
- [Troubleshooting](/dev/apis/csync/outdated/troubleshooting) - Common issues and their solutions. (Pre v2)
