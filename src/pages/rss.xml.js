import rss from '@astrojs/rss';
import * as astroContent from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts.ts';

export default async function GET(context) {
  const posts = await astroContent.getCollection('blog');
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/blog/${post.slug}/`,
    })),
  });
}
