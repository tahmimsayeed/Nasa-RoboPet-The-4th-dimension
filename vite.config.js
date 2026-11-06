import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'NASA Robo Pet Station',
        short_name: 'Robo Pet',
        description: 'An educational space adventure for young explorers.',
        start_url: '/',
        display: 'standalone',
        background_color: '#0b1026',
        theme_color: '#0b1026',
      },
    }),
  ],
})