<script setup>
import { shallowRef } from 'vue'
import BaseButton from '../../src/components/BaseButton.vue'
import BaseDialog from '../../src/components/BaseDialog.vue'

const alertOpen = shallowRef(false)
const confirmOpen = shallowRef(false)
const dangerOpen = shallowRef(false)
const result = shallowRef('No action yet.')
</script>

# BaseDialog

A text-only modal for alerts and confirmations. Built on native `<dialog>` and [BaseButton](/components/base-button), with right-aligned, content-width actions that can wrap on narrow extension surfaces.

## Alert

Alert mode shows one **OK** button. It receives initial focus.

<ComponentPreview>
  <BaseButton variant="primary" @click="alertOpen = true">Show alert</BaseButton>
  <BaseDialog
    v-model:open="alertOpen"
    title="Settings saved"
    message="Your preferences are ready to use."
  />
</ComponentPreview>

```vue
<script setup lang="ts">
import { shallowRef } from 'vue'
import { BaseButton, BaseDialog } from 'chrome-extension-component-library'

const open = shallowRef(false)
</script>

<template>
  <BaseButton variant="primary" @click="open = true">Show alert</BaseButton>
  <BaseDialog
    v-model:open="open"
    title="Settings saved"
    message="Your preferences are ready to use."
  />
</template>
```

## Confirmation

Confirmation mode shows **Cancel** followed by **Confirm**. Cancel receives initial focus to avoid accidentally approving an action.

<ComponentPreview>
  <BaseButton variant="primary" @click="confirmOpen = true">Show confirmation</BaseButton>
  <BaseDialog
    v-model:open="confirmOpen"
    mode="confirm"
    title="Apply preferences?"
    message="These preferences will replace your current settings."
    confirm-label="Apply"
    @confirm="result = 'Preferences applied.'"
    @cancel="result = 'No changes made.'"
  />
  <span role="status">{{ result }}</span>
</ComponentPreview>

```vue
<BaseDialog
  v-model:open="open"
  mode="confirm"
  title="Apply preferences?"
  message="These preferences will replace your current settings."
  confirm-label="Apply"
  @confirm="applyPreferences"
  @cancel="handleCancellation"
/>
```

## Destructive confirmation

Set `confirm-variant="danger"` for a red destructive action. Use an explicit action label, such as **Delete**, and explain the consequences in the message.

<ComponentPreview>
  <BaseButton variant="danger" @click="dangerOpen = true">Show destructive confirmation</BaseButton>
  <BaseDialog
    v-model:open="dangerOpen"
    mode="confirm"
    title="Delete saved preferences?"
    message="This permanently removes your saved preferences. This action cannot be undone."
    confirm-label="Delete"
    confirm-variant="danger"
    @confirm="result = 'Deletion confirmed (demo only).'"
    @cancel="result = 'Deletion cancelled.'"
  />
</ComponentPreview>

```vue
<BaseDialog
  v-model:open="open"
  mode="confirm"
  title="Delete saved preferences?"
  message="This permanently removes your saved preferences. This action cannot be undone."
  confirm-label="Delete"
  confirm-variant="danger"
  @confirm="deletePreferences"
/>
```

The danger variant is also available on standalone [BaseButton](/components/base-button#danger) instances.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | Required | Visibility, bound with `v-model:open` |
| `title` | `string` | Required | Visible accessible name; provide meaningful, nonempty text |
| `message` | `string` | Required | Plain-text description; preserves line breaks |
| `mode` | `'alert' \| 'confirm'` | `'alert'` | One acknowledgement action or Cancel plus confirmation |
| `confirmLabel` | `string` | `'OK'` / `'Confirm'` | Acknowledgement label, derived from mode unless provided |
| `cancelLabel` | `string` | `'Cancel'` | Cancellation label in confirmation mode |
| `confirmVariant` | `'primary' \| 'danger'` | `'primary'` | Acknowledgement button style |

Supply localized title, message, and button labels as appropriate. There are no content or action slots: the dialog is intentionally limited to text and its built-in actions.

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:open` | `boolean` | Visibility update for `v-model:open` |
| `confirm` | None | OK/Confirm was activated |
| `cancel` | None | Cancel was activated or Escape was pressed, including in alert mode |

Actions close the dialog immediately before emitting `confirm` or `cancel`. Changing `open` to `false` in the parent closes without emitting either user-action event. Native close events synchronize visibility without confirming.

There is no async/loading workflow: a `confirm` handler does not keep the dialog open while awaiting work. Handle asynchronous progress and errors in the consuming interface.

## Keyboard, focus, and themes

- Escape cancels. Clicking the backdrop does **not** close the dialog.
- Native modal behavior keeps background content inert and keyboard focus within the modal.
- On opening, focus goes to Cancel for confirmations or OK for alerts.
- Closing returns focus to the previously focused element when it is still available, including parent-controlled closure and component unmount.
- The title and message are connected through unique accessible IDs with `role="alertdialog"`.
- Native top-layer rendering avoids clipping by ancestor containers without teleporting outside a themed subtree. Dark/light tokens and local overrides continue to inherit from the dialog's ancestors.
- The dialog is viewport-constrained and scrolls for long content. Action buttons wrap without growing to fill the row.

## Tokens used

`--color-panel`, `--color-text`, `--color-border`, `--color-dialog-backdrop`, `--radius-panel`, `--shadow-floating-panel`, `--font-family-base`, `--font-size-base`, and `--line-height-base`, plus the [BaseButton tokens](/components/base-button#tokens-used).

Danger actions use `--color-danger`, `--color-danger-hover`, `--color-danger-active`, and `--color-on-danger`, separate from error-feedback colors. See [Theming](/guide/theming).
