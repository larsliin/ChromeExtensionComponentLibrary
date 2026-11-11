<script setup lang="ts">
    import BaseButton from './BaseButton.vue';

    defineProps<{
        /** Accessible name; also used as the tooltip. Required because the button has no visible text. */
        label: string;
        /** Toggle state. Leave undefined for plain action buttons so `aria-pressed` is omitted. */
        active?: boolean;
    }>();
</script>

<template>
    <BaseButton
        variant="tool"
        :class="{ 'is-active': active }"
        :aria-label="label"
        :title="label"
        :aria-pressed="active"
    >
        <slot />
    </BaseButton>
</template>
