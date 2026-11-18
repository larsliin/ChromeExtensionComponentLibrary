import assert from 'node:assert/strict';
import test from 'node:test';
import { createRenderer, createSSRApp, h, nextTick, shallowRef } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { BaseButton, BaseDialog } from '../dist/index.js';

async function renderDialog(props = {}) {
    const html = await renderToString(createSSRApp({
        render: () => h(BaseDialog, {
            open: false,
            title: 'Settings saved',
            message: 'Your preferences are ready.',
            ...props,
        }),
    }));
    return html.replace(/<!--.*?-->/g, '');
}

test('alert renders only an OK action and leaves modal opening to the client', async () => {
    const html = await renderDialog({ open: true });

    assert.match(html, /<dialog\b[^>]*role="alertdialog"[^>]*aria-modal="true"/);
    assert.doesNotMatch(html, /<dialog\b[^>]*\sopen(?:[=>\s])/);
    assert.equal((html.match(/<button\b/g) ?? []).length, 1);
    assert.match(html, /<button\b[^>]*primary-button[^>]*autofocus[^>]*>OK<\/button>/);
});

test('confirmation renders Cancel first with autofocus and a customizable danger action', async () => {
    const html = await renderDialog({
        mode: 'confirm',
        confirmLabel: 'Delete',
        cancelLabel: 'Keep preferences',
        confirmVariant: 'danger',
    });

    assert.equal((html.match(/<button\b/g) ?? []).length, 2);
    assert.match(html, /secondary-button[^>]*autofocus[^>]*>Keep preferences<\/button>/);
    assert.match(html, /danger-button[^>]*>Delete<\/button>/);
    assert.doesNotMatch(html, /danger-button[^>]*autofocus/);
    assert.ok(html.indexOf('>Keep preferences</button>') < html.indexOf('>Delete</button>'));

    const defaultLabels = await renderDialog({ mode: 'confirm' });
    assert.match(defaultLabels, />Cancel<\/button>/);
    assert.match(defaultLabels, /primary-button[^>]*>Confirm<\/button>/);
});

test('dialog escapes text and associates each instance with its own title and message', async () => {
    const html = await renderToString(createSSRApp({
        render: () => [
            h(BaseDialog, { open: false, title: '<b>Title</b>', message: '<img src=x>' }),
            h(BaseDialog, { open: false, title: 'Other title', message: 'Other message' }),
        ],
    }));

    assert.match(html, /&lt;b&gt;Title&lt;\/b&gt;/);
    assert.match(html, /&lt;img src=x&gt;/);
    assert.doesNotMatch(html, /<b>|<img\b/);

    const associations = [...html.matchAll(/aria-labelledby="([^"]+)" aria-describedby="([^"]+)"/g)];
    assert.equal(associations.length, 2);
    assert.equal(new Set(associations.flatMap(([, titleId, messageId]) => [titleId, messageId])).size, 4);
    for (const [, titleId, messageId] of associations) {
        assert.ok(html.includes(`<h2 id="${titleId}"`));
        assert.ok(html.includes(`<p id="${messageId}"`));
    }
});

test('standalone danger buttons retain size and native attribute fallthrough', async () => {
    const html = await renderToString(createSSRApp({
        render: () => h(BaseButton, {
            variant: 'danger',
            size: 'small',
            type: 'submit',
            disabled: true,
            'aria-label': 'Delete saved preferences',
        }, () => 'Delete'),
    }));

    assert.match(html, /type="submit"/);
    assert.match(html, /danger-button size-small/);
    assert.match(html, /disabled/);
    assert.match(html, /aria-label="Delete saved preferences"/);
});

function mountDialog() {
    const node = (tag, text = '') => ({ tag, text, props: {}, children: [], parent: null });
    const renderer = createRenderer({
        createElement(tag) {
            const element = node(tag);
            if (tag === 'dialog') {
                element.open = false;
                element.showModal = () => { element.open = true; };
                element.close = () => { element.open = false; };
            }
            return element;
        },
        createText: (text) => node('#text', text),
        createComment: (text) => node('#comment', text),
        setText: (element, text) => { element.text = text; },
        setElementText: (element, text) => { element.text = text; element.children = []; },
        patchProp: (element, key, _previous, value) => { element.props[key] = value; },
        insert(element, parent, anchor = null) {
            if (element.parent) element.parent.children.splice(element.parent.children.indexOf(element), 1);
            const index = anchor ? parent.children.indexOf(anchor) : parent.children.length;
            parent.children.splice(index, 0, element);
            element.parent = parent;
        },
        remove(element) {
            element.parent.children.splice(element.parent.children.indexOf(element), 1);
            element.parent = null;
        },
        parentNode: (element) => element.parent,
        nextSibling: (element) => element.parent?.children[element.parent.children.indexOf(element) + 1] ?? null,
    });
    const state = {
        open: shallowRef(true),
        reopen: false,
        confirmed: 0,
        cancelled: 0,
    };
    const root = node('root');
    const app = renderer.createApp({
        render: () => h(BaseDialog, {
            open: state.open.value,
            'onUpdate:open': (value) => { state.open.value = value; },
            mode: 'confirm',
            title: 'Replace preferences?',
            message: 'This replaces your current preferences.',
            onConfirm: () => {
                state.confirmed++;
                if (state.reopen) state.open.value = true;
            },
            onCancel: () => { state.cancelled++; },
        }),
    });
    app.mount(root);
    const dialog = root.children.find((element) => element.tag === 'dialog');
    const actions = dialog.children.find((element) => element.props.class === 'dialog-actions');
    return { state, app, dialog, buttons: actions.children.filter((element) => element.tag === 'button') };
}

test('dialog actions synchronize the model once and parent closure does not emit an action', async (t) => {
    const { state, app, dialog, buttons } = mountDialog();
    t.after(() => app.unmount());
    await nextTick();
    assert.equal(dialog.open, true);

    buttons[0].props.onClick();
    assert.equal(dialog.open, false);
    assert.equal(state.open.value, false);
    assert.equal(state.cancelled, 1);
    assert.equal(state.confirmed, 0);
    await nextTick();
    dialog.props.onClose();
    assert.equal(state.cancelled, 1);

    state.open.value = true;
    await nextTick();
    buttons[1].props.onClick();
    await nextTick();
    assert.equal(dialog.open, false);
    assert.equal(state.confirmed, 1);

    state.open.value = true;
    await nextTick();
    state.open.value = false;
    await nextTick();
    assert.equal(dialog.open, false);
    assert.equal(state.cancelled, 1);
    assert.equal(state.confirmed, 1);
});

test('confirmation can reopen in the same tick without a queued close event cancelling it', async (t) => {
    const { state, app, dialog, buttons } = mountDialog();
    t.after(() => {
        app.unmount();
        assert.equal(dialog.open, false);
    });
    await nextTick();
    state.reopen = true;

    buttons[1].props.onClick();
    assert.equal(dialog.open, false);
    await nextTick();
    assert.equal(dialog.open, true);
    dialog.props.onClose();
    assert.equal(state.open.value, true);
    assert.equal(state.confirmed, 1);
    assert.equal(state.cancelled, 0);

});
