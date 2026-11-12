# Chrome Extensions Component Library

A collection of reusable Vue 3 components for building accessible interfaces in Chrome extensions. The repository includes a small Vite demo app and a VitePress documentation site.

## Components

### Actions

- **BaseButton** - Button with primary, secondary, tool, and bare variants
- **BaseCopyButton** - Clipboard button with temporary success feedback and stable width
- **BaseIconButton** - Accessible icon-only toolbar button
- **BaseHeroButton** - Large glossy call-to-action with custom slot content

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

See the [component documentation](docs/components/index.md) for the component overview, examples, and API details.

For copy actions, use [BaseCopyButton](docs/components/base-copy-button.md) for temporary success feedback without layout shifts. The `useCopyToClipboard` composable remains available for custom or shared copy interactions.

All icons use the locally bundled `bootstrap-icons` package. See the [icon setup and usage](docs/guide/theming.md#icons).

## Design principles

- Vue 3 Composition API with `<script setup lang="ts">` and TypeScript
- Accessible, reusable APIs designed for compact extension interfaces
- Shared CSS design tokens, with dark and light themes
- Small dependency footprint; CodeMirror remains optional

## Build and install from GitHub

### In the component library repository

1. Install the development dependencies. The `prepare` script also builds the package:

   ```bash
   npm install
   ```

2. After making component changes, run the package build to type-check and verify the output:

   ```bash
   npm run build
   ```

   This creates the distributable files in `dist/`. Keep `dist/` out of Git; Git-based installs rebuild it from source.
3. Commit and push the package source, build configuration, and `prepare` script to the branch you plan to install, for example `main`.

### In the consuming project

1. Make sure the GitHub repository is public or that the installing user has access.
2. From the consuming Vue 3 project's directory, install the library and Vue:

   ```bash
   npm install github:larsliin/ChromeExtensionsComponentLibrary#main vue
   ```

   npm fetches the pushed repository and runs its `prepare` script, which builds `dist/` for the installed package. No tarball or committed build output is needed.
3. Import the stylesheet once in the app entry point and import components where needed:

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

The CodeMirror editor is available separately from `chrome-extension-component-library/code-editor`. Install its peer dependencies only if you use it. After publishing to npm, projects can instead install it with `npm install chrome-extension-component-library vue`.

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

## Other build commands

To create an optional local tarball (not required for GitHub installs):

```bash
npm pack
```

npm runs `prepare` and writes a `.tgz` file to the current directory. Install it in another project with `npm install <path-to-tarball>`.

Build the demo app instead:

```bash
npm run build:demo
```

Build the documentation site:

```bash
npm run docs:build
```
