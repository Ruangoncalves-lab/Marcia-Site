import { Render } from "@puckeditor/core";
import { config } from "./puck.config";


import { useLocation } from "react-router-dom";
import { defaultHomeData, defaultAboutData } from "./defaultPuckData";
import { FontLoader } from "./components/puck/FontLoader";
import { loadPuckData } from "./lib/puckStorage";
import { useEffect, useState } from "react";

export const Page = () => {
    const location = useLocation();
    const path = location.pathname;
    const storageKey = `puck-data-${path}`;
    
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            try {
                // 1. Tentar carregar do IndexedDB
                let savedData = await loadPuckData(path);
                
                // 2. Fallback para LocalStorage
                if (!savedData) {
                    const legacyData = localStorage.getItem(storageKey);
                    if (legacyData) {
                        savedData = JSON.parse(legacyData);
                    }
                }

                setData(savedData || (path === '/' ? defaultHomeData : defaultAboutData));
            } catch (err) {
                console.error("Erro ao carregar site:", err);
                setData(path === '/' ? defaultHomeData : defaultAboutData);
            } finally {
                setLoading(false);
            }
        };
        init();
    }, [path, storageKey]);

    if (loading) {
        return (
            <div className="min-h-screen bg-surface-page flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-accent-primary/20 border-t-accent-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    // Injetar dados globais do cabeçalho vindos do Root do Puck
    // O Navbar agora é tratado via Render config

    return (
        <div className="min-h-screen bg-surface-page flex flex-col font-body text-text-primary">
            <FontLoader data={data} />
            <main className="flex-grow">
                {/* O Navbar e o Footer agora são renderizados pelo config público do Puck */}
                <Render config={config} data={data} />
            </main>
        </div>
    );
};
