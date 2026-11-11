# Components

A collection of Vue 3 components designed specifically for Chrome extensions.

## Available Components

- **[BaseButton](/components/base-button)** - Fundamental button component with multiple variants (primary, secondary, tool)

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
