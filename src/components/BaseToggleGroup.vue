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

    const actionOptions = computed(() => props.actions.map((action) => {
        const subActions = action.subActions ?? [];
        const subActionsById = new Map(subActions.map((subAction) => [subAction.id, subAction]));
        let emptyValue = '\u0000';
        while (subActions.some((subAction) => subAction.id === emptyValue)) emptyValue += '\u0000';

        return {
            action,
            options: subActions.map((subAction) => ({
                value: subAction.id,
                label: subAction.label,
                title: subAction.title,
                disabled: subAction.disabled,
            })),
            subActionsById,
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
        <template v-for="({ action, options, subActionsById, selectedValue }) in actionOptions" :key="action.id">
            <BaseIconButton
                :label="action.label"
                :title="action.title"
                :active="action.active"
                :disabled="action.disabled"
                @click="emit('action', action.id)"
            >
                <i class="bi" :class="action.icon" aria-hidden="true" />
            </BaseIconButton>
            <BaseMenuSelect
                v-if="action.subActions?.length"
                :model-value="selectedValue"
                :label="action.label"
                :title="`${action.label} options`"
                :options="options"
                :disabled="action.disabled || action.subActions.every((subAction) => subAction.disabled)"
                class="toggle-group__submenu"
                @update:model-value="selectSubAction(action, $event)"
            >
                <template #default="{ selected }">
                    <i
                        v-if="selected"
                        class="bi"
                        :class="subActionsById.get(selected.value)?.icon"
                        aria-hidden="true"
                    />
                    <span class="toggle-group__chevron bi bi-chevron-down" aria-hidden="true" />
                </template>
                <template #option="{ option }">
                    <i
                        class="bi"
                        :class="subActionsById.get(option.value)?.icon"
                        aria-hidden="true"
                    />
                    {{ option.label }}
                </template>
            </BaseMenuSelect>
        </template>
    </div>
</template>

<style scoped>
    .toggle-group {
        display: inline-flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 4px;
    }

    .toggle-group__submenu :deep(.menu-select__trigger) {
        padding: 0 3px;
    }

    .toggle-group__chevron {
        font-size: 10px;
    }
</style>
