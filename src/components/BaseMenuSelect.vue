<script setup lang="ts" generic="T extends string">
    import { computed, nextTick, onBeforeUnmount, shallowRef, useId, useTemplateRef, watch } from 'vue';
    import type { SelectOption } from '../types';

    const props = withDefaults(defineProps<{
        /** Accessible name, e.g. "Theme". Announced together with the selected label. */
        label: string;
        options: readonly SelectOption<T>[];
        /** Optional trigger tooltip, falling back to the accessible trigger label. */
        title?: string;
        disabled?: boolean;
    }>(), {
        disabled: false,
    });

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
    const panelStyle = shallowRef<Record<string, string>>({ visibility: 'hidden' });

    const selectedOption = computed(() => props.options.find((option) => option.value === model.value) ?? null);
    const triggerLabel = computed(() => `${props.label}: ${selectedOption.value?.label ?? 'None'}`);
    const enabledIndexes = computed(() => props.options.flatMap((option, index) => (option.disabled ? [] : [index])));
    const tabbableIndex = computed(() => {
        const selectedIndex = props.options.findIndex((option) => option.value === model.value && !option.disabled);
        return selectedIndex >= 0 ? selectedIndex : (enabledIndexes.value[0] ?? -1);
    });

    let positioning: Promise<void> | undefined;
    let needsPosition = false;

    function positionPanel(): Promise<void> {
        needsPosition = true;
        if (positioning) return positioning;

        positioning = (async () => {
            while (needsPosition && open.value) {
                needsPosition = false;
                const margin = Math.min(8, window.innerWidth / 2, window.innerHeight / 2);
                const maxWidth = Math.max(window.innerWidth - margin * 2, 0);
                const maxHeight = Math.max(window.innerHeight - margin * 2, 0);
                panelStyle.value = { ...panelStyle.value, maxWidth: `${maxWidth}px`, maxHeight: `${maxHeight}px` };
                await nextTick();
                if (!open.value) return;
                if (needsPosition) continue;

                const triggerRect = trigger.value?.getBoundingClientRect();
                const panelRect = panel.value?.getBoundingClientRect();
                if (!triggerRect || !panelRect) return;

                const panelWidth = Math.min(panelRect.width, maxWidth);
                const panelHeight = Math.min(panelRect.height, maxHeight);
                const maxLeft = Math.max(window.innerWidth - panelWidth - margin, margin);
                const left = Math.min(Math.max(margin, triggerRect.right - panelWidth), maxLeft);
                const below = triggerRect.bottom + 6 + panelHeight <= window.innerHeight - margin;
                const above = triggerRect.top - 6 - panelHeight >= margin;
                const top = below
                    ? triggerRect.bottom + 6
                    : above
                        ? triggerRect.top - panelHeight - 6
                        : Math.min(Math.max(margin, triggerRect.bottom + 6), Math.max(margin, window.innerHeight - panelHeight - margin));
                panelStyle.value = {
                    top: `${top}px`,
                    left: `${left}px`,
                    maxWidth: `${maxWidth}px`,
                    maxHeight: `${maxHeight}px`,
                    visibility: 'visible',
                };
                await nextTick();
            }
        })().finally(() => { positioning = undefined; });
        return positioning;
    }

    function closeOnOutsidePointer(event: PointerEvent) {
        if (event.target instanceof Node && !root.value?.contains(event.target)) open.value = false;
    }

    function removeListeners() {
        document.removeEventListener('pointerdown', closeOnOutsidePointer);
        window.removeEventListener('resize', positionPanel);
        window.removeEventListener('scroll', positionPanel, true);
    }

    watch(open, async (isOpen, _wasOpen, onCleanup) => {
        if (!isOpen) {
            removeListeners();
            return;
        }
        let cancelled = false;
        onCleanup(() => { cancelled = true; });
        document.addEventListener('pointerdown', closeOnOutsidePointer);
        window.addEventListener('resize', positionPanel);
        window.addEventListener('scroll', positionPanel, true);
        await positionPanel();
        if (!cancelled && open.value) void focusOption(tabbableIndex.value);
    });

    onBeforeUnmount(removeListeners);

    async function focusOption(index: number) {
        await nextTick();
        if (open.value) panel.value?.querySelectorAll<HTMLButtonElement>('[role="radio"]')[index]?.focus();
    }

    function close() {
        open.value = false;
        void nextTick(() => trigger.value?.focus());
    }

    function toggle() {
        if (!open.value) panelStyle.value = { ...panelStyle.value, visibility: 'hidden' };
        open.value = !open.value;
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
        if (enabled.length === 0) return;
        const position = enabled.indexOf(index);
        let next: number | undefined;
        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
            next = enabled[position === -1 ? 0 : (position + 1) % enabled.length];
        } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
            next = enabled[position === -1 ? enabled.length - 1 : (position - 1 + enabled.length) % enabled.length];
        } else if (event.key === 'Home') next = enabled[0];
        else if (event.key === 'End') next = enabled[enabled.length - 1];
        if (next === undefined) return;

        event.preventDefault();
        model.value = props.options[next]!.value;
        void focusOption(next);
    }

    function closeOnFocusLeave(event: FocusEvent) {
        if (!open.value) return;
        if (event.relatedTarget instanceof Node && !root.value?.contains(event.relatedTarget)) {
            open.value = false;
            return;
        }
        void nextTick(() => {
            if (open.value && !root.value?.contains(document.activeElement)) open.value = false;
        });
    }

    watch(
        () => [model.value, props.disabled, props.options.map((option) => [option.value, option.label, option.title, option.disabled])],
        () => {
            if (!open.value) return;
            if (props.disabled || enabledIndexes.value.length === 0) {
                open.value = false;
                return;
            }
            const hadOptionFocus = panel.value?.contains(document.activeElement) ?? false;
            void nextTick(() => {
                if (!open.value) return;
                void positionPanel();
                if (hadOptionFocus) void focusOption(tabbableIndex.value);
            });
        },
    );
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
            :title="title || triggerLabel"
            :aria-expanded="open"
            :aria-controls="panelId"
            :disabled="disabled || enabledIndexes.length === 0"
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
                :title="option.title || option.label"
                :tabindex="index === tabbableIndex ? 0 : -1"
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
        box-sizing: border-box;
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
