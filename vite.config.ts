import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  base: "/omnicore/",
  css: {
    preprocessorOptions: {
      scss: {
        //includePaths: ['node_modules'],
      },
    },
  },
  server: {
    allowedHosts: ["localhost", "test.OmniCore"]
  }
})
