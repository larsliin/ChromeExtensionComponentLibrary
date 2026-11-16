# Chrome Extensions Component Library

A collection of reusable Vue 3 components for building accessible interfaces in Chrome extensions. The repository includes a small Vite demo app and a VitePress documentation site.

## Components

### Actions

- **BaseButton** - Button with primary, secondary, tool, and bare variants
- **BaseCopyButton** - Clipboard button with temporary success feedback and stable width
- **BaseIconButton** - Accessible icon-only button with toolbar, primary, and filled secondary variants
- **BaseHeroButton** - Large glossy call-to-action with custom slot content

### Lists

- **[BaseListItem](docs/components/base-list-item.md)** - Built-in product icon and a default slot for custom row content

### Form fields

- **BaseSelect** - Native select field
- **BaseMenuSelect** - Compact custom dropdown
- **BaseCheckbox** - Checkbox with optional label
- **[BaseSwitch](docs/components/base-switch.md)** - Compact labeled on/off control
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

## Install from a GitHub Release

### In the consuming project

1. From the consuming Vue 3 project's directory, install the versioned package and Vue:

   ```bash
   npm install https://github.com/larsliin/ChromeExtensionComponentLibrary/releases/download/v0.1.0/chrome-extension-component-library-0.1.0.tgz vue
   ```

   npm downloads the prebuilt JavaScript, CSS, and TypeScript declarations. No
   GitHub login, library checkout, or library build is required for public releases.
2. Commit both `package.json` and `package-lock.json`. On another device, run
   `npm install` after cloning the consuming project, or `npm ci` for an exact
   lockfile install. No sibling `packages/` directory is needed.
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

The CodeMirror editor is available separately from `chrome-extension-component-library/code-editor`. Install its peer dependencies only if you use it.

### Publishing a new version

Use Node.js 24 and npm to develop and release the library. Keep `dist/` and
generated `.tgz` files out of Git.

1. Install dependencies with `npm ci`. Finish and commit your library changes,
   switch to `main`, and sync it with GitHub. The working tree must be clean.
2. Run the release command:

   ```bash
   npm run release -- patch
   ```

   | Command | Example starting at `0.1.0` | Use for |
   | --- | --- | --- |
   | `npm run release -- patch` | `0.1.1` | Fixes and small compatible changes |
   | `npm run release -- minor` | `0.2.0` | New features; breaking changes while pre-1.0 |
   | `npm run release -- major` | `1.0.0` | First stable release; breaking changes after 1.0 |

   Running `npm run release` without an argument defaults to `patch`.
   Use `npm run release -- --help` to display usage.
3. The script fetches `origin/main` and tags, refuses an outdated branch or an
   existing target tag, calculates the next version from `package.json`, and runs
   `npm test`. Type **`yes`** when asked to create the version commit and tag.
   It updates both version files, commits them, and creates a matching annotated
   tag automatically. It never moves or overwrites an old tag.
4. The script then asks separately whether to push. Type **`yes`** to push the
   commit and new tag together to `origin` and trigger the release workflow.
   Any other answer leaves them local and prints the exact command to publish
   later. Do not rerun the release command just to push a locally created release:
   that would start another version bump.
5. The `Release package` workflow checks that the tag matches the package version,
   installs dependencies, builds and tests the library, then runs `npm pack` and
   attaches the archive to a GitHub Release. It uses the workflow's `GITHUB_TOKEN`;
   no npm registry account or publishing token is needed.
6. Wait for the workflow to succeed on the repository's Actions page. The script
   prints the version-specific `npm install` command to run in each consuming
   project, for example:

   ```bash
   npm install https://github.com/larsliin/ChromeExtensionComponentLibrary/releases/download/v0.1.1/chrome-extension-component-library-0.1.1.tgz
   npm run build:extension
   ```

   Commit the consumer's updated `package.json` and `package-lock.json`. On other
   devices, sync that project and run `npm install` as usual.

The script requires Git, npm, and access to the `origin` remote. Publishing needs
write access. If a command fails, it reports the error and stops; inspect
`git status` before retrying, especially if version creation already started.

Always use an explicit version URL, not a `latest` URL. Never replace an existing
release archive or move its tag: a changed build must get a new version so that
lockfile integrity checks and installs remain reproducible. Release archives are
assets produced by `npm pack`, not GitHub's automatic source-code archives.

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

To create a local tarball for testing (not required for release-based installs):

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

Build the library and run the component regression tests:

```bash
npm test
```
