import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { cpSync } from 'node:fs'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), {
    name: 'copy-invitation-runtime',
    apply: 'build',
    closeBundle() {
      // The active invitation loads its existing browser bundle as a classic script.
      for (const file of ['resources', 'wedding-data.js', 'wedding.json']) {
        cpSync(resolve(file), resolve('dist', file), { recursive: true })
      }
    }
  }],
  server: {
    port: 3000,
    open: true
  }
})
