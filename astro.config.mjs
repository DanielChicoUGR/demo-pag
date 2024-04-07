import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
const SERVER_PORT = 4321;
// the url to access your blog during local development
const LOCALHOST_URL = `http://localhost:${SERVER_PORT}`;
// the url to access your blog after deploying it somewhere (Eg. Netlify)
const LIVE_URL = 'https://danielchicougr.github.io';
// this is the astro command your npm script runs
const SCRIPT = process.env.npm_lifecycle_script || '';
const isBuild = SCRIPT.includes('astro build');
let BASE_URL = LOCALHOST_URL;
let base = '';
// When you're building your site in local or in CI, you could just set your URL manually
if (isBuild) {
  BASE_URL = LIVE_URL;
  base = '/demo_pag';
}
export default defineConfig({
  site: BASE_URL,
  output: 'static',
  base: base,
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
});
