---
prev: false
next: false
description: Apprenez à utiliser r2modman pour installer des mods Lethal Compagny depuis Thunderstore sur Linux.
---

# Avec r2modman sur Linux et Steam Deck

***

Ce guide vous guidera dans l'installation et l'utilisation de [r2modman](https://github.com/ebkr/r2modmanPlus/releases/latest/) pour installer et jouer avec des mods disponibles depuis [Thunderstore](https://thunderstore.io/c/lethal-company/). Utiliser un gestionnaire de mods comme r2modman vous permet de facilement mettre à jour et jouer avec les dernières versions des mods puisque le gestionnaire s'en chargera pour vous!

## Préparation spécifique au Steam Deck

Sur Steam Deck vous devrez suivre ces instructions avant de passer à la suite du guide :

- Assurez-vous que le jeu soit installé sur le stockage interne - les mods ne pourront pas être chargés si le jeu est installé sur une carte MicroSD.
- Entez dans le **Mode Bureau** en appuyant sur le bouton marche/arrêt et en sélectionnant "Mode Bureau" dans le menu.

Une fois que vous êtes sur le bureau, vous êtes prêt à continuer!

:::danger
r2modman does **not** work in Game Mode. Please make sure to read the [**Using Mods in Steam Deck's Game Mode**](installing-r2modman-linux?id=using-mods-in-steam-decks-game-mode) section for a workaround once you've finished with the **Installing r2modman** section.
:::

## Installer r2modman

Sous Linux, r2modman est disponible dans différents formats de paquets en fonction de votre distribution :

- `deb` pour les distributions basées sur Debian et Ubuntu
- `pacman` pour les distributions basées sur Arch
- `rpm` pour les distributions qui utilisent le gestionnaire de paquets RPM (RHEL, CentOS, Fedora, openSUSE, etc.)
- `AppImage`, un simple fichier exécutable qui fonctionne sur la plupart des distributions - **utile pour les Steam Deck**

Rendez-vous sur [**la page GitHub des versions de r2modman**](https://github.com/ebkr/r2modmanPlus/releases/latest/) et téléchargez le paquet approprié à votre distribution puis installez-le selon la documentation de votre gestionnaire de paquets.

**Pour les utilisateurs de Steam Deck,** téléchargez le fichier `.AppImage` et mettez-le dans un endroit sûr tel que le Bureau ou le dossier Documents. Vous drevrez également rendre le fichier exécutable. Pour cela, faites un clic droit sur le fichier `.AppImage` puis sélectionnez `Propriétés`. Allez dans onglet **Permissions** et cochez la case `Exécutable` et appuyez sur OK.

![Fenêtre de permissions Steam Deck](/images/r2modman-linux/appimageproperties.png)

Après avoir rendu le fichier exécutable, vous pouvez maintenant double-cliquer sur le fichier `AppImage` pour ouvrir r2modman.

## Installer des mods avec r2modman

Une fois que vous avez installé r2modman, vous pouvez enfin installer des mods.

1. Lancez **r2modman**. Vous serez accueilli par l’écran suivant.

![Écran de sélection de jeu r2modman](/images/r2modman-install/gameselection.png)

2. Sélectionnez **"Lethal Company"**, puis **"Sélectionner le jeu"**.

:::tip
Si vous ne le trouvez pas, **utilisez la barre de recherche** et cherchez "Lethal Company".
:::

![Sélection de Lethal Company](/images/r2modman-install/selectlc.png)

3. Il vous sera demandé de choisir un profil à utiliser. Pour les besoins de ce guide, nous resterons sur le profil par défaut. Cliquez sur **"Sélectionner le profil"**.

![Sélection du profil par défaut](/images/r2modman-install/profileselect.png)

4. Cela vous emmènera vers cet écran.

![Premier lancement](/images/r2modman-install/firsttimeinstall.png)

5. Cliquez sur **"En ligne"** dans la barre latérale. Cela affichera une liste de tous les mods disponibles en téléchargement sur [Thunderstore](https://thunderstore.io/c/lethal-company/).

![Cliquer sur En Ligne](/images/r2modman-install/selectonline.png)

6. D'ici, vous pouvez choisir quels mods vous voulez télécharger et installer. Cliquez sur le mod que vous voulez puis sur télécharger.

![Télécharger un mod](/images/r2modman-install/download.png)

7. Il vous sera demander de choisir la version à utiliser. Téléchargez la dernière version, qui est déjà sélectionné pour vous par défaut. Cliquez sur **Téléchargez avec les dépendances** ou **"Télécharger"**.

![Télécharger avec les dépendances](/images/r2modman-install/downloadlatest.png)

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
