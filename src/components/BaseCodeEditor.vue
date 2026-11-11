<script setup lang="ts">
    import { onBeforeUnmount, onMounted, useTemplateRef, watch } from 'vue';
    import { Compartment, EditorState, type Extension } from '@codemirror/state';
    import { EditorView, lineNumbers } from '@codemirror/view';
    import { defaultHighlightStyle, syntaxHighlighting } from '@codemirror/language';
    import { oneDark } from '@codemirror/theme-one-dark';
    import BaseLoadingBar from './BaseLoadingBar.vue';

    const props = withDefaults(defineProps<{
        /** CodeMirror language support, e.g. `json()` from `@codemirror/lang-json`. */
        language?: Extension;
        /** Syntax-highlighting palette. Surface colors always follow the library tokens. */
        theme?: 'dark' | 'light';
        readonly?: boolean;
        loading?: boolean;
        /** Accessible name for the editable region. */
        label?: string;
    }>(), {
        language: () => [],
        theme: 'dark',
        label: 'Code editor',
    });

    const model = defineModel<string>({ default: '' });

    const container = useTemplateRef<HTMLDivElement>('container');
    const languageConfig = new Compartment();
    const themeConfig = new Compartment();
    const readonlyConfig = new Compartment();
    let view: EditorView | null = null;

    const themeExtension = () => (props.theme === 'dark' ? oneDark : syntaxHighlighting(defaultHighlightStyle));
    const readonlyExtension = () => [EditorState.readOnly.of(props.readonly), EditorView.editable.of(!props.readonly)];

    onMounted(() => {
        view = new EditorView({
            parent: container.value!,
            state: EditorState.create({
                doc: model.value,
                extensions: [
                    lineNumbers(),
                    languageConfig.of(props.language),
                    themeConfig.of(themeExtension()),
                    readonlyConfig.of(readonlyExtension()),
                    EditorView.contentAttributes.of({ 'aria-label': props.label }),
                    EditorView.updateListener.of((update) => {
                        if (update.docChanged) model.value = update.state.doc.toString();
                    }),
                ],
            }),
        });
    });

    // Only external changes reach the editor; edits typed in the editor already match the doc.
    watch(model, (value) => {
        if (!view || value === view.state.doc.toString()) return;
        view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: value } });
    });

    watch(() => props.language, (language) => view?.dispatch({ effects: languageConfig.reconfigure(language) }));
    watch(() => props.theme, () => view?.dispatch({ effects: themeConfig.reconfigure(themeExtension()) }));
    watch(() => props.readonly, () => view?.dispatch({ effects: readonlyConfig.reconfigure(readonlyExtension()) }));

    onBeforeUnmount(() => {
        view?.destroy();
        view = null;
    });
</script>

<template>
    <div class="code-editor" :aria-busy="loading">
        <div ref="container" class="code-editor__surface" />
        <BaseLoadingBar v-if="loading" class="code-editor__loading" />
    </div>
</template>

<style scoped>
    .code-editor {
        position: relative;
        display: flex;
        min-height: 0;
        overflow: hidden;
        background: var(--color-editor-bg);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-button);
    }

    .code-editor__surface {
        flex: 1;
        min-width: 0;
    }

    .code-editor__loading {
        position: absolute;
        inset: 0 0 auto;
        z-index: 1;
        border-radius: 0;
    }

    .code-editor :deep(.cm-editor) {
        height: 100%;
        font-family: var(--font-family-mono);
        font-size: 12px;
        line-height: 1.4;
        background-color: var(--color-editor-bg);
    }

    .code-editor :deep(.cm-editor.cm-focused) {
        outline: 2px solid var(--color-focus);
        outline-offset: -2px;
    }

    .code-editor :deep(.cm-content) {
        padding: 8px;
        color: var(--color-text);
        caret-color: var(--color-text);
    }

    .code-editor :deep(.cm-scroller) {
        overflow: auto;
        font-family: inherit;
    }

    .code-editor :deep(.cm-gutters) {
        padding-right: 4px;
        color: var(--color-text-muted);
        background-color: var(--color-editor-bg);
        border-right: 1px solid var(--color-border);
    }

    .code-editor :deep(.cm-lineNumbers .cm-gutterElement) {
        min-width: 2.5em;
        padding-right: 8px;
        text-align: right;
    }
</style>
