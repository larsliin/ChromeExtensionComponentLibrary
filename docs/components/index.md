# Components

A collection of Vue 3 components designed specifically for Chrome extensions.

## Available Components

### Actions

- **[BaseButton](/components/base-button)** - Button with `primary`, `secondary`, `tool` and `bare` variants
- **[BaseIconButton](/components/base-icon-button)** - Icon-only toolbar button with required label and toggle state
- **[BaseCopyButton](/components/base-copy-button)** - Copies text with a temporary "Copied" state (plus `useCopyToClipboard`)
- **[BaseHeroButton](/components/base-hero-button)** - Large glossy call-to-action with icon, title and caption

### Form fields

- **[BaseSelect](/components/base-select)** - Native dropdown field
- **[BaseMenuSelect](/components/base-menu-select)** - Compact dropdown with custom trigger and floating panel
- **[BaseCheckbox](/components/base-checkbox)** - Checkbox with optional label
- **[BaseNumberInput](/components/base-number-input)** - Number field
- **[BaseRangeInput](/components/base-range-input)** - Slider
- **[BaseCodeEditor](/components/base-code-editor)** - CodeMirror editor (optional peer dependency)

### Feedback

- **[BaseAlert](/components/base-alert)** - Error, warning and info messages
- **[BaseLoadingBar](/components/base-loading-bar)** - Indeterminate progress bar

## Usage

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
