import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://cbrgywiusiqvqaznqmid.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_UJ-tHoYGKZill-k7yIQN2g_6NRgfk-a'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)