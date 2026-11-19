// @ts-check
import { defineConfig } from 'astro/config';

// Static output for Cloudflare Pages. The enquiry endpoint will live in
// /functions as a Cloudflare Pages Function, so no Astro adapter is needed.
export default defineConfig({
  output: 'static',
  // Replace with the real domain once it is chosen.
  site: 'https://example.com',
});
