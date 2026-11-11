<script setup>
import BaseCodeEditor from '../../src/components/BaseCodeEditor.vue'
import { json } from '@codemirror/lang-json'
import { useData } from 'vitepress'
import { ref } from 'vue'

const { isDark } = useData()
const language = json()
const config = ref(JSON.stringify({ tenantHost: 'demo.example.com', features: { darkMode: true } }, null, 2))
const loading = ref(false)
</script>

# BaseCodeEditor

CodeMirror 6 editor with line numbers, `v-model` support and library-token surfaces.

## Installation

CodeMirror is an **optional peer dependency** — only apps that use the editor install it. Import the editor from its own entry so other apps never pull in CodeMirror:

```bash
npm install @codemirror/state @codemirror/view @codemirror/language @codemirror/theme-one-dark
npm install @codemirror/lang-json   # or any other language package
```

```ts
import { BaseCodeEditor } from 'chrome-extension-component-library/code-editor'
```

## Example

<ComponentPreview>
  <div style="display: grid; gap: 8px; width: 100%">
    <BaseCodeEditor
      v-model="config"
      :language="language"
      :theme="isDark ? 'dark' : 'light'"
      :loading="loading"
      label="App config"
      style="height: 160px"
    />
    <label><input v-model="loading" type="checkbox" /> Loading</label>
  </div>
</ComponentPreview>

```vue
<script setup lang="ts">
import { json } from '@codemirror/lang-json'

const language = json() // create once; a new instance on every render reconfigures the editor
</script>

<template>
  <BaseCodeEditor
    v-model="config"
    :language="language"
    :theme="isDark ? 'dark' : 'light'"
    :readonly="isLoading"
    :loading="isLoading"
    label="App config"
    style="height: 300px"
  />
</template>
```

The editor fills its container; give it (or its flex parent) a height.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `string` | `''` | Document text. External changes replace the document; typing updates the model |
| `language` | `Extension` | none | CodeMirror language support, e.g. `json()` |
| `theme` | `'dark' \| 'light'` | `'dark'` | Syntax-highlighting palette (One Dark / CodeMirror default). Surfaces follow the tokens |
| `readonly` | `boolean` | `false` | Prevents editing |
| `loading` | `boolean` | `false` | Shows a [BaseLoadingBar](/components/base-loading-bar) along the top and sets `aria-busy` |
| `label` | `string` | `'Code editor'` | Accessible name of the editable region |

## Tokens used

`--color-editor-bg`, `--color-border`, `--color-text`, `--color-text-muted`, `--color-focus`, `--radius-button`, `--font-family-mono`.
