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
r2modman **nie** działa w trybie gry. Upewnij się, że przeczytałeś sekcję [**Używanie modów w trybie gry Steam Deck**](installing-r2modman-linux?id=using-mods-in-steam-decks-game-mode), żeby obejść, kiedy skończysz sekcję **Instalacja r2modman**.
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

## Używanie modów w Trybie Gry Steam Deck

**r2modman nie będzie działał w trybie gry Steam Deck, a zatem mody nie będą ładowane domyślnie.** Aby to obejść, kliknij prawym przyciskiem myszy grę w Steam i kliknij `Właściwości`. Następnie wklej poniższe do **Opcji uruchamiania**:

```
WINEDLLOVERRIDES="winhttp=n,b" %command% --doorstop-enable true --doorstop-target "/home/deck/.config/r2modmanPlus-local/LethalCompany/profiles/Default/BepInEx/core/BepInEx.Preloader.dll" --r2profile "Default"
```

![Steam Properties](/images/r2modman-linux/steamproperties.png)
Poinstruuje to grę, aby uruchomiła się z domyślnym profilem, który skonfigurowaliśmy wcześniej w r2modman, więc wszystkie zainstalowane tam mody będą dostępne.

Jeśli chcesz zsynchronizować mody ze znajomymi przejdź do [udostępniania profili w r2modman](syncing-mods).
