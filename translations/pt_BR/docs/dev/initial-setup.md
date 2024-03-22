---
prev: true
next: true
description: Aprende como instalar todos os pré-requezitos necessários para começar a criar mods para o Lethal Company.
---

# Configuração inicial

::: tip
If you can't code and want to create a mod that does one common, simple thing (such as adding a suit or sound replacement) make sure to check the [Asset Modding APIs](/dev/apis/overview#asset-apis) section!

Vários casos de uso comuns já possuem APIs que permitem você facilmente adicionar conteúdo sem ter que escrever código.
:::

Esta secção da wiki vai falar de como ficar pronto para desenvolver.

Quanto estiveres pronto, tem a certeza de verificar a secção [APIs de Modding](/dev/apis/overview) para ver se tem alguma "librarie" que faça a criação do seu mod mais fácil.

## Configurando o seu ambiente de desenvolvedor {#setup-env}

Antes de conseguires começar a criar mods, vais precisar de algumas ferramentas para realmente criar mods. Felizmente, todos esses estão **disponíveis de graça**.

:::tip
Este guia é baseado em algumas partes do [BepInEx setup guide]
:::

### .Net SDK {#dotnet-sdk}

Um SDK (=Kit de Desenvolvimento de Software) é um sistema que te permite que tornes o teu código em algo que o teu PC possa rodar. É usado por outras ferramentas, e geralmente não interages diretamente com o ele.

