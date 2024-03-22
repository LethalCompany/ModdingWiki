---
prev: false
next: false
description: Learn how to use r2modman to install Lethal Company mods from Thunderstore on Linux.
---

# Brug af r2modman på Linux og Steam Deck

***

Denne guide vil føre dig i gennem installation og benyttelse af [r2modman](https://github.com/ebkr/r2modmanPlus/releases/latest/) for at installere og spille med modifikationer der er tilgængelige gennem [Thunderstore](https://thunderstore.io/c/lethal-company/). Ved brug af en modifikations manager som r2modman tillader det dig at opdatere og spille med de nyeste version af modifikation uden bøvl eftersom at manageren gør alt dette for dig!

## Steam Deck Specifikke Forberedelser

På Steam Deck er du nødt til at gøre det følgende før du kan følge denne guide:

- Vær sikker på at spille er installeret på den interne opbevaring - modifikation vil ikke kører hvis spillet er installeret på MicroSD kortet.
- Tilgå **Skrivebords Tilstand** ved at holde nede på power knappen og valg af Dekstop Mode fra menuen.

Så snart du er på Skrivebordet, er du klar til at forsætte!

:::danger
r2modman does **not** work in Game Mode. Vær venlig at læse [**Brug af Modifikationer i Steam Deck's Game Mode**](installing-r2modman-linux?id=using-mods-in-steam-decks-game-mode) sektion for et nemt fix så snart du er færdig ed **Installation af r2modman** sektionen.
:::

## Installation af r2modman

På Linux er r2modman tilgængeligt i forskellige pakke formater, alt afhængigt af din distro:

- `deb` for Debian og Ubuntu-baserede distroer
- `pacman` for Arch-baserede distroer
- `rpm` for distroer der benytter sig af RPM Pakke Manageren (RHEL, CentOS, Fedora, openSUSE, etc.)
- `AppImage`, en enkelt eksekverbar fil du kan køre på de fleste distroer - **særligt brugbar til Steam Deck**

Besøg [**r2modman GitHub udgivelses oversigten**](https://github.com/ebkr/r2modmanPlus/releases/latest/) og download den passende pakke fil til din distro og installer den ifølge din pakke manager's dokumentation.

**For Steam Deck brugere,** download `.AppImage` filen og opbevar den et sikkert sted så som dit Skrivebord eller din Dokument folder. Du bliver også nødt til at markere filen som en eksekverbar fil. For at gøre dette, højre-klik på `.AppImage`filen og vælg `Properties`. Skift til **Tilladelses** siden og tjek boksen markeret med `Is Executable` af og klik OK.

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

## Using Mods in Steam Deck's Game Mode

**r2modman will not work in Steam Deck's Game mode, and therefore mods will not load by default.** To get around this, right-click the game in Steam and click `Properties`. From there, paste the following into **Launch Options**:

```
WINEDLLOVERRIDES="winhttp=n,b" %command% --doorstop-enable true --doorstop-target "/home/deck/.config/r2modmanPlus-local/LethalCompany/profiles/Default/BepInEx/core/BepInEx.Preloader.dll" --r2profile "Default"
```

![Steam Properties](/images/r2modman-linux/steamproperties.png)
This will instruct the game to launch with the Default profile we configured in r2modman earlier, so all your mods installed there will be available.

If you'd like to sync your mods with friends, navigate to the [syncing r2modman profiles](syncing-mods) page.
