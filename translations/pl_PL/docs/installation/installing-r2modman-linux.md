---
prev: false
next: false
description: Dowiedz się, jak używać r2modman do instalowania modów Lethal Company z Thunderstore na Linuksie.
---

# Używanie r2modman na Linuksie i Steam Deck

***

Ten przewodnik przeprowadzi cię przez instalację i używanie [r2modman](https://github.com/ebkr/r2modmanPlus/releases/latest/) do instalowania i grania z modami dostępnymi przez [Thunderstore](https://thunderstore.io/c/lethal-company/). Korzystanie z menedżera modów, takiego jak r2modman, pozwala z łatwością aktualizować i grać z najnowszymi wersjami modów, ponieważ menedżer robi to wszystko za ciebie!

## Przygotowanie specyficzne dla Steam Deck

Na Steam Deck musisz wykonać następujące czynności, zanim będziesz mógł postępować zgodnie z tym przewodnikiem:

- Upewnij się, że gra jest zainstalowana w pamięci wewnętrznej - mody nie będą się ładować, jeśli gra jest zainstalowana na karcie MicroSD.
- Wejdź w **Tryb pulpitu**, przytrzymując przycisk zasilania i wybierając Tryb pulpitu z menu.

Gdy znajdziesz się na pulpicie, możesz kontynuować!

:::danger
r2modman does **not** work in Game Mode by default. Please make sure to read the [**Using r2modman in Steam Deck's Game Mode**](installing-r2modman-linux?id=using-r2modman-in-steam-decks-game-mode) section for a workaround if you wish to use r2modman in Steam Deck's Game Mode.
:::

## Instalowanie r2modman

Na Linuksie r2modman jest dostępny w różnych formatach pakietów w zależności od dystrybucji:

- `deb` dla dystrybucji bazowanych na Debianie i Ubuntu
- `pacman` dla dystrybucji bazowanych na Archu
- `rpm` dla dystrybucji używających Menedżera pakietów RPM (RHEL, CentOS, Fedora, openSUSE, itp.)
- `AppImage`, pojedynczy plik wykonywalny, który można uruchomić na większości dystrybucji - **przydatne dla Steam Deck**

Odwiedź stronę [**z wydaniami r2modman na GitHubie**](https://github.com/ebkr/r2modmanPlus/releases/latest/) i pobierz plik odpowiedni dla twojej dystrybucji i zainstaluj go zgodnie z dokumentacją menedżera pakietów.

**Dla użytkowników Steam Deck:** Pobierz plik `.AppImage` i trzymaj go w bezpiecznym miejscu takim jak twój folder Pulpit lub Dokumenty. Konieczne będzie również oznaczenie pliku jako wykonywalnego. Aby to zrobić, kliknij prawym przyciskiem myszy plik `.AppImage` i wybierz `Właściwości` lub `Properties`. Przejdź do zakładki **Uprawnienia** lub **Permissions** i zaznacz `Is Executable` i kliknij OK.

![Steam Deck Permissions Window](/images/r2modman-linux/appimageproperties.png)

Po oznaczeniu pliku jako wykonywalny możesz teraz kliknąć dwukrotnie `AppImage`, aby otworzyć r2modman.

## Instalowanie modów na r2modman

Po zainstalowaniu r2modman możesz wreszcie instalować mody.

1. Uruchom **r2modman**. Zostaniesz przywitany tym widokiem.

![r2modman Game Selection Screen](/images/r2modman-install/gameselection.png)

2. Wybierz **"Lethal Company"** i kliknij **"Select Game"**.

:::tip
Jeśli nie widzisz, **użyj wyszukiwarki albo zjedź na dół** żeby znaleźć "Lethal Company".
:::

![Select Lethal Company](/images/r2modman-install/selectlc.png)

3. Zapyta cie którego profilu użyć. Na potrzeby tego przewodnika zostaniemy przy profilu Default. Kliknij **Select profile**.

![Select Default Profile](/images/r2modman-install/profileselect.png)

4. Poprowadzi nas to do tego ekranu.

![First Time Opening Installed](/images/r2modman-install/firsttimeinstall.png)

5. Kliknij **"Online"** na pasku bocznym. To pokaże listę wszystkich modów dostępnych do pobrania na [Thunderstore](https://thunderstore.io/c/lethal-company/).

![Clicking Online](/images/r2modman-install/selectonline.png)

6. Stąd możesz wybrać, ktore mody chciałbyś pobrać i zainstalować. Kliknij mod, który chcesz, a następnie Download.

![Downloading a mod](/images/r2modman-install/download.png)

7. Zapyta cię której wersji użyć. Pobierz najnowszą wersję, która jest zaznaczona domyślnie. Kliknij **"Download with dependencies"** lub **"Download"**.

![Downloading with dependencies](/images/r2modman-install/downloadlatest.png)

8. Po zakończeniu instalacji modów możesz kliknąć "Start modded" na pasku bocznym. Uruchomi się wtedy gra z twoimi modami.

![Start Lethal Company Modded](/images/r2modman-install/startmodded.png)

Gotowe! Właśnie udało ci się zmodować Lethal Company!

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

If you prefer to load r2modman from desktop mode or wish to run default mods without loading r2modman, right-click the game in Steam and click `Properties`. Następnie wklej poniższe do **Opcji uruchamiania**:

```
WINEDLLOVERRIDES="winhttp=n,b" %command% --doorstop-enable true --doorstop-target "/home/deck/.config/r2modmanPlus-local/LethalCompany/profiles/Default/BepInEx/core/BepInEx.Preloader.dll" --r2profile "Default"
```

![Steam Properties](/images/r2modman-linux/steamproperties.png)
Poinstruuje to grę, aby uruchomiła się z domyślnym profilem, który skonfigurowaliśmy wcześniej w r2modman, więc wszystkie zainstalowane tam mody będą dostępne.

Jeśli chcesz zsynchronizować mody ze znajomymi przejdź do [udostępniania profili w r2modman](syncing-mods).
