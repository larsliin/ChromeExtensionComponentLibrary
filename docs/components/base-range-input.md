<script setup>
import BaseRangeInput from '../../src/components/BaseRangeInput.vue'
import { ref } from 'vue'

const brightness = ref(20)
</script>

# BaseRangeInput

Styled native `<input type="range">` slider.

<ComponentPreview>
  <BaseRangeInput v-model="brightness" min="-100" max="100" aria-label="Brightness" style="width: 200px" />
  <span>Value: <code>{{ brightness }}</code></span>
  <BaseRangeInput v-model="brightness" min="-100" max="100" aria-label="Brightness" disabled style="width: 200px" />
</ComponentPreview>

```vue
<BaseRangeInput v-model="brightness" min="-100" max="100" aria-label="Brightness" />
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `v-model` | `number` | Current value |

Native attributes (`min`, `max`, `step`, `disabled`, `aria-label`, ...) fall through to the `<input>`.

## Exposed methods

| Method | Description |
|--------|-------------|
| `focus()` | Focuses the slider |

## Tokens used

`--color-border`, `--color-text`, `--color-accent`, `--color-focus`.
