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
                :title="option.title || option.label"
                :disabled="option.disabled"
            >
                {{ option.label }}
            </option>
        </select>
    </div>
</template>

<style scoped>
    .select-wrapper {
        min-width: 0;
    }

    .base-select {
        width: 100%;
        min-height: 32px;
        padding: 5px 14px 5px 10px;
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
        background-color: var(--color-hover);
    }

    .base-select:focus-visible {
        outline: 2px solid var(--color-focus);
        outline-offset: 2px;
    }

    .base-select:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    @supports (appearance: base-select) {
        .base-select,
        .base-select::picker(select) {
            appearance: base-select;
        }

        .base-select:open {
            border-color: var(--color-focus);
        }

        .base-select::picker(select) {
            margin-block-start: 4px;
            padding: 4px;
            color: var(--color-text);
            background-color: var(--color-panel);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-button);
            box-shadow: var(--shadow-floating-panel);
        }

        .base-select::picker-icon {
            translate: 4px 0;
        }

        .base-select option {
            padding: 6px 8px;
            border-radius: var(--radius-button);
        }

        .base-select option + option {
            margin-block-start: 4px;
        }

        .base-select option:hover,
        .base-select option:focus {
            background-color: var(--color-hover);
        }

        .base-select option:checked {
            background-color: var(--color-active);
            font-weight: 600;
        }

        .base-select option::checkmark {
            display: none;
        }

        .base-select option:disabled {
            color: var(--color-text-muted);
        }
    }
</style>
