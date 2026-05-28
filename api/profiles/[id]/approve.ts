import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabaseAdmin } from '../../../lib/supabase';
import { dbProfileToFrontend } from '../../../lib/mappers';
import { isAuthorized, unauthorized, setCors } from '../../../lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Методот не е дозволен.' });
  if (!isAuthorized(req)) return unauthorized(res);

  const id = req.query.id as string;
  if (!id) return res.status(400).json({ error: 'ID е задолжително.' });

  const { data, error } = await supabaseAdmin
    .from('profiles')
    .update({ is_pending: false, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    if (error.code === 'PGRST116') return res.status(404).json({ error: 'Профилот не е пронајден.' });
    return res.status(500).json({ error: error.message });
  }

  return res.json({ success: true, profile: dbProfileToFrontend(data) });
}
