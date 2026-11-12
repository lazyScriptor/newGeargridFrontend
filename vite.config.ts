import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // three.js lives in its own lazy chunk (the hero grid), loaded after first paint.
    chunkSizeWarningLimit: 600,
  },
})
