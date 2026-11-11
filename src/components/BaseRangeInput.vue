<script setup lang="ts">
    import { useTemplateRef } from 'vue';

    const model = defineModel<number>();
    const input = useTemplateRef<HTMLInputElement>('input');

    defineExpose({ focus: () => input.value?.focus() });
</script>

<template>
    <input
        ref="input"
        type="range"
        class="range-input"
        :value="model"
        @input="model = ($event.target as HTMLInputElement).valueAsNumber"
    />
</template>

<style scoped>
    .range-input {
        width: 100%;
        margin: 0;
        padding: 0;
        appearance: none;
        background: transparent;
        border: 0;
        cursor: pointer;
    }

    .range-input::-webkit-slider-runnable-track {
        height: 4px;
        background: var(--color-border);
        border-radius: 2px;
    }

    .range-input::-moz-range-track,
    .range-input::-moz-range-progress {
        height: 4px;
        background: var(--color-border);
        border-radius: 2px;
    }

    .range-input::-webkit-slider-thumb {
        width: 14px;
        height: 14px;
        margin-top: -5px;
        appearance: none;
        background: var(--color-text);
        border: 0;
        border-radius: 50%;
    }

    .range-input::-moz-range-thumb {
        width: 14px;
        height: 14px;
        background: var(--color-text);
        border: 0;
        border-radius: 50%;
    }

    .range-input:hover:not(:disabled)::-webkit-slider-thumb {
        background: var(--color-accent);
    }

    .range-input:hover:not(:disabled)::-moz-range-thumb {
        background: var(--color-accent);
    }

    .range-input:focus-visible {
        outline: 2px solid var(--color-focus);
        outline-offset: 2px;
    }

    .range-input:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>
