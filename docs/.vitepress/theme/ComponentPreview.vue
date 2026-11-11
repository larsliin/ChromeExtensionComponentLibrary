<script setup lang="ts">
    import { useData } from 'vitepress';

    const { isDark } = useData();
</script>

<template>
    <div class="component-preview vp-raw" :data-theme="isDark ? 'dark' : 'light'">
        <slot />
    </div>
</template>

<style scoped>
    .component-preview {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 12px;
        margin: 16px 0;
        padding: 24px;
        font-family: var(--font-family-base);
        font-size: var(--font-size-base);
        line-height: var(--line-height-base);
        color: var(--color-text);
        background: var(--color-bg);
        border: 1px solid var(--color-border);
        border-radius: 8px;
    }
</style>
