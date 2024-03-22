---
description: This article teaches how to use ILSpy in order to read game's code
---

# Reading Game Code

## Introduction

Chances are, early on in your modding journey you will be met by quite a conundrum - You want to know how something in the game works, but there is an issue! You cannot just open the game's files to find it _(you silly goose)_.

You see, the way Unity games work, is that their code gets compiled into a .dll file, which you cannot normally open.

## Decompilers

Fortunately, there is something called a "decompiler". What it does, is it grabs the game's code and reverses the process, resulting in readable code. While it is not perfect, it gets it's job done.

Currently there are 3 decompilers that are widely used:

[dnSpyEx](https://github.com/dnSpyEx/dnSpy), [ILSpy](https://github.com/icsharpcode/ILSpy) and [dotPeek](https://www.jetbrains.com/decompiler/).

:::info
Picking which decompiler to use is up to personal preference, but for this article ILSpy will be used due to it's balance between simplicity and power.
:::

::: danger
Please keep in mind that while decompiling and reading the code is _not_ illegal, distributing said decompiled code _is_ illegal. Same applies for sharing the game's files.

What this means is that you **CANNOT** bundle any of the game's files with your mods.
:::

## Opening the game DLL

Upon starting ILSpy you will be met with a window similar to this.
![Screenshot of empty ILSpy window](/images/reading-game-code/ilspy-window.png)

From then you want to open the `Assembly-CSharp.dll` file present in the game's files.

To get it you need to do the following:

### 1. Open game files. On Steam it's done as simple as right clicking the game and pressing 'Browse local files'. {#open-game-files}

![How to open local files on Steam](/images/reading-game-code/opening-local-files.png)

The game files folder will open
![Lethal Company local files](/images/reading-game-code/lc-game-folder.png)

### 2. Go to `Lethal Company_Data/Managed` {#open-managed-folder}

Once you do that you will see many .dll files.
![Lethal Company DLLs](/images/reading-game-code/lc-dlls.png)

Copy the path and go back to ILSpy.

### 3. Open the file in ILSpy {#open-in-ilspy}

In ILSpy click on `File -> Open`.
![How to open file in ILSpy](/images/reading-game-code/ilspy-open.png)

In an opened file browser paste the path you copied earlier for easy access, select `Assembly-CSharp.dll`, and press 'Open'.
![File browser window](/images/reading-game-code/opened-folder.png)

After you have opened the file you should see that it has been added to the sidebar.
![Opened Assembly-CSharp.dll](/images/reading-game-code/opened-asc-in-ilspy.png)

## Reading the game code

Click on the little `+` left of the file name. You should see a bunch of things pop up in a list.
![Opened Assembly-CSharp.dll](/images/reading-game-code/namespaces.png)

Those are called [namespaces](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/namespaces) and are basically just used to organize code into groups. Nearly all of the game's codeis stored under the `{}` (blank) namespace, so open that by clicking on the `+` again.

:::tip
Unlike 99% of the game's code, the actual player controller script (`PlayerMovementB`) is located in the `GameNetcodeStuff` namespace, so keep that in mind in case you cannot find it.
:::

You will see a list of files, all containing code used by the game. If you double click any of them you can see the code inside.
![Opened classes](/images/reading-game-code/so-many-classes.png)

## Searching fields and methods

Obviously, with so many different files it may be difficult to find out a specific function you need. Luckily, ILSpy has a solution - Search tool.

To open the search tool you can either:

Open it by clicking on `Window -> Search`.
![Opening search through menu](/images/reading-game-code/window-search.png)

OR

By clicking on the little magnifying glass icon on the topbar.
![Opening search through icon](/images/reading-game-code/glass-icon.png)

Either way the Search window will open.
![Opened search menu](/images/reading-game-code/opened-search.png)

Using it is quite simple. You can type something in the search bar, and it will be displayed:
![Search menu in action](/images/reading-game-code/search-in-action.png)

If you want to limit the search to only variables(fields) you can select so in the dropdown next to the search bar:
![Search only fields](/images/reading-game-code/only-fields.png)

Of course you can also search for types(classes) and methods(functions) by just selecting them.

## Finding usage

A lot of the times, once you find something you need, you may want to know where it's being used. There is a tool for that as well.

By right clicking on any field or method, in a context menu you can select "Analyze".
![Analyze context menu](/images/reading-game-code/analyze-context.png)

After clicking on it a small window with several dropdowns will open.
![Analyze window](/images/reading-game-code/analyze-window.png)

Here is what most used dropdowns stand for in fields and methods:

### Fields

`Read By` - Methods which use this field inside of them.
![Read By in fields](/images/reading-game-code/field-readby.png)

`Assigned By` - Methods which assign value to this field.
![Assigned By in fields](/images/reading-game-code/field-assignedby.png)

### Methods

`Uses` - List of fields and methods that this method is using.
![Uses in methods](/images/reading-game-code/methods-uses.png)

`Used By` - Methods which use this method.
![Used By in methods](/images/reading-game-code/methods-usedby.png)

## Conclusion

Congrats! Now you know how to read game's code and how to find something that you need. Remember that if you cannot find something - There is no shame in asking. So, in case you need any help, you can get some in the [Unofficial Lethal Company Community Discord](https://discord.gg/nYcQFEpXfU).
