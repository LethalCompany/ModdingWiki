---
prev: true
next: true
description: Learn how to create a basic project for a Lethal Company mod.
---

# Создаем мод

## Setting up your project {#setup-project}

:::warning
This guide assumes you've completed all the required steps in **[initial setup](/dev/initial-setup)**, or that you know what you're doing.
:::

Это руководство в основном следует [официальному руководству BepInEx](https://docs.bepinex.dev/articles/dev_guide/plugin_tutorial/2_plugin_start.html).

### Using the template repository {#using-template-repo}

Мы создали простой [шаблон мода](https://github.com/LethalCompany/LethalCompanyTemplate) на GitHub. If you're remotely familiar with GitHub, or willing to [learn](/dev/initial-setup#creating-a-github-account), this might serve as a quick start. У шаблона есть некоторые незначительные недостатки, такие как использование "LethalCompanyTemplate" в качестве имени проекта в некоторых файлах, но вы можете изменить эту часть кода в случае чего. Он должен работать «из коробки» без каких-либо изменений; хотя возможно вам может потребоваться добавить BepInEx в качестве источника NuGet (см. [релевантный](#adding-nuget-source) раздел ниже).

### Creating your project {#create-project}

Сначала вам нужно создать ваш проект. Мы рекомендуем запустить следующую команду в консоли, чтобы добавить несколько шаблонов BepInEx:

```cmd
dotnet new -i BepInEx.Templates --nuget-source https://nuget.bepinex.dev/v3/index.json
```

Далее, вам необходимо сгенерировать новый проект (Иногда называемый "решением" в CSharp). Есть несколько способов это сделать:

#### Using an IDE (more control) {#using-ide}

В зависимости от IDE процесс будет протекать по-разному. Если у вашей IDE есть возможность использовать шаблоны (вы можете поискать в Google _"как использовать шаблоны в `ваша IDE, например "Rider" или "Visual Studio"`"_), то используйте `BepInEx 5 Plugin Template`. If given the option to use a template (you may want to google for _"how to use template in Visual Studio"_ or _"how to use template in Rider"_), use the `BepInEx 5 Plugin Template`.

#### Using the console (simpler) {#using-console}

Во втором случае вы можете открыть консоль и выполнить команду из предыдущего раздела и эту вдобавок :

```cmd
dotnet new bepinex5plugin -n 'Вставьте сюда имя вашего мода' -T "netstandard2.1" -U "2022.3.9"
```

::: warning
Some people have been [reporting problems](https://github.com/BepInEx/BepInEx.Templates/issues/8) creating new BepInEx plugins from the template when using the .NET 8 SDK:

`Failed to create template.
Details: Object reference not set to an instance of an object.`

If you get this error, try downgrading to the [.NET 7 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/7.0).
:::

### Organising your modding projects {#organize-project}

Мы советуем вам создать папку где-нибудь в документах, где вы будете хранить все свои проекты. Назвав её при этом чем-то по типу "МодыLC". Перенесите недавно созданную папку мода в эту, чтобы все было более менее организовано.

### Adding NuGet source {#add-nuget}

BepInEx использует NuGet. Так что вам придется добавить BepInEx NuGet в список источников.

BepInEx NuGet имеет следующую конфигурацию:

```
name: BepInEx
url: https://nuget.bepinex.dev/v3/index.json
```

:::details Visual Studio

![View NuGet Packages in Visual Studio](/images/starting-a-mod/visualstudioviewnugetpackages.png)

![Show NuGet Project Settings in Visual Studio](/images/starting-a-mod/visualstudioshownugetsettings.png)

This will bring up an options modal; click on the `Package Sources` tab, and then click on the green "+" icon in the top right. From there, you can add a new entry using the above configuration.

![Visual Studio NuGet Sources config with BepInEx added](/images/starting-a-mod/visualstudionugetsources.png)

See [Visual Studios's docs](https://learn.microsoft.com/en-us/nuget/consume-packages/install-use-packages-visual-studio#package-sources) for more info.
:::
::: details Rider
For Rider, you can do this by going to the NuGet window, going to its `Sources` tab, and then clicking on the green "+" icon in the `Feeds` sub-tab. Там добавьте новую запись, используя приведенную выше конфигурацию.

![Show NuGet Sources tab in Rider](/images/starting-a-mod/ridershownugetsources.png)

![Rider NuGet Sources config with BepInEx added](/images/starting-a-mod/ridernugetfeeds.png)

Прочитайте [документацию Rider](https://www.jetbrains.com/help/rider/Using_NuGet.html#sources) для большего понимания.
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

Модификации разрабатываются под конкретные версий Unity и .NET, которые можно указать в особом конфиге. Файл `.csproj` и является им. В качестве его имени обычно стоит имя вашего мода (например, `MyFirstPlugin.csproj`). Если вы правильно использовали консольные команды сверху то все уже должно быть настроено. Тем не менее, вам следует проверить конфиг, чтобы предотвратить любые проблемы, которые могут возникнуть из-за неправильной настройки. При использовании IDE шаблоны могут использовать не ту версию BepInEx, поэтому вам обязательно придется все проверить.

Наш [шаблон](https://github.com/LethalCompany/LethalCompanyTemplate) уже имеет полностью настроенный`.csproj`, а найти его вы можете [здесь](https://github.com/LethalCompany/LethalCompanyTemplate/blob/main/LethalCompanyTemplate/LethalCompanyTemplate.csproj). Проверьте и сравните ваш файл с этим и убедитесь, что следующие строки те же (за исключением `AssemblyName`, `Description`, и `Version`).

![Example csproj with Nuget references and proper metadata](/images/starting-a-mod/csprojexample.png)

### "Билдим" ваш мод

Ваша IDE способна превратить ваш код в рабочий мод, который можно запустить (в нашем случае с помощью BepInEx). Этот процесс называется билдингом или компиляцией. В нашем случае после компиляции должен получиться файл с расширением `.dll`. Этот и будет ваш мод.

В зависимости от вашей среды кнопка компиляции может быть расположена по разному.

:::details Visual Studio

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

После компиляции вы сможете найти файл `.dll` в папке вашего проекта по следующему пути (замените `MyFirstPlugin` на имя, которое вы дали своей модификации): `MyFirstPlugin/bin/(Release или Debug)/netstandard2.1/MyFirstPlugin.dll`

Просто скопируйте этот файл и поместите в папку `BepInEx/plugins` что находится в папке с вашей игрой, после чего запустите её. Мы рекомендуем оставить `LogInfo` в методе `Awake` что идёт сразу из коробки. Потому что если он будет включен вы сможете увидеть в консоли работает ли ваш мод (при условии что консоль вы включили).

### Добавляем код игры

Чтобы использовать методы и классы из игры вам потребуется добавить `Assembly-CSharp.dll` в ссылки вашего проекта. Вы можете сделать это вручную, отредактировав файл `.csproj`, или через вашу IDE. Вы можете загуглить как это делается в вашей среде разработки.

Также вам понадобится добавить `UnityEngine.dll`, так как он необходим для использования методов и классов из Unity.

Наш [шаблон](https://github.com/LethalCompany/LethalCompanyTemplate) уже полностью настроен, поэтому советуем просто скопировать `.csproj` из него. Однако вам все равно **придется** отредактировать путь так, что бы он был верным.

Эти два `.dll` можно найти в папке `Lethal Company_Data/Managed` в директории игры.

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

### Дополнительные руководства

Мы крайне рекомендуем прочитать [руководство BepInEx](https://docs.bepinex.dev/articles/dev_guide/plugin_tutorial/2_plugin_start.html) для большего понимания темы.

## Что дальше?

We recommend reading through our very short guide on [open-source & ethics](/dev/open-source-and-ethics), to help foster a healthy modding community.

Once you've finished a mod, you can [publish it](/dev/publishing-your-mod).
