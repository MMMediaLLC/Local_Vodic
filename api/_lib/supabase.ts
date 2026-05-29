import { createClient } from '@supabase/supabase-js';

// Eager, simple clients. No Proxy wrapper — the previous Proxy returned
// unbound methods (`supabaseAdmin.from` lost its `this`).
//
// Placeholder fallbacks keep createClient from throwing at module-load when an
// env var is missing (a throw at import time would crash the whole function
// bundle). With env present (the normal case) the real clients are used.

const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key';

export const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false },
});
