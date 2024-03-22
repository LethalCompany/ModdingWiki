---
layout: ""
titleTemplate: false
description: 리썰 컴퍼니 모딩 위키 리썰 컴퍼니 모드를 다운, 관리, 그리고 만드는지 배우는 곳 입니다!
hero:
  name: 리썰 컴퍼니 모딩 위키
  tagline: 리썰 컴퍼니 모딩 가이드에 오신 것을 환영합니다! 리썰 컴퍼니 모드를 다운, 관리, 그리고 만드는지 배우는 곳 입니다!
  actions:
    - theme: brand
      text: 입문자 가이드
      link: /overview
    - theme: ""
      text: GitHub에서 편집
      link: ""
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

- [디스코드 서버에 참여하세요!](https://discord.gg/nYcQFEpXfU)
- GitHub 에서 기여
- [위키 변역](./contribute/translating-the-wiki.html) - 위키를 당신의 언어에 맞게 번역하세요!

</HomeLinks>
