---
prev: true
next: true
description: Uma visão geral da abordagem sobre Código Aberto utilizado pela comunidade de modding do Lethal Company.
---

# Código Aberto e Ética

## O que é código aberto?

Código aberto significa que um código está disponível publicamente para ser usado, editado e distribuído por qualquer um. Isso adota uma abordagem colaborativa e pública em desenvolvimento de software. Contudo, há várias coisas a serem consideradas quando se desenvolve um software de código aberto.

### Licenças

Um repositório no GitHub _sem_ licença **não** é um código aberto:

> sem a licença, as leis de direitos autorais padrões se aplicam, o que significa que você terá total direito ao código-fonte, e ninguém pode reproduzir, distribuir ou criar trabalhos derivados baseados no seu.
>
> _fonte: https\://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository#choosing-the-right-license_

Isso significa que, se você quiser abrir o código dos seus mods de maneira apropriada, você terá que escolher uma licença de código aberto.
Isso pode parecer intimidador, mas não precisa ser. O GitHub criou um site simples para achar a licença perfeita que se encaixa com seu projeto: https\://choosealicense.com/

:::warning
**Aqui está o obrigatório: "Nós não somos advogados". Nossa interpretação dessas licenças são baseadas no site `choosealicense` (escolha uma licença), bem como experiência pessoal.**
:::

Nós recomendamos seguir com uma das seguintes licenças para seus mods:

- [Licença Pública Geral GNU v3.0](https://choosealicense.com/licenses/gpl-3.0/) -- a principal vantagem dessa licença é que qualquer um que usar o código do seu mod (seja como uma versão spin-off, atualizada ou em outros jogos) _terá_ que usar essa licença também. Isso significa que seu trabalho, e qualquer derivado, permanecerá como código aberto. Isso significa que pessoas não podem pegar seu código e criar uma versão que não tem o código público, e que a comunidade sempre poderá trabalhar em cima do seu trabalho e manter seu mod vivo, mesmo se você perder o interesse nele.
- [Licença MIT](https://choosealicense.com/licenses/mit/) --  essa é uma versão mais permissiva em relação à Licença Pública Geral GNU. Ela _também_ permite que usuários criem versões de _código fechado_ do seu mod. Isso significa que o usuário não precisa compartilhar o código publicamente. No entanto, eles devem manter a notificação de direitos autorais da licença original facilmente disponível.

### Colaboração Saudável

Uma comunidade de mods prospera quando os usuários se ajudam. Manter seus códigos abertos significa que modders atuais e futuros podem aprender com seu trabalho, e talvez até manter seu mod atualizado caso venha a sair da comunidade.

Mas é importante se manter na ética quanto a isso. Entendemos que a comunidade de mods pode ficar competitiva. Por favor, não pegue um código alheio e diga ser seu - sempre dê os devidos créditos.

Da mesma forma, quando outros usuários te ajudar a consertar bugs, e quiserem abrir um Pull Request, por favor, aceite ao invés de copiar as alterações feitas e aplicá-las você mesmo(a). Os Pr (Pull Requests) os dão créditos pelos consertos, e colabora com uma comunidade onde os usuários não tem medo de ser ajudarem.
