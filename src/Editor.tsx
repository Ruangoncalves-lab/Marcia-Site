import "@puckeditor/core/dist/index.css";
import "./Editor.css";
import { Puck } from "@puckeditor/core";
import { config } from "./puck.config";
import { useLocation } from "react-router-dom";
import { defaultHomeData, defaultAboutData } from "./defaultPuckData";
import { FontLoader } from "./components/puck/FontLoader";
import { savePuckData, loadPuckData } from "./lib/puckStorage";
import { useEffect, useState } from "react";

const fontPlugin = {
  renderRootFields: (props: any) => (
    <>
      <FontLoader data={props.data} />
      {props.children}
    </>
  )
};

const plugins = [fontPlugin] as any;

export const Editor = () => {
    const location = useLocation();
    const path = location.pathname.replace('/editor', '') || '/';
    const storageKey = `puck-data-${path}`;
    
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initData = async () => {
            setLoading(true);
            try {
                // 1. Tentar carregar do IndexedDB (Novo Sistema)
                let savedData = await loadPuckData(path);
                
                // 2. Fallback para LocalStorage (Migração de dados antigos)
                if (!savedData) {
                    const legacyData = localStorage.getItem(storageKey);
                    if (legacyData) {
                        savedData = JSON.parse(legacyData);
                        console.log("Migrando dados do LocalStorage para IndexedDB...");
                        await savePuckData(path, savedData);
                        localStorage.removeItem(storageKey); // Limpa para evitar confusão futura
                    }
                }

                // 3. Fallback para dados padrão
                setData(savedData || (path === '/' ? defaultHomeData : defaultAboutData));
            } catch (err) {
                console.error("Erro ao carregar dados:", err);
                setData(path === '/' ? defaultHomeData : defaultAboutData);
            } finally {
                setLoading(false);
            }
        };
        initData();
    }, [path, storageKey]);

    const save = async (data: any) => {
        try {
            console.log(`Salvando no IndexedDB para ${path}...`);
            await savePuckData(path, data);
            console.log(`Página ${path} salva com sucesso.`);
        } catch (error: any) {
            console.error("Erro ao publicar:", error);
            alert("❌ Erro ao salvar os dados. Verifique o console ou tente novamente.");
            throw error;
        }
    };

    if (loading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-surface-page">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-accent-primary/20 border-t-accent-primary rounded-full animate-spin"></div>
                    <p className="text-sm font-bold text-text-muted">Carregando editor seguro...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="puck-heavy-editor">
            <Puck
                config={config}
                data={data}
                onPublish={save}
                plugins={plugins}
                headerPath={path}
                overrides={{
                  headerActions: ({ children }) => (
                    <div className="flex items-center gap-4">
                      {children}
                      <button 
                        onClick={() => window.open(path, '_blank')}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold transition-all shadow-sm"
                      >
                        👁️ Ver Ao Vivo
                      </button>
                    </div>
                  )
                }}
            />
        </div>
    );
};
