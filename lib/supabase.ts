import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Lazy singletons — createClient is deferred until first use so that a
// missing env var produces a clear 500 JSON error instead of crashing the
// entire module on import (which returns plain-text "A server error has
// occurred" and breaks every endpoint in the function bundle).

let _admin: SupabaseClient | null = null;
let _anon: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (!_admin) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error(
        'SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set. ' +
        'Add them in Vercel → Project → Settings → Environment Variables.'
      );
    }
    _admin = createClient(url, key, { auth: { persistSession: false } });
  }
  return _admin;
}

export function getSupabaseAnon(): SupabaseClient {
  if (!_anon) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_ANON_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error(
        'SUPABASE_URL or SUPABASE_ANON_KEY is not set. ' +
        'Add them in Vercel → Project → Settings → Environment Variables.'
      );
    }
    _anon = createClient(url, key, { auth: { persistSession: false } });
  }
  return _anon;
}

// Back-compat named exports — same names as before so existing imports work.
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_t, prop) {
    return (getSupabaseAdmin() as any)[prop];
  },
});

export const supabaseAnon = new Proxy({} as SupabaseClient, {
  get(_t, prop) {
    return (getSupabaseAnon() as any)[prop];
  },
});
