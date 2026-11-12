<script setup lang="ts">
    withDefaults(defineProps<{
        type?: 'product' | 'link-mark';
        /** Accessible name. Omit when the product name is already visible nearby so the icon stays decorative. */
        label?: string;
    }>(), {
        type: 'product',
    });
</script>

<template>
    <span
        class="product-icon"
        :class="{ 'product-icon--link-mark': type === 'link-mark' }"
        :role="label ? 'img' : undefined"
        :aria-label="label"
        :aria-hidden="label ? undefined : 'true'"
    >
        <slot>
            <svg class="product-icon__default" viewBox="20 20 88 88" aria-hidden="true" focusable="false">
                <g fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M42 26 V86 H102" />
                    <path d="M26 42 H86 V102" />
                </g>
            </svg>
        </slot>
    </span>
</template>

<style scoped>
    .product-icon {
        --product-icon-size: 28px;

        display: inline-grid;
        flex: 0 0 auto;
        place-items: center;
        box-sizing: border-box;
        width: var(--product-icon-size);
        height: var(--product-icon-size);
        border-radius: 23%;
        background-color: var(--color-accent);
        color: var(--color-on-accent);
        font-size: calc(var(--product-icon-size) * 0.6875);
        line-height: 1;
    }

    .product-icon--link-mark {
        border: 1px solid var(--color-border);
        background-color: var(--color-bg);
        color: var(--color-accent);
        font-size: calc(var(--product-icon-size) * 0.5625);
    }

    .product-icon__default,
    .product-icon :slotted(svg),
    .product-icon :slotted(img) {
        display: block;
        width: 1em;
        height: 1em;
        object-fit: contain;
    }
</style>
