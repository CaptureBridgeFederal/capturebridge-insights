// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// IMPORTANT: set `site` to the exact URL where this will be served.
// - Subdomain deploy (recommended v1): https://insights.capturebridgefederal.com
// - Subdirectory deploy (best SEO, phase 2): https://capturebridgefederal.com  + base: '/insights'
export default defineConfig({
  site: 'https://insights.capturebridgefederal.com',
  integrations: [sitemap()],
});
