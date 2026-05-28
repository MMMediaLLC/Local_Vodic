import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL ?? '';
const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
const anonKey     = process.env.SUPABASE_ANON_KEY ?? '';

if (typeof window === 'undefined' && (!supabaseUrl || !serviceKey)) {
  console.warn('[supabase] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing.');
}

export const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false },
});

export const supabaseAnon = createClient(supabaseUrl, anonKey || serviceKey, {
  auth: { persistSession: false },
});
