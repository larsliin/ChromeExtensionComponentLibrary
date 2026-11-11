# Chrome Extensions Component Library

A lightweight Vue 3 component library for building accessible, reusable interfaces in Chrome extensions.

## Purpose and scope

Build and maintain reusable components and composables for Chrome extension interfaces:
1. Provide clear, typed component APIs that are easy to consume
2. Keep components accessible, focused, and consistent with the shared design system
3. Document components and usage for library consumers

Keep the library simple and focused. Do not add a specific extension's workflows, browser services, or unrelated features unless explicitly requested.

## Stack and implementation

- **Frontend**: Vue 3 with Composition API, `<script setup lang="ts">`, and TypeScript
- **Build tool**: Vite
- **Documentation**: VitePress
- **Project structure**:
  - `src/components/` - reusable Vue components
  - `src/composables/` - reusable stateful behavior
  - `src/index.ts` - public component, composable, and type exports
  - `src/styles/tokens.css` - shared palette and semantic design tokens
  - `src/styles/index.css` - token and optional base stylesheet entry point
  - `docs/components/` and `docs/guide/` - VitePress documentation
- Keep Vue component files under 500 lines; split into smaller focused components when appropriate
- Use the existing Vite setup and npm scripts; add dependencies only when necessary

## Component design and styling

- Design components for reuse across Chrome extension surfaces; do not assume one popup, workflow, or fixed popup size.
- Use typed props, emitted events, and `v-model` only for intentional two-way bindings.
- Prefer native semantic HTML and preserve useful native attributes and event fallthrough.
- Use the CSS custom properties from `src/styles/tokens.css` instead of raw color values in component styles.
- Support the existing dark default theme and light theme. Add new semantic color tokens to both theme blocks.
- Keep CodeMirror an optional peer dependency unless explicitly requested otherwise.
- Use accessible names, keyboard-operable controls, visible focus, and clear disabled, loading, and feedback states.

## Documentation

- Add or update the relevant VitePress page when adding or changing a public component or composable.
- Keep `docs/components/index.md` synchronized with the available components.
- Follow the existing `<ComponentPreview>` convention and document usage, public props/events/slots, and tokens as applicable.

## Building and testing

- Run `npm run build` for source changes.
- Run `npm run docs:build` for documentation changes; run both when a change affects both.
- Run relevant existing tests when available, and do not claim browser or accessibility validation unless it was performed.
- Do not edit generated output in `dist/` or `docs/.vitepress/dist/` by hand.

### Git: never commit or push without permission

If multiple files have been edited, first ask: "Should the files be committed as one commit or in related commits?"

**Never** run `git commit` or `git push` (or any equivalent) on your own — not even when you have permission to execute commands without confirmation. Always ask the user first and wait for an explicit "yes" before committing or pushing. This applies to every branch, every change, and every situation, no exceptions.

Do not ask the user to provide or approve a commit message. Infer a concise, appropriate commit message from the changes.

When asking for permission or gathering additional information needed for the commit:
- Use the `vscode_askQuestions` tool to present options and collect structured user input
- Offer predefined options for commit grouping, target branch, or push destination when applicable
- Clearly describe what will happen and why you need confirmation
- Wait for the user's response before running the git operation

After a commit is successfully created, the next action must be a `vscode_askQuestions` call asking whether to push the commit(s). Do not end the turn with a status-only message or run `git push` before receiving the user's answer. Use predefined yes/no options to make this as simple as possible, and only push after an explicit yes.

If a push to GitHub over HTTPS is blocked because Git is not authenticated:
- Ask the user to authenticate through Git Credential Manager.
- Run `git credential-manager github login` in an interactive terminal so the user can complete sign-in. If the agent's terminal cannot open interactive authentication, ask the user to run the command in their own terminal.
- Wait for authentication to complete before retrying the authorized push. Authentication does not replace the explicit permission required to push.
- Never ask the user to paste passwords or access tokens into chat or store them in repository files.
