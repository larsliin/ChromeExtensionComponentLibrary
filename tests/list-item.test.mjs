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
        headline: 'Documentation',
        description: 'https://example.com/?a=1&b=2',
        'data-item-id': 'documentation',
    }, {
        icon: () => h('svg'),
        actions: () => actions.map((label, index) => h(BaseIconButton, {
            label,
            variant: index === 0 ? 'primary' : 'secondary',
        }, () => h('svg'))),
    });

    assert.match(html, /^<li\b[^>]*data-item-id="documentation"/);
    assert.match(html, /class="list-item-mark"[^>]*aria-hidden="true"/);
    assert.match(html, /https:\/\/example.com\/\?a=1&amp;b=2/);
    assert.equal((html.match(/<button\b/g) ?? []).length, actions.length);
    for (const label of actions) {
        assert.ok(html.includes(`aria-label="${label}"`));
    }
});

test('headline-only list items do not reserve space for omitted content', async () => {
    const html = await render(BaseListItem, { headline: '<Documentation>' });

    assert.match(html, /<h2\b[^>]*>&lt;Documentation&gt;<\/h2>/);
    assert.doesNotMatch(html, /class="list-item-(mark|actions|description)"/);
    assert.doesNotMatch(html, /<button\b/);
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
