<script setup lang="ts">
    import { computed } from 'vue';
    import BaseButton from './BaseButton.vue';
    import { useCopyToClipboard } from '../composables/useCopyToClipboard';

    const props = withDefaults(defineProps<{
        /** Text written to the clipboard. */
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
        if (await copy(props.value)) emit('copied', props.value);
        else emit('error', error.value ?? '');
    }
</script>

<template>
    <BaseButton
        :variant="variant"
        :size="size"
        :aria-label="copied ? copiedLabel : undefined"
        @click="handleClick"
    >
        <slot :copied="copied">{{ copied ? copiedLabel : label }}</slot>
    </BaseButton>
</template>
