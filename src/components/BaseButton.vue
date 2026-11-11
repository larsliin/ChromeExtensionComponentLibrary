<script setup lang="ts">
    import { useTemplateRef } from 'vue';

    withDefaults(defineProps<{
        type?: 'button' | 'submit' | 'reset';
        variant?: 'primary' | 'secondary' | 'tool' | 'bare';
        /** Ignored by the `tool` and `bare` variants. */
        size?: 'small' | 'medium';
    }>(), {
        type: 'button',
        size: 'medium',
    });

    const button = useTemplateRef<HTMLButtonElement>('button');

    defineExpose({
        focus: () => button.value?.focus(),
        getBoundingClientRect: () => button.value?.getBoundingClientRect(),
    });
</script>

<template>
    <button
        ref="button"
        :type="type"
        :class="[
            'base-button',
            variant && `${variant}-button`,
            variant !== 'tool' && variant !== 'bare' && `size-${size}`,
        ]"
    >
        <slot />
    </button>
</template>

<style scoped>
.base-button {
    font-family: var(--font-family-base);
    line-height: var(--line-height-base);
    color: var(--color-text);
    border-radius: var(--radius-button);
    cursor: pointer;
}

.base-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.base-button:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
}

/* Sizes */

.size-medium {
    padding: 6px 12px;
    font-size: 14px;
}

.size-small {
    min-height: 32px;
    padding: 5px 10px;
    font-size: 11px;
}

/* Primary */

.primary-button {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--color-on-accent);
    font-weight: 500;
    background: var(--color-accent);
    border: 1px solid var(--color-accent);
}

.primary-button:hover:not(:disabled) {
    background: var(--color-accent-hover);
    border-color: var(--color-accent-hover);
}

.primary-button:active:not(:disabled) {
    background: var(--color-accent-active);
    border-color: var(--color-accent-active);
}

/* Secondary */

.secondary-button {
    color: var(--color-accent);
    font-weight: 700;
    background: transparent;
    border: 1px solid var(--color-border);
}

.secondary-button:hover:not(:disabled) {
    background: var(--color-hover);
}

.secondary-button:active:not(:disabled) {
    background: var(--color-editor-bg);
}

/* Tool */

.tool-button {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    padding: 0;
    font-size: 18px;
    background: transparent;
    border: 1px solid transparent;
}

.tool-button:hover:not(:disabled) {
    background-color: var(--color-hover);
}

.tool-button.is-active {
    background-color: var(--color-active);
    border-color: var(--color-accent);
}

.tool-button:focus-visible {
    outline-offset: 1px;
}

.tool-button:disabled {
    opacity: 0.4;
}

/* Bare — unstyled shell for custom clickable content (rows, swatches, cards). */

:where(.bare-button) {
    padding: 0;
    text-align: inherit;
    background: transparent;
    border: 0;
}
</style>
