import "@measured/puck/puck.css";
import "./Editor.css";
import { Puck } from "@measured/puck";
import { config } from "./puck.config";
import { useLocation } from "react-router-dom";
import { defaultHomeData, defaultAboutData } from "./defaultPuckData";

export const Editor = () => {
    const location = useLocation();
    const path = location.pathname.replace('/editor', '') || '/';
    const storageKey = `puck-data-${path}`;

    const initialData = localStorage.getItem(storageKey)
        ? JSON.parse(localStorage.getItem(storageKey)!)
        : (path === '/' ? defaultHomeData : defaultAboutData);

    const save = (data: any) => {
        localStorage.setItem(storageKey, JSON.stringify(data));
        alert(`Página ${path} atualizada com sucesso! Volte para a rota principal para visualizar.`);
    };

    return (
        <Puck
            config={config}
            data={initialData}
            onPublish={save}
            iframe={{ enabled: true }}
        />
    );
};
