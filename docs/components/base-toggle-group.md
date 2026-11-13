<script setup>
import BaseToggleGroup from '../../src/components/BaseToggleGroup.vue'
import { computed, ref } from 'vue'

const activeTool = ref('crop')
const activeCropMode = ref('rectangle')

const actions = computed(() => [
  {
    id: 'crop',
    label: 'Crop',
    title: 'Crop the image',
    icon: 'bi-crop',
    active: activeTool.value === 'crop',
    subActions: [
      { id: 'rectangle', label: 'Rectangle crop', title: 'Crop to a rectangle', icon: 'bi-crop', active: activeCropMode.value === 'rectangle' },
      { id: 'circle', label: 'Circle crop', icon: 'bi-circle', active: activeCropMode.value === 'circle' },
      { id: 'freeform', label: 'Freeform crop', icon: 'bi-vector-pen', active: activeCropMode.value === 'freeform' },
    ],
  },
  { id: 'rotate', label: 'Rotate', icon: 'bi-arrow-clockwise', active: activeTool.value === 'rotate' },
])

function handleAction(id, parentId) {
  if (parentId !== undefined) {
    activeTool.value = parentId
    activeCropMode.value = id
  }
  else activeTool.value = id
}
</script>

# BaseToggleGroup

Compact, data-driven icon toolbar. Actions without `subActions` render as toggle buttons (`aria-pressed` follows `active`; omit `active` for plain buttons). An action with `subActions` renders as a single icon trigger showing the action's `icon`; clicking it opens a fold-out radio menu listing each subaction's icon and label. Set `icon` to a Bootstrap Icons class suffix such as `bi-crop`; the component adds the base `bi` class. Icons are rendered safely as classes, not HTML, and the component has no caller slots.

The group renders as a raised pill (32px tall) with 24px muted icon buttons, using the `--color-panel-raised`, `--color-border`, `--color-text-muted`, `--color-hover`, `--color-active` and `--color-focus` tokens.

<ComponentPreview>
  <BaseToggleGroup label="Image tools" :actions="actions" @action="handleAction" />
</ComponentPreview>

```vue
<script setup lang="ts">
import { BaseToggleGroup } from 'chrome-extension-component-library'
import type { BaseToggleGroupAction } from 'chrome-extension-component-library'
import { computed, ref } from 'vue'

const activeTool = ref('crop')
const activeCropMode = ref('rectangle')

const actions = computed<readonly BaseToggleGroupAction[]>(() => [
  {
    id: 'crop',
    label: 'Crop',
    icon: 'bi-crop',
    active: activeTool.value === 'crop',
    subActions: [
      { id: 'rectangle', label: 'Rectangle crop', icon: 'bi-crop', active: activeCropMode.value === 'rectangle' },
      { id: 'circle', label: 'Circle crop', icon: 'bi-circle', active: activeCropMode.value === 'circle' },
    ],
  },
  { id: 'rotate', label: 'Rotate', icon: 'bi-arrow-clockwise', active: activeTool.value === 'rotate' },
])

function handleAction(actionId: string, parentId?: string) {
  if (parentId === 'crop') {
    activeTool.value = parentId
    activeCropMode.value = actionId
  }
  else activeTool.value = actionId
}
</script>

<template>
  <BaseToggleGroup
    label="Image tools"
    :actions="actions"
    @action="(actionId, parentId) => handleAction(actionId, parentId)"
  />
</template>
```

`action` emits the action ID by itself for a toggle button, or `(subActionId, parentActionId)` for a fold-out menu choice. State is controlled by the input data: set `active` on toggle actions and on the selected subaction (`active` on a parent with subactions is ignored). Events request a change; they do not mutate the provided actions. A disabled parent disables its trigger; disabled subactions disable only their options, and the trigger is disabled when all are disabled.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Accessible name for the action group |
| `actions` | `readonly BaseToggleGroupAction[]` | Ordered action definitions (`id`, `label`, `icon`, optional `title`, `active`, `disabled`, and `subActions`) |

`BaseToggleGroupAction` and `BaseToggleGroupSubAction` are exported types. Each uses `id`, `label`, and a Bootstrap icon class suffix. Both support an optional `title` tooltip; subaction titles appear on menu options. The fold-out trigger's accessible name includes the current selection (e.g. "Crop: Rectangle crop") and is also its tooltip unless `title` is set.

## Keyboard

Fold-out menus follow radio-group keyboard behavior: arrows wrap through enabled options and select them, `Home`/`End` select the first/last enabled option, `Enter`/`Space` selects and closes, and `Escape` closes and restores focus to the trigger. Clicking outside or moving focus away closes without moving focus.

## Tokens used

Uses [BaseIconButton](/components/base-icon-button) and [BaseMenuSelect](/components/base-menu-select) styling tokens.
