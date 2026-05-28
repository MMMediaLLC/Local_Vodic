import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.json({
    ok: true,
    time: new Date().toISOString(),
    adminPasswordSet: !!process.env.ADMIN_PASSWORD,
    supabaseUrlSet: !!process.env.SUPABASE_URL,
  });
}
