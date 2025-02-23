import { parse } from 'rss-to-json';

export async function GET() {
  try {
    const rss = await parse('https://medium.com/feed/@nyihtutzaw.2015');
    return Response.json(rss);
  } catch (_err) {
    console.log(_err);
    return Response.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}