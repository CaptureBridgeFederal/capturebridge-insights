import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('insights', ({ data }) => !data.draft))
    .sort((a, b) => new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf());
  return rss({
    title: 'CaptureBridge Insights',
    description: 'Federal business development and capture insights from CaptureBridge Federal Advisors.',
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: `/${p.id}/`,
    })),
  });
}
