import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/slipstream',
  build: {
    outDir: '../resources/slipstream/',
    emptyOutDir: true,
  }
})
