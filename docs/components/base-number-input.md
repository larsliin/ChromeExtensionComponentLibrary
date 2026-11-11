<script setup>
import BaseNumberInput from '../../src/components/BaseNumberInput.vue'
import { ref } from 'vue'

const width = ref(1280)
</script>

# BaseNumberInput

Styled native `<input type="number">`.

<ComponentPreview>
  <BaseNumberInput v-model="width" min="1" aria-label="Width" style="width: 120px" />
  <span>Value: <code>{{ JSON.stringify(width) }}</code></span>
  <BaseNumberInput v-model="width" aria-label="Width" disabled style="width: 120px" />
</ComponentPreview>

```vue
<BaseNumberInput v-model="width" min="1" max="8000" aria-label="Width" />
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `v-model` | `number \| string` | A number once the input parses; the raw string while it doesn't (e.g. empty or `-`), so typing isn't interrupted. Validate before use |

Native attributes (`min`, `max`, `step`, `disabled`, `aria-label`, ...) fall through to the `<input>`.

## Exposed methods

| Method | Description |
|--------|-------------|
| `focus()` | Focuses the input |

## Tokens used

`--color-text`, `--color-text-muted`, `--color-editor-bg`, `--color-border`, `--color-focus`, `--radius-button`, `--font-family-base`.
