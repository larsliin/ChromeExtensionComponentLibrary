<script setup lang="ts">
    defineProps<{
        headline: string;
        description?: string;
    }>();
</script>

<template>
    <li class="base-list-item">
        <div v-if="$slots.icon" class="list-item-mark" aria-hidden="true">
            <slot name="icon" />
        </div>
        <div class="list-item-info">
            <h2 class="list-item-headline">{{ headline }}</h2>
            <p v-if="description" class="list-item-description" :title="description">
                {{ description }}
            </p>
        </div>
        <div v-if="$slots.actions" class="list-item-actions">
            <slot name="actions" />
        </div>
    </li>
</template>

<style scoped>
.base-list-item {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    box-sizing: border-box;
    width: 100%;
    padding: 12px;
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
    display: grid;
    flex: 0 0 auto;
    place-items: center;
    box-sizing: border-box;
    width: 38px;
    height: 38px;
    font-size: 20px;
    color: var(--color-accent);
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 10px;
}

.list-item-mark :deep(svg) {
    width: 20px;
    height: 20px;
}

.list-item-info {
    flex: 1 1 140px;
    min-width: 0;
}

.list-item-headline {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.35;
    overflow-wrap: anywhere;
}

.list-item-description {
    overflow: hidden;
    margin: 3px 0 0;
    font-size: 11px;
    line-height: var(--line-height-base);
    color: var(--color-text-muted);
    text-overflow: ellipsis;
    white-space: nowrap;
}

.list-item-actions {
    display: flex;
    flex-wrap: wrap;
    flex: 0 1 auto;
    align-items: center;
    gap: 7px;
    max-width: 100%;
    margin-left: auto;
}
</style>
