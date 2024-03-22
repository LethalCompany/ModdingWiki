---
prev: false
next: false
description: Guide to migrating from CSync v1 to v2.
---

# v2.0.0 Migration Guide

The boilerplate from previous versions is now redundant as **CSync** will handle things itself.<br>
This means Steps 3 and 4 of the outdated guide are no longer necessary.

To begin updating, replace `SyncedInstance` with `SyncedConfig`.<br>

```cs
MyConfig : SyncedInstance<MyConfig> // [!code --]
MyConfig : SyncedConfig<MyConfig> // [!code ++]
```

We will now register our config with **CSync** through `ConfigManager` instead of `InitInstance(this)`.
Notice how we specify our mod's GUID through `base()` to ensure it doesn't overlap with others behind the scenes.

```cs
public ExampleConfig(ConfigFile cfg) : base("MyModName") {
    InitInstance(this); // [!code --]
    ConfigManager.Register(this); // [!code ++]

    EXAMPLE_VAR = cfg.BindSyncedEntry("General", "bExampleVar", true, "This is an example variable that will be synced.");
}
```

**We are all done!** If you previously had join/leave patches and request/receiver methods, you should remove these to prevent any possible issues.

**OPTIONAL**<br>
This update also provides the `SyncComplete` event that you can hook into if desired.

```cs
public ExampleConfig(ConfigFile cfg) : base("MyModName") {
    ConfigManager.Register(this);

    EXAMPLE_VAR = cfg.BindSyncedEntry("General", "bExampleVar", true, "This is an example variable that will be synced.");

    SyncComplete += DoSomethingAfterSync; // [!code ++]
}

public void DoSomethingAfterSync(object sender, EventArgs args) { // [!code ++]
    // Run some logic here // [!code ++]
} // [!code ++]
```
