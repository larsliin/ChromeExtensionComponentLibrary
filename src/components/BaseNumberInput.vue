<script setup lang="ts">
    import { useTemplateRef } from 'vue';

    const model = defineModel<number | string>();
    const input = useTemplateRef<HTMLInputElement>('input');

    defineExpose({ focus: () => input.value?.focus() });

    // Keep the raw string while the value is not a number yet (e.g. "-" or ""), so typing isn't interrupted.
    function updateValue(event: Event) {
        const raw = (event.target as HTMLInputElement).value;
        const value = Number.parseFloat(raw);
        model.value = Number.isNaN(value) ? raw : value;
    }
</script>

<template>
    <input ref="input" type="number" class="number-input" :value="model" @input="updateValue" />
</template>

<style scoped>
    .number-input {
        width: 100%;
        min-width: 0;
        min-height: 32px;
        padding: 5px 10px;
        font-family: var(--font-family-base);
        font-size: 12px;
        color: var(--color-text);
        background: var(--color-editor-bg);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-button);
    }

    .number-input:hover:not(:disabled) {
        border-color: var(--color-text-muted);
    }

    .number-input:focus-visible {
        outline: 2px solid var(--color-focus);
        outline-offset: 2px;
    }

    .number-input:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
</style>
