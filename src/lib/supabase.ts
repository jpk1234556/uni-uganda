import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabase: any

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables. Please check your .env.local file.')
    // Create a dummy client to prevent app crash
    supabase = {
        from: () => ({ select: () => ({ eq: () => ({ order: () => ({ limit: () => Promise.resolve({ data: [], error: new Error('Supabase not configured') }) }) }) }) }),
        auth: { getSession: () => Promise.resolve({ data: { session: null } }), onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }) }
    }
} else {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }
