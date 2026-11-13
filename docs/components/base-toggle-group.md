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

Labeled, data-driven icon actions for compact toolbars. An action with `subActions` is rendered as a split button: its main button emits the parent action, while the adjacent chevron opens a radio-style submenu. Actions without subactions render as a single button. Set `icon` to a Bootstrap Icons class suffix such as `bi-crop`; the component adds the base `bi` class. Icons are rendered safely as classes, not HTML, and the component has no caller slots.

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

`action` emits the action ID by itself for a main action, or `(subActionId, parentActionId)` for a submenu choice. Active state is controlled by the input data: set `active` on the parent for its main toggle and on the selected subaction for the radio option. Events request a change; they do not mutate the provided actions. A disabled parent disables both parts, while disabled subactions disable only their options and disable the submenu trigger when all are disabled.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Accessible name for the action group |
| `actions` | `readonly BaseToggleGroupAction[]` | Ordered action definitions (`id`, `label`, `icon`, optional `title`, `active`, `disabled`, and `subActions`) |

`BaseToggleGroupAction` and `BaseToggleGroupSubAction` are exported types. Each uses `id`, `label`, and a Bootstrap icon class suffix. Both support an optional `title` tooltip, falling back to `label`; `active` and `disabled` are controlled by the caller. Subaction titles appear on submenu options. The split trigger has an options tooltip and an accessible name that includes the current selection.

## Keyboard

Submenus follow radio-group keyboard behavior: arrows wrap through enabled options and select them, `Home`/`End` select the first/last enabled option, `Enter`/`Space` selects and closes, and `Escape` closes and restores focus to the submenu trigger. Clicking outside or moving focus away closes without moving focus.

## Tokens used

Uses [BaseIconButton](/components/base-icon-button) and [BaseMenuSelect](/components/base-menu-select) styling tokens.
