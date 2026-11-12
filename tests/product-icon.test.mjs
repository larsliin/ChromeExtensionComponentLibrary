import assert from 'node:assert/strict';
import test from 'node:test';
import { createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { BaseProductIcon } from '../dist/index.js';

function render(props, slots) {
    return renderToString(createSSRApp({
        render: () => h(BaseProductIcon, props, slots),
    }));
}

test('product icons retain their default treatment unless link-mark is selected', async () => {
    for (const type of [undefined, 'product', 'link-mark']) {
        const html = await render({ type });

        assert.equal(html.includes('product-icon--link-mark'), type === 'link-mark');
        assert.match(html, /aria-hidden="true"/);
        assert.match(html, /<svg\b/);
        assert.doesNotMatch(html, /\stype=/);
    }
});

test('link-mark icons preserve accessible labels, custom content, and sizing attributes', async () => {
    const html = await render({
        type: 'link-mark',
        label: 'Documentation',
        style: '--product-icon-size:38px',
    }, {
        default: () => h('i', { class: 'bi bi-book-half', 'aria-hidden': 'true' }),
    });

    assert.match(html, /role="img"/);
    assert.match(html, /aria-label="Documentation"/);
    assert.match(html, /style="--product-icon-size:38px;?"/);
    assert.match(html, /<i\b[^>]*class="bi bi-book-half"/);
    assert.doesNotMatch(html, /<svg\b/);
});
