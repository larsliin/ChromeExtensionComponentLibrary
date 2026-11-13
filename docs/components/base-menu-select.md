<script setup>
import BaseMenuSelect from '../../src/components/BaseMenuSelect.vue'
import { ref } from 'vue'

const themes = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'auto', label: 'System' },
]
const icons = { light: 'bi-sun', dark: 'bi-moon', auto: 'bi-circle-half' }
const theme = ref('dark')
</script>

# BaseMenuSelect

Compact dropdown with a custom trigger (typically an icon) and a floating option panel, e.g. a theme switcher in a toolbar. For regular form fields use [BaseSelect](/components/base-select), which shares the same `options` + `v-model` API.

The panel uses `position: fixed`, flips above the trigger when there is no room below, and constrains its width and height to the viewport — important in small extension popups. If the selected option is disabled or no longer exists, opening focuses the first enabled option.

<ComponentPreview>
  <BaseMenuSelect v-model="theme" label="Theme" :options="themes">
    <template #default="{ selected }">
      <i class="bi" :class="icons[selected?.value]" aria-hidden="true" />
    </template>
    <template #option="{ option }">
      <i class="bi" :class="icons[option.value]" aria-hidden="true" />
      {{ option.label }}
    </template>
  </BaseMenuSelect>
  <BaseMenuSelect v-model="theme" label="Theme" :options="themes" />
  <span>Selected: <code>{{ theme }}</code></span>
</ComponentPreview>

```vue
<BaseMenuSelect v-model="theme" label="Theme" :options="themes">
  <!-- Trigger content; defaults to the selected label -->
  <template #default="{ selected }">
    <i class="bi" :class="icons[selected?.value]" aria-hidden="true" />
  </template>
  <!-- Option content; defaults to option.label -->
  <template #option="{ option, selected }">
    <i class="bi" :class="icons[option.value]" aria-hidden="true" /> {{ option.label }}
  </template>
</BaseMenuSelect>
```

## Keyboard

| Key | Action |
|-----|--------|
| `Enter` / `Space` on trigger | Open and focus the selected option |
| `↑` `↓` `←` `→` | Move and select (radio-group behavior), skipping disabled options |
| `Home` / `End` | First / last option |
| `Enter` / `Space` on option | Select and close |
| `Escape` | Close and return focus to the trigger |

Clicking outside or tabbing away also closes the panel.

The options and selected value can change while the panel is open. Focus and panel placement follow the updated data; if every option becomes disabled, the panel closes.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `T extends string` | — | Selected value. Required |
| `options` | `SelectOption<T>[]` | — | `{ value, label, title?, disabled? }`; each option's tooltip falls back to its label |
| `disabled` | `boolean` | `false` | Disables the trigger without changing option states |
| `label` | `string` | — | Accessible name. The trigger announces `"{label}: {selected label}"` |
| `title` | `string` | `label` + selected label | Optional trigger tooltip; falls back to the accessible trigger label |

## Slots

| Slot | Props | Description |
|------|-------|-------------|
| `default` | `{ selected }` | Trigger content |
| `option` | `{ option, selected }` | Content of each option |

## Tokens used

`--color-text`, `--color-text-muted`, `--color-hover`, `--color-panel`, `--color-border`, `--color-accent`, `--color-accent-hover`, `--color-on-accent`, `--color-focus`, `--shadow-floating-panel`, `--radius-button`, `--font-family-base`.
