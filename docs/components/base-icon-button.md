<script setup>
import BaseIconButton from '../../src/components/BaseIconButton.vue'
import { ref } from 'vue'

const panActive = ref(false)
</script>

# BaseIconButton

Square icon-only button with toolbar, primary, and filled secondary variants. Requires a `label` for its `aria-label`; by default it is also the tooltip. The optional `title` prop customizes the tooltip without changing the accessible name. The default `tool` variant preserves the existing toolbar appearance.

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

## Action variants

Use `primary` for a prominent action and `secondary` for a neutral action, such as the buttons in [BaseListItem](/components/base-list-item). Both are 34px squares with 16px icons; the toolbar variant remains 36px with 18px icons.

<ComponentPreview>
  <BaseIconButton variant="primary" label="Open documentation">
    <i class="bi bi-box-arrow-up-right" aria-hidden="true" />
  </BaseIconButton>
  <BaseIconButton variant="secondary" label="Copy link">
    <i class="bi bi-copy" aria-hidden="true" />
  </BaseIconButton>
  <BaseIconButton variant="primary" label="Open documentation" disabled>
    <i class="bi bi-box-arrow-up-right" aria-hidden="true" />
  </BaseIconButton>
  <BaseIconButton variant="secondary" label="Copy link" disabled>
    <i class="bi bi-copy" aria-hidden="true" />
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

<BaseIconButton variant="primary" label="Open documentation" @click="openDocs">
  <i class="bi bi-box-arrow-up-right" aria-hidden="true" />
</BaseIconButton>

<BaseIconButton variant="secondary" label="Copy link" @click="copyLink">
  <i class="bi bi-copy" aria-hidden="true" />
</BaseIconButton>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Accessible name. Required |
| `title` | `string` | `label` | Optional tooltip |
| `active` | `boolean` | — | Toggle state. Sets `aria-pressed` and the active style. Omit for plain action buttons |
| `variant` | `'tool' \| 'primary' \| 'secondary'` | `'tool'` | Toolbar, accent-filled, or neutral-filled appearance |

Other attributes (`disabled`, ...) and listeners fall through to the `<button>`.

## Slots

| Slot | Description |
|------|-------------|
| default | Icon content. Mark decorative icons with `aria-hidden="true"` |

## Tokens used

Uses the corresponding [BaseButton](/components/base-button) tokens, plus the following for the filled secondary variant. This does not change `BaseButton`'s outlined secondary appearance.

- `--color-button-secondary`
- `--color-button-secondary-border`
- `--color-button-secondary-hover`
- `--color-button-secondary-border-hover`
- `--color-active`, `--color-accent`, `--color-text`
