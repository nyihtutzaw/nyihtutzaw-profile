import { parse } from 'rss-to-json';

export async function GET() {
  try {
    // Try multiple approaches to fetch Medium RSS
    let rssText = '';
    
    // Approach 1: Direct fetch with headers
    try {
      const response = await fetch('https://medium.com/feed/@nyihtutzaw.2015', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/rss+xml, application/xml, text/xml',
          'Accept-Language': 'en-US,en;q=0.9',
          'Referer': 'https://medium.com/',
          'DNT': '1',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1'
        },
        next: { revalidate: 1800 } // Cache for 30 minutes
      });

      if (response.ok) {
        rssText = await response.text();
        if (!rssText.includes('Just a moment...') && !rssText.includes('cf-challenge') && rssText.includes('<rss')) {
          const rss = await parse(rssText);
          if (rss.items && rss.items.length > 0) {
            return Response.json(rss);
          }
        }
      }
    } catch (error) {
      console.log('Direct fetch failed, trying alternative approach');
    }

    // Approach 2: Use RSS2JSON service as proxy
    try {
      const proxyResponse = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@nyihtutzaw.2015', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        },
        next: { revalidate: 1800 }
      });

      if (proxyResponse.ok) {
        const proxyData = await proxyResponse.json();
        if (proxyData.status === 'ok' && proxyData.items && proxyData.items.length > 0) {
          // Convert RSS2JSON format to our expected format
          const formattedData = {
            items: proxyData.items.map((item: any) => ({
              title: item.title,
              link: item.link,
              published: item.pubDate,
              description: item.description,
              content: item.content,
              image: item.thumbnail || item.enclosure?.link || '/blog-placeholder.jpg'
            })),
            title: proxyData.feed.title || 'Medium Blog Posts',
            description: proxyData.feed.description || 'Latest posts from Medium'
          };
          return Response.json(formattedData);
        }
      }
    } catch (error) {
      console.log('RSS2JSON proxy failed');
    }

    // If all approaches fail, return empty but with proper structure
    return Response.json({
      items: [],
      title: 'Medium Blog',
      description: 'Unable to fetch Medium posts at the moment'
    });

  } catch (error) {
    console.error('Blog API Error:', error);
    return Response.json({
      items: [],
      title: 'Medium Blog',
      description: 'Unable to fetch Medium posts'
    });
  }
}