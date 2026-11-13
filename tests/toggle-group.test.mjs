import assert from 'node:assert/strict';
import test from 'node:test';
import { createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { BaseMenuSelect, BaseToggleGroup } from '../dist/index.js';

async function render(component, props) {
    return renderToString(createSSRApp({
        render: () => h(component, props),
    }));
}

test('toggle group renders toggle buttons and a single fold-out trigger per nested action', async () => {
    const html = await render(BaseToggleGroup, {
        label: 'Image tools',
        actions: [
            {
                id: 'crop',
                label: 'Crop',
                icon: 'bi-crop',
                active: true,
                subActions: [
                    { id: 'rectangle', label: 'Rectangle crop', icon: 'bi-crop', active: true },
                    { id: 'circle', label: 'Circle crop', icon: 'bi-circle' },
                ],
            },
            { id: 'rotate', label: 'Rotate', icon: 'bi-arrow-clockwise' },
            { id: 'grid', label: 'Grid', icon: 'bi-grid', active: true },
        ],
    });

    assert.match(html, /role="group" aria-label="Image tools"/);
    assert.match(html, /aria-label="Crop: Rectangle crop" title="Crop: Rectangle crop"[^>]*aria-expanded="false"/);
    assert.doesNotMatch(html, /aria-label="Crop"/);
    assert.match(html, /aria-label="Rotate" title="Rotate"/);
    assert.doesNotMatch(html, /aria-label="Rotate"[^>]*aria-pressed/);
    assert.match(html, /aria-label="Grid"[^>]*aria-pressed="true"/);
    assert.equal((html.match(/class="bi bi-crop"/g) ?? []).length, 1);
    assert.doesNotMatch(html, /bi-chevron/);
    assert.equal((html.match(/<button\b/g) ?? []).length, 3);
    assert.doesNotMatch(html, /role="radiogroup"/);
});

test('toggle group labels and icons are rendered as text and classes, not HTML', async () => {
    const html = await render(BaseToggleGroup, {
        label: 'Tools <group>',
        actions: [{
            id: 'unsafe',
            label: '<img src=x onerror=alert(1)>',
            icon: 'bi-crop" data-injected="yes',
        }],
    });

    assert.match(html, /Tools &lt;group&gt;/);
    assert.match(html, /&lt;img src=x onerror=alert\(1\)&gt;/);
    assert.doesNotMatch(html, /<img\b|data-injected="yes"/);
});

test('toggle group honors custom fold-out trigger titles with label fallbacks', async () => {
    const html = await render(BaseToggleGroup, {
        label: 'Image tools',
        actions: [{
            id: 'crop',
            label: 'Crop',
            title: 'Crop the image',
            icon: 'bi-crop',
            subActions: [
                { id: 'rectangle', label: 'Rectangle crop', title: 'Crop to a rectangle', icon: 'bi-crop' },
                { id: 'circle', label: 'Circle crop', icon: 'bi-circle' },
            ],
        }],
    });

    assert.match(html, /aria-label="Crop: None" title="Crop the image"/);

    const fallback = await render(BaseToggleGroup, {
        label: 'Image tools',
        actions: [{ id: 'crop', label: 'Crop', icon: 'bi-crop', subActions: [{ id: 'rectangle', label: 'Rectangle', icon: 'bi-crop' }] }],
    });
    assert.match(fallback, /aria-label="Crop: None" title="Crop: None"/);
});

test('parent and subaction disabled states affect only their intended controls', async () => {
    const parentDisabled = await render(BaseToggleGroup, {
        label: 'Tools',
        actions: [{
            id: 'crop',
            label: 'Crop',
            icon: 'bi-crop',
            disabled: true,
            subActions: [{ id: 'rectangle', label: 'Rectangle', icon: 'bi-crop' }],
        }],
    });
    assert.match(parentDisabled, /aria-label="Crop: None"[^>]*disabled/);

    const allOptionsDisabled = await render(BaseToggleGroup, {
        label: 'Tools',
        actions: [{
            id: 'crop',
            label: 'Crop',
            icon: 'bi-crop',
            subActions: [{ id: 'rectangle', label: 'Rectangle', icon: 'bi-crop', disabled: true }],
        }],
    });
    assert.match(allOptionsDisabled, /aria-label="Crop: None"[^>]*disabled/);
});

test('menu select keeps a valid trigger label when selection is disabled or absent', async () => {
    for (const modelValue of ['disabled', 'missing']) {
        const html = await render(BaseMenuSelect, {
            label: 'Mode',
            options: [
                { value: 'disabled', label: 'Disabled', disabled: true },
                { value: 'enabled', label: 'Enabled' },
            ],
            modelValue,
        });

        assert.match(html, /aria-label="Mode: (Disabled|None)" title="Mode: (Disabled|None)"/);
        assert.doesNotMatch(html, /aria-label="Mode: (Disabled|None)"[^>]*disabled/);
    }
});

test('menu select can disable its trigger independently of options', async () => {
    const html = await render(BaseMenuSelect, {
        label: 'Mode',
        options: [{ value: 'enabled', label: 'Enabled' }],
        modelValue: 'enabled',
        disabled: true,
    });

    assert.match(html, /aria-label="Mode: Enabled"[^>]*disabled/);
});
