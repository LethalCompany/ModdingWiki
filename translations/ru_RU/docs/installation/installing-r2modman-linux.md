---
prev: false
next: false
description: Learn how to use r2modman to install Lethal Company mods from Thunderstore on Linux.
---

# Используем r2modman на Linux и Steam Deck

***

Это руководство проведет вас cо установки и использования [r2modman](https://github.com/ebkr/r2modmanPlus/releases/latest/) до установки модов и игры с ними с помощью [Thunderstore](https://thunderstore.io/c/lethal-company/). Использование лаунчера r2modman позволит вам без пролблем устанавливать и обновлять моды до последних версий с помощью лёгкого и удобного меню!

## Специфическая подготовка Steam Deck

На Steam Deck вам необходимо следовать следующему руководству:

- Убедитесь что игра установлена на основном хранилище - моды не загрузятся если игра установлена на MicroSD карте.
- Войдите в **Режим Рабочего Стола** удерживая кнопку питания и выбрав Режим Рабочего Стола из меню.

Как только вы на нём окажитесь мы сможем продолжить!

:::danger
r2modman does **not** work in Game Mode by default. Please make sure to read the [**Using r2modman in Steam Deck's Game Mode**](installing-r2modman-linux?id=using-r2modman-in-steam-decks-game-mode) section for a workaround if you wish to use r2modman in Steam Deck's Game Mode.
:::

## Устанавливаем r2modman

В Linux r2modman доступен в различных форматах в зависимости от вашего дистрибутива:

- `deb` для Debian и основанных на Ubuntu
- `pacman` для основанных на Arch
- `rpm` для использующих RPM Package Manager (RHEL, CentOS, Fedora, openSUSE, и т.п.)
- `AppImage`, один из немногих что запуститься на всех дистрибутив - **подходит для Steam Deck**

Зайдите на [**страницу релизов r2modman в GitHub**](https://github.com/ebkr/r2modmanPlus/releases/latest/) и установите подходящий файл для вашего дистрибутива в соответствии с документацией вашего менеджера пакетов.

**Пользователям Steam Deck нужно** установить`.AppImage` и сохранить где-то на рабочем столе или в папке Документы. Вам также нужно будет пометить файл как 'executable'. Чтобы сделать это нажмите правым кликом по файлу и выберите 'Свойства'. Перейдите на вкладку **Разрешения**, установите флажок с пометкой "Исполняемый" и нажмите "ОК".

![Steam Deck Permissions Window](/images/r2modman-linux/appimageproperties.png)

После пометки файла в executable, вы наконец можете нажать `AppImage` чтобы открыть r2modman.

## Устанавливаем моды с помощью r2modman

Как только вы установили r2modman вы можете наконец установить моды.

1. Запустите **r2modman**. Вас встретить следующий экран.

![r2modman Game Selection Screen](/images/r2modman-install/gameselection.png)

2. Выберите **"Lethal Company"**, и нажмите **"Select Game"**.

:::tip
If you do not see it, **use the search bar or scroll down** to find "Lethal Company".
:::

![Select Lethal Company](/images/r2modman-install/selectlc.png)

3. Лаунчер спросит какой профиль использовать. В этом руководстве мы остановимся на стандартном. Нажмите **"Select profile"**.

![Select Default Profile](/images/r2modman-install/profileselect.png)

4. Это приведет нас сюда.

![First Time Opening Installed](/images/r2modman-install/firsttimeinstall.png)

5. Нажмите **"Online"** сбоку. И вам покажутся все доступные для скачивания моды с [Thunderstore](https://thunderstore.io/c/lethal-company/).

![Clicking Online](/images/r2modman-install/selectonline.png)

6. Начиная отсюда вы вольны выбирать любые моды которые вы хотите установить. Нажмите на понравившийся мод и следом нажмите "Download".

![Downloading a mod](/images/r2modman-install/download.png)

7. Лаунчер спросит какую версию скачать. Скачивайте последнюю версию, что уже выбрана по стандарту. Нажмите **"Download with dependencies"** или **"Download"**.

![Downloading with dependencies](/images/r2modman-install/downloadlatest.png)

8. Как только вы установите все свои моды вы можете нажать "Start modded" сбоку. Это запустит игру с вашими модами.

![Start Lethal Company Modded](/images/r2modman-install/startmodded.png)

Вот и всё! Вы только что успешно модифицировали Lethal Company!

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

If you prefer to load r2modman from desktop mode or wish to run default mods without loading r2modman, right-click the game in Steam and click `Properties`. Оттуда вставьте следующую строку в **Параметры запуска**:

```
WINEDLLOVERRIDES="winhttp=n,b" %command% --doorstop-enable true --doorstop-target "/home/deck/.config/r2modmanPlus-local/LethalCompany/profiles/Default/BepInEx/core/BepInEx.Preloader.dll" --r2profile "Default"
```

![Steam Properties](/images/r2modman-linux/steamproperties.png)
This will instruct the game to launch with the Default profile we configured in r2modman earlier, so all your mods installed there will be available.

If you'd like to sync your mods with friends, navigate to the [syncing r2modman profiles](syncing-mods) page.
