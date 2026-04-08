import { supabase, isSupabaseConfigured } from './supabase';

/**
 * puckStorage.ts
 * Sistema híbrido: Tenta Supabase (Global) -> Fallback para IndexedDB (Local).
 */

const TABLE_NAME = 'puck_pages';
const DB_NAME = "puck_editor_db";
const STORE_NAME = "pages";
const DB_VERSION = 1;

let dbPromise: Promise<IDBDatabase> | null = null;

const getDB = (): Promise<IDBDatabase> => {
    if (dbPromise) return dbPromise;

    dbPromise = new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });

    return dbPromise;
};

/**
 * Salva os dados de uma página
 */
export async function savePuckData(path: string, data: any): Promise<void> {
    // 1. Tentar Supabase se estiver configurado e o cliente existir
    if (isSupabaseConfigured && supabase) {
        try {
            const { error } = await supabase
                .from(TABLE_NAME)
                .upsert({ 
                    path, 
                    data,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'path' });

            if (error) throw error;
            console.log(`✅ Salvo com sucesso no Supabase: ${path}`);
            return;
        } catch (err) {
            console.warn("⚠️ Falha ao salvar no Supabase, tentando localmente...", err);
        }
    }

    // 2. Fallback para IndexedDB (Local)
    const db = await getDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(data, path);

        request.onsuccess = () => {
            console.log(`💻 Salvo localmente no computador (IndexedDB): ${path}`);
            resolve();
        };
        request.onerror = () => reject(request.error);
    });
}

/**
 * Carrega os dados de uma página
 */
export async function loadPuckData(path: string): Promise<any | null> {
    // 1. Tentar Supabase se estiver configurado e o cliente existir
    if (isSupabaseConfigured && supabase) {
        try {
            const { data, error } = await supabase
                .from(TABLE_NAME)
                .select('data')
                .eq('path', path)
                .maybeSingle();

            if (!error && data) {
                console.log(`📖 Carregado com sucesso do Supabase: ${path}`);
                return data.data;
            }
        } catch (err) {
            console.warn("⚠️ Falha ao carregar do Supabase, tentando localmente...", err);
        }
    }

    // 2. Fallback para IndexedDB (Local)
    const db = await getDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(path);

        request.onsuccess = () => {
            if (request.result) {
                console.log(`💻 Carregado localmente do computador: ${path}`);
            }
            resolve(request.result || null);
        };
        request.onerror = () => reject(request.error);
    });
}

/**
 * Remove os dados de uma página
 */
export async function deletePuckData(path: string): Promise<void> {
    if (isSupabaseConfigured && supabase) {
        try {
            await supabase.from(TABLE_NAME).delete().eq('path', path);
        } catch (err) {
            console.warn("Erro ao deletar no Supabase:", err);
        }
    }

    const db = await getDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(path);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}
