<script setup>
import BaseIconButton from '../../src/components/BaseIconButton.vue'
import { ref } from 'vue'

const panActive = ref(false)
</script>

# BaseIconButton

Square icon-only button for toolbars and headers. A wrapper around `BaseButton variant="tool"` that requires a `label`, which becomes both the `aria-label` and the tooltip.

<ComponentPreview>
  <BaseIconButton label="Refresh config">
    <i class="bi bi-arrow-clockwise" aria-hidden="true" />
  </BaseIconButton>
  <BaseIconButton label="Pan" :active="panActive" @click="panActive = !panActive">
    <i class="bi bi-hand-index" aria-hidden="true" />
  </BaseIconButton>
  <BaseIconButton label="Refresh config" disabled>
    <i class="bi bi-arrow-clockwise" aria-hidden="true" />
  </BaseIconButton>
</ComponentPreview>

```vue
<BaseIconButton label="Refresh config" @click="refresh">
  <i class="bi bi-arrow-clockwise" aria-hidden="true" />
</BaseIconButton>

<!-- Toggle -->
<BaseIconButton label="Pan" :active="tool === 'pan'" @click="tool = 'pan'">
  <i class="bi bi-hand-index" aria-hidden="true" />
</BaseIconButton>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Accessible name and tooltip. Required |
| `active` | `boolean` | — | Toggle state. Sets `aria-pressed` and the active style. Omit for plain action buttons |

Other attributes (`disabled`, ...) and listeners fall through to the `<button>`.

## Tokens used

Same as [BaseButton](/components/base-button) `tool` variant.
