# Theming

All component styling comes from CSS custom properties in [`src/styles/tokens.css`](https://github.com/larsliin/ChromeExtensionsComponentLibrary/blob/main/src/styles/tokens.css). Components never contain raw color values.

## Stylesheets

| File | Purpose |
|------|---------|
| `src/styles/tokens.css` | Design tokens. **Required.** |
| `src/styles/base.css` | Optional reset for apps (box-sizing, body font, button font). |
| `src/styles/index.css` | Imports tokens, base styles and Bootstrap Icons. |

```ts
// main.ts of a consuming extension
import 'chrome-extension-component-library/style.css'
```

## Icons

All component icons use Bootstrap Icons from the library stylesheet, not a CDN. Import `chrome-extension-component-library/style.css` to load its icon styles and local font assets.

Use Bootstrap Icon classes in icon slots, with the accessible name on the control:

```vue
<BaseButton variant="tool" aria-label="Refresh">
  <i class="bi bi-arrow-clockwise" aria-hidden="true" />
</BaseButton>
```

Icon size follows `font-size`; icons inherit the control's color.

## Themes

Dark is the default. Switch to light with `data-theme="light"` on `<html>` — or on any element to theme just that subtree:

```ts
document.documentElement.setAttribute('data-theme', 'light')
```

## Token layers

1. **Palette** (`--palette-*`) — raw brand values shared across themes (e.g. `--palette-green-500: #1D9E75`). Components must not use these directly.
2. **Semantic** (`--color-*`, `--radius-*`, `--font-*`, ...) — what components consume. Defined once per theme.

## Adding a color

1. Add the semantic token to **both** the dark (`:root, [data-theme='dark']`) and light (`[data-theme='light']`) blocks.
2. If the value is identical in both themes, add a `--palette-*` entry and reference it.
3. Use the semantic token in the component and list it under "Tokens used" on the component's docs page.
