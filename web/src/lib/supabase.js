import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jisrctznxhjitfwrnzbl.supabase.co'
const supabaseKey = 'sb_publishable_MUR-Fa2MrN01agub72Kjyw_cVcGTjEs'

export const supabase = createClient(supabaseUrl, supabaseKey)