Vais precisar baixar e instalar a última versão do .Net 7 SDK através [desta página](https://dotnet.microsoft.com/en-us/download/dotnet/7.0). Irá se parecer algo como isso:

[![.Net SDK download](/images/initial-setup/net7sdkdownload.png)](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)

:::danger
O .Net 9 SDK pode causar problemas com o modelo do BepInEz 5. Até esses problemas serem resolvidos, é recomendado instalar o .Net 7 em vez do 8.
:::

### IDE

De longe a ferramenta mais importante na caixa de ferramentas de um programador é um IDE (=Ambiente de Desenvolvimento Integrado). Por agora, a definição de um "editor de texto muito complicado" será suficiente. Através de um IDE, consegues editar código muito mais eficientemente, pois oferece funcionalidades como:

- Destaque de Sintaxe
- Compilação
- Conclusão de Código
- Ferramentas integras (controle de versão, "linting", etc...)
- Debugging

Se calhar irás perguntar-te porque é que alguns destes são importantes (ou o que alguns destes são), as isso está fora tema desta wiki. No entanto, tenha certeza de que eles são essenciais e lhe pouparão muitas dores de cabeça. _Não_ tentes criar mods em um editor de texto simples como o bloco de notas. Tecnicamente, podes fazer isso, mas não há rasão para isso além do masoquismo.

**Para IDEs, nós recomendamos uma das seguintes opções gratuitas:**

- [Visual Studio](https://visualstudio.microsoft.com/) -- **Recomendado** -- Um pacote completo. Tem um descompilador incluído, que pode economizar algum tempo.

:::info
Se já tens o Visual Studio instalado, vais precisar de verificar se estás a usar Visual Studio 2022. Esta é a versão que suporta .Net 7, e tem a Versão do MSBuild correta para criar a solução do seu projeto.
:::

- [Visual Studio Code](https://code.visualstudio.com/) -- Um pacote mais leve.

**Se tens acesso a uma licença do Jetbrains, nós recomendamos as seguintes opções pagas:**

- [Rider](https://www.jetbrains.com/rider/) -- **Recomendado** (O próprio autor deste artículo usa.) -- Um pacote completo. Comparável ao Visual Studio. Tem um descompilador incluído, que pode economizar algum tempo.

### BepInEx

Para realmente carregar mods no jogo, vamos precisar de um carregador para mods ("mod loader"). É aí que entra BepInEx! "**Be**pis **In**jector **Ex**tensible" é uma estrutura reparadora/plug-in para jogos da Unity. Ele vai cuidar de tudo relacionado com fazer que o plug-in seja realmente carregado no jogo, para nós conseguirmos focar na criação do plug-in sem ter que se preocupar com mais nada.

Vais primeiramente ter que instalar o BepInEx no teu jogo. Segue o seu [guia de instalação](https://docs.bepinex.dev/articles/user_guide/installation/index.html) para fazer isso. Vais precisar [desta](https://github.com/BepInEx/BepInEx/releases/download/v5.4.22/BepInEx_x64_5.4.22.0.zip) versão do BepInEx.

Quando a instalação estiver completa, entra uma vês no jogo para criar alguns ficheiros de configuração. Depois, refresca o ficheiro onde tu instalaste o BepInEx, e vai para a pasta `BepInEx/config`. Aí, vais encontrar um ficheiro chamado BepInEx.cfg`. Abre-o, e procura a secção `[Logging.Console]\` e faz as seguintes alterações:

```ini
[Logging.Console]

## Enables showing a console for log output.
# Setting type: Boolean
# Default value: false
Enabled = false // [!code --]
Enabled = true // [!code ++]
```

### Descompilador (_muito recomendado / quase essencial_) {#decompiler}

Um descompilador permite que tu descompiles um programa já existente. Isto é um termo técnico que basicamente diz que "permite que você espie por trás da cortina e veja como é o código de um programa". Por que isso é importante, você pode perguntar? Bem, se formos modificar um jogo, precisamos primeiro saber **o que** vamos modificar. Queremos de reduzir o preço de itens? Vamos precisar de saber em que parte do código os itens são mostrados e vendidos ao jogador. Queremos adicionar uma condição do clima? Vamos precisar de saber em que parte do código o jogo controla e gera o clima.

Nós recomendamos uma (ou todas) as três opções grátis:

- [dnSpyEx](https://github.com/dnSpyEx/dnSpy)
- [ILSpy](https://github.com/icsharpcode/ILSpy)
- [dotPeek](https://www.jetbrains.com/decompiler/)

:::tip
**Nota tu não precisas necessariamente isto se tens o "Rider" ou o Visual Studio, pois eles vêm com descompiladores incluídos. Anota que diferentes descompiladores oferecem resultados um pouco diferentes, e têm interfaces diferentes.**
:::

### Unity Explorer (opcional) {#unity-explorer}

[Unity Explorer](https://github.com/sinai-dev/UnityExplorer) é uma ferramente que adiciona uma UI no jogo que permite que explores, "debugs", e modifiques o jogo enquanto está aberto. Esta ferramente pode ser muito útil para saberes a parte técnica do jogo melhor, e é fortemente recomendado.

Vais precisar de baixar a versão compatível com a última versão do BepInEx (5).

[![Unity Explorer download](/images/initial-setup/unityexplorerdownload.png)](https://github.com/sinai-dev/UnityExplorer/releases/latest/download/UnityExplorer.BepInEx5.Mono.zip)

### Ferramentes adicionais (opcional) {#other-tools}

Há um número de BepInEx plug-ins e ferramentas que podem ser úteis conforme você ganha mais experiência a modificar. Os desenvolvedores do BepInEx de forma útil listaram-nos [aqui](https://docs.bepinex.dev/articles/dev_guide/dev_tools.html).

## Criar uma conta no GitHub {#create-github-account}

Nós recomendamos fortemente usar o git - um "sistema de controle de versão". O site mais popular que oferece isso como um serviço (grátis) é o [GitHub](https://github.com/).

O vídeo seguinte é uma breve introdução sobre o que é o git (e sistemas de controle de versão em geral): https\://www\.youtube.com/watch?v=2ReR1YJrNOM

Para leitura adicional, consulte [GitHub's documentation](https://docs.github.com/en/get-started/quickstart/hello-world).

Em pequeno, o Git(Hub) permite que você faça as seguintes coisas sem problemas:

- Manter a história _completa_ do teu projeto
  - Permite que você rever para versões anteriores se fizer algum erro
  - Permite que você recupere seu código se seu disco duro falhar, ou se apagares algo por acidente
  - Allows you to revisit previous updates and patch notes, adding implicit documentation to your project (when done right)
- Collaborate with others
  - Others can send _requests_ to update files of your project
  - Others can download your code and learn from it
  - Others can continue updating your project, _long_ after you've stopped caring about it
  - Others can help you fix a bug, and you can easily get that bug fixed version of your project

Without going into too much detail, there is a difference between "Git", and "GitHub". Git is a program that anyone can run. GitHub is a website that makes this program available to others through the cloud - allowing for collaborating, and remote backups. You _can_ just use Git locally, but you'll lose a lot of the benefits. An alternative to GitHub is [GitLab](https://about.gitlab.com/).

To create an account, simply go to [GitHub's home page](https://github.com/) and follow the steps. GitHub also has a [guide](https://docs.github.com/en/get-started/onboarding/getting-started-with-your-github-account) on creating a new account (just ignore the step about checking pricing plans - you don't need a paid account, this is primarily for companies and professional users).

## Next steps

Now that you've set up everything, you'll want to proceed to the **[starting a mod](starting-a-mod)** article!
