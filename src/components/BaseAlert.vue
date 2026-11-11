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
        <span class="alert-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
                <path
                    v-if="variant === 'info'"
                    d="M12 16v-4m0-4h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    v-else
                    d="M12 8v5m0 3h.01M10.3 3.8 2.9 17.1A2 2 0 0 0 4.6 20h14.8a2 2 0 0 0 1.7-2.9L13.7 3.8a2 2 0 0 0-3.4 0Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </span>
        <p class="message">{{ message }}</p>
        <button
            v-if="dismissible"
            type="button"
            class="dismiss"
            aria-label="Dismiss"
            title="Dismiss"
            @click="$emit('dismiss')"
        >
            <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
        </button>
    </div>
</template>

<style scoped>
    .alert {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 8px 12px;
        font-family: var(--font-family-base);
        font-size: 12px;
        line-height: 1.4;
        word-break: break-word;
        border-radius: var(--radius-button);
    }

    .alert-icon {
        display: grid;
        flex-shrink: 0;
        place-items: center;
        margin-top: 1px;
    }

    .alert-icon svg {
        width: 14px;
        height: 14px;
    }

    .message {
        flex: 1;
        margin: 0;
    }

    .dismiss {
        display: grid;
        flex-shrink: 0;
        place-items: center;
        width: 18px;
        height: 18px;
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

    .dismiss svg {
        width: 16px;
        height: 16px;
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
