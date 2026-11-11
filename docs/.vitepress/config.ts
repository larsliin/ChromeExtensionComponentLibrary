import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Chrome Extension Component Library',
  description: 'A collection of reusable Vue 3 components for Chrome extensions',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Theming', link: '/guide/theming' },
      { text: 'Components', link: '/components/' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Theming', link: '/guide/theming' },
        ],
      },
      {
        text: 'Components',
        items: [
          { text: 'BaseButton', link: '/components/base-button' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/larsliin/ChromeExtensionsComponentLibrary' },
    ],
  },
})
