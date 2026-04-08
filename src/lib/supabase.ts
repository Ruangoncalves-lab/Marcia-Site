import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verifica se as credenciais são as do exemplo ou estão vazias
export const isSupabaseConfigured = 
    supabaseUrl && 
    supabaseAnonKey && 
    supabaseUrl !== 'https://seu-projeto.supabase.co' &&
    supabaseAnonKey !== 'sua-chave-anon-aqui';

if (!isSupabaseConfigured) {
  console.warn("⚠️ Supabase credentials missing/default. Using local storage only.");
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
