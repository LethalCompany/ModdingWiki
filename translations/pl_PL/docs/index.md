---
layout: home
titleTemplate: false
description: Wiki modowania Lethal Company. Dowiedz się jak instalować, tworzyć i zarządzać modami do Lethal Company!
hero:
  name: Wiki modowania Lethal Company
  tagline: Witamy w przewodniku modowania Lethal Company! Dowiedz się jak instalować, tworzyć i zarządzać modami do Lethal Company!
  actions:
    - theme: brand
      text: Poradnik dla początkujących
      link: /overview
    - theme: alt
      text: Edytuj na GitHub
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

- [Dołącz do serwera Discord!](https://discord.gg/nYcQFEpXfU)
- [Pomóż w tworzeniu na GitHub](https://github.com/LethalCompany/ModdingWiki)
- [Przetłumacz wiki](./contribute/translating-the-wiki.html) - Przetłumacz wiki na swój język!

</HomeLinks>
