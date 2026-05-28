import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabaseAdmin } from '../lib/supabase';
import {
  dbProfileToFrontend,  frontendProfileToDb,
  dbCategoryToFrontend, frontendCategoryToDb,
  dbLocationToFrontend, frontendLocationToDb,
  dbContactToFrontend,  frontendContactToDb,
  dbArticleToFrontend,  frontendArticleToDb,
} from '../lib/mappers';
import { isAuthorized, unauthorized, setCors } from '../lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  // ── GET /api/data ─────────────────────────────────────────────
  if (req.method === 'GET') {
    const adminView = isAuthorized(req);
    const profilesQ = adminView
      ? supabaseAdmin.from('profiles').select('*').order('created_at', { ascending: false })
      : supabaseAdmin.from('profiles').select('*').eq('is_pending', false).order('created_at', { ascending: false });

    const [p, c, l, ct, a] = await Promise.all([
      profilesQ,
      supabaseAdmin.from('categories').select('*').order('created_at', { ascending: true }),
      supabaseAdmin.from('locations') .select('*').order('name'),
      supabaseAdmin.from('contacts')  .select('*').order('category'),
      supabaseAdmin.from('articles')  .select('*').order('created_at', { ascending: false }),
    ]);

    if (p.error)  return res.status(500).json({ error: p.error.message });
    if (c.error)  return res.status(500).json({ error: c.error.message });
    if (l.error)  return res.status(500).json({ error: l.error.message });
    if (ct.error) return res.status(500).json({ error: ct.error.message });
    if (a.error)  return res.status(500).json({ error: a.error.message });

    return res.json({
      profiles:   (p.data  ?? []).map(dbProfileToFrontend),
      categories: (c.data  ?? []).map(dbCategoryToFrontend),
      locations:  (l.data  ?? []).map(dbLocationToFrontend),
      contacts:   (ct.data ?? []).map(dbContactToFrontend),
      articles:   (a.data  ?? []).map(dbArticleToFrontend),
    });
  }

  // ── POST /api/data — bulk upsert (admin only) ─────────────────
  if (req.method === 'POST') {
    if (!isAuthorized(req)) return unauthorized(res);

    const { profiles, categories, locations, contacts, articles } = req.body ?? {};

    const ops = await Promise.all([
      profiles   ? supabaseAdmin.from('profiles')  .upsert((profiles   as any[]).map(frontendProfileToDb),  { onConflict: 'id' }) : Promise.resolve({ error: null }),
      categories ? supabaseAdmin.from('categories').upsert((categories as any[]).map(frontendCategoryToDb), { onConflict: 'id' }) : Promise.resolve({ error: null }),
      locations  ? supabaseAdmin.from('locations') .upsert((locations  as any[]).map(frontendLocationToDb), { onConflict: 'id' }) : Promise.resolve({ error: null }),
      contacts   ? supabaseAdmin.from('contacts')  .upsert((contacts   as any[]).map(frontendContactToDb),  { onConflict: 'id' }) : Promise.resolve({ error: null }),
      articles   ? supabaseAdmin.from('articles')  .upsert((articles   as any[]).map(frontendArticleToDb),  { onConflict: 'id' }) : Promise.resolve({ error: null }),
    ]);

    const failed = ops.find(o => o.error);
    if (failed) return res.status(500).json({ error: (failed as any).error.message });

    return res.json({ success: true });
  }

  return res.status(405).json({ error: 'Методот не е дозволен.' });
}
