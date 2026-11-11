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

The panel uses `position: fixed`, flips above the trigger when there is no room below, and stays inside the viewport — important in small extension popups.

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

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `T extends string` | — | Selected value. Required |
| `options` | `SelectOption<T>[]` | — | `{ value, label, disabled? }` |
| `label` | `string` | — | Accessible name. The trigger announces `"{label}: {selected label}"` |

## Slots

| Slot | Props | Description |
|------|-------|-------------|
| `default` | `{ selected }` | Trigger content |
| `option` | `{ option, selected }` | Content of each option |

## Tokens used

`--color-text`, `--color-text-muted`, `--color-hover`, `--color-panel`, `--color-border`, `--color-accent`, `--color-accent-hover`, `--color-on-accent`, `--color-focus`, `--shadow-floating-panel`, `--radius-button`, `--font-family-base`.
