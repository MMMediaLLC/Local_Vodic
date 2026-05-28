import type { VercelRequest, VercelResponse } from '@vercel/node';

export function isAuthorized(req: VercelRequest): boolean {
  const auth  = (req.headers['authorization'] as string) ?? '';
  const token = auth.replace(/^Bearer\s+/i, '').trim();
  const pwd   = process.env.ADMIN_PASSWORD;
  return !!pwd && token === pwd;
}

export function unauthorized(res: VercelResponse) {
  return res.status(401).json({ error: 'Неовластен пристап. Најавете се во админ панелот.' });
}

export function setCors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
}
