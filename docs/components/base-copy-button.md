<script setup>
import BaseCopyButton from '../../src/components/BaseCopyButton.vue'
</script>

# BaseCopyButton

Copies `value` to the clipboard and shows a temporary "Copied" state. Built on [BaseButton](/components/base-button) and [`useCopyToClipboard`](#usecopytoclipboard).

<ComponentPreview>
  <BaseCopyButton value="#1D9E75" label="Copy HEX" size="small" />
  <BaseCopyButton value='{ "tenant": "demo" }' label="Copy to Clipboard" variant="primary" />
  <BaseCopyButton value="https://example.com/docs" variant="tool" aria-label="Copy link" title="Copy link">
    <template #default="{ copied }">{{ copied ? '✓' : '⧉' }}</template>
  </BaseCopyButton>
</ComponentPreview>

```vue
<BaseCopyButton :value="hex" label="Copy HEX" size="small" />

<!-- Icon-only -->
<BaseCopyButton :value="url" variant="tool" aria-label="Copy link">
  <template #default="{ copied }">
    <CheckIcon v-if="copied" />
    <CopyIcon v-else />
  </template>
</BaseCopyButton>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Text to copy. Required |
| `label` | `string` | `'Copy'` | Idle text |
| `copiedLabel` | `string` | `'Copied'` | Text (and accessible name) while copied |
| `variant` | `BaseButton` variant | `'secondary'` | |
| `size` | `'small' \| 'medium'` | `'medium'` | |
| `resetMs` | `number` | `1500` | How long the copied state lasts |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `copied` | `value` | Write succeeded |
| `error` | `message` | Clipboard write failed |

## Slots

| Slot | Props | Description |
|------|-------|-------------|
| `default` | `{ copied }` | Custom content, e.g. swapping a copy icon for a check |

## useCopyToClipboard

Use the composable directly when several items share one "copied" state, e.g. a list of color formats.

```ts
import { useCopyToClipboard } from 'chrome-extension-component-library'

const { copy, isCopied, copiedKey, error } = useCopyToClipboard(1500)

await copy('rgb(29 158 117)', 'RGB') // key defaults to the text
isCopied('RGB') // true for 1.5 s
```

| Return | Type | Description |
|--------|------|-------------|
| `copy(text, key?)` | `Promise<boolean>` | Writes `text`; marks `key` as copied |
| `isCopied(key)` | `boolean` | Whether `key` is in the copied state |
| `copiedKey` | `Readonly<Ref<string \| null>>` | Currently copied key |
| `error` | `Readonly<Ref<string \| null>>` | Last error, cleared on success |
