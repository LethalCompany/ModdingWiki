---
layout: home
titleTemplate: false
description: Lethal Company Modding Wiki. ¡Aprende a como instalar, manejar y crear mod para Lethal Company!
hero:
  name: Lethal Company Modding Wiki
  tagline: ¡Bienvenido a la guía de mods de Lethal Company! ¡Aprende a como instalar, manejar y crear mod para Lethal Company!
  actions:
    - theme: brand
      text: Guía para principiantes
      link: /overview
    - theme: alt
      text: Editar en GitHub
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

- [¡Entra al servidor de Discord!](https://discord.gg/nYcQFEpXfU)
- [Contribuye en GitHub](https://github.com/LethalCompany/ModdingWiki)
- [Traduce la Wiki](./contribute/translating-the-wiki.html) - ¡Traduce la wiki a tu idioma!

</HomeLinks>
