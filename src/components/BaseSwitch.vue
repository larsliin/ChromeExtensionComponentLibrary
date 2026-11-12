<script setup lang="ts">
import { useId } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  id?: string
  disabled?: boolean
  /** Text label; use the default slot for rich content. */
  label?: string
}>()

const model = defineModel<boolean>({ required: true })
const generatedId = useId()
</script>

<template>
  <label class="switch-row" :class="{ 'switch-row--disabled': disabled }">
    <input
      v-bind="$attrs"
      :id="props.id ?? generatedId"
      v-model="model"
      type="checkbox"
      role="switch"
      class="switch-input"
      :disabled="disabled"
    />
    <span class="switch-track" aria-hidden="true">
      <span class="switch-thumb"></span>
    </span>
    <span v-if="label || $slots.default" class="switch-label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style scoped>
.switch-row {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-family-base);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text);
  cursor: pointer;
}

.switch-input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.switch-track {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  width: 40px;
  height: 24px;
  padding: 3px;
  border: 1px solid var(--color-button-secondary-border);
  border-radius: 999px;
  background-color: var(--color-button-secondary);
  transition: background-color 150ms ease, border-color 150ms ease;
}

.switch-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--color-text);
  transition: transform 150ms ease, background-color 150ms ease;
}

.switch-input:checked + .switch-track {
  border-color: var(--color-accent);
  background-color: var(--color-accent);
}

.switch-input:checked + .switch-track .switch-thumb {
  background-color: var(--color-on-accent);
  transform: translateX(16px);
}

.switch-input:focus-visible + .switch-track {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
}

.switch-label {
  cursor: pointer;
}

.switch-row--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.switch-row--disabled .switch-track,
.switch-row--disabled .switch-label {
  cursor: not-allowed;
}

@media (prefers-reduced-motion: reduce) {
  .switch-track,
  .switch-thumb {
    transition: none;
  }
}
</style>
