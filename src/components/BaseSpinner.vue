<script setup lang="ts">
    withDefaults(defineProps<{
        size?: 'small' | 'medium' | 'large';
        label?: string;
    }>(), {
        size: 'medium',
        label: 'Loading',
    });
</script>

<template>
    <span
        class="spinner"
        :class="`spinner--${size}`"
        role="progressbar"
        :aria-label="label"
    >
        <span class="spinner__indicator" aria-hidden="true" />
    </span>
</template>

<style scoped>
    .spinner {
        display: inline-flex;
        flex: 0 0 auto;
        vertical-align: middle;
    }

    .spinner--small {
        --spinner-stroke-width: 2px;

        width: 16px;
        height: 16px;
    }

    .spinner--medium {
        --spinner-stroke-width: 3px;

        width: 24px;
        height: 24px;
    }

    .spinner--large {
        --spinner-stroke-width: 4px;

        width: 32px;
        height: 32px;
    }

    .spinner__indicator {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        border: var(--spinner-stroke-width) solid var(--spinner-track-color, var(--color-border));
        border-top-color: var(--spinner-color, var(--color-accent));
        border-radius: 50%;
        animation: spinner-cycle 0.8s linear infinite;
    }

    @keyframes spinner-cycle {
        to {
            transform: rotate(360deg);
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .spinner__indicator {
            animation: none;
        }
    }
</style>
