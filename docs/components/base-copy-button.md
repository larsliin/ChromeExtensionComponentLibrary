<script setup>
import { shallowRef } from 'vue'
import BaseCopyButton from '../../src/components/BaseCopyButton.vue'
import BaseAlert from '../../src/components/BaseAlert.vue'

const error = shallowRef('')
</script>

# BaseCopyButton

Copies `value` to the clipboard and shows "Copied" for 1500ms. Built on [BaseButton](/components/base-button) and [`useCopyToClipboard`](#usecopytoclipboard).

Both content states occupy the same grid cell, reserving the larger width and height from the start. Only the active state is visible and exposed to assistive technology, so copying and resetting do not shift neighboring elements. This also supports a `copiedLabel` longer than the idle label.

<ComponentPreview>
  <div style="display: grid; gap: 8px; width: 100%">
    <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px">
      <BaseCopyButton value="#1D9E75" label="Copy HEX" size="small" @error="error = $event" @copied="error = ''" />
      <BaseCopyButton value='{ "tenant": "demo" }' label="Copy to Clipboard" variant="primary" @error="error = $event" @copied="error = ''" />
      <BaseCopyButton value="https://example.com/docs" variant="tool" aria-label="Copy link" title="Copy link" @error="error = $event" @copied="error = ''">
        <template #default="{ copied }">
          <i class="bi" :class="copied ? 'bi-check-lg' : 'bi-copy'" aria-hidden="true" />
          <span class="visually-hidden">{{ copied ? 'Copied to clipboard.' : '' }}</span>
        </template>
      </BaseCopyButton>
      <BaseCopyButton value="disabled" label="Copy" disabled />
    </div>
    <BaseAlert :message="error" />
  </div>
</ComponentPreview>

```vue
<script setup lang="ts">
import { shallowRef } from 'vue'
import { BaseAlert, BaseCopyButton } from 'chrome-extension-component-library'

const error = shallowRef('')
const hex = '#1D9E75'
</script>

<template>
  <BaseCopyButton
    :value="hex"
    label="Copy HEX"
    size="small"
    @error="error = $event"
    @copied="error = ''"
  />
  <BaseAlert :message="error" />
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Text to copy. Required |
| `label` | `string` | `'Copy'` | Idle text |
| `copiedLabel` | `string` | `'Copied'` | Success text |
| `variant` | `'primary' \| 'secondary' \| 'tool' \| 'bare'` | `'secondary'` | BaseButton visual style |
| `size` | `'small' \| 'medium'` | `'medium'` | Ignored by `tool` and `bare` |
| `resetMs` | `number` | `1500` | How long the copied state lasts |

Native attributes (`disabled`, `title`, `aria-*`) and listeners fall through to the underlying button. For icon-only actions, supply an `aria-label`. The button uses a polite live region for success feedback.

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `copied` | `value: string` | Clipboard write succeeded |
| `error` | `message: string` | Clipboard write failed; copied state is not shown |

Always handle `error` with visible feedback, as in the example above.

## Slots

| Slot | Props | Description |
|------|-------|-------------|
| `default` | `{ copied: boolean }` | Custom content, such as a copy/check icon |

The slot renders once for each state to reserve space for both; the inactive copy is hidden and `aria-hidden`. Keep slot content presentational and avoid duplicate element IDs.

```vue
<BaseCopyButton :value="url" variant="tool" aria-label="Copy link">
  <template #default="{ copied }">
    <i class="bi" :class="copied ? 'bi-check-lg' : 'bi-copy'" aria-hidden="true" />
    <span class="visually-hidden">{{ copied ? 'Copied to clipboard.' : '' }}</span>
  </template>
</BaseCopyButton>
```

Use the consuming application's visually hidden utility for the status text in icon-only slots.

## useCopyToClipboard

Use the composable directly when several controls share one copied state, such as a list of color formats.

```ts
import { useCopyToClipboard } from 'chrome-extension-component-library'

const { copy, isCopied, copiedKey, error } = useCopyToClipboard(1500)

if (await copy('rgb(29 158 117)', 'RGB')) {
  // Follow-up behavior after a successful write.
}
isCopied('RGB') // true for 1.5 s after a successful write
```

| Return | Type | Description |
|--------|------|-------------|
| `copy(text, key?)` | `Promise<boolean>` | Writes `text`; marks `key` (default: text) on success; returns `false` on failure |
| `isCopied(key)` | `boolean` | Whether `key` is in the copied state |
| `copiedKey` | `Readonly<Ref<string \| null>>` | Currently copied key |
| `error` | `Readonly<Ref<string \| null>>` | Last error, cleared on success |

`resetMs` defaults to `1500`. Always display `error` or otherwise report a failed write. Await `copy()` and branch on its boolean result when follow-up behavior is needed.

## Tokens used

Inherits [BaseButton's tokens](/components/base-button#tokens-used). See [Theming](/guide/theming).

<style scoped>
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
</style>
