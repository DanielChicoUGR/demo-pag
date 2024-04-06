import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

const SITE_URL = "https://danielchicougr.github.io";
// const SITE_URL = "http://localhost:4321";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  base: "demo-pag",
  output: "static",

  integrations: [mdx(), sitemap()],
});
