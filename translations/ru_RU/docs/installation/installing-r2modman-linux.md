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
r2modman does **not** work in Game Mode. Пожалуйста, обязательно прочтите [**Использование модов в Игровом Режиме Steam Deck**](installing-r2modman-linux?id=using-mods-in-steam-decks-game-mode) для обхода, как только вы закончите с разделом **Устанавливаем r2modman**.
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

## Используем моды на Steam Deck в Игровом Режиме

**r2modman не запускается на Steam Deck в Игровом Режиме, и, следовательно, моды не будут загружаться по умолчанию.**, Чтобы обойти эту проблему, щелкните правой кнопкой мыши по игре в Steam и выберите `Свойства`. Оттуда вставьте следующую строку в **Параметры запуска**:

```
WINEDLLOVERRIDES="winhttp=n,b" %command% --doorstop-enable true --doorstop-target "/home/deck/.config/r2modmanPlus-local/LethalCompany/profiles/Default/BepInEx/core/BepInEx.Preloader.dll" --r2profile "Default"
```

![Steam Properties](/images/r2modman-linux/steamproperties.png)
This will instruct the game to launch with the Default profile we configured in r2modman earlier, so all your mods installed there will be available.

If you'd like to sync your mods with friends, navigate to the [syncing r2modman profiles](syncing-mods) page.
