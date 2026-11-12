# Components

A collection of Vue 3 components designed specifically for Chrome extensions.

## Available Components

### Actions

- **[BaseButton](/components/base-button)** - Button with `primary`, `secondary`, `tool` and `bare` variants
- **[BaseCopyButton](/components/base-copy-button)** - Clipboard button with temporary success feedback and stable width
- **[BaseIconButton](/components/base-icon-button)** - Icon-only toolbar, primary, or filled secondary button with required label and toggle state
- **[BaseHeroButton](/components/base-hero-button)** - Large glossy call-to-action with custom slot content

### Branding

- **[BaseProductIcon](/components/base-product-icon)** - Solid product or bordered link-mark badge with a default icon and slot for custom icons

### Lists

- **[BaseListItem](/components/base-list-item)** - Built-in product icon and a default slot for custom row content

### Form fields

- **[BaseSelect](/components/base-select)** - Native dropdown field
- **[BaseMenuSelect](/components/base-menu-select)** - Compact dropdown with custom trigger and floating panel
- **[BaseCheckbox](/components/base-checkbox)** - Checkbox with optional label
- **[BaseSwitch](/components/base-switch)** - Compact labeled on/off control
- **[BaseNumberInput](/components/base-number-input)** - Number field
- **[BaseRangeInput](/components/base-range-input)** - Slider
- **[BaseCodeEditor](/components/base-code-editor)** - CodeMirror editor (optional peer dependency)

### Feedback

- **[BaseAlert](/components/base-alert)** - Error, warning and info messages
- **[BaseLoadingBar](/components/base-loading-bar)** - Indeterminate progress bar

## Usage

For copy actions, use [BaseCopyButton](/components/base-copy-button) for clipboard writes and temporary success feedback. Use `useCopyToClipboard` directly when several controls need to share a copied state.

Install the component library in your Chrome extension project:

```bash
npm install chrome-extension-component-library
```

Then import and use components in your Vue 3 files:

```vue
<script setup>
import { BaseButton } from 'chrome-extension-component-library'
</script>

<template>
  <BaseButton variant="primary">
    Click me
  </BaseButton>
</template>
```

Import the library stylesheet once in your app entry point to load the design tokens, base styles, and Bootstrap Icons:

```ts
import 'chrome-extension-component-library/style.css'
```
