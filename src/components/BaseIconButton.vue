<script setup lang="ts">
    import BaseButton from './BaseButton.vue';

    withDefaults(defineProps<{
        /** Accessible name; also used as the tooltip. Required because the button has no visible text. */
        label: string;
        /** Optional tooltip, falling back to the accessible label. */
        title?: string;
        /** Toggle state. Leave undefined for plain action buttons so `aria-pressed` is omitted. */
        active?: boolean;
        variant?: 'tool' | 'primary' | 'secondary';
    }>(), {
        active: undefined,
        variant: 'tool',
    });
</script>

<template>
    <BaseButton
        :variant="variant"
        :class="{ 'is-active': active, 'action-icon-button': variant !== 'tool' }"
        :aria-label="label"
        :title="title || label"
        :aria-pressed="active"
    >
        <slot />
    </BaseButton>
</template>

<style scoped>
.action-icon-button {
    display: grid;
    flex: 0 0 auto;
    place-items: center;
    box-sizing: border-box;
    width: 34px;
    height: 34px;
    padding: 0;
    font-size: 16px;
}

.action-icon-button :deep(svg) {
    width: 16px;
    height: 16px;
}

.action-icon-button.primary-button.is-active:not(:disabled) {
    background: var(--color-accent-active);
    border-color: var(--color-accent-active);
}

.action-icon-button.secondary-button {
    color: var(--color-text);
    background: var(--color-button-secondary);
    border-color: var(--color-button-secondary-border);
}

.action-icon-button.secondary-button:hover:not(:disabled) {
    background: var(--color-button-secondary-hover);
    border-color: var(--color-button-secondary-border-hover);
}

.action-icon-button.secondary-button:active:not(:disabled),
.action-icon-button.secondary-button.is-active:not(:disabled) {
    background: var(--color-active);
    border-color: var(--color-accent);
}
</style>
