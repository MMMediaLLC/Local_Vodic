import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabaseAdmin } from './_lib/supabase';

const BASE = 'https://vodic.gostivarpress.mk';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const { data: profiles, error } = await supabaseAdmin
    .from('profiles')
    .select('slug, updated_at')
    .eq('is_pending', false)
    .eq('is_active', true)
    .order('updated_at', { ascending: false });

  if (error) return res.status(500).send('<!-- sitemap error -->');

  const staticUrls: { loc: string; priority: string; changefreq: string; lastmod?: string }[] = [
    { loc: `${BASE}/`,                priority: '1.0', changefreq: 'daily' },
    { loc: `${BASE}/prijavi-subjekt`, priority: '0.6', changefreq: 'monthly' },
  ];

  const profileUrls = (profiles ?? []).map(p => ({
    loc: `${BASE}/profil/${p.slug}`,
    lastmod: p.updated_at ? p.updated_at.slice(0, 10) : undefined,
    priority: '0.8',
    changefreq: 'weekly',
  }));

  const allUrls = [...staticUrls, ...profileUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  return res.status(200).send(xml);
}
