---
prev: false
next: false
description: Aprenda a utilizar o r2modman para instalar mods de Lethal Company pela Thunderstore no Linux.
---

# Usando r2modman no Linux e Steam Deck

***

Esse guia vai te ensinar a instalar e usar o [r2modman](https://github.com/ebkr/r2modmanPlus/releases/latest/) para instalar e jogar com mods que estão disponíveis em [Thunderstore](https://thunderstore.io/c/lethal-company/). Usar um gerenciador de mods como o r2modman permite que você atualize e jogue com as últimas versões dos mods de maneira fácil, já que o gerenciador faz tudo para você!

## Preparação específica do Steam Deck

No Steam Deck, você precisará fazer o seguinte antes de continuar seguindo o guia:

- Garanta que o jogo está instalado no armazenamento interno — mods não carregarão se o jogo estiver instalado em um cartão MicroSD.
- Entre no **Modo Desktop** segurando o botão de liga/desliga e selecionando o Modo Desktop no menu.

Quando estiver no modo Desktop, estará pronto para continuar!

:::danger
r2modman does **not** work in Game Mode by default. Please make sure to read the [**Using r2modman in Steam Deck's Game Mode**](installing-r2modman-linux?id=using-r2modman-in-steam-decks-game-mode) section for a workaround if you wish to use r2modman in Steam Deck's Game Mode.
:::

## Instalando r2modman

No Linux o r2modman está disponível em diferentes formatos de pacotes, dependendo da sua distro:

- `deb` para distros baseadas em Debian e Ubuntu
- `pacman` para distros baseadas em Arch
- `rpm`para distros usando o RPM Package Manager (RHEL, CentOS, Fedora, openSUSE, etc.)
- `AppImage`, um arquivo executável que funciona na maioria das distros - **útil para o Steam Deck**

Acesse a [**página de publicação do r2modman no GitHub**](https://github.com/ebkr/r2modmanPlus/releases/latest/), baixe o arquivo apropriado para sua distro e instale conforme a documentação do seu gerenciador de pacote.

**Para usuários do Steam Deck**, baixe o arquivo `.AppImage` e o mantenha em um local seguro, como a Desktop (Área de Trabalho) ou a pasta Documents (Documentos). Você também precisará tornar o arquivo como executável. Para fazer isso, clique com o botão direito no arquivo `.AppImage` e selecione `Properties (Propriedades)`. Vá até a aba **Permissions (Permissões)**, marque a caixa `Is Executable (É Executável)` e clique OK.

![Janela de Permissões do Steam Deck](/images/r2modman-linux/appimageproperties.png)

Após marcar o arquivo como executável, você poderá clicar duas vezes em `AppImage` para abrir o r2modman.

## Instalando Mods no r2modman

Quando tiver instalado o r2modman, você poderá finalmente instalar mods.

1. Inicie o **r2modman**. Você verá a seguinte tela.

![Tela de Seleção de Jogos do r2modman](/images/r2modman-install/gameselection.png)

2. Selecione **"Lethal Company"**, e clique em **"Select Game"**.

:::tip
Se não encontrá-lo, **use a barra de pesquisa ou role a tela para baixo** até achar "Lethal Company".
:::

![Selecione Lethal Company](/images/r2modman-install/selectlc.png)

3. O programa perguntará qual perfil você quer usar. Para o propósito deste guia, vamos nos manter com o perfil Default. Clique em **"Select profile"**.

![Selecione o Perfil Default](/images/r2modman-install/profileselect.png)

4. Isso nos levará até esta tela.

![Primeira Vez Aberto e Instalado](/images/r2modman-install/firsttimeinstall.png)

5. Clique em **"Online"** na barra lateral. Isso irá trazer uma lista de todos os mods para baixar disponíveis em [Thunderstore](https://thunderstore.io/c/lethal-company/).

![Clicando Online](/images/r2modman-install/selectonline.png)

6. Daqui você pode escolher quais mods você quer baixar e instalar. Clique no mod que desejar, e clique em Download.

![Baixando um mod](/images/r2modman-install/download.png)

7. O programa perguntará qual versão deseja usar. Baixe a última versão, que estará selecionada para você por padrão. Clique em **"Download with dependencies"** ou **"Download"**.

![Baixando com dependências](/images/r2modman-install/downloadlatest.png)

8. Quando finalizar de baixar seus mods, poderá clicar em "Start modded" na barra lateral. Isto fará com que o jogo inicie com seus mods.

![Iniciar Lethal Company Moddado](/images/r2modman-install/startmodded.png)

Pronto! Você conseguiu moddar Lethal Company!

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

If you prefer to load r2modman from desktop mode or wish to run default mods without loading r2modman, right-click the game in Steam and click `Properties`. Em seguida, copie e cole o seguinte em **Launch Options (Opções de Inicialização)**:

```
WINEDLLOVERRIDES="winhttp=n,b" %command% --doorstop-enable true --doorstop-target "/home/deck/.config/r2modmanPlus-local/LethalCompany/profiles/Default/BepInEx/core/BepInEx.Preloader.dll" --r2profile "Default"
```

![Steam Properties](/images/r2modman-linux/steamproperties.png)
Isso fará com que o jogo inicie com o perfil Default que configuramos anteriormente no r2modman, portanto todos os mods instalados lá estarão disponíveis.

Se quiser sincronizar seus mods com seus amigos, navege até a página [Compartilhando Perfis do r2modman](syncing-mods).
