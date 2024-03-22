---
description: Esse artigo ensina você a usar o ILSpy para ler o código do jogo
---

# Lendo o Código do Jogo

## Introdução

Há chances altas de você encontrar desafios consideráveis quando estiver começando na sua jornada de modding. Você irá querer saber como algo no jogo funciona, mas tem um problema... Você não consegue abrir os arquivos do jogo e descobrir por si só _(seu bobinho)_.

Veja bem, o jeito que os jogos da Unity funcionam é compilando o código em um arquivo .dll, que você não consegue abrir normalmente.

## Descompiladores

Felizmente existe algo chamado "descompilador". Ele pega o código do jogo e reverte o processo de compilação, resultando em código legível. Mesmo não sendo perfeito, ele faz um trabalho bem feito.

Atualmente há 3 descompiladores amplamente usados:

[dnSpyEx](https://github.com/dnSpyEx/dnSpy), [ILSpy](https://github.com/icsharpcode/ILSpy) e [dotPeek](https://www.jetbrains.com/decompiler/).

:::info
Escolher o descompilador vai de preferência pessoal, mas este artigo vai seguir utilizando o ILSpy devido a um equilíbrio entre simplicidade e poder.
:::

::: danger
Please keep in mind that while decompiling and reading the code is _not_ illegal, distributing said decompiled code _is_ illegal. Same applies for sharing the game's files.

Isso significa que você **NÃO PODE** agrupar nenhum arquivo do jogo com seus mods.
:::

## Abrindo o DLL do jogo

Ao abrir o ILSpy, você verá uma janela semelhante a esta.
![Captura de uma janela do ILSpy vazia](/images/reading-game-code/ilspy-window.png)

Então você deve abrir o arquivo `Assembly-CSharp.dll` presente nos arquivos do jogo.

Para conseguir ele, faça o seguinte:

### 1. Abra os arquivos do jogo. Pela Steam, basta clicar com o botão direito no jogo e selecionar 'Abrir Arquivos Locais'. {#open-game-files}

![Como abrir arquivos locais pela Steam](/images/reading-game-code/opening-local-files.png)

A pasta de arquivos do jogo vai abrir ![arquivos locais do Lethal Company](/images/reading-game-code/lc-game-folder.png)

### 2. Vá para `Lethal Company_Data/Managed` {#open-managed-folder}

Assim que fizer isto, vai ver vários arquivos .dll.
![DLLs do Lethal Company](/images/reading-game-code/lc-dlls.png)

Copie o caminho e volte para o ILSpy.

### 3. Abra o arquivo no ILSpy {#open-in-ilspy}

No ILSpy, clique em `File → Open`.
![Como abrir arquivos no ILSpy](/images/reading-game-code/ilspy-open.png)

No navegador de arquivos, cole o caminho que você copiou anteriormente para um acesso fácil. Selecione `Assembly-CSharp.dll` e pressione 'Open'.
![Janela de navegador de arquivos](/images/reading-game-code/opened-folder.png)

Depois que abrir o arquivo, você deve ver que ele foi adicionado à barra lateral.
![Assembly-CSharp.dll aberto](/images/reading-game-code/opened-asc-in-ilspy.png)

## Lendo o Código do Jogo

´Clique no pequeno '+' a esquerda do nome do arquivo. Você deve ver um monte de coisas aparecerem em uma lista.
![Assembly-CSharp.dll aberto](/images/reading-game-code/namespaces.png)

Esses são chamados [namespaces](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/namespaces) e servem basicamente para organizar o código em grupos. Quase todo o código do jogo é armazenado abaixo do namespace '{}' (vazio), então abra ele clicando no '+' novamente.

:::tip
Diferente de 99% do código do jogo, o real script que controla o jogador (`PlayerMovementB`) está no namespace `GameNetcodeStuff`, então lembre-se disso caso não consiga encontrà-lo.
:::

Você vai ver uma lista de arquivos, todos contendo códigos usados pelo jogo. Se você clicar duas vezes em qualquer um deles, conseguirá ver o código de cada um.
![Classes abertas](/images/reading-game-code/so-many-classes.png)

## Campos de busca e métodos

Com tantos arquivos assim, com certeza vai ser difícil achar uma função específica que você procura. Felizmente, ILSpy tem uma solução - Ferramenta de Busca.

Para abrir a ferramenta de busca, você pode:

Abrir ela clicando em `Window → Search`.
![Abrindo a busca através do menu](/images/reading-game-code/window-search.png)

OU

Clicando na pequena lupa na barra superior.
![Abrindo através do ícone de busca](/images/reading-game-code/glass-icon.png)

Independente do método, a janela de busca irá abrir.
![Menu de busca aberto](/images/reading-game-code/opened-search.png)

Usa-la é bem simples. Você pode digitar algo na ferramenta de busca, e o que digitou será apresentado:
![Menu de busca em ação](/images/reading-game-code/search-in-action.png)

Se quiser limitar a busca para apenas variáveis(fields) você pode selecionar essa opção no menu contextual da barra de busca:
![Buscar apenas por fields](/images/reading-game-code/only-fields.png)

Claro que você também pode procurar por classes(types) e funções(methods) apenas os selecionando.

## Achando um uso

Muitas vezes, assim que achar algo que precisava, você pode querer saber onde está sendo usado. Tem uma ferramenta pra isso também.

Clicando com o botão direito em qualquer field ou method no menu contextual, você pode selecionar "Analyze" e analisar o componente.
![Contexto menu Analyze](/images/reading-game-code/analyze-context.png)

Após clicar nele, uma pequena janela com vários menus contextuais irá abrir.
![Janela Analyze](/images/reading-game-code/analyze-window.png)

Esses são os menus contextuais mais usados para campos e métodos:

### Fields

`Read By` (Lido Por) - Métodos que usam esse campo dentro de si.
![Read By em campos](/images/reading-game-code/field-readby.png)

`Assigned By` (Atribuído Por) - Métodos que atribuem valor para esse campo.
![Assigned By em campos](/images/reading-game-code/field-assignedby.png)

### Methods

`Uses` (Usa) - Lista de campos e métodos que esse método está usando.
![Usos em métodos](/images/reading-game-code/methods-uses.png)

`Used By` (Usado Por) - Métodos que usam este método.
![Usado Por em métodos](/images/reading-game-code/methods-usedby.png)

## Conclusão

Parabéns! Agora você sabe ler o código do jogo e como achar algo que esteja procurando. Lembre-se que se não achar nada, não há vergonha em pedir ajuda. Caso precise de ajuda, você pode conseguir no [Discord da Comunidade de Lethal Company Não Oficial](https://discord.gg/nYcQFEpXfU).
