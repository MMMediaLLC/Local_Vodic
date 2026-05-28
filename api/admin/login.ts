import type { VercelRequest, VercelResponse } from '@vercel/node';
import { setCors } from '../../lib/auth';

export default function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Методот не е дозволен.' });

  const { password } = req.body ?? {};
  const correct = process.env.ADMIN_PASSWORD;

  if (!correct) {
    return res.status(500).json({ error: 'ADMIN_PASSWORD не е поставен на серверот.' });
  }

  if (password === correct) {
    // Token IS the password — stateless, works across serverless invocations.
    return res.json({ token: correct });
  }

  return res.status(401).json({ error: 'Погрешна лозинка.' });
}
