import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

// import { createClient } from '@supabase/supabase-js'

// export const supabase = createClient(
//   'https://fnimfhelxjwvpvmalbjl.supabase.co',
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuaW1maGVseGp3dnB2bWFsYmpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4MTkyODIsImV4cCI6MjA4OTM5NTI4Mn0.rim8G_16TLJf3ZAIreJV1R2GAKCBQvmQKM4bzgDnHgQ'
// )

// export default supabase