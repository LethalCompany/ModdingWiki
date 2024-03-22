---
layout: home
titleTemplate: false
description: A Wiki de Modding do Lethal Company. Aprenda a instalar, gerenciar e criar mods para Lethal Company!
hero:
  name: A Wiki de Modding do Lethal Company
  tagline: Bem vindo ao guia de modding do Lethal Company! Aprenda a instalar, gerenciar e criar mods para Lethal Company!
  actions:
    - theme: brand
      text: Guia de Iniciante
      link: /overview
    - theme: alt
      text: Editar no GitHub
      link: https://github.com/LethalCompany/ModdingWiki
---

<script setup lang="ts">
  import Home from './.vitepress/components/Home.vue'
  import HomeGroup from './.vitepress/components/HomeGroup.vue'
  import HomeItem from './.vitepress/components/HomeItem.vue'
  import HomeLinks from './.vitepress/components/HomeLinks.vue'
</script>

<Home>
  <HomeGroup title="Installing Mods">
    <HomeItem name="Beginner's Guide" href="./overview" />
    <HomeItem name="Using r2modman" href="./installation/installing-r2modman" />
    <HomeItem name="Sharing r2modman Profiles" href="./installation/syncing-mods" />
    <HomeItem name="Configuring Mods" href="./installation/configuration" /></HomeGroup>

  <HomeGroup title="Creating Mods">
    <HomeItem name="Developer's Guide" href="./dev/overview" />
    <HomeItem name="Initial Modding Setup" href="./dev/initial-setup" />
    <HomeItem name="Modding APIs Overview" href="./dev/apis/overview" />
    <HomeItem name="Publishing Your Mod" href="./dev/publishing-your-mod" /></HomeGroup>

  <HomeGroup title="Other Resources">
    <HomeItem name="Frequently Asked Questions" href="./extras/faq" />
    <HomeItem name="Contributing Translations" href="./contribute/translating-the-wiki" />
    <HomeItem name="Contributing Articles" href="./contribute/writing-articles" />
    <HomeItem name="About" href="./extras/about" /></HomeGroup>


<HomeLinks>

- [Junte-se ao servidor do Discord!](https://discord.gg/nYcQFEpXfU)
- [Contribua no GitHub](https://github.com/LethalCompany/ModdingWiki)
- [Traduza a Wiki](./contribute/translating-the-wiki.html) - Localize a wiki na sua língua!

</HomeLinks>
