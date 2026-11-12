<script setup lang="ts">
    import type { VNode } from 'vue';
    import BaseProductIcon from './BaseProductIcon.vue';

    withDefaults(defineProps<{
        iconType?: 'product' | 'link-mark';
    }>(), {
        iconType: 'link-mark',
    });

    defineSlots<{
        default(): VNode[];
        icon?(): VNode[];
    }>();
</script>

<template>
    <li class="base-list-item">
        <BaseProductIcon :type="iconType" class="list-item-mark">
            <slot name="icon" />
        </BaseProductIcon>
        <slot />
    </li>
</template>

<style scoped>
.base-list-item {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 12px;
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    padding: 8px 12px;
    list-style: none;
    font-family: var(--font-family-base);
    color: var(--color-text);
    background: var(--color-panel);
    border: 1px solid var(--color-border);
    border-radius: 10px;
    box-shadow: var(--shadow-list-item);
    transition: background-color 0.16s, border-color 0.16s;
}

.base-list-item:hover,
.base-list-item:focus-within {
    background: var(--color-panel-raised);
    border-color: var(--color-focus);
}

.list-item-mark {
    --product-icon-size: 38px;
}
</style>
