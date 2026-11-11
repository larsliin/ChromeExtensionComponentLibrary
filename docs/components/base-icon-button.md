<script setup>
import BaseIconButton from '../../src/components/BaseIconButton.vue'
import { ref } from 'vue'

const panActive = ref(false)
</script>

# BaseIconButton

Square icon-only button for toolbars and headers. A wrapper around `BaseButton variant="tool"` that requires a `label`, which becomes both the `aria-label` and the tooltip.

<ComponentPreview>
  <BaseIconButton label="Refresh config">
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
      <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
    </svg>
  </BaseIconButton>
  <BaseIconButton label="Pan" :active="panActive" @click="panActive = !panActive">✋</BaseIconButton>
  <BaseIconButton label="Refresh config" disabled>⟳</BaseIconButton>
</ComponentPreview>

```vue
<BaseIconButton label="Refresh config" @click="refresh">
  <RefreshIcon />
</BaseIconButton>

<!-- Toggle -->
<BaseIconButton label="Pan" :active="tool === 'pan'" @click="tool = 'pan'">
  <PanIcon />
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
