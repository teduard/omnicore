import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import type { VitePWAOptions } from 'vite-plugin-pwa'
//import replace from '@rollup/plugin-replace'

const base = '/omnicore/';
const name = 'OmniCore';

//const replaceOptions = { __DATE__: new Date().toISOString() }

const pwaOptions: Partial<VitePWAOptions> = {
        mode: 'development',
        base: base,
        ///registerType: 'autoUpdate',
        //injectRegister: 'auto',
        includeAssets: ['favicon.ico'],  
        workbox: {
          clientsClaim: true,
          skipWaiting: true,
          maximumFileSizeToCacheInBytes: 3000000
        },
        manifest: {
          start_url: `${base}/?mode=standalone`,
          scope: base,
          display: 'standalone',
          name: name,
          short_name: name,
          theme_color: '#1f2937',
          icons: [
            {
              src: `${base}assets/android-chrome-192x192.png`,
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src:  `${base}assets/android-chrome-512x512.png`,
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        },
        devOptions: { enabled: false, type: 'module', navigateFallback: 'index.html' }
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(),
      // tailwindcss(),
      // visualizer({
      //   //open: true,        // auto-opens in browser after build
      //   gzip: true,        // shows gzipped sizes (more realistic)
      //   filename: "stats.html",
      // }),

      VitePWA(pwaOptions),
      //replace(replaceOptions),
    ],
  base: base,
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       //includePaths: ['node_modules'],
  //     },
  //   },
  // },
  // server: {
  //   allowedHosts: ["localhost", "test.OmniCore", "192.168.100.2"]
  // },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          webllm: ["@mlc-ai/web-llm"],
        },
      },
    },
  },
})
