---
prev: true
next: true
description: Learn how to create a basic project for a Lethal Company mod.
---

# Starting a mod

## Setting up your project {#setup-project}
::: warning
This guide assumes you've completed all the required steps in **[initial setup](/dev/initial-setup)**, or that you know what you're doing.
:::

This guide follows certain parts of the [official BepInEx guide](https://docs.bepinex.dev/articles/dev_guide/plugin_tutorial/2_plugin_start.html).

### Using the template repository {#using-template-repo}

We have created a [template repository](https://github.com/LethalCompany/LethalCompanyTemplate) on GitHub. If you're remotely familiar with GitHub, or willing to [learn](/dev/initial-setup#creating-a-github-account), this might serve as a quick start. It does come with some minor drawbacks such as it using "LethalCompanyTemplate" as project name in a number of files, but you can edit this. It should build out-of-the-box with no edits required; though you may need to add BepInEx as a NuGet source (see the [relevant](#adding-nuget-source) section below).

### Creating your project {#create-project}

First things first, you'll need to create your project. If you've not done so already, we recommend running the following command in a console to add some BepInEx templates for new projects:

```cmd
dotnet new -i BepInEx.Templates --nuget-source https://nuget.bepinex.dev/v3/index.json
```

Next, you'll want to create a new project (sometimes called "solution", in CSharp). There are two main ways to do this.

#### Using an IDE (more control) {#using-ide}

Depending on your IDE, this process will look slightly different. You'll want to give the solution the name of your soon-to-be mod. If given the option to use a template (you may want to google for *"how to use template in Visual Studio"* or *"how to use template in Rider"*), use the `BepInEx 5 Plugin Template`.

#### Using the console (simpler) {#using-console}

Alternatively, you can open a console and run the following command, assuming you've set up the templates using the command above. Replace `MyFirstPlugin` with your mod's name:

```cmd
dotnet new bepinex5plugin -n MyFirstPlugin -T "netstandard2.1" -U "2022.3.9"
```

::: warning
If you get the following error (or simmilar) later then double check your `UnityEngine.Modules` Reference's Version is `2022.3.9` and NOT `5.6.0`.
If this is confusing we recommend using out [template repository](https://github.com/LethalCompany/LethalCompanyTemplate).
:::

::: warning
Some people have been [reporting problems](https://github.com/BepInEx/BepInEx.Templates/issues/8) creating new BepInEx plugins from the template when using the .NET 8 SDK:

`Failed to create template.
Details: Object reference not set to an instance of an object.`

If you get this error, try downgrading to the [.NET 7 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/7.0).
:::

### Organising your modding projects {#organize-project}

We recommend creating a folder somewhere easily accessible that will store all of your future modding projects. Something like "LethalCompanyMods". Move the newly created folder for your mod into this folder, to keep things well-organised.

### Adding NuGet source {#add-nuget}

BepInEx uses a separate NuGet source. You'll need to add the BepInEx NuGet source to your global source list.

The BepInEx NuGet source has the following configuration:
```
name: BepInEx
url: https://nuget.bepinex.dev/v3/index.json
```

::: details Visual Studio
For Visual Studio, you can do this by going to the NuGet Package Manager window and clicking on the settings/gear icon.

![View NuGet Packages in Visual Studio](/images/starting-a-mod/visualstudioviewnugetpackages.png)

![Show NuGet Project Settings in Visual Studio](/images/starting-a-mod/visualstudioshownugetsettings.png)

This will bring up an options modal; click on the `Package Sources` tab, and then click on the green "+" icon in the top right. From there, you can add a new entry using the above configuration.

![Visual Studio NuGet Sources config with BepInEx added](/images/starting-a-mod/visualstudionugetsources.png)

See [Visual Studios's docs](https://learn.microsoft.com/en-us/nuget/consume-packages/install-use-packages-visual-studio#package-sources) for more info.
:::
::: details Rider
For Rider, you can do this by going to the NuGet window, going to its `Sources` tab, and then clicking on the green "+" icon in the `Feeds` sub-tab. There, add a new entry using the above configuration.

![Show NuGet Sources tab in Rider](/images/starting-a-mod/ridershownugetsources.png)

![Rider NuGet Sources config with BepInEx added](/images/starting-a-mod/ridernugetfeeds.png)

See [Rider's docs](https://www.jetbrains.com/help/rider/Using_NuGet.html#sources) for more info.
:::
::: details VS Code
For VS Code, there is no built in method for NuGet Packages. The only way to add the BepInEx NuGet source is by modifying the `NuGet.Config` file in your project directory. Add the following code in the `<packageSources>` section:

```xml
<add key="BepInEx" value="https://nuget.bepinex.dev/v3/index.json" />
```

This should result in a complete file resembling the following:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
    <packageSources>
        <add key="BepInEx" value="https://nuget.bepinex.dev/v3/index.json" /> // [!code ++]
    </packageSources>
</configuration>
```

:::

### Making sure your mod is set up correctly {#check-mod-setup}

Mods are developed for specific versions of Unity and .NET, which can be specified in a configuration file. This file is a `.csproj` file, and has as name the name of your mod (e.g. `MyFirstPlugin.csproj`). If you used the console command correctly, it should work out of the box. However, you'll want to double check this to prevent any easy-to-fix problems that can result from not having it set up correctly. When using an IDE, the template might not use the correct version, so in this case you'll definitely have to check things.

Our [template project](https://github.com/LethalCompany/LethalCompanyTemplate) has an example `.csproj` file that is properly configured, which can be found [here](https://github.com/LethalCompany/LethalCompanyTemplate/blob/main/LethalCompanyTemplate/LethalCompanyTemplate.csproj). Please check and compare your local mod's file with this file, and make sure the following segment is the same (except for the `AssemblyName`, `Description`, and `Version`).

![Example csproj with Nuget references and proper metadata](/images/starting-a-mod/csprojexample.png)

### "Building" your mod

Your IDE is capable of turning your code into a file that can be run (in this case by BepInEx as a mod). This process is called "building" or "compiling". In this case, it will turn your code into a `.dll` file. This file *is* your mod.

Depending on your IDE, the build button may be placed differently.

::: details Visual Studio
For Visual Studio, it is the green arrow button with your project name:

![Visual Studio's Build Project button](/images/starting-a-mod/visualstudiobuild.png)
:::
::: details Rider
For Rider, it is in the top right:

![Rider's Build Solution button](/images/starting-a-mod/riderbuild.png)
:::
::: details VS Code
VS Code has no built-in way of building a C# project, as VS Code is a lightweight code editor and not a IDE. In order to build a C# project, you instead have to download the [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) extension.

After installing the extension, you can build by pressing `Ctrl+Shift+P`, typing in `Build` and selecting `.NET: Build`.

![VS Code's C# Dev Kit Build Solution command](https://code.visualstudio.com/assets/docs/csharp/build-tools/net-build-command.gif)
:::

Once built, you should be able to find the `.dll` file in your project's folder, in the following subfolder path (once again replacing `MyFirstPlugin` with the name you gave your mod/project): `MyFirstPlugin/bin/(Release or Debug)/netstandard2.1/MyFirstPlugin.dll`

Simply copy & paste this `.dll` file into the `BepInEx/plugins` folder, in your game directory, and it should run the mod. We recommend keeping the default `LogInfo` statement in your `Awake` method that comes with the template. If you have this statement, you should see it appear in the console that opens when you run the game (after installing BepInEx, and enabling the console as per the first wiki article).

### Adding game assemblies

To actually use the game's methods and classes, you'll need to add the game's `Assembly-CSharp.dll` to your project's references. You can either do this manually by editing your `.csproj` file, or through a GUI your IDE provides. You will want to google how to do this for your specific IDE.

You will very likely also need the `UnityEngine.dll`, since this is required to use any of Unity's methods and classes.

The [template project](https://github.com/LethalCompany/LethalCompanyTemplate) has both of these set up, so you can copy that part of the `.csproj` file. You **will** need to edit the path to be correct, however.

The assemblies can be found in the `Lethal Company_Data/Managed` folder, in the game's directory.

::: tip
To easily access private fields and methods in the game's code, you should publicize it! The process is easy, with just two additions:

1. Add the `BepInEx.AssemblyPublicizer.MSBuild` package in the NuGet Package Manager.
    - You can instead add `<PackageReference Include="BepInEx.AssemblyPublicizer.MSBuild" Version="0.4.1" PrivateAssets="all" />` to the `.csproj` file as so:

```xml
<ItemGroup>
    <PackageReference Include="BepInEx.Analyzers" Version="1.*" PrivateAssets="all" />
    <PackageReference Include="BepInEx.Core" Version="5.*" />
    <PackageReference Include="BepInEx.PluginInfoProps" Version="1.*" />
    <PackageReference Include="UnityEngine.Modules" Version="2022.3.9" IncludeAssets="compile" />
    <PackageReference Include="BepInEx.AssemblyPublicizer.MSBuild" Version="0.4.1" PrivateAssets="all" /> // [!code ++] // [!code focus]
</ItemGroup>
```

2. Add `Publicize="true"` to the assembly reference in the `.csproj` file as so:

```xml
<Reference Include="Assembly-CSharp" HintPath="...\Assembly-CSharp.dll" /> // [!code --]
<Reference Include="Assembly-CSharp" HintPath="...\Assembly-CSharp.dll" Publicize="true" /> // [!code ++]
```
:::

### Additional guides

We highly recommend reading through the rest of the [official BepInEx guide](https://docs.bepinex.dev/articles/dev_guide/plugin_tutorial/2_plugin_start.html) for extra information.

## Next steps

We recommend reading through our very short guide on [open-source & ethics](/dev/open-source-and-ethics), to help foster a healthy modding community.

Once you've finished a mod, you can [publish it](/dev/publishing-your-mod).
