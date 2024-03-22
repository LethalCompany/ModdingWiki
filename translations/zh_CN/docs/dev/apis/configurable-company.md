---
prev: true
next: true
description: 关于如何为插件添加和使用 Configurable Company 的指南。
---

# Configurable company for your plugin

You will learn how you can add the API to your project and create simple configurations.

For an in-depth guide on the configurations click one of the following buttons:\
[Developing pages](/dev/apis/configurable-company/developing-pages)\
[Developing categories](/dev/apis/configurable-company/developing-categories)\
[Developing configurations](/dev/apis/configurable-company/developing-configs)\
[Developing events](/dev/apis/configurable-company/event-listening)

## Requirements

To develop with Configurable company, you should have the following mods:

- [BepinExPack by BepInEx](https://thunderstore.io/c/lethal-company/p/BepInEx/BepInExPack/)

- [ConfigurableCompany by Ansuz/AMRV](https://thunderstore.io/c/lethal-company/p/AMRV/ConfigurableCompany/)

I encourage to use a [mod manager](https://thunderstore.io/c/lethal-company/p/ebkr/r2modman/) to install them and avoid any problems.

## 设置环境

:::warning
本指南假定你使用 [Visual Studio](https://visualstudio.microsoft.com) 作为集成开发环境。
:::

Before adding the dependency to your project you should have your base plugin created, if you don't know how see [Initial setup](/dev/initial-setup) and [Starting a mod](/dev/starting-a-mod).

You can add the project via [NuGet packages](#using-nuget-package-manager) or by [referencing it manually](#adding-file-manually).

### Using NuGet package manager

If you wish to learn how to use **NuGet**, [here](https://learn.microsoft.com/en-us/nuget/quickstart/install-and-use-a-package-in-visual-studio) is a link to microsoft's guide.

You need to add the package [**Amrv.ConfigurableCompany**](https://www.nuget.org/packages/Amrv.ConfigurableCompany). You can add it to your project by using the _manage nuget packages_ option from your project.\
Otherwise you can add the reference by manually editing the `.csproj` file and adding the following tags:

```xml
<ItemGroup>
    <PackageReference Include="Amrv.ConfigurableCompany" Version="2.5.0" PrivateAssets="all"/>
</ItemGroup>
```

### Adding dependency manually

First of all you need a copy of the `.dll` file (wich you can [download manually](https://thunderstore.io/c/lethal-company/p/AMRV/ConfigurableCompany/versions/) or copy an existing one if you have the mod installed).

Add the `Amrv.ConfigurableCompany.dll` to the library folder of your project. _Make sure you also include it as a reference in the project file `project.csproj`._

:::info
You can reference the full path to the dll that you are using for the game, however I don't recommend using absolute paths.
:::

```xml
<ItemGroup>
    <!--You can name the reference however you want as long as unique-->
    <Reference Include="ConfigurableCompany">
        <!--This is an example path, use the one you have with the dll-->
        <HintPath>libs\ConfigurableCompany.dll</HintPath>
    </Reference>
</ItemGroup>
```

You might as well mark the mod as a hard dependency of your project.

::: info
You can get the dependency string and the mod version from the `LethalConfiguration` class.

```cs
    LethalConfiguration.PLUGIN_GUID
    LethalConfiguration.PLUGIN_VERSION
```

:::

```cs
[BepInPlugin(PluginInfo.PLUGIN_GUID, PluginInfo.PLUGIN_NAME, PluginInfo.PLUGIN_VERSION)]
[BepInDependency(LethalConfiguration.PLUGIN_GUID, BepInDependency.DependencyFlags.HardDependency)] // [!code ++]
    public class YourPlugin : BaseUnityPlugin {
        // The rest of the class goes here ...
    }
```

## How does it work

Configurations and categories need an `ID` that will identify those configurations even if your plugin is not enabled for the player, also allowing other plugins to interact with your configurations if they need to.

As a convention I recommend that you define your ID's as follows:\
`owner_your-plugin-name_configuration-name`
::: warning
ID's must be composed of letters, numbers, underscores or hypens and should be in lowercase.
Also they are meant to be unique.
:::

All configurations and categories will be loaded once the player decides to host a game and then the player will be able to modify any configuration to their liking.\
Once the player starts the game or saves all the changes will be loaded into their respective configuration. If you want do instantly detect when your configuration has changed you should [listen to the corresponding event](/dev/apis/configurable-company/event-listening).

When another player joins, all the configurations will request a synchronization to the client.

:::warning
Keep in mind configurations depend on the current save file so (for now) until the player selects a file, configurations will hold their default value.
:::

## Creating a simple configuration

ConfigurableCompany contains all the resources you need in a class called `LethalConfiguration` located at the namespace `Amrv.ConfigurableCompany`. There you can reference and declare everything you might need.

Configurable company uses [builder pattern](https://en.wikipedia.org/wiki/Builder_pattern) to create pages, categories and configurations, making it very easy to add and update configurations.

Here is an example that adds a `ranged float` that allows any value from **10** to **100** configuration:

```cs
Configuration simpleConfig = LethalConfiguration.CreateConfig("me_my-mod_id")
                                                .SetName("My first configuration")
                                                .SetType(ConfigurationTypes.RangeFloat(10, 100))
                                                .SetTooltip("My cool description")
                                                .SetSynchronized(true)
                                                .Build(); // 注意，如果要将配置分配给 Configuration 变量，可省略此 Build 调用
```

:::info
请注意，还有更多选项可用于构建配置，完整指南请参阅[开发配置](/dev/apis/configurable-company/developing-configs.md)。
:::

现在你已经有了简单的配置，可能需要获取值。 You can get it in multiple ways but the most common ones are:

```cs
float value = simpleConfig.Get<float>();
float valueOrDefault = simpleConfig.Get<float>(10f);
int valueCasted = simpleConfig.Get<int>();
```

:::tip
You don't know when the user changes the value so as a recomendation you should use the values once the game starts or [listen to configuration changes](/dev/apis/configurable-company/event-listening.md).
:::
