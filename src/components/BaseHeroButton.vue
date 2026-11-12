<script setup lang="ts">
    defineSlots<{
        /** Button content and layout. */
        default: () => unknown;
    }>();
</script>

<template>
    <button type="button" class="hero-button">
        <slot />
    </button>
</template>

<style scoped>
    .hero-button {
        --hero-surface-direction: 180deg;
        --hero-surface:
            radial-gradient(ellipse 80% 55% at 50% 108%, var(--color-hero-bounce), transparent 80%),
            linear-gradient(
                var(--hero-surface-direction),
                var(--color-hero-gradient-start) 0%,
                var(--color-hero-gradient-middle) 48%,
                var(--color-hero-gradient-end) 100%
            );
        --hero-shadow:
            inset 0 1px 0 var(--color-hero-highlight),
            inset 0 -3px 0 var(--color-hero-shadow-active),
            inset 1px 0 0 var(--color-hero-shadow-inset),
            inset -1px 0 0 var(--color-hero-shadow-inset);

        position: relative;
        display: flex;
        align-items: center;
        gap: 14px;
        width: 100%;
        min-height: 72px;
        padding: 12px 16px;
        overflow: hidden;
        font-family: var(--font-family-base);
        color: var(--color-hero-text);
        text-align: left;
        text-shadow: 0 1px 2px var(--color-hero-text-shadow);
        background: var(--hero-surface);
        border: 1px solid var(--color-hero-border);
        border-radius: 6px;
        box-shadow: var(--hero-shadow);
        cursor: pointer;
        transition: box-shadow 100ms ease-out, filter 100ms ease-out;
    }

    /* Top gloss highlight. */
    .hero-button::before {
        position: absolute;
        top: 2px;
        right: 2px;
        left: 2px;
        height: 46%;
        content: '';
        background: linear-gradient(180deg, var(--color-hero-gloss-start) 0%, var(--color-hero-gloss-end) 100%);
        border-radius: 4px 4px 50% 50% / 4px 4px 12px 12px;
        box-shadow: inset 0 1px 0 var(--color-hero-gloss-start);
        pointer-events: none;
    }

    .hero-button:hover:not(:disabled) {
        filter: brightness(1.05);
    }

    .hero-button:active:not(:disabled) {
        --hero-surface-direction: 0deg;

        box-shadow:
            inset 0 1px 0 var(--color-hero-shadow-active),
            inset 0 4px 8px var(--color-hero-shadow-active),
            inset 0 -1px 0 var(--color-hero-highlight-active),
            inset 1px 0 0 var(--color-hero-shadow-inset),
            inset -1px 0 0 var(--color-hero-shadow-inset);
        filter: brightness(0.96);
    }

    /* Pressed: the gloss moves to the bottom edge. */
    .hero-button:active:not(:disabled)::before {
        top: auto;
        bottom: 2px;
        height: 30%;
        background: linear-gradient(0deg, var(--color-hero-gloss-start) 0%, var(--color-hero-gloss-end) 100%);
        border-radius: 50% 50% 4px 4px / 12px 12px 4px 4px;
        box-shadow: inset 0 -1px 0 var(--color-hero-gloss-start);
        opacity: 0.7;
    }

    .hero-button:disabled {
        --color-hero-gloss-start: var(--color-hero-disabled-gloss-start);
        --color-hero-gloss-end: var(--color-hero-disabled-gloss-end);

        color: var(--color-hero-disabled-text);
        text-shadow: none;
        background:
            radial-gradient(ellipse 80% 55% at 50% 108%, var(--color-hero-disabled-bounce), transparent 80%),
            linear-gradient(
                180deg,
                color-mix(in srgb, var(--color-hero-disabled-bg), white 10%) 0%,
                var(--color-hero-disabled-bg) 40%,
                color-mix(in srgb, var(--color-hero-disabled-bg), black 4%) 52%,
                color-mix(in srgb, var(--color-hero-disabled-bg), black 9%) 100%
            );
        border-color: var(--color-hero-disabled-border);
        cursor: not-allowed;
    }

    .hero-button:focus-visible {
        outline: 2px solid var(--color-focus);
        outline-offset: 3px;
    }

    @media (prefers-reduced-motion: reduce) {
        .hero-button {
            transition: none;
        }
    }
</style>
