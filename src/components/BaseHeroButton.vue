<script setup lang="ts">
    defineSlots<{
        /** Title text. */
        default: () => unknown;
        /** Supporting line under the title. */
        caption?: () => unknown;
        /** Icon shown in the glossy tile; sized to 24px. */
        icon?: () => unknown;
    }>();
</script>

<template>
    <button type="button" class="hero-button">
        <span v-if="$slots.icon" class="hero-icon" aria-hidden="true">
            <slot name="icon" />
        </span>
        <span class="hero-copy">
            <span class="hero-title"><slot /></span>
            <span v-if="$slots.caption" class="hero-caption"><slot name="caption" /></span>
        </span>
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

    .hero-button:active:not(:disabled) .hero-icon {
        background-image: linear-gradient(0deg, var(--color-hero-icon-sheen) 0%, transparent 100%);
        box-shadow:
            inset 0 2px 3px var(--color-hero-shadow-active),
            inset 0 -1px 0 var(--color-hero-icon-border);
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

    .hero-icon {
        display: grid;
        flex: 0 0 48px;
        place-items: center;
        width: 48px;
        height: 48px;
        background-color: var(--color-hero-icon-bg);
        background-image: linear-gradient(180deg, var(--color-hero-icon-sheen) 0%, transparent 100%);
        border: 1px solid var(--color-hero-icon-border);
        border-radius: 14px;
        box-shadow:
            inset 0 1px 0 var(--color-hero-gloss-start),
            inset 0 -1px 0 var(--color-hero-shadow-inset);
    }

    .hero-icon :deep(svg) {
        width: 24px;
        height: 24px;
        filter: drop-shadow(0 1px 1px var(--color-hero-text-shadow));
    }

    .hero-button:disabled .hero-icon {
        background-color: var(--color-hero-disabled-icon-bg);
        border-color: var(--color-hero-disabled-icon-border);
    }

    .hero-button:disabled .hero-icon :deep(svg) {
        filter: none;
    }

    .hero-copy {
        display: flex;
        flex-direction: column;
        gap: 3px;
        min-width: 0;
    }

    .hero-title {
        font-size: 15px;
        font-weight: 700;
        line-height: 1.25;
    }

    .hero-caption {
        font-size: 11px;
        font-weight: 500;
        line-height: 1.35;
        color: var(--color-hero-caption);
    }

    .hero-button:disabled .hero-caption {
        color: var(--color-hero-disabled-text);
    }

    @media (prefers-reduced-motion: reduce) {
        .hero-button {
            transition: none;
        }
    }
</style>
