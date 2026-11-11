# Chrome Extensions Component Library

A collection of reusable Vue 3 components for building accessible interfaces in Chrome extensions. The repository includes a small Vite demo app and a VitePress documentation site.

## Components

### Actions

- **BaseButton** - Button with primary, secondary, tool, and bare variants
- **BaseCopyButton** - Clipboard button with temporary success feedback and stable width
- **BaseIconButton** - Accessible icon-only toolbar button
- **BaseHeroButton** - Large call-to-action with icon and caption

### Form fields

- **BaseSelect** - Native select field
- **BaseMenuSelect** - Compact custom dropdown
- **BaseCheckbox** - Checkbox with optional label
- **BaseNumberInput** - Number field
- **BaseRangeInput** - Range slider
- **BaseCodeEditor** - CodeMirror editor; CodeMirror is an optional peer dependency

### Feedback

- **BaseAlert** - Error, warning, and information messages
- **BaseLoadingBar** - Indeterminate progress indicator

See the [component documentation](docs/components/index.md) for examples and API details.

For copy actions, use [BaseCopyButton](docs/components/base-copy-button.md) for temporary success feedback without layout shifts. The `useCopyToClipboard` composable remains available for custom or shared copy interactions.

All icons use the locally bundled `bootstrap-icons` package. See the [icon setup and usage](docs/guide/theming.md#icons).

## Design principles

- Vue 3 Composition API with `<script setup lang="ts">` and TypeScript
- Accessible, reusable APIs designed for compact extension interfaces
- Shared CSS design tokens, with dark and light themes
- Small dependency footprint; CodeMirror remains optional

## Install in another project

### Install from GitHub

1. Commit and push the package source, build configuration, and `prepare` script to the branch you want to install. Do not commit `dist/`; the `prepare` script builds it during installation.
2. In the consuming Vue 3 project, install the package from GitHub:

   ```bash
   npm install github:larsliin/ChromeExtensionsComponentLibrary#main vue
   ```

   The repository must be public or the installing user must have GitHub access.
3. Import the library stylesheet once in the app entry point, then import components where needed:

   ```ts
   // src/main.ts
   import 'chrome-extension-component-library/style.css'
   ```

   ```vue
   <script setup lang="ts">
   import { BaseButton } from 'chrome-extension-component-library'
   </script>

   <template>
     <BaseButton variant="primary">Continue</BaseButton>
   </template>
   ```

### Install from npm

After publishing the package, install it with:

```bash
npm install chrome-extension-component-library vue
```

The CodeMirror editor is available separately from `chrome-extension-component-library/code-editor`. Install its peer dependencies only if you use it.

## Development

Install the development dependencies:

```bash
npm install
```

Run the demo app:

```bash
npm run dev
```

Run the documentation site at `http://localhost:9001`:

```bash
npm run docs:dev
```

## Build

From the library repository root:

1. Install the development dependencies:

   ```bash
   npm install
   ```

2. Build and type-check the installable package (ES modules, CSS, and TypeScript declarations):

   ```bash
   npm run build
   ```

   GitHub installs run this build automatically through `prepare`.
3. Optionally create a local tarball:

   ```bash
   npm pack
   ```

   npm writes a `.tgz` file to the current directory. Install it in another project with `npm install <path-to-tarball>`. You can publish it with `npm publish` when ready to release.

Build the demo app instead:

```bash
npm run build:demo
```

Build the documentation site:

```bash
npm run docs:build
```
