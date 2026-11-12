<script setup>
import BaseSwitch from '../../src/components/BaseSwitch.vue'
import { ref } from 'vue'

const enabled = ref(true)
</script>

# BaseSwitch

Compact on/off control backed by a native checkbox. Use a boolean `v-model`; the label and default slot are optional. When there is no visible label, provide an accessible name with `aria-label`.

<ComponentPreview>
  <BaseSwitch v-model="enabled" label="Enable notifications" />
  <BaseSwitch v-model="enabled">Sync <strong>settings</strong></BaseSwitch>
  <BaseSwitch v-model="enabled" label="Disabled" disabled />
  <BaseSwitch v-model="enabled" aria-label="Enable sync" />
</ComponentPreview>

```vue
<BaseSwitch v-model="syncEnabled" label="Enable sync" />

<BaseSwitch v-model="syncEnabled" aria-label="Enable sync">
  Enable <strong>sync</strong>
</BaseSwitch>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `boolean` | — | Checked state; required |
| `label` | `string` | — | Visible label text. Use the default slot for rich content |
| `id` | `string` | auto | Input id; generated when omitted |
| `disabled` | `boolean` | `false` | Disables the input |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Optional rich visible label content; takes precedence over `label` |

## Native attributes

Unrecognized attributes and listeners, including `aria-label` and `aria-describedby`, are forwarded to the native checkbox input.

## Tokens used

`--color-text`, `--color-button-secondary`, `--color-button-secondary-border`, `--color-accent`, `--color-on-accent`, `--color-focus`, `--font-family-base`.
