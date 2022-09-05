import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    include: '**.*(ts|tsx)',

  })],
  base: './',
  build: {
    outDir: 'build',
  },
  server: {
    hmr: true,
    watch: {
      usePolling: true,
    },
    port: 3000,
  },
})
