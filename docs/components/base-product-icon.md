<script setup>
import BaseProductIcon from '../../src/components/BaseProductIcon.vue'
</script>

# BaseProductIcon

Rounded badge that identifies a product, for example in a top bar. It shows a default icon and accepts any icon through the default slot. Choose the solid green `product` type (default) or the bordered `link-mark` type inspired by CatalystDocumentationShortcuts.

<ComponentPreview>
  <BaseProductIcon />
  <BaseProductIcon label="Image Trimmer">
    <i class="bi bi-scissors" aria-hidden="true" />
  </BaseProductIcon>
  <BaseProductIcon style="--product-icon-size: 48px" />
</ComponentPreview>

## Link mark

The `link-mark` type uses an accent-colored icon, a thin border, and an alternate theme background. Both types follow the inherited dark (default) or light theme through the shared design tokens.

<ComponentPreview>
  <BaseProductIcon type="link-mark" />
  <BaseProductIcon type="link-mark" label="Documentation" style="--product-icon-size: 38px">
    <i class="bi bi-book-half" aria-hidden="true" />
  </BaseProductIcon>
</ComponentPreview>

```vue
<!-- Default icon -->
<BaseProductIcon />

<!-- Custom icon -->
<BaseProductIcon label="Image Trimmer">
  <i class="bi bi-scissors" aria-hidden="true" />
</BaseProductIcon>

<!-- SVG icon -->
<BaseProductIcon label="Image Trimmer">
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 1.5l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.3l-3.8 2 .7-4.3-3.1-3 4.3-.6z" />
  </svg>
</BaseProductIcon>

<!-- Larger -->
<BaseProductIcon style="--product-icon-size: 48px" />

<!-- Bordered link mark; inherits dark or light theme -->
<BaseProductIcon type="link-mark" label="Documentation">
  <i class="bi bi-book-half" aria-hidden="true" />
</BaseProductIcon>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'product' \| 'link-mark'` | `'product'` | Solid green product badge or bordered badge with an alternate background and accent-colored icon |
| `label` | `string` | — | Accessible name. When omitted the icon is hidden from assistive technology |

## Slots

| Slot | Description |
|------|-------------|
| default | Custom icon. Replaces the default icon. Font icons, `<svg>` and `<img>` are fitted to 69% of the product badge or 56% of the link-mark badge for extra inner spacing; SVGs use `currentColor` if they set `fill`/`stroke` to it |

SVG icons should have a tight `viewBox`. Any padding inside the `viewBox` makes the icon look smaller than the badge.

## Sizing

Set the `--product-icon-size` custom property (default `28px`) to resize the badge and its icon. The size includes the border for `link-mark`, so switching types does not change the outer dimensions.

## Tokens used

`--color-accent`, `--color-on-accent`, `--color-bg`, `--color-border`
