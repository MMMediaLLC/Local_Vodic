import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Методот не е дозволен.' });

  const correct = process.env.ADMIN_PASSWORD;
  if (!correct) {
    return res.status(500).json({ error: 'ADMIN_PASSWORD не е поставен на серверот.' });
  }

  let password: string | undefined;
  try {
    const body = req.body && typeof req.body === 'object'
      ? req.body
      : JSON.parse(req.body as string);
    password = (body as any).password;
  } catch {
    return res.status(400).json({ error: 'Невалидно тело на барањето.' });
  }

  if (password === correct) {
    return res.json({ token: correct });
  }

  return res.status(401).json({ error: 'Погрешна лозинка.' });
}
