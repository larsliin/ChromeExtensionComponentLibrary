<script setup>
import BaseLoadingBar from '../../src/components/BaseLoadingBar.vue'
</script>

# BaseLoadingBar

Thin indeterminate progress bar. Fills its container's width.

<ComponentPreview>
  <BaseLoadingBar label="Loading documentation links" />
</ComponentPreview>

```vue
<BaseLoadingBar v-if="isLoading" label="Loading config" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `'Loading'` | Accessible name of the progress bar |

The animation slows down when `prefers-reduced-motion` is set.

## Tokens used

`--color-border`, `--color-accent`.
