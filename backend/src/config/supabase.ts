import { createClient } from '@supabase/supabase-js'
import { env } from './env'

const authClientOptions = {
  auth: {
    autoRefreshToken: false,
    detectSessionInUrl: false,
    persistSession: false,
    flowType: 'pkce',
  },
}

export const supabaseAuth = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_ANON_KEY,
  authClientOptions,
)

export const supabaseAdmin = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_SERVICE_KEY,
  authClientOptions,
)
