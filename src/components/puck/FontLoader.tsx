import { useEffect } from "react";

/**
 * FontLoader - Componente que carrega dinamicamente fontes do Google Fonts.
 * Ele verifica as fontes selecionadas no conteúdo do Puck e injeta o <link> necessário.
 */
export const FontLoader = ({ data }: { data: any }) => {
    useEffect(() => {
        if (!data || !data.content) return;

        // Extrai todas as famílias de fontes únicas usadas nos componentes
        const fonts = new Set<string>();
        data.content.forEach((item: any) => {
            if (item.props?.fontFamily && item.props.fontFamily !== "inherit") {
                fonts.add(item.props.fontFamily);
            }
        });

        if (fonts.size === 0) return;

        // Cria a URL do Google Fonts
        const fontFamilies = Array.from(fonts).map(f => f.replace(/\s+/g, "+")).join("&family=");
        const fontUrl = `https://fonts.googleapis.com/css2?family=${fontFamilies}:wght@400;500;700;900&display=swap`;

        // Verifica se o link já existe
        let link = document.getElementById("puck-google-fonts") as HTMLLinkElement;
        if (!link) {
            link = document.createElement("link");
            link.id = "puck-google-fonts";
            link.rel = "stylesheet";
            document.head.appendChild(link);
        }
        
        if (link.href !== fontUrl) {
            link.href = fontUrl;
        }
    }, [data]);

    return null;
};
