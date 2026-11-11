<script setup lang="ts">
    import { computed } from 'vue';

    const props = withDefaults(defineProps<{
        variant?: 'error' | 'warning' | 'info';
        /** Nothing is rendered when empty. */
        message: string;
        /** Shows a close button that emits `dismiss`. */
        dismissible?: boolean;
    }>(), {
        variant: 'error',
    });

    defineEmits<{
        dismiss: [];
    }>();

    const role = computed(() => (props.variant === 'error' ? 'alert' : 'status'));
</script>

<template>
    <div v-if="message" class="alert" :class="variant" :role="role">
        <i
            class="alert-icon bi"
            :class="variant === 'info' ? 'bi-info-circle' : 'bi-exclamation-triangle'"
            aria-hidden="true"
        />
        <p class="message">{{ message }}</p>
        <button
            v-if="dismissible"
            type="button"
            class="dismiss"
            aria-label="Dismiss"
            title="Dismiss"
            @click="$emit('dismiss')"
        >
            <i class="bi bi-x" aria-hidden="true" />
        </button>
    </div>
</template>

<style scoped>
    .alert {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 12px;
        font-family: var(--font-family-base);
        font-size: 14px;
        line-height: 1.4;
        word-break: break-word;
        border-radius: var(--radius-button);
    }

    .alert-icon {
        display: grid;
        flex-shrink: 0;
        place-items: center;
        font-size: 18px;
        line-height: 1;
    }

    .message {
        flex: 1;
        margin: 0;
        font-size: inherit;
        line-height: inherit;
    }

    .dismiss {
        display: grid;
        flex-shrink: 0;
        place-items: center;
        width: 22px;
        height: 22px;
        padding: 0;
        color: inherit;
        background: transparent;
        border: 0;
        border-radius: var(--radius-button);
        cursor: pointer;
        opacity: 0.8;
    }

    .dismiss:hover {
        opacity: 1;
    }

    .dismiss:focus-visible {
        outline: 2px solid var(--color-focus);
        outline-offset: 1px;
    }

    .dismiss .bi {
        font-size: 22px;
        line-height: 1;
    }

    .alert.error {
        color: var(--color-error);
        background: var(--color-error-bg);
        border: 1px solid var(--color-error-border);
    }

    .alert.warning {
        color: var(--color-warning);
        background: var(--color-warning-bg);
        border: 1px solid var(--color-warning-border);
    }

    .alert.info {
        color: var(--color-info);
        background: var(--color-info-bg);
        border: 1px solid var(--color-info-border);
    }
</style>
