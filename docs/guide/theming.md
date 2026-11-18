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
2. **Semantic** (`--color-*`, `--radius-*`, `--font-*`, ...) — what components consume. Theme-dependent values are defined per theme; shared values such as radii are defined once in `:root`.

## Color tokens

Override semantic color tokens rather than raw `--palette-*` values. Defaults live in the token stylesheet; theme-dependent values have separate dark and light definitions.

| Tokens | Purpose |
|--------|---------|
| `--color-bg`, `--color-panel`, `--color-panel-raised`, `--color-editor-bg` | App, panel, raised surface, and editor backgrounds |
| `--color-text`, `--color-text-muted`, `--color-border` | Text and borders |
| `--color-hover`, `--color-active`, `--color-focus` | Hover, active, and keyboard-focus feedback |
| `--color-accent`, `--color-accent-hover`, `--color-accent-active`, `--color-on-accent` | Primary action surfaces and foreground |
| `--color-danger`, `--color-danger-hover`, `--color-danger-active`, `--color-on-danger` | Destructive action surfaces and foreground, separate from error feedback |
| `--color-dialog-backdrop` | Modal dialog backdrop |
| `--color-button-secondary`, `--color-button-secondary-border`, `--color-button-secondary-hover`, `--color-button-secondary-border-hover` | Secondary button surfaces and borders |
| `--color-error`, `--color-error-bg`, `--color-error-border` | Error feedback |
| `--color-warning`, `--color-warning-bg`, `--color-warning-border` | Warning feedback |
| `--color-info`, `--color-info-bg`, `--color-info-border` | Informational feedback |

HeroButton additionally exposes these `--color-hero-*` tokens (combine the prefix with each suffix):

| Prefix | Suffixes | Purpose |
|--------|----------|---------|
| `--color-hero-` | `text`, `caption`, `text-shadow` | Text and captions |
| `--color-hero-` | `gradient-start`, `gradient-middle`, `gradient-end`, `bounce`, `border` | Surface and border |
| `--color-hero-` | `highlight`, `highlight-active`, `gloss-start`, `gloss-end`, `shadow-inset`, `shadow-active` | Gloss and inset shading |
| `--color-hero-` | `icon-bg`, `icon-sheen`, `icon-border` | Consumer-owned icon content |
| `--color-hero-disabled-` | `bg`, `border`, `text`, `icon-bg`, `icon-border`, `gloss-start`, `gloss-end`, `bounce` | Disabled appearance |

For example, `--color-hero-gradient-start` controls the beginning of the HeroButton gradient. Its enabled surface colors are shared across themes; disabled colors vary by theme.

Load overrides after the library stylesheet. Target both theme selectors when applying the same brand colors to either theme, including themed subtrees:

```css
[data-theme='dark'],
[data-theme='light'],
:root {
  --color-accent: #2563eb;
  --color-accent-hover: #1d4ed8;
  --color-accent-active: #1e40af;
  --color-on-accent: #ffffff;
}
```

Use separate `[data-theme='dark']` and `[data-theme='light']` rules for theme-specific overrides. Check foreground/background contrast when customizing colors, and see each component's "Tokens used" section for the tokens it consumes.

## Font family

Font families (font faces) are shared across dark and light themes through existing tokens:

| Token | Default | Used for |
|-------|---------|----------|
| `--font-family-base` | `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif` | Shared interface font, including ListItem and HeroButton |
| `--font-family-mono` | `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace` | Code editor |

Override these tokens after importing the library stylesheet:

```css
:root {
  --font-family-base: Arial, Helvetica, sans-serif;
}

.extension-panel {
  --font-family-base: 'Segoe UI', sans-serif;
}
```

ListItem and HeroButton inside `.extension-panel` use Segoe UI; those outside use Arial. The code editor keeps its monospace font unless `--font-family-mono` is also overridden.

The tokens select a font family; they do not download font files. For a custom font, load a locally bundled font with `@font-face` in the consuming project and use its family name in the token. Bootstrap Icons keeps its own icon font.

## Border radius

Corner radii are shared across dark and light themes:

| Token | Default | Used for |
|-------|---------|----------|
| `--radius-track` | `2px` | Range input tracks |
| `--radius-button` | `4px` | Buttons, form controls, alerts, code editor, and toggle-group inner buttons |
| `--radius-panel` | `6px` | Menu-select panel and toggle-group container |
| `--radius-surface` | `8px` | ListItem and HeroButton surfaces |
| `--radius-pill` | `999px` | Loading bar and switch track |

ListItem and HeroButton now share an 8px radius (previously 10px and 6px respectively). HeroButton's inset gloss corners follow the surface radius, with a 2px reduction clamped at zero. Other component defaults are unchanged, and existing `--radius-button` overrides continue to work.

Override tokens after importing the library stylesheet, globally or for a subtree:

```css
:root {
  --radius-surface: 10px;
}

.compact-extension-panel {
  --radius-surface: 6px;
  --radius-panel: 4px;
}
```

Both ListItem and HeroButton inside `.compact-extension-panel` use 6px corners; those outside use the global 10px value. Each semantic token can be overridden independently.

Circular controls (`50%`), the product icon's proportional silhouette (`23%`), deliberate square corners, and consumer-owned example shapes are not part of this radius scale.

## Adding a color

1. Add the semantic token to **both** the dark (`:root, [data-theme='dark']`) and light (`[data-theme='light']`) blocks.
2. If the value is identical in both themes, add a `--palette-*` entry and reference it.
3. Use the semantic token in the component and list it under "Tokens used" on the component's docs page.
