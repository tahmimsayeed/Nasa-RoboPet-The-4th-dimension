
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const isRender = process.env.RENDER_DEPLOY === "true";

const repositoryBase = "/Nasa-RoboPet-The-4th-dimension/";
const basePath = isRender ? "/" : repositoryBase;

export default defineConfig({
  base: basePath,

  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      includeAssets: [
        "favicon.svg",
        "icons/pwa-192.png",
        "icons/pwa-512.png",
      ],

      manifest: {
        id: basePath,
        name: "NASA Robo-Pet Station",
        short_name: "Robo-Pet",
        description:
          "Build a robot pet, explore NASA missions, and create space adventures.",

        start_url: basePath,
        scope: basePath,
        display: "standalone",
        background_color: "#0b1026",
        theme_color: "#0b1026",
        orientation: "any",

        icons: [
          {
            src: "icons/pwa-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icons/pwa-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icons/pwa-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,webmanifest}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
      },
    }),
  ],
});
