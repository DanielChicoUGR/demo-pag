// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Astro Blog';
export const SITE_DESCRIPTION = 'Welcome to my website!';

export const SERVER_PORT = 4321;
// the url to access your blog during local development
export const LOCALHOST_URL = `http://localhost:${SERVER_PORT}`;
// the url to access your blog after deploying it somewhere (Eg. Netlify)
export const LIVE_URL = 'https://danielchicougr.github.io';
// this is the astro command your npm script runs
export const SCRIPT = process.env.npm_lifecycle_script || '';
export const IS_BUILD = SCRIPT.includes('astro build');
export const REPO_NAME = '/demo_page';
