import { defineConfig, HeadConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Lethal Company Modding Wiki",
  description: "A modding wiki for lethal company",
  transformHead: ({ pageData }) => {
    const head: HeadConfig[] = []

    // OpenGraph data for embeds
    head.push(['link', { rel: 'icon', href: "/favicon.ico" }])
    head.push(['meta', { property: 'og:title', content: pageData.title }])
    head.push(['meta', { property: 'og:description', content: pageData.frontmatter.description }])
    head.push(['meta', { property: 'og:site_name', content: "Lethal Company Modding Wiki" }])
    head.push(['meta', { property: 'og:image', content: "https://lethal.wiki/logo.png" }])
    head.push(['meta', { name: 'theme-color', content: "#ff3600" }])

    return head
  },
  sitemap: {
    hostname: 'https://lethal.wiki/'
  },
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local' // TODO: Set up algolia for better-performing searches
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Beginner\'s Guide', link: '/overview.md' },
      { text: 'Developer\'s Guide', link: '/dev/overview.md' },
      { text: 'Discord', link: 'https://discord.gg/nYcQFEpXfU' }
    ],

    sidebar: {
      '/': [
        {
          items: [
            {text: 'Beginner\'s Guide', link: '/overview'},
            {
              text: 'Installing Mods',
              items: [
                {text: 'Using r2modman', link: '/installation/installing-r2modman'},
                {text: 'Sharing r2modman Profiles', link: '/installation/syncing-mods'},
                {text: 'Configuring Mods', link: '/installation/configuration'}
              ]
            },
            {
              text: 'Other Resources',
              items: [
                {text: 'Frequently Asked Questions', link: '/extras/faq'},
                { text: 'Contributing Translations', link: '/contribute/translating-the-wiki' },
                { text: 'Contributing Articles', link: '/contribute/writing-articles' },
                {text: 'About', link: '/extras/about'}
              ]
            },
          ]
        }
        ],
      '/dev/': [
        {
          items: [
            {
              text: 'Developer\'s Guide', link: '/dev/overview'
            },
            { 
              text: 'Creating Mods', 
              items: [
                { text: 'Initial Setup', link: '/dev/initial-setup' },
                { text: 'Starting a Mod', link: '/dev/starting-a-mod' },
                { text: 'Open-Source & Ethics', link: '/dev/open-source-and-ethics' },
                { text: 'Publishing Your Mod', link: '/dev/publishing-your-mod' }
              ]
            },
            { 
              text: 'Modding Topics', 
              items: [
                {
                  text: 'Fundamentals',
                  collapsed: false,
                  items: [
                      { text: "Reading game's code", link: '/dev/fundamentals/reading-games-code'}
                  ]
                },
                {
                  text: 'Intermediate',
                  collapsed: false,
                  items: [
                    { text: 'Custom Configs', link: '/dev/intermediate/custom-configs' },
                    { text: 'Custom Config Syncing', link: '/dev/intermediate/custom-config-syncing' },
                    { text: 'Asset Bundling', link: '/dev/intermediate/asset-bundling' },
                  ]
                },
                {
                  text: 'Advanced',
                  collapsed: false,
                  items: [
                    { text: 'Networking', link: '/dev/advanced/networking' },
                  ]
                }
              ]
            },
            { 
              text: 'Modding APIs', 
              items: [
                { text: 'Overview', link: '/dev/apis/overview' },
                {
                  text: 'Asset APIs',
                  collapsed: false,
                  items: [
                    { text: 'CustomSounds', link: '/dev/apis/customsounds'},
                  ]
                },
                {
                  text: 'Programming APIs',
                  collapsed: false,
                  items: [
                    { text: 'LethalLib', link: '/dev/apis/lethallib'},
                  ]
                }
              ]
            },
            {
              text: 'Other Resources',
              items: [
                /*{ text: 'Frequently Asked Questions', link: '/dev/extras/faq' },*/
                { text: 'Contributing Translations', link: '/contribute/translating-the-wiki' },
                { text: 'Contributing Articles', link: '/contribute/writing-articles' },
                { text: 'About', link: '/extras/about' }
              ]
            }
          ]
        }
      ],
    },
    outline: 'deep',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/LethalCompany/ModdingWiki' }
    ],
    editLink: {
      pattern: 'https://github.com/LethalCompany/ModdingWiki/edit/main/docs/:path',
    },
    docFooter: {
      prev: false,
      next: false,
    }
  },
  lastUpdated: true
})
