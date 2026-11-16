<script setup>
import BaseSpinner from '../../src/components/BaseSpinner.vue'
</script>

# BaseSpinner

Circular indeterminate loading indicator for inline or standalone feedback. Inherits the dark (default) or light theme through shared design tokens.

<ComponentPreview>
  <BaseSpinner size="extra-small" label="Loading status" />
  <BaseSpinner size="small" label="Loading items" />
  <BaseSpinner label="Loading settings" />
  <BaseSpinner size="large" label="Loading preview" />
  <BaseSpinner size="extra-large" label="Loading image" />
</ComponentPreview>

```vue
<script setup lang="ts">
import { BaseSpinner } from 'chrome-extension-component-library'
</script>

<template>
  <BaseSpinner size="large" label="Loading preview" />
</template>
```

Use `v-if="isLoading"` to show the spinner only while work is in progress.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'extra-small' \| 'small' \| 'medium' \| 'large' \| 'extra-large'` | `'medium'` | Size preset; dimensions and stroke widths are listed below |
| `label` | `string` | `'Loading'` | Accessible name of the indeterminate progress indicator |

## Sizes

| Size | Outer width and height | Ring thickness |
|------|------------------------|----------------|
| `extra-small` | 12px | 2px |
| `small` | 16px | 2px |
| `medium` | 24px | 3px |
| `large` | 32px | 4px |
| `extra-large` | 36px | 5px |

Use `extra-small` for compact inline feedback and `extra-large` for prominent loading indicators, such as image previews.

## Accessibility

The spinner uses `role="progressbar"` without a numeric value. Set a descriptive `label` for the operation being performed. Native attributes, classes, and styles fall through to the outer element.

Animation is disabled when `prefers-reduced-motion: reduce` is set; the loading ring remains visible.

## Color customization

Set `--spinner-color` for the rotating accent and `--spinner-track-color` for the rest of the ring. Both accept `currentColor` to follow surrounding text:

```vue
<BaseSpinner
  style="--spinner-color: currentColor; --spinner-track-color: color-mix(in srgb, currentColor 25%, transparent)"
/>
```

When a visible loading message already has `role="status"`, mark the accompanying spinner `aria-hidden="true"` to avoid duplicate announcements.

## Tokens used

`--color-border`, `--color-accent`.
