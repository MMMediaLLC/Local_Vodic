import type { VercelRequest, VercelResponse } from '@vercel/node';
import { setCors } from '../_lib/auth.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  // Stateless auth — nothing to invalidate server-side.
  return res.json({ success: true });
}
