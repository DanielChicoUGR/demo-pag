import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import {
  LOCALHOST_URL, LIVE_URL, IS_BUILD, REPO_NAME,
} from './src/consts.ts';

let BASE_URL = LOCALHOST_URL;
let base = REPO_NAME;

// When you're building your site in local or in CI, you could just set your URL manually
if (IS_BUILD) {
  BASE_URL = LIVE_URL;
} else {
  base = '/';
}
export default defineConfig({
  site: BASE_URL,
  output: 'static',
  base,
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
});
