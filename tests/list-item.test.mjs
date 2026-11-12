import assert from 'node:assert/strict';
import test from 'node:test';
import { createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { BaseIconButton, BaseListItem } from '../dist/index.js';

function render(component, props, slots) {
    return renderToString(createSSRApp({
        render: () => h(component, props, slots),
    }));
}

test('list item accepts an arbitrary number of independently labelled actions', async () => {
    const actions = Array.from({ length: 12 }, (_, index) => `Action ${index + 1}`);
    const html = await render(BaseListItem, {
        'data-item-id': 'documentation',
    }, {
        icon: () => h('svg'),
        default: () => [
            h('div', { class: 'custom-info' }, [
                h('h3', 'Documentation'),
                h('p', 'https://example.com/?a=1&b=2'),
            ]),
            h('nav', { 'aria-label': 'Documentation actions' }, actions.map((label, index) =>
                h(BaseIconButton, {
                    label,
                    variant: index === 0 ? 'primary' : 'secondary',
                }, () => h('svg')))),
        ],
    });

    assert.match(html, /^<li\b[^>]*data-item-id="documentation"/);
    assert.match(html, /class="product-icon product-icon--link-mark list-item-mark"[^>]*aria-hidden="true"/);
    assert.equal((html.match(/class="product-icon /g) ?? []).length, 1);
    assert.match(html, /<h3>Documentation<\/h3>/);
    assert.match(html, /<nav aria-label="Documentation actions">/);
    assert.match(html, /https:\/\/example.com\/\?a=1&amp;b=2/);
    assert.equal((html.match(/<button\b/g) ?? []).length, actions.length);
    for (const label of actions) {
        assert.ok(html.includes(`aria-label="${label}"`));
    }
});

test('list items provide a default product icon without imposing content wrappers', async () => {
    const html = await render(BaseListItem, {}, {
        default: () => h('h2', '<Documentation>'),
    });

    assert.match(html, /<h2\b[^>]*>&lt;Documentation&gt;<\/h2>/);
    assert.match(html, /class="product-icon__default"/);
    assert.doesNotMatch(html, /class="list-item-(info|headline|actions|description)"/);
    assert.doesNotMatch(html, /<button\b/);
});

test('list items render custom icons inside the owned product badge', async () => {
    const html = await render(BaseListItem, { iconType: 'product' }, {
        icon: () => h('svg', { 'data-custom-icon': 'true' }),
        default: () => h('span', 'Custom content'),
    });

    assert.match(html, /class="product-icon list-item-mark"[^>]*aria-hidden="true"/);
    assert.match(html, /<svg data-custom-icon="true"/);
    assert.doesNotMatch(html, /product-icon__default|product-icon--link-mark/);
    assert.match(html, /<span>Custom content<\/span>/);
});

test('icon actions distinguish plain buttons from explicit toggles in every variant', async () => {
    for (const variant of [undefined, 'primary', 'secondary']) {
        const plain = await render(BaseIconButton, {
            label: 'Open documentation',
            variant,
            type: 'submit',
            disabled: true,
        });
        assert.match(plain, /type="submit"/);
        assert.match(plain, / disabled/);
        assert.match(plain, /aria-label="Open documentation"/);
        assert.match(plain, /title="Open documentation"/);
        assert.doesNotMatch(plain, /aria-pressed/);

        for (const active of [false, true]) {
            const toggle = await render(BaseIconButton, {
                label: 'Pin documentation',
                variant,
                active,
            });
            assert.ok(toggle.includes(`aria-pressed="${active}"`));
        }
    }
});
