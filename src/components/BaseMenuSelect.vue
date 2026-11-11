<script setup lang="ts" generic="T extends string">
    import { computed, nextTick, onBeforeUnmount, shallowRef, useId, useTemplateRef, watch } from 'vue';
    import type { SelectOption } from '../types';

    const props = defineProps<{
        /** Accessible name, e.g. "Theme". Announced together with the selected label. */
        label: string;
        options: readonly SelectOption<T>[];
    }>();

    const model = defineModel<T>({ required: true });

    defineSlots<{
        default?: (props: { selected: SelectOption<T> | null }) => unknown;
        option?: (props: { option: SelectOption<T>; selected: boolean }) => unknown;
    }>();

    const open = shallowRef(false);
    const root = useTemplateRef<HTMLDivElement>('root');
    const trigger = useTemplateRef<HTMLButtonElement>('trigger');
    const panel = useTemplateRef<HTMLDivElement>('panel');
    const panelId = useId();
    const panelStyle = shallowRef<Record<string, string>>({});

    const selectedOption = computed(() => props.options.find((option) => option.value === model.value) ?? null);
    const triggerLabel = computed(() => `${props.label}: ${selectedOption.value?.label ?? 'None'}`);
    const enabledIndexes = computed(() => props.options.flatMap((option, index) => (option.disabled ? [] : [index])));

    async function positionPanel() {
        const triggerRect = trigger.value?.getBoundingClientRect();
        if (!triggerRect) return;

        panelStyle.value = { top: `${triggerRect.bottom + 6}px`, left: `${triggerRect.left}px` };
        await nextTick();

        const panelRect = panel.value?.getBoundingClientRect();
        if (!panelRect) return;

        // Right-align with the trigger, then clamp into the viewport and flip above if there is no room below.
        const margin = 8;
        const panelWidth = Math.min(panelRect.width, Math.max(window.innerWidth - margin * 2, 0));
        const left = Math.min(Math.max(margin, triggerRect.right - panelWidth), window.innerWidth - panelWidth - margin);
        const top = triggerRect.bottom + panelRect.height + margin <= window.innerHeight
            ? triggerRect.bottom + 6
            : Math.max(margin, triggerRect.top - panelRect.height - 6);
        panelStyle.value = { top: `${top}px`, left: `${left}px` };
    }

    function closeOnOutsidePointer(event: PointerEvent) {
        if (event.target instanceof Node && !root.value?.contains(event.target)) open.value = false;
    }

    function removeListeners() {
        document.removeEventListener('pointerdown', closeOnOutsidePointer);
        window.removeEventListener('resize', positionPanel);
        window.removeEventListener('scroll', positionPanel, true);
    }

    watch(open, (isOpen) => {
        if (!isOpen) {
            removeListeners();
            return;
        }
        document.addEventListener('pointerdown', closeOnOutsidePointer);
        window.addEventListener('resize', positionPanel);
        window.addEventListener('scroll', positionPanel, true);
        void positionPanel();
    });

    onBeforeUnmount(removeListeners);

    async function focusOption(index: number) {
        await nextTick();
        panel.value?.querySelectorAll<HTMLButtonElement>('[role="radio"]')[index]?.focus();
    }

    function close() {
        open.value = false;
        void nextTick(() => trigger.value?.focus());
    }

    function toggle() {
        open.value = !open.value;
        if (open.value) {
            const selectedIndex = props.options.findIndex((option) => option.value === model.value);
            void focusOption(selectedIndex >= 0 ? selectedIndex : (enabledIndexes.value[0] ?? 0));
        }
    }

    function selectOption(option: SelectOption<T>) {
        model.value = option.value;
        close();
    }

    function handleKeydown(event: KeyboardEvent) {
        if (open.value && event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            close();
        }
    }

    // Radio-group semantics: arrow keys move focus and select, skipping disabled options.
    function handleOptionKeydown(event: KeyboardEvent, index: number) {
        const enabled = enabledIndexes.value;
        const position = enabled.indexOf(index);
        let next: number | undefined;
        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = enabled[(position + 1) % enabled.length];
        else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = enabled[(position - 1 + enabled.length) % enabled.length];
        else if (event.key === 'Home') next = enabled[0];
        else if (event.key === 'End') next = enabled[enabled.length - 1];
        if (next === undefined) return;

        event.preventDefault();
        model.value = props.options[next]!.value;
        void focusOption(next);
    }

    function closeOnFocusLeave(event: FocusEvent) {
        if (open.value && event.relatedTarget instanceof Node && !root.value?.contains(event.relatedTarget)) {
            open.value = false;
        }
    }
