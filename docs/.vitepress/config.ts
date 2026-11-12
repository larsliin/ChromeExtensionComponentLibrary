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
          { text: 'BaseAlert', link: '/components/base-alert' },
          { text: 'BaseButton', link: '/components/base-button' },
          { text: 'BaseCheckbox', link: '/components/base-checkbox' },
          { text: 'BaseCodeEditor', link: '/components/base-code-editor' },
          { text: 'BaseCopyButton', link: '/components/base-copy-button' },
          { text: 'BaseHeroButton', link: '/components/base-hero-button' },
          { text: 'BaseIconButton', link: '/components/base-icon-button' },
          { text: 'BaseLoadingBar', link: '/components/base-loading-bar' },
          { text: 'BaseMenuSelect', link: '/components/base-menu-select' },
          { text: 'BaseNumberInput', link: '/components/base-number-input' },
          { text: 'BaseProductIcon', link: '/components/base-product-icon' },
          { text: 'BaseRangeInput', link: '/components/base-range-input' },
          { text: 'BaseSelect', link: '/components/base-select' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/larsliin/ChromeExtensionsComponentLibrary' },
    ],
  },
})
