<script setup>
import { ref } from 'vue'
import BaseListItem from '../../src/components/BaseListItem.vue'
import BaseIconButton from '../../src/components/BaseIconButton.vue'

const lastAction = ref('No action selected.')
</script>

# BaseListItem

A reusable list row with a decorative icon badge, headline, optional description, and any number of action buttons. Inspired by the documentation link rows in CatalystDocumentationShortcuts, without application-specific navigation or clipboard logic.

## Preview

<ComponentPreview>
  <ul class="list-item-demo">
    <BaseListItem headline="Component documentation" description="https://example.com/documentation">
      <template #icon>
        <i class="bi bi-book-half" />
      </template>
      <template #actions>
        <BaseIconButton variant="primary" label="Open component documentation" @click="lastAction = 'Open documentation requested.'">
          <i class="bi bi-box-arrow-up-right" aria-hidden="true" />
        </BaseIconButton>
        <BaseIconButton variant="secondary" label="Copy documentation link" @click="lastAction = 'Copy link requested.'">
          <i class="bi bi-copy" aria-hidden="true" />
        </BaseIconButton>
      </template>
    </BaseListItem>
    <BaseListItem headline="Additional actions" description="The actions slot has no fixed button-count limit.">
      <template #icon>
        <i class="bi bi-folder" />
      </template>
      <template #actions>
        <BaseIconButton
          v-for="action in ['Edit', 'Share', 'Archive', 'Delete']"
          :key="action"
          variant="secondary"
          :label="`${action} item`"
          @click="lastAction = `${action} requested.`"
        >
          <i :class="['bi', { Edit: 'bi-pencil', Share: 'bi-share', Archive: 'bi-archive', Delete: 'bi-trash' }[action]]" aria-hidden="true" />
        </BaseIconButton>
      </template>
    </BaseListItem>
    <BaseListItem headline="A simple headline without an icon or actions" />
  </ul>
  <p role="status">{{ lastAction }}</p>
</ComponentPreview>

The preview reports action requests only. Consumers supply their own navigation and clipboard handlers.

## Usage

```vue
<script setup lang="ts">
import { BaseIconButton, BaseListItem } from 'chrome-extension-component-library'

defineProps<{ title: string; url: string }>()
const emit = defineEmits<{
  open: [url: string]
  copy: [url: string]
}>()
</script>

<template>
  <ul class="documentation-list">
    <BaseListItem :headline="title" :description="url">
      <template #icon>
        <i class="bi bi-book-half" />
      </template>
      <template #actions>
        <BaseIconButton variant="primary" :label="`Open ${title}`" @click="emit('open', url)">
          <i class="bi bi-box-arrow-up-right" aria-hidden="true" />
        </BaseIconButton>
        <BaseIconButton variant="secondary" :label="`Copy ${title} link`" @click="emit('copy', url)">
          <i class="bi bi-copy" aria-hidden="true" />
        </BaseIconButton>
      </template>
    </BaseListItem>
  </ul>
</template>

<style scoped>
.documentation-list {
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `headline` | `string` | — | Required headline, rendered as an `h2` |
| `description` | `string` | — | Optional secondary text, truncated with an ellipsis and exposed in full through `title` |

## Slots

| Slot | Description |
|------|-------------|
| `icon` | Optional decorative icon inside a 38px badge; SVGs and icon fonts are sized to 20px. The badge is hidden from assistive technology |
| `actions` | Optional actions, typically any number of [BaseIconButton](/components/base-icon-button) instances. Actions wrap on narrow surfaces |

## Semantics and events

The root is a native `li`: place it inside a `ul` or `ol`. The row is not itself clickable or focusable, avoiding nested interactive controls. Each action needs its own accessible label and native keyboard behavior. Omitted slots do not render empty wrappers.

There are no custom events. Attributes and native listeners fall through to the `li`; attach action listeners directly to the slotted buttons.

## Tokens used

- `--color-panel`, `--color-panel-raised`, `--color-border`, `--color-focus`
- `--color-bg`, `--color-accent`, `--color-text`, `--color-text-muted`
- `--shadow-list-item`
- `--font-family-base`, `--line-height-base`

All colors support the dark default and `[data-theme='light']`.

<style scoped>
.list-item-demo {
  display: grid;
  gap: 8px;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
