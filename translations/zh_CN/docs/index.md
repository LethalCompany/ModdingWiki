---
layout: home
titleTemplate: false
description: 致命公司模组 Wiki。 了解如何安装、管理和创作致命公司模组！
hero:
  name: 致命公司模组 Wiki
  tagline: 欢迎来到致命公司模组指南！ 了解如何安装、管理和创作致命公司模组！
  actions:
    - theme: brand
      text: 新手指南
      link: /overview
    - theme: alt
      text: 在 GitHub 上编辑
      link: https://github.com/LethalCompany/ModdingWiki
---

<script setup lang="ts">
  导入 Home 来自 './.vitepress/components/Home.vue'
  导入 HomeGroup 来自 './.vitepress/components/HomeGroup.vue'
  导入 HomeItem 来自 './.vitepress/components/HomeItem.vue'
  导入 HomeLinks 来自 './.vitepress/components/HomeLinks.vue'
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

- [加入 Discord 服务器！](https://discord.gg/nYcQFEpXfU)
- [在 GitHub 上贡献](https://github.com/LethalCompany/ModdingWiki)
- [翻译 Wiki](./contribute/translating-the-wiki.html) - 将 Wiki 本地化为你的语言！

</HomeLinks>
