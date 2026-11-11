<script setup>
import BaseCheckbox from '../../src/components/BaseCheckbox.vue'
import { ref } from 'vue'

const checked = ref(true)
</script>

# BaseCheckbox

Native checkbox with an optional label. The label is wired to the input automatically.

<ComponentPreview>
  <BaseCheckbox v-model="checked" label="Include localhost config" />
  <BaseCheckbox v-model="checked">Include <strong>localhost</strong> config</BaseCheckbox>
  <BaseCheckbox v-model="checked" label="Disabled" disabled />
  <BaseCheckbox v-model="checked" aria-label="Unlabeled" />
</ComponentPreview>

```vue
<BaseCheckbox v-model="injectLocalhost" label="Include localhost config" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `boolean` | — | Checked state. Required |
| `label` | `string` | — | Label text. Use the default slot for rich content |
| `id` | `string` | auto | Input id; generated when omitted |
| `disabled` | `boolean` | `false` | Disables the input and dims the label |

## Tokens used

`--color-accent`, `--color-text`, `--color-focus`, `--font-family-base`.
