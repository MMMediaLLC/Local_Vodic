import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabaseAdmin } from './_lib/supabase';
import { setCors } from './_lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Методот не е дозволен.' });

  const b = req.body ?? {};
  const newId = Math.random().toString(36).substring(2, 11);

  // Resolve category_slug by looking up the category name in DB
  let categorySlug = '';
  if (b.category) {
    const { data: cat } = await supabaseAdmin
      .from('categories')
      .select('slug')
      .ilike('name', b.category.trim())
      .maybeSingle();
    categorySlug = cat?.slug ?? '';
  }

  const row = {
    id:                  newId,
    slug:                `pending-${newId}`,
    name:                b.name             ?? '',
    category:            b.category         ?? '',
    category_slug:       categorySlug,
    location:            b.location         ?? '',
    short_description:   b.shortDescription ?? '',
    full_description:    b.fullDescription  ?? '',
    phone:               b.phone            ?? '',
    secondary_phone:     b.secondaryPhone   || null,
    email:               b.email            || null,
    address:             b.address          ?? '',
    website:             b.website          || null,
    facebook:            b.facebook         || null,
    instagram:           b.instagram        || null,
    working_hours:       b.workingHours     || null,
    is_featured:         false,
    is_verified:         false,
    is_pending:          true,
    is_active:           true,
    verification_status: 'unverified',
    submitted_at:        new Date().toISOString(),
  };

  const { error } = await supabaseAdmin.from('profiles').insert(row);

  if (error) return res.status(500).json({ error: 'Грешка при поднесување.' });

  return res.json({ success: true });
}
