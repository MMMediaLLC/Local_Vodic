import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabaseAdmin } from '../_lib/supabase.js';
import { dbProfileToFrontend, frontendProfileToDb } from '../_lib/mappers.js';
import { isAuthorized, unauthorized, setCors } from '../_lib/auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  // ── POST /api/profiles — add new profile (admin only) ─────────
  if (req.method === 'POST') {
    if (!isAuthorized(req)) return unauthorized(res);

    const row = frontendProfileToDb({ ...req.body, isPending: false });

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .insert(row)
      .select()
      .single();

    if (error) return res.status(500).json({
      error: error.message, code: error.code,
      details: (error as any).details, hint: (error as any).hint,
    });

    return res.status(201).json({ success: true, profile: dbProfileToFrontend(data) });
  }

  return res.status(405).json({ error: 'Методот не е дозволен.' });
}
