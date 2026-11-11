<script setup lang="ts" generic="T extends string">
    import type { SelectOption } from '../types';

    defineOptions({ inheritAttrs: false });

    defineProps<{
        options: readonly SelectOption<T>[];
    }>();

    const model = defineModel<T>({ required: true });
</script>

<template>
    <div class="select-wrapper">
        <select v-bind="$attrs" v-model="model" class="base-select">
            <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
                :disabled="option.disabled"
            >
                {{ option.label }}
            </option>
        </select>
        <svg class="select-chevron" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
        </svg>
    </div>
</template>

<style scoped>
    .select-wrapper {
        position: relative;
        min-width: 0;
    }

    .base-select {
        width: 100%;
        min-height: 32px;
        appearance: none;
        padding: 5px 30px 5px 10px;
        font-family: var(--font-family-base);
        font-size: 12px;
        color: var(--color-text);
        background-color: var(--color-editor-bg);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-button);
        cursor: pointer;
    }

    .base-select:hover:not(:disabled) {
        border-color: var(--color-text-muted);
    }

    .base-select:focus-visible {
        outline: 2px solid var(--color-focus);
        outline-offset: 2px;
    }

    .base-select:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .select-chevron {
        position: absolute;
        top: 50%;
        right: 10px;
        width: 12px;
        height: 12px;
        color: var(--color-text-muted);
        transform: translateY(-50%);
        pointer-events: none;
    }
</style>
