<script setup>
import BaseButton from '../../src/components/BaseButton.vue'
</script>

# BaseButton

The fundamental button component. Toggle the site's dark/light switch to preview both themes.

## Variants

### Primary

Main call-to-action, e.g. "Copy to Clipboard".

<ComponentPreview>
  <BaseButton variant="primary">Copy to Clipboard</BaseButton>
  <BaseButton variant="primary" disabled>Copy to Clipboard</BaseButton>
</ComponentPreview>

```vue
<BaseButton variant="primary" @click="copy">Copy to Clipboard</BaseButton>
```

### Secondary

Outlined, accent-colored text, e.g. "Copy HEX" / "Copy all colors".

<ComponentPreview>
  <BaseButton variant="secondary" size="small">Copy HEX</BaseButton>
  <BaseButton variant="secondary" size="small">Copy all colors</BaseButton>
  <BaseButton variant="secondary" size="small" disabled>Copy HEX</BaseButton>
</ComponentPreview>

```vue
<BaseButton variant="secondary" size="small">Copy HEX</BaseButton>
```

### Tool

Square icon button for toolbars. Always provide an `aria-label`.

<ComponentPreview>
  <BaseButton variant="tool" aria-label="Refresh">⟳</BaseButton>
  <BaseButton variant="tool" aria-label="Refresh" disabled>⟳</BaseButton>
</ComponentPreview>

```vue
<BaseButton variant="tool" aria-label="Refresh" title="Refresh">⟳</BaseButton>
```

## Sizes

`primary` and `secondary` come in `medium` (default) and `small`. `tool` has a fixed 36×36 size.

| Size | Font size | Padding | Min height |
|------|-----------|---------|------------|
| `medium` | 14px | 6px 12px | — |
| `small` | 11px | 5px 10px | 32px |

<ComponentPreview>
  <BaseButton variant="primary">Medium</BaseButton>
  <BaseButton variant="primary" size="small">Small</BaseButton>
  <BaseButton variant="secondary">Medium</BaseButton>
  <BaseButton variant="secondary" size="small">Small</BaseButton>
</ComponentPreview>

```vue
<BaseButton variant="primary" size="small">Small</BaseButton>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Native button type |
| `variant` | `'primary' \| 'secondary' \| 'tool'` | — | Visual style |
| `size` | `'small' \| 'medium'` | `'medium'` | Size (ignored by `tool`) |

Native attributes (`disabled`, `title`, `aria-*`) and listeners (`@click`, ...) fall through to the `<button>`.

## Exposed methods

| Method | Description |
|--------|-------------|
| `focus()` | Focuses the button |
| `getBoundingClientRect()` | Returns the button's bounding rect |

## Tokens used

`--color-accent`, `--color-accent-hover`, `--color-accent-active`, `--color-on-accent`, `--color-text`, `--color-border`, `--color-hover`, `--color-active`, `--color-editor-bg`, `--color-focus`, `--radius-button`, `--font-family-base`, `--line-height-base`.

See [Theming](/guide/theming).
