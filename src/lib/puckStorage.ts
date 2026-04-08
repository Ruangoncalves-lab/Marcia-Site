/**
 * puckStorage.ts
 * Utilitário para gerenciar o armazenamento no IndexedDB, permitindo salvar
 * grandes volumes de dados (vídeos e imagens Base64) sem os limites do LocalStorage.
 */

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
 * Salva os dados de uma página no IndexedDB
 */
export async function savePuckData(path: string, data: any): Promise<void> {
    const db = await getDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(data, path);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

/**
 * Carrega os dados de uma página do IndexedDB
 */
export async function loadPuckData(path: string): Promise<any | null> {
    const db = await getDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(path);

        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
    });
}

/**
 * Remove os dados de uma página do IndexedDB
 */
export async function deletePuckData(path: string): Promise<void> {
    const db = await getDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(path);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}


