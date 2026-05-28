import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabaseAdmin } from '../../_lib/supabase';
import { dbProfileToFrontend } from '../../_lib/mappers';
import { isAuthorized, unauthorized, setCors } from '../../_lib/auth';

const CYR_MAP: Record<string, string> = {
  а:'a',б:'b',в:'v',г:'g',д:'d',ѓ:'gj',е:'e',ж:'zh',з:'z',ѕ:'dz',и:'i',ј:'j',
  к:'k',л:'l',љ:'lj',м:'m',н:'n',њ:'nj',о:'o',п:'p',р:'r',с:'s',т:'t',ќ:'kj',
  у:'u',ф:'f',х:'h',ц:'c',ч:'ch',џ:'dzh',ш:'sh',
};
function slugify(text: string): string {
  return text
    .toLowerCase()
    .split('')
    .map(ch => CYR_MAP[ch] ?? ch)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'profil';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Методот не е дозволен.' });
  if (!isAuthorized(req)) return unauthorized(res);

  const id = req.query.id as string;
  if (!id) return res.status(400).json({ error: 'ID е задолжително.' });

  // Fetch current profile to check slug
  const { data: current, error: fetchErr } = await supabaseAdmin
    .from('profiles')
    .select('slug, name')
    .eq('id', id)
    .single();

  if (fetchErr) return res.status(404).json({ error: 'Профилот не е пронајден.' });

  // Auto-fix slug if it's still a placeholder (pending-xxx or novo-xxx)
  const needsSlug = !current.slug
    || current.slug.startsWith('pending-')
    || current.slug.startsWith('novo-');

  const updates: Record<string, any> = {
    is_pending:  false,
    is_active:   true,
    updated_at:  new Date().toISOString(),
  };
  if (needsSlug && current.name) {
    const base = slugify(current.name);
    // Ensure uniqueness by appending id suffix if needed
    const { data: clash } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('slug', base)
      .neq('id', id)
      .maybeSingle();
    updates.slug = clash ? `${base}-${id.slice(0, 4)}` : base;
  }

  const { data, error } = await supabaseAdmin
    .from('profiles')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    if (error.code === 'PGRST116') return res.status(404).json({ error: 'Профилот не е пронајден.' });
    return res.status(500).json({ error: error.message });
  }

  return res.json({ success: true, profile: dbProfileToFrontend(data) });
}
