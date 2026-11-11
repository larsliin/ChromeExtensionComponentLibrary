<script setup>
import BaseSelect from '../../src/components/BaseSelect.vue'
import { ref } from 'vue'

const modes = [
  { value: 'analogic', label: 'Analogic' },
  { value: 'complement', label: 'Complement' },
  { value: 'monochrome', label: 'Monochrome' },
  { value: 'triad', label: 'Triad', disabled: true },
]
const mode = ref('analogic')
</script>

# BaseSelect

Form-field dropdown built on the native `<select>`, so keyboard, screen-reader and mobile behavior come from the browser. Use [BaseMenuSelect](/components/base-menu-select) instead for a compact icon trigger with a custom panel.

Both share the same `options` + `v-model` API.

<ComponentPreview>
  <BaseSelect v-model="mode" :options="modes" aria-label="Palette mode" style="width: 200px" />
  <span>Selected: <code>{{ mode }}</code></span>
  <BaseSelect v-model="mode" :options="modes" aria-label="Palette mode" disabled style="width: 200px" />
</ComponentPreview>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { BaseSelect, type SelectOption } from 'chrome-extension-component-library'

const modes: SelectOption<'analogic' | 'complement'>[] = [
  { value: 'analogic', label: 'Analogic' },
  { value: 'complement', label: 'Complement' },
]
const mode = ref<'analogic' | 'complement'>('analogic')
</script>

<template>
  <label for="mode">Palette mode</label>
  <BaseSelect id="mode" v-model="mode" :options="modes" />
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `T extends string` | — | Selected value. Required |
| `options` | `SelectOption<T>[]` | — | `{ value, label, disabled? }` |

Attributes (`id`, `disabled`, `aria-label`, ...) are forwarded to the `<select>`, not the wrapper. Always give it an accessible name via a `<label for>` or `aria-label`.

## Tokens used

`--color-text`, `--color-text-muted`, `--color-editor-bg`, `--color-border`, `--color-focus`, `--radius-button`, `--font-family-base`.