</script>

<template>
    <div
        ref="root"
        class="menu-select"
        @keydown="handleKeydown"
        @focusout="closeOnFocusLeave"
    >
        <button
            ref="trigger"
            class="menu-select__trigger"
            type="button"
            :aria-label="triggerLabel"
            :title="triggerLabel"
            :aria-expanded="open"
            :aria-controls="panelId"
            :disabled="enabledIndexes.length === 0"
            @click="toggle"
        >
            <slot :selected="selectedOption">{{ selectedOption?.label }}</slot>
        </button>
        <div
            v-if="open"
            :id="panelId"
            ref="panel"
            class="menu-select__panel"
            role="radiogroup"
            :aria-label="label"
            :style="panelStyle"
        >
            <button
                v-for="(option, index) in options"
                :key="option.value"
                class="menu-select__option"
                :class="{ 'menu-select__option--selected': option.value === model }"
                type="button"
                role="radio"
                :aria-checked="option.value === model"
                :disabled="option.disabled"
                :tabindex="option.value === model || (!selectedOption && index === enabledIndexes[0]) ? 0 : -1"
                @click="selectOption(option)"
                @keydown="handleOptionKeydown($event, index)"
            >
                <span class="menu-select__option-content">
                    <slot name="option" :option="option" :selected="option.value === model">{{ option.label }}</slot>
                </span>
            </button>
        </div>
    </div>
</template>

<style scoped>
    .menu-select {
        position: relative;
        display: inline-flex;
        flex: 0 0 auto;
        align-items: center;
    }

    .menu-select__trigger {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        min-width: 24px;
        height: 24px;
        padding: 0 4px;
        font-family: var(--font-family-base);
        font-size: 13px;
        color: var(--color-text-muted);
        background-color: transparent;
        border: 0;
        border-radius: var(--radius-button);
        cursor: pointer;
    }

    .menu-select__trigger:hover:not(:disabled) {
        color: var(--color-text);
        background-color: var(--color-hover);
    }

    .menu-select__trigger:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .menu-select__trigger:focus-visible,
    .menu-select__option:focus-visible {
        outline: 2px solid var(--color-focus);
        outline-offset: 1px;
    }

    .menu-select__panel {
        position: fixed;
        z-index: 40;
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: min(168px, calc(100vw - 16px));
        max-height: calc(100vh - 16px);
        overflow-y: auto;
        padding: 4px;
        background-color: var(--color-panel);
        border: 1px solid var(--color-border);
        border-radius: 6px;
        box-shadow: var(--shadow-floating-panel);
    }

    .menu-select__option {
        display: flex;
        align-items: center;
        width: 100%;
        min-height: 34px;
        padding: 6px 9px;
        font-family: var(--font-family-base);
        font-size: 13px;
        color: var(--color-text);
        text-align: left;
        background-color: transparent;
        border: 0;
        border-radius: var(--radius-button);
        cursor: pointer;
    }

    .menu-select__option-content {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .menu-select__option:hover:not(:disabled, .menu-select__option--selected) {
        background-color: var(--color-hover);
    }

    .menu-select__option:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .menu-select__option--selected {
        font-weight: 600;
        color: var(--color-on-accent);
        background-color: var(--color-accent);
    }

    .menu-select__option--selected:hover {
        background-color: var(--color-accent-hover);
    }
</style>
