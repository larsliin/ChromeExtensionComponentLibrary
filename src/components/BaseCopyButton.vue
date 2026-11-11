<script setup lang="ts">
    import { computed } from 'vue';
    import BaseButton from './BaseButton.vue';
    import { useCopyToClipboard } from '../composables/useCopyToClipboard';

    const props = withDefaults(defineProps<{
        value: string;
        label?: string;
        copiedLabel?: string;
        variant?: 'primary' | 'secondary' | 'tool' | 'bare';
        size?: 'small' | 'medium';
        resetMs?: number;
    }>(), {
        label: 'Copy',
        copiedLabel: 'Copied',
        variant: 'secondary',
        size: 'medium',
        resetMs: 1500,
    });

    const emit = defineEmits<{
        copied: [value: string];
        error: [message: string];
    }>();

    defineSlots<{
        default?: (props: { copied: boolean }) => unknown;
    }>();

    const { copy, copiedKey, error } = useCopyToClipboard(props.resetMs);
    const copied = computed(() => copiedKey.value !== null);

    async function handleClick() {
        const value = props.value;
        if (await copy(value)) emit('copied', value);
        else emit('error', error.value ?? 'Could not copy to the clipboard.');
    }
</script>

<template>
    <BaseButton :variant="variant" :size="size" aria-live="polite" @click="handleClick">
        <span class="copy-content">
            <span
                v-for="state in [false, true]"
                :key="String(state)"
                class="copy-state"
                :class="{ 'is-hidden': state !== copied }"
                :aria-hidden="state !== copied"
            >
                <slot :copied="state">{{ state ? copiedLabel : label }}</slot>
            </span>
        </span>
    </BaseButton>
</template>

<style scoped>
.copy-content {
    display: inline-grid;
    vertical-align: middle;
}

.copy-state {
    grid-area: 1 / 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
}

.is-hidden {
    visibility: hidden;
}
</style>
