import assert from 'node:assert/strict';
import test from 'node:test';
import { createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { BaseSpinner } from '../dist/index.js';

function render(props) {
    return renderToString(createSSRApp({
        render: () => h(BaseSpinner, props),
    }));
}

test('spinners default to medium with an accessible indeterminate loading state', async () => {
    const html = await render();

    assert.match(html, /class="spinner spinner--medium"/);
    assert.match(html, /role="progressbar"/);
    assert.match(html, /aria-label="Loading"/);
    assert.match(html, /class="spinner__indicator" aria-hidden="true"/);
    assert.doesNotMatch(html, /aria-valuenow/);
});

test('spinners support each size and preserve custom labels and native attributes', async () => {
    for (const size of ['small', 'medium', 'large']) {
        const html = await render({
            size,
            label: 'Loading settings',
            id: 'settings-spinner',
            class: 'custom-spinner',
        });

        assert.match(html, new RegExp(`class="spinner spinner--${size} custom-spinner"`));
        assert.match(html, /aria-label="Loading settings"/);
        assert.match(html, /id="settings-spinner"/);
        assert.doesNotMatch(html, /\ssize=/);
    }
});
