---
prev: false
next: false
description: Learn how to use r2modman to install Lethal Company mods from Thunderstore on Linux.
---

# Using r2modman on Linux and Steam Deck

***

This guide will run you through installing and using [r2modman](https://github.com/ebkr/r2modmanPlus/releases/latest/) to install and play with mods that are available through [Thunderstore](https://thunderstore.io/c/lethal-company/). Using a mod manager like r2modman allows you to update and play with the latest versions of the mods with ease as the manager does all of that for you!

## Steam Deck Specific Preparation

On Steam Deck you will need to do the following before you can follow this guide:

- Make sure the game is installed into the internal storage - mods will not load if the game is installed to the MicroSD card.
- Enter **Desktop Mode** by holding down the power button and selecting Desktop Mode from the menu.

Once you're at the desktop, you're ready to continue!

:::danger
r2modman does **not** work in Game Mode by default. Please make sure to read the [**Using r2modman in Steam Deck's Game Mode**](installing-r2modman-linux?id=using-r2modman-in-steam-decks-game-mode) section for a workaround if you wish to use r2modman in Steam Deck's Game Mode.
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

:::tip
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

## Using r2modman in Steam Deck's Game Mode

**r2modman will not work in Steam Deck's Game Mode by default.** Steam will not run .appimage files by default and will require 3rd party software in order to allow this. The following instructions will walk you through the process.

1. Download AppImageLauncher from [here](https://github.com/TheAssassin/AppImageLauncher/releases/download/v2.2.0/appimagelauncher-lite-2.2.0-travis995-0f91801-x86_64.AppImage) onto your Steam Deck.

2. Move the `.AppImage` file you just downloaded to your `Home` folder on your Steam Deck. (This is optional but will make the next step easier.)

![Screenshot\_20240205\_113418](https://github.com/LethalCompany/ModdingWiki/assets/32438781/68e16680-5d3e-46b8-b3e0-2ebf53579296)

3. Copy and paste or enter the following into your Steam Deck's **Konsole**:

```
chmod +x appimagelauncher-lite-2.2.0-travis995-0f91801-x86_64.AppImage
./appimagelauncher-lite-2.2.0-travis995-0f91801-x86_64.AppImage install
```

![Screenshot\_20240205\_113708](https://github.com/LethalCompany/ModdingWiki/assets/32438781/11e6c411-7dc7-4fc3-9506-2e0166ed12b1)

If you didn't put the AppImage file into your home folder, you'll have to enter it's directory after the `./` above.

Press `Enter` on your Steam Deck's on-screen keyboard to execute the command.

4. Visit the [**r2modman GitHub releases page**](https://github.com/ebkr/r2modmanPlus/releases/latest/) and download the `.AppImage` file on the lastest release.

![Screenshot 2024-02-05 134920](https://github.com/LethalCompany/ModdingWiki/assets/32438781/02df1e40-79d4-4852-a57a-52a3d3cebe6a)

Move the file to your `./Applications` directory after it has completed downloading.

![Screenshot\_20240205\_113828](https://github.com/LethalCompany/ModdingWiki/assets/32438781/9b7e55c1-ca29-454e-9674-e418f81c8246)

5. Open Steam and click the `Games` menu and click `Add a Non-Steam Game to My Library...`.

![Screenshot\_20240205\_114343](https://github.com/LethalCompany/ModdingWiki/assets/32438781/08b3aef4-0137-4c34-96c8-3b204cd089df)

Locate **r2modman (version number)** in the list and select it. Click `Add Selected Programs`.

![Screenshot\_20240205\_114521](https://github.com/LethalCompany/ModdingWiki/assets/32438781/2d6bec47-a312-4939-aefd-1fcca6d455ea)

6. At this point r2modman is added to Steam and can be opened in Game Mode. However, the application cannot be easily controlled without changing the control scheme.
   Return to `Game Mode` and locate r2modman, usually located under the `Non-Steam` category of your library. Open the application but do not press `Play`.

7. Select the controller icon on the right-hand side of the screen and press the `A` button.

![20240205133217\_1](https://github.com/LethalCompany/ModdingWiki/assets/32438781/bdcb5a97-86a8-40b3-9353-56991ab3e3b4)

8. Where it says `Using Template` press the `A` button to choose a different layout.

![20240205133655\_1](https://github.com/LethalCompany/ModdingWiki/assets/32438781/250ab9aa-8c78-44c5-9865-6c9072e507ca)

9. Under the `Templates` category, select `Keyboard (WASD) and Mouse` and press the `A` button, then press the `X` button to apply the layout.

![20240205132222\_1](https://github.com/LethalCompany/ModdingWiki/assets/32438781/a7a77152-521b-488c-aa47-9f5cf8129031)

10. r2modman is now ready to use in Steam Deck's Game Mode.

## Loading Default Mods in Steam Deck's Game Mode

If you prefer to load r2modman from desktop mode or wish to run default mods without loading r2modman, right-click the game in Steam and click `Properties`. From there, paste the following into **Launch Options**:

```
WINEDLLOVERRIDES="winhttp=n,b" %command% --doorstop-enable true --doorstop-target "/home/deck/.config/r2modmanPlus-local/LethalCompany/profiles/Default/BepInEx/core/BepInEx.Preloader.dll" --r2profile "Default"
```

![Steam Properties](/images/r2modman-linux/steamproperties.png)
This will instruct the game to launch with the Default profile we configured in r2modman earlier, so all your mods installed there will be available.

If you'd like to sync your mods with friends, navigate to the [syncing r2modman profiles](syncing-mods) page.
