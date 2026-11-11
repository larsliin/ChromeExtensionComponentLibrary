# Chrome Extensions Component Library

A collection of reusable Vue 3 components for building accessible interfaces in Chrome extensions. The repository includes a small Vite demo app and a VitePress documentation site.

## Components

### Actions

- **BaseButton** - Button with primary, secondary, tool, and bare variants
- **BaseIconButton** - Accessible icon-only toolbar button
- **BaseCopyButton** - Copy action with temporary success feedback
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

## Design principles

- Vue 3 Composition API with `<script setup lang="ts">` and TypeScript
- Accessible, reusable APIs designed for compact extension interfaces
- Shared CSS design tokens, with dark and light themes
- Small dependency footprint; CodeMirror remains optional

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

Build and type-check the demo app:

```bash
npm run build
```

Build the documentation site:

```bash
npm run docs:build
```

The current package is private. These scripts build the demo app and documentation; they do not publish an installable npm package.
