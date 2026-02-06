import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["images/icons/Logo-D.png", "images/icons/logo.svg"],
      devOptions: {
        enabled: true,
        type: "module",
      },
      manifest: {
        name: "Digital Store",
        short_name: "Digital Store",
        description:
          "Sua loja online de roupas e acessórios com os melhores produtos",
        theme_color: "#E91E63",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait-primary",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/images/icons/Logo-D.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/images/icons/Logo-D.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/images/icons/Logo-D.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/images/icons/Logo-D.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "/images/icons/Logo-D.png",
            sizes: "540x720",
            type: "image/png",
            form_factor: "narrow",
            label: "Tela Inicial Mobile",
          },
          {
            src: "/images/icons/Logo-D.png",
            sizes: "1280x720",
            type: "image/png",
            form_factor: "wide",
            label: "Tela Inicial Desktop",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpeg,jpg}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  server: {
    host: true,
    port: 3030,
    strictPort: false,
    headers: {
      "Service-Worker-Allowed": "/",
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
      },
    },
  },
});
