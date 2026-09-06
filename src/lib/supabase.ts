import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  // Fail loud in dev; see .env.example
  console.warn('Supabase env vars missing — copy .env.example to .env.local')
}

export const supabase = createClient(url ?? '', anonKey ?? '')
