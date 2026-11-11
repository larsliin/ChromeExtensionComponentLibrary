import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
  plugins: [vue()],
  ...(mode === 'package'
    ? {
        publicDir: false,
        build: {
          lib: {
            entry: {
              index: resolve(import.meta.dirname, 'src/library.ts'),
              'code-editor': resolve(import.meta.dirname, 'src/code-editor.ts'),
            },
            formats: ['es'],
          },
          rollupOptions: {
            external: [/^vue(?:\/|$)/, /^@codemirror\//],
          },
        },
      }
    : {}),
}))
