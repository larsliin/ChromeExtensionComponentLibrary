# Theming

All component styling comes from CSS custom properties in [`src/styles/tokens.css`](https://github.com/larsliin/ChromeExtensionsComponentLibrary/blob/main/chrome-extension-component-library/src/styles/tokens.css). Components never contain raw color values.

## Stylesheets

| File | Purpose |
|------|---------|
| `src/styles/tokens.css` | Design tokens. **Required.** |
| `src/styles/base.css` | Optional reset for apps (box-sizing, body font, button font). |
| `src/styles/index.css` | Imports both. |

```ts
// main.ts of a consuming extension
import 'chrome-extension-component-library/src/styles/index.css'
```

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
