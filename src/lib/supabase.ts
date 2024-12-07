import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  throw new Error('Missing Supabase environment variables');
}

console.log('Initializing Supabase client with:', {
  url: supabaseUrl,
  hasAnonKey: !!supabaseAnonKey
});

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: 'supabase-auth',
    storage: window.localStorage
  },
  db: {
    schema: 'public'
  }
});

// Test the connection and properly handle the Promise
(async () => {
  try {
    await supabase.from('profiles').select('count', { count: 'exact', head: true });
    console.log('Successfully connected to Supabase');
  } catch (error) {
    console.error('Error connecting to Supabase:', error);
  }
})();