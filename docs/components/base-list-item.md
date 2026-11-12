<script setup>
import { ref } from 'vue'
import BaseListItem from '../../src/components/BaseListItem.vue'
import BaseIconButton from '../../src/components/BaseIconButton.vue'

const lastAction = ref('No action selected.')
</script>

# BaseListItem

A reusable list row that owns a decorative [BaseProductIcon](/components/base-product-icon) badge. The default slot owns the rest of the row: title, tagline, buttons, or any other content. There is no application-specific navigation or clipboard logic.

## Preview

<ComponentPreview>
  <ul class="list-item-demo">
    <BaseListItem>
      <template #icon>
        <i class="bi bi-book-half" />
      </template>
      <div class="list-item-copy">
        <h2>Component documentation</h2>
        <p>https://example.com/documentation</p>
      </div>
      <div class="list-item-actions">
        <BaseIconButton variant="primary" label="Open component documentation" @click="lastAction = 'Open documentation requested.'">
          <i class="bi bi-box-arrow-up-right" aria-hidden="true" />
        </BaseIconButton>
        <BaseIconButton variant="secondary" label="Copy documentation link" @click="lastAction = 'Copy link requested.'">
          <i class="bi bi-copy" aria-hidden="true" />
        </BaseIconButton>
      </div>
    </BaseListItem>
    <BaseListItem>
      <template #icon>
        <i class="bi bi-folder" />
      </template>
      <div class="list-item-copy">
        <h2>Additional actions</h2>
        <p>The default slot has no fixed button-count limit.</p>
      </div>
      <div class="list-item-actions">
        <BaseIconButton
          v-for="action in ['Edit', 'Share', 'Archive', 'Delete']"
          :key="action"
          variant="secondary"
          :label="`${action} item`"
          @click="lastAction = `${action} requested.`"
        >
          <i :class="['bi', { Edit: 'bi-pencil', Share: 'bi-share', Archive: 'bi-archive', Delete: 'bi-trash' }[action]]" aria-hidden="true" />
        </BaseIconButton>
      </div>
    </BaseListItem>
    <BaseListItem icon-type="product">
      <span class="list-item-label">A simple row with the default product icon</span>
    </BaseListItem>
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
    <BaseListItem>
      <template #icon>
        <i class="bi bi-book-half" />
      </template>
      <div class="documentation-info">
        <h2>{{ title }}</h2>
        <p :title="url">{{ url }}</p>
      </div>
      <div class="documentation-actions">
        <BaseIconButton variant="primary" :label="`Open ${title}`" @click="emit('open', url)">
          <i class="bi bi-box-arrow-up-right" aria-hidden="true" />
        </BaseIconButton>
        <BaseIconButton variant="secondary" :label="`Copy ${title} link`" @click="emit('copy', url)">
          <i class="bi bi-copy" aria-hidden="true" />
        </BaseIconButton>
      </div>
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

.documentation-info {
  flex: 1 1 140px;
  min-width: 0;
}

.documentation-info h2 {
  overflow: hidden;
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.35;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.documentation-info p {
  overflow: hidden;
  margin: 3px 0 0;
  color: var(--color-text-muted);
  font-size: 11px;
  line-height: var(--line-height-base);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.documentation-actions {
  display: flex;
  flex-wrap: nowrap;
  flex: 0 0 auto;
  align-items: center;
  gap: 7px;
  margin-left: auto;
  max-width: 100%;
}
</style>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `iconType` | `'product' \| 'link-mark'` | `'link-mark'` | Type of the built-in 38px product badge |

## Slots

| Slot | Description |
|------|-------------|
| default | Row content beside the icon. Consumers own the markup and styles for titles, taglines, and action buttons |
| `icon` | Optional icon content forwarded into BaseProductIcon, not a replacement badge. When omitted, the default product glyph is shown. The badge is decorative |

### Migration

The `headline` and `description` props and the `actions` slot have been removed. Move their content into the default slot and style it in the consumer. Pass only the icon glyph through `#icon`; do not wrap it in another BaseProductIcon.

## Semantics and events

The root is a native `li`: place it inside a `ul` or `ol`. The row is not itself clickable or focusable, avoiding nested interactive controls. Each action needs its own accessible label and native keyboard behavior. Default slot content is rendered directly beside the badge without imposed content wrappers.

The row stays on one flex line with shared 8px vertical and 12px horizontal padding around the icon and slot content. Keep text containers shrinkable with `min-width: 0` and truncate titles and taglines with an ellipsis. Keep button groups on one line using `flex-wrap: nowrap` and `flex: 0 0 auto`.

There are no custom events. Attributes and native listeners fall through to the `li`; attach action listeners directly to the slotted buttons.

## Tokens used

- `--color-panel`, `--color-panel-raised`, `--color-border`, `--color-focus`
- `--color-bg`, `--color-accent`, `--color-on-accent`, `--color-text`
- `--shadow-list-item`
- `--font-family-base`

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

.list-item-copy {
  flex: 1 1 140px;
  min-width: 0;
}

.list-item-copy h2 {
  overflow: hidden;
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.35;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.list-item-copy p {
  overflow: hidden;
  margin: 3px 0 0;
  color: var(--color-text-muted);
  font-size: 11px;
  line-height: var(--line-height-base);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.list-item-actions {
  display: flex;
  flex-wrap: nowrap;
  flex: 0 0 auto;
  align-items: center;
  gap: 7px;
  max-width: 100%;
  margin-left: auto;
}

.list-item-label {
  overflow: hidden;
  min-width: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
