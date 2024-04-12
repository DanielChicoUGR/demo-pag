/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        color1: '#1a1a1a',
      },
      backgroundImage: (theme) => ({
        'gradient-footer': 'linear-gradient(#1a1a1a 0%, #393F33 100%)',
      }),
    },
  },
  plugins: [],
};
