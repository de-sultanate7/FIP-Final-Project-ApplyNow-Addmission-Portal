// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: false,   // set true if you want dev to fail when port is busy
    host: true,
    watch: {
      // avoid watching node_modules (useful on Windows/OneDrive)
      ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**']
    },
    hmr: {
      overlay: true // set to false if you prefer fewer overlays
    }
  },
  optimizeDeps: {
    // add packages that are slow to pre-bundle or large
    include: ['react', 'react-dom']
  }
})