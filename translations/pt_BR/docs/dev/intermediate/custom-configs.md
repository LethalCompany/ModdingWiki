---
prev: false
next: true
description: Uma visão geral de nível intermediário sobre como implementar configurações personalizadas nos seus mods de Lethal Company.
---

# Configurações Personalizadas

:::warning
**Este é um artigo avançado. Mesmo introduzindo alguns conceitos de C#, é altamente recomendado entender C# e os básicos de moddar o game <i>antes</i> de ler este artigo.**
:::

:::info
Este tutorial foi pego e adaptado da [Documentação de configuração do BepInEx](https://docs.bepinex.dev/articles/dev_guide/plugin_tutorial/4_configuration.html). Para mais recursos, consulte ele.
:::

## Criando Registros de Configuração

Crie uma classe de configuração e adicionar registros para qualquer variável que você quer que seja configurável.

```cs
public class Config
{
    public static ConfigEntry<string> configGreeting;
    public static ConfigEntry<bool> configDisplayGreeting;

    // ...
}
```

Então conseguiremos conectar nosso registro de configuração com os campos que acabamos de criar dentro do construtor da classe.

```cs
public Config(ConfigFile cfg)
{
    configGreeting = cfg.Bind(
            "General",                          // Seção do config
            "GreetingText",                     // Chave do config
            "Hello, world!",                    // Valor padrão
            "Greeting text upon game launch"    // Descrição
    );
    
    configDisplayGreeting = cfg.Bind(
            "General.Toggles",                  // Subseção do config
            "DisplayGreeting",                  // Chave deste config
            true,                               // Valor padrão
            "To show the greeting text"         // Descrição
    );
}
```

Agora precisamos iniciar o construtor para conectar as configurações com valores apropriados e propriedades para os usuários.<br><br>Na sua classe principal (geralmente `Plugin.cs`), implemente o construtor com um parâmetro referenciando o arquivo que será criado pelo BepInEx.

```cs
public class MyExampleMod : BaseUnityPlugin
{
    public static new Config MyConfig { get; internal set; }

    // ...

    private void Awake()
    {
        MyConfig = new(base.Config);
    }
}
```

## Usando Registros de Configuração

Agora você consegue pegar os dados das variáveis de configuração que você criou usando a propriedade `.Value`.

```cs
private void MyExamplePatch()
{
    private void MyExampleMethod()
    {
        // No lugar de: Logger.LogInfo("Hello, world!")
        if(Config.configDisplayGreeting.Value)
            Logger.LogInfo(Config.configGreeting.Value);
    }
}
```

:::danger PARE
Entenda que seu arquivo de configuração **Não Será Criado** até que o seu mod seja carregado no jogo **pelo menos uma vez**. Veja a [Página de Configurações do r2modman](/installation/configuration) para usar suas configurações.
:::

Agora você tem arquivos de configurações para seus mods! Se for de extrema importância que seu mod tem um valor de configuração idêntico para cada jogador, considere ler a página sobre [sincronização de configurações personalizadas](/dev/intermediate/custom-config-syncing).
