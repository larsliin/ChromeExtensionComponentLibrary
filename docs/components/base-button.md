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
<BaseButton variant="primary" @click="handleClick">Copy to Clipboard</BaseButton>
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
  <BaseButton variant="tool" aria-label="Refresh"><i class="bi bi-arrow-clockwise" aria-hidden="true" /></BaseButton>
  <BaseButton variant="tool" aria-label="Refresh" disabled><i class="bi bi-arrow-clockwise" aria-hidden="true" /></BaseButton>
</ComponentPreview>

```vue
<BaseButton variant="tool" aria-label="Refresh" title="Refresh">
  <i class="bi bi-arrow-clockwise" aria-hidden="true" />
</BaseButton>
```

For icon-only buttons prefer [BaseIconButton](/components/base-icon-button), which enforces an accessible label.

### Bare

No padding, background or border — a clickable shell for custom content such as list rows, swatches and cards. Keeps the focus ring and disabled state. Its reset styles have zero specificity, so your own classes always win.

<ComponentPreview>
  <BaseButton variant="bare" style="display: flex; gap: 12px; padding: 6px 8px; width: 240px">
    <strong>RGB</strong><code>rgb(29 158 117)</code>
  </BaseButton>
</ComponentPreview>

```vue
<BaseButton variant="bare" class="format-row" @click="copy(format)">
  <span>{{ format.name }}</span><span>{{ format.value }}</span>
</BaseButton>
```

## Sizes

`primary` and `secondary` come in `medium` (default) and `small`. `tool` has a fixed 36×36 size; `bare` has no size.

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

## Copy to clipboard

Use [BaseCopyButton](/components/base-copy-button) for clipboard actions. It wraps BaseButton, owns the clipboard and temporary "Copied" state, and reserves space for both labels so neighboring elements do not move. The dedicated page includes live examples, error handling, and the `useCopyToClipboard` API for custom interactions.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Native button type |
| `variant` | `'primary' \| 'secondary' \| 'tool' \| 'bare'` | — | Visual style |
| `size` | `'small' \| 'medium'` | `'medium'` | Size (ignored by `tool` and `bare`) |

Native attributes (`disabled`, `title`, `aria-*`) and listeners (`@click`, ...) fall through to the `<button>`.

## Exposed methods

| Method | Description |
|--------|-------------|
| `focus()` | Focuses the button |
| `getBoundingClientRect()` | Returns the button's bounding rect |

## Tokens used

`--color-accent`, `--color-accent-hover`, `--color-accent-active`, `--color-on-accent`, `--color-text`, `--color-border`, `--color-hover`, `--color-active`, `--color-editor-bg`, `--color-focus`, `--radius-button`, `--font-family-base`, `--line-height-base`.

See [Theming](/guide/theming).
