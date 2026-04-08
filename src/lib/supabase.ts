import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verifica se as credenciais são válidas
export const isSupabaseConfigured = 
    Boolean(supabaseUrl) && 
    Boolean(supabaseAnonKey) && 
    supabaseUrl !== 'https://seu-projeto.supabase.co' &&
    supabaseAnonKey !== 'sua-chave-anon-aqui';

// Inicializa o cliente apenas se configurado corretamente
// Caso contrário, exporta null para evitar quebras de inicialização (Runtime Error)
export const supabase = isSupabaseConfigured 
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

if (!isSupabaseConfigured) {
  console.warn("⚠️ Supabase não configurado ou chaves padrão detectadas. O site funcionará apenas com armazenamento local/padrão.");
}
