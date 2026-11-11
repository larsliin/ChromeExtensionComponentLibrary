<script setup lang="ts">
    import { useId } from 'vue';

    const props = defineProps<{
        id?: string;
        disabled?: boolean;
        /** Text label; use the default slot for rich content. */
        label?: string;
    }>();

    const model = defineModel<boolean>({ required: true });

    const fallbackId = useId();
</script>

<template>
    <span class="checkbox-row" :class="{ disabled }">
        <input
            :id="props.id ?? fallbackId"
            v-model="model"
            type="checkbox"
            class="base-checkbox"
            :disabled="disabled"
        />
        <label v-if="label || $slots.default" :for="props.id ?? fallbackId">
            <slot>{{ label }}</slot>
        </label>
    </span>
</template>

<style scoped>
    .checkbox-row {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-family: var(--font-family-base);
        font-size: 13px;
        font-weight: 500;
        color: var(--color-text);
    }

    .checkbox-row label {
        cursor: pointer;
    }

    .base-checkbox {
        width: 16px;
        height: 16px;
        margin: 0;
        accent-color: var(--color-accent);
        cursor: pointer;
    }

    .base-checkbox:focus-visible {
        outline: 2px solid var(--color-focus);
        outline-offset: 1px;
    }

    .disabled {
        opacity: 0.6;
    }

    .disabled label,
    .disabled .base-checkbox {
        cursor: not-allowed;
    }
</style>
