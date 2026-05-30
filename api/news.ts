import type { VercelRequest, VercelResponse } from '@vercel/node';

// Ги враќа последните 10 вести од RSS-от на gostivarpress.mk.
// Серверски (за да нема CORS проблем при fetch од прелистувач).
export default async function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const FEEDS = [
    'https://gostivarpress.mk/feed/',
    'https://gostivarpress.mk/rss',
  ];

  try {
    let xml = '';
    for (const url of FEEDS) {
      try {
        const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (GPRESS Vodic)' } });
        if (r.ok) {
          xml = await r.text();
          if (xml.includes('<item')) break;
        }
      } catch { /* пробај следен */ }
    }

    const items: { title: string; link: string }[] = [];
    const itemRe = /<item[\s\S]*?<\/item>/g;
    const blocks = xml.match(itemRe) ?? [];

    for (const block of blocks) {
      if (items.length >= 10) break;
      const titleM = block.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/);
      const linkM = block.match(/<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/);
      const title = (titleM?.[1] ?? '').trim();
      const link = (linkM?.[1] ?? '').trim();
      if (title) items.push({ title, link });
    }

    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=1200');
    return res.status(200).json({ items });
  } catch {
    return res.status(200).json({ items: [] });
  }
}
