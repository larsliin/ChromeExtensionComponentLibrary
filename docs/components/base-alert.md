<script setup>
import BaseAlert from '../../src/components/BaseAlert.vue'
import { ref } from 'vue'

const message = ref('Could not load the config file.')
</script>

# BaseAlert

Inline status message for errors, warnings and information. Renders nothing when `message` is empty, so it can be bound directly to an error ref.

The 18px icon, 14px message and optional dismiss button are vertically centered, including when the message wraps onto multiple lines. The message uses a 1.4 line height.

## Variants

<ComponentPreview>
  <div style="display: grid; gap: 8px; width: 100%">
    <BaseAlert variant="error" message="Could not parse the config file." />
    <BaseAlert variant="warning" message="Color picking requires a recent desktop version of Chrome." />
    <BaseAlert variant="info" message="No config has been downloaded yet." />
  </div>
</ComponentPreview>

```vue
<BaseAlert :message="errorMessage" />
<BaseAlert variant="warning" message="Color picking requires a recent desktop version of Chrome." />
```

## Dismissible

<ComponentPreview>
  <div style="width: 100%">
    <BaseAlert :message="message" dismissible @dismiss="message = ''" />
    <button v-if="!message" type="button" @click="message = 'Could not load the config file.'">Show again</button>
  </div>
</ComponentPreview>

```vue
<BaseAlert :message="error" dismissible @dismiss="error = ''" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `string` | — | Text to show. Nothing renders when empty |
| `variant` | `'error' \| 'warning' \| 'info'` | `'error'` | Visual style and icon |
| `dismissible` | `boolean` | `false` | Shows a close button |

`error` alerts use `role="alert"`; the others use `role="status"`.

## Events

| Event | Description |
|-------|-------------|
| `dismiss` | Close button clicked. Clear `message` to hide the alert |

## Tokens used

`--color-error`, `--color-error-bg`, `--color-error-border`, `--color-warning`, `--color-warning-bg`, `--color-warning-border`, `--color-info`, `--color-info-bg`, `--color-info-border`, `--color-focus`, `--radius-button`, `--font-family-base`.
