import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabaseAdmin } from '../../../lib/supabase';
import { dbProfileToFrontend, frontendProfileToDb } from '../../../lib/mappers';
import { isAuthorized, unauthorized, setCors } from '../../../lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const id = req.query.id as string;
  if (!id) return res.status(400).json({ error: 'ID е задолжително.' });

  // ── PUT /api/profiles/:id — upsert profile (admin only) ─────────
  if (req.method === 'PUT') {
    if (!isAuthorized(req)) return unauthorized(res);

    const row = { ...frontendProfileToDb(req.body), id };

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .upsert(row, { onConflict: 'id' })
      .select()
      .single();

    if (error) return res.status(500).json({
      error: error.message, code: error.code,
      details: (error as any).details, hint: (error as any).hint,
    });

    return res.json({ success: true, profile: dbProfileToFrontend(data) });
  }

  // ── DELETE /api/profiles/:id — delete profile (admin only) ────
  if (req.method === 'DELETE') {
    if (!isAuthorized(req)) return unauthorized(res);

    const { error, count } = await supabaseAdmin
      .from('profiles')
      .delete({ count: 'exact' })
      .eq('id', id);

    if (error) return res.status(500).json({
      error: error.message, code: error.code,
      details: (error as any).details, hint: (error as any).hint,
    });
    if (count === 0) return res.status(404).json({ error: 'Профилот не е пронајден.' });

    return res.json({ success: true });
  }

  return res.status(405).json({ error: 'Методот не е дозволен.' });
}
