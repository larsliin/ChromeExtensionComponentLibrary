<script setup lang="ts">
    import { computed } from 'vue';
    import BaseIconButton from './BaseIconButton.vue';
    import BaseMenuSelect from './BaseMenuSelect.vue';
    import type { BaseToggleGroupAction } from '../types';

    const props = defineProps<{
        label: string;
        actions: readonly BaseToggleGroupAction[];
    }>();

    const emit = defineEmits<{
        action: [actionId: string, parentId?: string];
    }>();

    const items = computed(() => props.actions.map((action) => {
        const subActions = action.subActions ?? [];
        // BaseMenuSelect requires a model value; use one that can't collide with a subaction ID when none is active.
        let emptyValue = '\u0000';
        while (subActions.some((subAction) => subAction.id === emptyValue)) emptyValue += '\u0000';

        return {
            action,
            iconsById: new Map(subActions.map((subAction) => [subAction.id, subAction.icon])),
            options: subActions.map((subAction) => ({
                value: subAction.id,
                label: subAction.label,
                title: subAction.title,
                disabled: subAction.disabled,
            })),
            selectedValue: subActions.find((subAction) => subAction.active)?.id ?? emptyValue,
        };
    }));

    function selectSubAction(action: BaseToggleGroupAction, value: string) {
        const subAction = action.subActions?.find((option) => option.id === value);
        if (subAction && !subAction.disabled) emit('action', subAction.id, action.id);
    }
</script>

<template>
    <div class="toggle-group" role="group" :aria-label="label">
        <template v-for="{ action, iconsById, options, selectedValue } in items" :key="action.id">
            <BaseMenuSelect
                v-if="options.length"
                class="toggle-group__menu"
                :model-value="selectedValue"
                :label="action.label"
                :title="action.title"
                :options="options"
                :disabled="action.disabled"
                @update:model-value="selectSubAction(action, $event)"
            >
                <i class="bi" :class="action.icon" aria-hidden="true" />
                <template #option="{ option }">
                    <i class="bi" :class="iconsById.get(option.value)" aria-hidden="true" />
                    <span>{{ option.label }}</span>
                </template>
            </BaseMenuSelect>
            <BaseIconButton
                v-else
                class="toggle-group__button"
                :label="action.label"
                :title="action.title"
                :active="action.active"
                :disabled="action.disabled"
                @click="emit('action', action.id)"
            >
                <i class="bi" :class="action.icon" aria-hidden="true" />
            </BaseIconButton>
        </template>
    </div>
</template>

<style scoped>
    .toggle-group {
        display: inline-flex;
        flex: 0 0 auto;
        align-items: center;
        gap: 2px;
        box-sizing: border-box;
        height: 32px;
        padding: 3px 4px;
        background-color: var(--color-panel-raised);
        border: 1px solid var(--color-border);
        border-radius: 6px;
    }

    .toggle-group .toggle-group__button,
    .toggle-group :deep(.menu-select__trigger) {
        display: grid;
        flex: 0 0 auto;
        place-items: center;
        box-sizing: border-box;
        width: 24px;
        height: 24px;
        margin: 0;
        padding: 0;
        font-size: 0.75rem;
        color: var(--color-text-muted);
        background-color: transparent;
        border: none;
        border-radius: 4px;
    }

    .toggle-group .toggle-group__button:hover:not(:disabled),
    .toggle-group :deep(.menu-select__trigger:hover:not(:disabled)),
    .toggle-group :deep(.menu-select__trigger[aria-expanded='true']) {
        color: var(--color-text);
        background-color: var(--color-hover);
    }

    .toggle-group .toggle-group__button.is-active:not(:disabled) {
        color: var(--color-text);
        background-color: var(--color-active);
    }

    .toggle-group .toggle-group__button:active:not(:disabled) {
        box-shadow: inset 0 0 0 1px var(--color-border);
    }

    .toggle-group .toggle-group__button:focus-visible,
    .toggle-group :deep(.menu-select__trigger:focus-visible) {
        outline: 1px solid var(--color-focus);
        outline-offset: -3px;
    }

    .toggle-group .toggle-group__button:disabled,
    .toggle-group :deep(.menu-select__trigger:disabled) {
        opacity: 0.6;
        cursor: default;
    }
</style>
