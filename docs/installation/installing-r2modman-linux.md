---
prev: false
next: false
description: Learn how to use r2modman to install Lethal Company mods from Thunderstore on Linux. 
---

# Using r2modman on Linux and Steam Deck
---

This guide will run you through installing and using [r2modman](https://github.com/ebkr/r2modmanPlus/releases/latest/) to install and play with mods that are available through [Thunderstore](https://thunderstore.io/c/lethal-company/). Using a mod manager like r2modman allows you to update and play with the latest versions of the mods with ease as the manager does all of that for you!

## Steam Deck Specific Preparation
On Steam Deck you will need to do the following before you can follow this guide:

 - If the game is installed to the MicroSD card instead of internal storage, you will need to use a workaround. Open a split view in your file manager, and navigate to /home/deck/.steam/steam/steamapps/compatdata/ on one side and go to where your steamapps folder is located on your MicroSD card on the other. Create a folder named compatdata in your MicroSD card's steamapps folder, then drag the 1966720 folder to your new compatdata folder. Select "Link Here", and you're done.
 - Enter **Desktop Mode** by holding down the power button and selecting Desktop Mode from the menu.

Once you're at the desktop, you're ready to continue!

::: danger
 r2modman does **not** work in Game Mode. Please make sure to read the [**Using Mods in Steam Deck's Game Mode**](installing-r2modman-linux?id=using-mods-in-steam-decks-game-mode) section for a workaround once you've finished with the **Installing r2modman** section.
:::
## Installing r2modman

On Linux, r2modman is available in different package formats depending on your distro:

 - `deb` for Debian and Ubuntu-based distros
 - `pacman` for Arch-based disros
 - `rpm` for distros using the RPM Package Manager (RHEL, CentOS, Fedora, openSUSE, etc.)
 - `AppImage`, a single executable file that can run on most distros - **useful for Steam Deck**

Visit the [**r2modman GitHub releases page**](https://github.com/ebkr/r2modmanPlus/releases/latest/) and download the appropriate package file for your distro and install it according to your package manager's documentation.

**For Steam Deck users,** download the `.AppImage` file and keep it in a safe location such as your Desktop or your Documents folder. You will also need to mark the file as executable. To do this, right-click the `.AppImage` file and select `Properties`. Switch to the **Permissions** tab and check the box marked `Is Executable` and click OK.

![Steam Deck Permissions Window](/images/r2modman-linux/appimageproperties.png)

After marking the file as executable, you can now double-click the `AppImage` to open r2modman.

## Installing Mods on r2modman

Once you have succesfully installed r2modman, you can finally install mods.

1. Launch **r2modman**. You will be greeted with the following screen.

![r2modman Game Selection Screen](/images/r2modman-install/gameselection.png)

2. Select **"Lethal Company"**, and click **"Select Game"**.

::: tip
 If you do not see it, **use the search bar or scroll down** to find "Lethal Company".
:::

![Select Lethal Company](/images/r2modman-install/selectlc.png)

3. It will ask you to choose which profile to use. For this guide's purposes, we will stick with the Default profile. Click **"Select profile"**.

![Select Default Profile](/images/r2modman-install/profileselect.png)

4. This will lead us to this screen.

![First Time Opening Installed](/images/r2modman-install/firsttimeinstall.png)

5. Click **"Online"** on the sidebar. This will bring up a list of all available to download mods on [Thunderstore](https://thunderstore.io/c/lethal-company/).

![Clicking Online](/images/r2modman-install/selectonline.png)

6. From here, you may choose which mods you would like to download and install. Click on a mod you'd like, and then click on Download.

![Downloading a mod](/images/r2modman-install/download.png)

7. It will ask you which version to use. Download the latest version, which is already selected for you by default. Click **"Download with dependencies"** or **"Download"**.

![Downloading with dependencies](/images/r2modman-install/downloadlatest.png)

8. Once you are done installing your mods, you may click on "Start modded" on the sidebar. This will launch the game with your mods.

![Start Lethal Company Modded](/images/r2modman-install/startmodded.png)

That's it! You have just successfully modded Lethal Company!

## Using Mods in Steam Deck's Game Mode
**r2modman will not work in Steam Deck's Game mode, and therefore mods will not load by default.** To get around this, right-click the game in Steam and click `Properties`. From there, paste the following into **Launch Options**:

```
WINEDLLOVERRIDES="winhttp=n,b" %command% --doorstop-enable true --doorstop-target "/home/deck/.config/r2modmanPlus-local/LethalCompany/profiles/Default/BepInEx/core/BepInEx.Preloader.dll" --r2profile "Default"
```
![Steam Properties](/images/r2modman-linux/steamproperties.png)
This will instruct the game to launch with the Default profile we configured in r2modman earlier, so all your mods installed there will be available.

If you'd like to sync your mods with friends, navigate to the [syncing r2modman profiles](syncing-mods) page.
