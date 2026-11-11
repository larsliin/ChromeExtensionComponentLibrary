<script setup lang="ts">
    import { ref, watchEffect } from 'vue';
    import BaseButton from './BaseButton.vue';

    const isLight = ref(false);

    watchEffect(() => {
        if (isLight.value) {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    });
</script>

<template>
    <div class="demo-container">
        <header class="demo-header">
            <h2>BaseButton</h2>
            <BaseButton variant="secondary" @click="isLight = !isLight">
                {{ isLight ? 'Dark theme' : 'Light theme' }}
            </BaseButton>
        </header>

        <section class="demo-section">
            <BaseButton variant="primary">Copy to Clipboard</BaseButton>
            <BaseButton variant="primary" size="small">Copy to Clipboard</BaseButton>
            <BaseButton variant="primary" disabled>Copy to Clipboard</BaseButton>
        </section>

        <section class="demo-section">
            <BaseButton variant="secondary" size="small">Copy HEX</BaseButton>
            <BaseButton variant="secondary" size="small">Copy all colors</BaseButton>
            <BaseButton variant="secondary" size="small" disabled>Copy HEX</BaseButton>
        </section>

        <section class="demo-section">
            <BaseButton variant="tool" aria-label="Refresh">⟳</BaseButton>
            <BaseButton variant="tool" aria-label="Refresh" disabled>⟳</BaseButton>
        </section>
    </div>
</template>

<style scoped>
    .demo-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
        max-width: 600px;
        margin: 0 auto;
        padding: 24px;
    }

    .demo-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .demo-section {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
        background: var(--color-panel-raised);
        border: 1px solid var(--color-border);
        border-radius: 8px;
    }
</style>
