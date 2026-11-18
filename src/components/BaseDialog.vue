<script setup lang="ts">
    import { computed, nextTick, onBeforeUnmount, useId, useTemplateRef, watchEffect } from 'vue';
    import BaseButton from './BaseButton.vue';

    const props = withDefaults(defineProps<{
        title: string;
        message: string;
        mode?: 'alert' | 'confirm';
        confirmLabel?: string;
        cancelLabel?: string;
        confirmVariant?: 'primary' | 'danger';
    }>(), {
        mode: 'alert',
        cancelLabel: 'Cancel',
        confirmVariant: 'primary',
    });

    const open = defineModel<boolean>('open', { required: true });
    const emit = defineEmits<{
        confirm: [];
        cancel: [];
    }>();

    const dialog = useTemplateRef<HTMLDialogElement>('dialog');
    const id = useId();
    const confirmText = computed(() => props.confirmLabel ?? (props.mode === 'alert' ? 'OK' : 'Confirm'));

    function closeDialog() {
        if (dialog.value?.open) dialog.value.close();
    }

    function syncDialog() {
        const element = dialog.value;
        if (!element) return;
        if (open.value) {
            if (!element.open) element.showModal();
        } else {
            closeDialog();
        }
    }

    watchEffect(syncDialog, { flush: 'post' });

    function finish(action: 'confirm' | 'cancel') {
        if (!open.value || !dialog.value?.open) return;
        open.value = false;
        closeDialog();
        if (action === 'confirm') emit('confirm');
        else emit('cancel');
        // A parent can reopen during the action without changing the final prop value.
        void nextTick(syncDialog);
    }

    function handleClose() {
        // A queued close event can arrive after the parent has reopened the dialog.
        if (!dialog.value?.open && open.value) open.value = false;
    }

    onBeforeUnmount(closeDialog);
</script>

<template>
    <dialog
        ref="dialog"
        class="base-dialog"
        role="alertdialog"
        aria-modal="true"
        :aria-labelledby="`${id}-title`"
        :aria-describedby="`${id}-message`"
        @cancel.prevent="finish('cancel')"
        @close="handleClose"
    >
        <h2 :id="`${id}-title`" class="dialog-title">{{ title }}</h2>
        <p :id="`${id}-message`" class="dialog-message">{{ message }}</p>
        <div class="dialog-actions">
            <BaseButton
                v-if="mode === 'confirm'"
                class="dialog-action"
                variant="secondary"
                autofocus
                @click="finish('cancel')"
            >{{ cancelLabel }}</BaseButton>
            <BaseButton
                class="dialog-action"
                :variant="confirmVariant"
                :autofocus="mode === 'alert'"
                @click="finish('confirm')"
            >{{ confirmText }}</BaseButton>
        </div>
    </dialog>
</template>

<style scoped>
.base-dialog {
    box-sizing: border-box;
    width: min(420px, calc(100% - 32px));
    max-width: calc(100% - 32px);
    max-height: calc(100% - 32px);
    margin: auto;
    padding: 20px;
    overflow: auto;
    font-family: var(--font-family-base);
    font-size: var(--font-size-base);
    line-height: var(--line-height-base);
    color: var(--color-text);
    text-align: start;
    background: var(--color-panel);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-panel);
    box-shadow: var(--shadow-floating-panel);
}

.base-dialog::backdrop {
    background: var(--color-dialog-backdrop);
}

.dialog-title {
    margin: 0 0 12px;
    padding: 0;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.3;
    overflow-wrap: anywhere;
    border: 0;
}

.dialog-message {
    margin: 0;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
}

.dialog-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 20px;
}

.dialog-action {
    flex: 0 1 auto;
    width: auto;
    min-width: 0;
    max-width: 100%;
    justify-content: center;
    overflow-wrap: anywhere;
    white-space: normal;
}
</style>
