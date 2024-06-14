---
prev: false
next: false
description: R2modman을 사용하여 Linux의 Thunderstore 에서 Lethal Company 모드를 설치하는 방법을 배우세요.
---

# R2modman 을 Linux 나 Steam deck 으로 사용하는 법

***

이 가이드에서는 [r2modman] 설치 및 사용 과정을 강의합니다.
(https\://github.com/ebkr/r2modmanPlus/releases/latest/) 를 통해 사용할 수 있는 모드를 설치하고 플레이합니다. [Thunderstore](https://thunderstore.io/c/lethal-company/). R2modman과 같은 모드 관리 프로그램을 사용하면 모드 관리 프로그램이 모든 것을 해주므로 최신 버전의 모드를 쉽게 업데이트하고 플레이할 수 있습니다!

## Steam Deck 설치 방법

Steam Deck은 이 가이드를 따르기 전에 다음 작업을 수행해야 합니다.

- 게임이 내부 저장소에 설치되어 있는지 확인하십시오 - 게임이 MicroSD 카드에 설치되어 있으면 모드가 로드되지 않습니다.
- 전원 버튼을 누르고 메뉴에서 Desktop Mode(데스크탑 모드) 를 선택하여 **데스크탑 모드** 로 들어갑니다.

데스크탑에서 실행을 하셨다면, 당신은 플레이할 준비가 되었습니다!

:::danger
r2modman does **not** work in Game Mode by default. Please make sure to read the [**Using r2modman in Steam Deck's Game Mode**](installing-r2modman-linux?id=using-r2modman-in-steam-decks-game-mode) section for a workaround if you wish to use r2modman in Steam Deck's Game Mode.
:::

## R2modman 을 설치하는 방법

Linux 에서 r2modman은 배포판에 따라 다양한 패키지 형식으로 사용할 수 있습니다:

- `deb` for Debian and Ubuntu-based distros
- `pacman` for Arch-based disros
- `rpm` for distros using the RPM Package Manager (RHEL, CentOS, Fedora, openSUSE, etc.)
- `AppImage`, a single executable file that can run on most distros - **useful for Steam Deck**

[**r2modman GitHub releases page**](https://github.com/ebkr/r2modmanPlus/releases/latest/) 에 방문하여 배포판에 적합한 패키지 파일을 다운로드하여 패키지 설명서에 따라 설치합니다.

**SteamDeck 사용자의 경우** '.AppImage' 파일을 다운로드하여 데스크탑이나 Documents 폴더와 같은 안전한 파일 위치에 보관하십시오. 또한 파일을 실행 가능한 파일로 표시해야 합니다. (.exe) 이렇게 하려면 '.AppImage' 파일을 마우스 오른쪽 버튼으로 클릭하고 '속성'을 선택합니다. **Permissions** 탭으로 전환하여 'Is Executable'(실행 가능) 란을 선택한 후 OK(확인) 를 클릭합니다.

![Steam Deck 권한 창](/images/r2modman-linux/appimageproperties.png)

파일을 실행 가능한 파일로 표시한 후, 이제 'AppImage' 를 두 번 클릭하여 r2modman을 열 수 있습니다.

## R2modman 을 이용한 모드 설치

r2modman을 성공적으로 설치한 후 최종적으로 모드를 설치할 수 있습니다.

1. **r2modman** 을 실행합니다. 다음과 같은 화면이 나타납니다.

![r2modman Game Selection Screen](/images/r2modman-install/gameselection.png)

2. \*\*"Lethal Company"\*\*를 선택하고 \*\*"Select Game"\*\*를 클릭합니다.

:::tip
표시되지 않으면 **검색창을 사용하거나**를 아래로 스크롤하여 "Lethal Company"를 찾으십시오.
:::

![Select Lethal Company](/images/r2modman-install/selectlc.png)

3. 사용할 프로필을 선택하도록 요청할 것입니다. 이 가이드의 목적을 위해 기본 프로필을 유지합니다. \*\*"Select profile"\*\*을 클릭합니다.

![Select Default Profile](/images/r2modman-install/profileselect.png)

4. 이것은 우리를 이런 화면으로 이끌 것입니다.

![First Time Opening Installed](/images/r2modman-install/firsttimeinstall.png)

5. 사이드바에서 \*\*"Online"\*\*를 클릭합니다. 그러면 [Thunderstore](https://thunderstore.io/c/lethal-company/) 에서 모드를 다운로드할 수 있는 모든 사용 가능한 목록이 표시됩니다.

![Clicking Online](/images/r2modman-install/selectonline.png)

6. 여기에서 다운로드하고 설치할 모드를 선택할 수 있습니다. 원하는 모드를 클릭한 다음 다운로드를 클릭합니다.

![Downloading a mod](/images/r2modman-install/download.png)

7. 어떤 버전을 사용할지 묻습니다, 기본적으로 이미 선택한 최신 버전을 다운로드합니다. **"Download with dependencies"** 또는 **"Download"**"를 클릭합니다.



8. 모드를 다운받는 것을 끝내셨다면 오른쪽 사이드 바에 있는 "Start modded" 를 클릭해주세요. 이 행동은 모드와 함께 게임을 실행합니다.

![Start Lethal Company Modded](/images/r2modman-install/startmodded.png)

그게 다입니다! 당신은 성공적으로 모드가 추가된 Lethal Company 를 플레이 하실 수 있습니다!

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

If you prefer to load r2modman from desktop mode or wish to run default mods without loading r2modman, right-click the game in Steam and click `Properties`. 여기서 **Launch Options** 에 다음을 붙여넣습니다:

```
WINEDLLOVERRIDES="winhttp=n,b" %command% --doorstop-enable true --doorstop-target "/home/deck/.config/r2modmanPlus-local/LethalCompany/profiles/Default/BepInEx/core/BepInEx.Preloader.dll" --r2profile "Default"
```

![Steam Properties](/images/r2modman-linux/steamproperties.png)
이것은 게임이 이전에 r2modman에서 구성한 기본 프로필로 시작하도록 지시하므로 설치된 모든 모드를 사용할 수 있습니다

모드를 친구와 공유하려면 [syncing r2modman profiles](syncing-mods) 페이지로 이동합니다.
