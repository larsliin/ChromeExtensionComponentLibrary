# Chrome Extensions Component Library

A collection of reusable Vue 3 components for building accessible interfaces in Chrome extensions. The repository includes a small Vite demo app and a VitePress documentation site.

## Components

### Actions

- **[BaseButton](docs/components/base-button.md)** - Button with primary, secondary, tool, and bare variants
- **[BaseCopyButton](docs/components/base-copy-button.md)** - Clipboard button with temporary success feedback and stable width
- **[BaseIconButton](docs/components/base-icon-button.md)** - Accessible icon-only button with toolbar, primary, and filled secondary variants
- **[BaseHeroButton](docs/components/base-hero-button.md)** - Large glossy call-to-action with custom slot content

### Lists

- **[BaseListItem](docs/components/base-list-item.md)** - Built-in product icon and a default slot for custom row content

### Form fields

- **[BaseSelect](docs/components/base-select.md)** - Native select field
- **[BaseMenuSelect](docs/components/base-menu-select.md)** - Compact custom dropdown
- **[BaseCheckbox](docs/components/base-checkbox.md)** - Checkbox with optional label
- **[BaseSwitch](docs/components/base-switch.md)** - Compact labeled on/off control
- **[BaseNumberInput](docs/components/base-number-input.md)** - Number field
- **[BaseRangeInput](docs/components/base-range-input.md)** - Range slider
- **[BaseCodeEditor](docs/components/base-code-editor.md)** - CodeMirror editor; CodeMirror is an optional peer dependency

### Feedback

- **[BaseAlert](docs/components/base-alert.md)** - Error, warning, and information messages
- **[BaseLoadingBar](docs/components/base-loading-bar.md)** - Indeterminate progress indicator

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

Packages are created **manually in GitHub Actions**, never on a normal push or tag
push. No local version-bump command or manual tag is needed.

1. Finish your library changes, commit them, and push to `main` as usual.
2. Open [Actions > Create package](https://github.com/larsliin/ChromeExtensionComponentLibrary/actions/workflows/release.yml).
3. Open GitHub's **Run workflow** dropdown, keep the branch set to **main**, and
   select a version increment:

   | Increment | Example starting at `0.1.3` | Use for |
   | --- | --- | --- |
   | `patch` (default) | `0.1.4` | Fixes and small compatible changes |
   | `minor` | `0.2.0` | New features; breaking changes while pre-1.0 |
   | `major` | `1.0.0` | First stable release; breaking changes after 1.0 |

4. Click **Run workflow**. GitHub controls this button's label; the workflow is
   named **Create package**.
5. Open the run. **Determine package version** logs the exact version and baseline.
   The workflow installs dependencies, sets the generated package's version, runs
   the build and tests, packs the `.tgz`, and publishes a matching release and tag.
6. When the run succeeds, its **Summary** shows the published package version,
   release link, and exact `npm install` command. Run that command in each consumer,
   then run `npm run build:extension` and commit its updated `package.json` and
   `package-lock.json`. Other devices only need to sync and run `npm install`.

The version baseline is the higher of the latest published release and the source
`package.json` version. With no releases, the source version is used. Each manual
run increments that baseline once. Runs are serialized, and existing tags or
releases are never overwritten.

**No automatic source commits:** version files are changed only in the temporary
Actions checkout for packaging, not committed back to `main`. The release tag
points to the source commit used to build the package; its source version files
may therefore differ from the published archive's version. The GitHub Release,
archive metadata, and run summary record the published version. This keeps all
source commits under your control.

Publishing requires repository write access and uses the workflow's
`GITHUB_TOKEN`; no npm account or publishing token is needed. If a run fails,
inspect its logs before retrying. A partially created release or reserved tag
causes an explicit error rather than being silently replaced. Keep `dist/` and
generated `.tgz` files out of Git. The previous `npm run release` command has been
removed in favor of this single manual workflow.

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
