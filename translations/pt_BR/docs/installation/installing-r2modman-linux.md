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
r2modman **não** funciona no Game Mode. Quando tiver terminado de seguir a sessão **Instalando r2modman**, leia também a sessão [**Usando Mods no Modo Jogo do Steam Deck**](installing-r2modman-linux?id=using-mods-in-steam-decks-game-mode) para uma solução alternativa.
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

## Usando mods no Game Mode do Steam Deck

**r2modman não funcionará no Game Mode do Steam Deck's, logo os mods não serão carregados por padrão.** Para contornar a situação, clique com o botão direito no jogo da Steam e clique em `Properties (Propriedades)`. Em seguida, copie e cole o seguinte em **Launch Options (Opções de Inicialização)**:

```
WINEDLLOVERRIDES="winhttp=n,b" %command% --doorstop-enable true --doorstop-target "/home/deck/.config/r2modmanPlus-local/LethalCompany/profiles/Default/BepInEx/core/BepInEx.Preloader.dll" --r2profile "Default"
```

![Steam Properties](/images/r2modman-linux/steamproperties.png)
Isso fará com que o jogo inicie com o perfil Default que configuramos anteriormente no r2modman, portanto todos os mods instalados lá estarão disponíveis.

Se quiser sincronizar seus mods com seus amigos, navege até a página [Compartilhando Perfis do r2modman](syncing-mods).
