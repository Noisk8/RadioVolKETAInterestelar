import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from 'astro/config';

// Configuración básica sin proxy
const SERVER_PORT = 3000;
const SITE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://tusitio.com' 
  : `http://localhost:${SERVER_PORT}`;

export default defineConfig({
  server: { 
    port: SERVER_PORT,
    // Configura el proxy solo si es necesario
    // proxy: {
    //   '/api': {
    //     target: 'https://dev.p-node.org',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  },
  site: SITE_URL,
  integrations: [
    sitemap(),
    // For Astro v2 + @astrojs/tailwind v2, pass options at top-level
    tailwind({ applyBaseStyles: false }),
  ],
});
