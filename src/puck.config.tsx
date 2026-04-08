// @ts-nocheck
import React from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import type { Config } from "@puckeditor/core";
import { Hero } from "./components/sections/Hero";
import { HeroSlider } from "./components/sections/HeroSlider";
import { HeroBanner } from "./components/sections/HeroBanner";
import { PromoBanners } from "./components/sections/PromoBanners";
import { Categories } from "./components/sections/Categories";
import { Products } from "./components/sections/Products";
import { Process } from "./components/sections/Process";
import { Benefits } from "./components/sections/Benefits";
import { Testimonials } from "./components/sections/Testimonials";
import { Sustainability } from "./components/sections/Sustainability";
import { Cta } from "./components/sections/Cta";
import { VisualProof } from "./components/sections/VisualProof";
import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";
import { Newsletter } from "./components/sections/Newsletter";

// Novos componentes de Layout e Widgets
import { Section, Columns } from "./components/puck/Layout";
import { Button, Spacer, Video, Accordion } from "./components/puck/Widgets";

const IMAGE_PRESETS = [
    { label: "Original", w: 0, h: 0, icon: "🖼️" },
    { label: "Thumb", w: 150, h: 150, icon: "🔲" },
    { label: "Médio", w: 300, h: 0, icon: "📐" },
    { label: "Grande", w: 800, h: 0, icon: "🖥️" },
    { label: "Full HD", w: 1080, h: 1920, icon: "📱" },
];

function resizeImageToPreset(
    src: string,
    targetW: number,
    targetH: number,
    quality: number = 0.85
): Promise<{ dataUrl: string; finalW: number; finalH: number }> {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            let w = img.width;
            let h = img.height;

            if (targetW === 0 && targetH === 0) {
                // "Original" — apenas comprimir, sem redimensionar
                const MAX = 1400;
                if (w > h && w > MAX) { h *= MAX / w; w = MAX; }
                else if (h > MAX) { w *= MAX / h; h = MAX; }
            } else if (targetH === 0) {
                // Largura fixa, altura proporcional (ex: 300x0)
                if (w > targetW) { h = Math.round(h * (targetW / w)); w = targetW; }
            } else if (targetW === 0) {
                // Altura fixa, largura proporcional (ex: 0x1920)
                if (h > targetH) { w = Math.round(w * (targetH / h)); h = targetH; }
            } else {
                // Ambos definidos — crop/fit centralizado (ex: 150x150, 1080x1920)
                const ratio = Math.max(targetW / w, targetH / h);
                w = Math.round(w * ratio);
                h = Math.round(h * ratio);
            }

            w = Math.round(w);
            h = Math.round(h);

            const canvas = document.createElement("canvas");

            if (targetW > 0 && targetH > 0) {
                // Crop centralizado
                canvas.width = targetW;
                canvas.height = targetH;
                const ctx = canvas.getContext("2d")!;
                const offsetX = (targetW - w) / 2;
                const offsetY = (targetH - h) / 2;
                ctx.drawImage(img, offsetX, offsetY, w, h);
                resolve({ dataUrl: canvas.toDataURL("image/webp", quality), finalW: targetW, finalH: targetH });
            } else {
                canvas.width = w;
                canvas.height = h;
                const ctx = canvas.getContext("2d")!;
                ctx.drawImage(img, 0, 0, w, h);
                resolve({ dataUrl: canvas.toDataURL("image/webp", quality), finalW: w, finalH: h });
            }
        };
        img.src = src;
    });
}

const mediaField = {
    type: "custom" as const,
    render: ({ value, onChange }: any) => {
        const [imgDims, setImgDims] = React.useState<{ w: number; h: number } | null>(null);
        const [resizing, setResizing] = React.useState(false);
        const [rawSrc, setRawSrc] = React.useState<string>("");
        const uploadId = React.useId();

        const isVideo = (url: any) => {
            if (typeof url !== "string") return false;
            return url.startsWith("data:video/") || url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".ogg");
        };

        // Detectar dimensões da imagem atual (apenas se não for vídeo)
        React.useEffect(() => {
            if (value && typeof value === "string" && value.length > 10 && !isVideo(value)) {
                const img = new Image();
                img.onload = () => setImgDims({ w: img.width, h: img.height });
                img.onerror = () => setImgDims(null);
                img.src = value;
            } else {
                setImgDims(null);
            }
        }, [value]);

        const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = async (ev) => {
                const src = ev.target?.result as string;
                setRawSrc(src);

                if (file.type.startsWith("video")) {
                    // Para vídeo, salva direto sem redimensionar
                    onChange(src);
                    setImgDims(null);
                } else {
                    // Para imagem, salvar como "Original" inicialmente
                    const { dataUrl, finalW, finalH } = await resizeImageToPreset(src, 0, 0);
                    setImgDims({ w: finalW, h: finalH });
                    onChange(dataUrl);
                }
            };
            reader.readAsDataURL(file);
        };

        const applyPreset = async (preset: typeof IMAGE_PRESETS[0]) => {
            const src = rawSrc || value;
            if (!src || isVideo(src)) return;
            setResizing(true);
            try {
                const { dataUrl, finalW, finalH } = await resizeImageToPreset(src, preset.w, preset.h);
                setImgDims({ w: finalW, h: finalH });
                onChange(dataUrl);
            } finally {
                setResizing(false);
            }
        };

        return (
            <div className="flex flex-col gap-2 relative mt-2 bg-gray-50 border p-3 rounded-md font-sans">
                <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Mídia (Imagem ou Vídeo)</label>
                    <span className="text-[8px] text-emerald-600 font-bold mb-1 line-clamp-1 uppercase tracking-tighter">✨ Armazenamento Seguro (IndexedDB) Ativo</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex-1">
                        <input
                            type="file"
                            id={uploadId}
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={handleUpload}
                        />
                        <label
                            htmlFor={uploadId}
                            className="flex items-center justify-center gap-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded cursor-pointer transition-colors shadow-sm"
                        >
                            <span>📤 Escolher seu Arquivo</span>
                        </label>
                    </div>
                    <div className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">ou</div>
                    <div className="flex-[2]">
                        <input
                            type="text"
                            placeholder="Link da imagem..."
                            className="w-full px-3 py-2 border border-gray-200 rounded text-xs bg-white focus:ring-1 focus:ring-emerald-500 outline-none"
                            value={typeof value === "string" && value.startsWith("http") ? value : ""}
                            onChange={(e) => { onChange(e.target.value); setRawSrc(e.target.value); }}
                        />
                    </div>
                </div>
                
                <p className="text-[9px] text-gray-500 mt-1 italic">
                    💡 Selecione sua logo oficial clicando em "Escolher seu Arquivo" e depois clique em <b>Publicar</b> no topo para salvar no site.
                </p>

                {/* Presets de tamanho (Apenas para Imagens) */}
                {value && !isVideo(value) && (
                    <div className="flex flex-col gap-1.5 mt-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                            <span>Redimensionar Foto</span>
                            {imgDims && (
                                <span className="text-[9px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                                    {imgDims.w} × {imgDims.h}px
                                </span>
                            )}
                        </label>
                        <div className="flex flex-wrap gap-1">
                            {IMAGE_PRESETS.map((preset) => (
                                <button
                                    key={preset.label}
                                    onClick={() => applyPreset(preset)}
                                    disabled={resizing}
                                    className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded text-[10px] font-semibold text-gray-600 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-all disabled:opacity-50 disabled:cursor-wait"
                                    title={preset.w === 0 && preset.h === 0 ? "Sem redimensionar" : `${preset.w || "auto"}×${preset.h || "auto"}`}
                                >
                                    <span>{preset.icon}</span>
                                    <span>{preset.label}</span>
                                    <span className="text-[8px] text-gray-400 font-mono">
                                        {preset.w === 0 && preset.h === 0 ? "" : `${preset.w || "∞"}×${preset.h || "∞"}`}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Preview */}
                {value && (
                    <div className="relative mt-1 p-1 bg-white border border-dashed border-gray-200 rounded group overflow-hidden">
                        {resizing && (
                            <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10 rounded">
                                <span className="text-xs text-emerald-600 font-bold animate-pulse">Redimensionando...</span>
                            </div>
                        )}
                        
                        {isVideo(value) ? (
                            <div className="relative aspect-video bg-black rounded overflow-hidden">
                                <video src={value} className="w-full h-full object-cover" controls muted />
                                <div className="absolute top-1 left-1 bg-black/50 text-[8px] text-white px-1 rounded font-bold uppercase">Vídeo</div>
                            </div>
                        ) : (
                            <img src={value} className="w-full max-h-32 object-contain rounded" />
                        )}

                        <button
                            onClick={() => { onChange(""); setRawSrc(""); setImgDims(null); }}
                            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white w-5 h-5 rounded-full text-[10px] flex items-center justify-center shadow-lg border-2 border-white transition-transform transform scale-0 group-hover:scale-100 z-20"
                            title="Remover Mídia"
                        >✕</button>
                    </div>
                )}
            </div>
        );
    }
};

const GOOGLE_FONTS = [
    { label: "Padrão do Sistema", value: "inherit" },
    { label: "Inter (Modern Sans)", value: "Inter" },
    { label: "Outfit (Tech Sans)", value: "Outfit" },
    { label: "Montserrat (Classic Sans)", value: "Montserrat" },
    { label: "Playfair Display (Elegant Serif)", value: "Playfair Display" },
    { label: "Lora (Warm Serif)", value: "Lora" },
    { label: "Bebas Neue (Impact)", value: "Bebas Neue" },
    { label: "Archivo Black (Strong Display)", value: "Archivo Black" },
    { label: "Merriweather (Readability)", value: "Merriweather" }
];

const typographyFields = {
    fontFamily: {
        type: "select",
        options: GOOGLE_FONTS
    },
    fontSize: { type: "number" },
    textColor: { type: "text" }
};

export const config: Config<any> = {
    root: {
        fields: {
            headerLogo: {
                ...mediaField,
                label: "🖼️ Loganarca Oficial (Sua Imagem)"
            },
            headerLogoWidth: { type: "number", label: "📏 Tamanho da Logo (PX)" },
            mobileLogoWidth: { type: "number" },
            topBannerText: { type: "text" },
            headerEmail: { type: "text" },
            headerPhone: { type: "text" },
            headerAddress: { type: "text" },
            headerHours: { type: "text" },
            topBannerBg: { type: "text" },
            topBannerTextColor: { type: "text" },
            headerBg: { type: "text" },
            headerTextColor: { type: "text" },
            ctaButtonText: { type: "text" },
            ctaButtonUrl: { type: "text" },
            ctaButtonBg: { type: "text" },
            facebookUrl: { type: "text" },
            linkedinUrl: { type: "text" },
            instagramUrl: { type: "text" },
            // Campos de Rodapé
            footerLogo: {
                ...mediaField,
                label: "🖼️ Logo do Rodapé (Opcional)"
            },
            footerLogoWidth: { type: "number", label: "📏 Largura Logo Rodapé (PX)" },
            footerDescription: { type: "textarea", label: "📝 Descrição do Rodapé" },
            footerBgColor: { type: "text", label: "🎨 Cor do Rodapé (Hex)" },
            headerFixedPhone: { type: "text", label: "📞 Telefone Fixo" },
            menuLinks: {
                type: "array",
                label: "🔗 Menu de Navegação (Topo & Rodapé)",
                getItemSummary: (link) => link.label || "Link sem nome",
                arrayFields: {
                    label: { type: "text", label: "Texto" },
                    url: { type: "text", label: "URL (Ex: #contato ou /)" }
                },
                defaultItemProps: {
                    label: "Novo Link",
                    url: "#"
                }
            }
        },
        defaultProps: {
            headerLogo: "/logo-mcosta.png",
            headerLogoWidth: 160,
            mobileLogoWidth: 120,
            topBannerText: "🚚 Entregas em todo o Brasil | Atendimento Personalizado",
            headerEmail: "mcostaecofoodpack@gmail.com",
            headerPhone: "21 98233-6850",
            headerFixedPhone: "22 2654-2082",
            headerAddress: "Rio de Janeiro, Brasil",
            headerHours: "Seg-Sex: 08:00 - 18:00",
            topBannerBg: "#ff7c08",
            topBannerTextColor: "#ffffff",
            headerBg: "#ffffff",
            headerTextColor: "#374151",
            ctaButtonText: "Fale Conosco!",
            ctaButtonUrl: "https://wa.me/5521982336850",
            ctaButtonBg: "#255937",
            facebookUrl: "#",
            linkedinUrl: "#",
            instagramUrl: "https://www.instagram.com/mcostaecofoodpack/",
            whatsappUrl: "https://wa.me/5521982336850",
            footerDescription: "Especialistas em embalagens sustentáveis e premium que aumentam o valor percebido do seu produto, garantem higiene e transformam a experiência do seu delivery.",
            footerBgColor: "#ff7c08",
            footerLogoWidth: 140,
            menuLinks: [
                { label: "Início", url: "/" },
                { label: "Quem Somos", url: "/quem-somos" },
                { label: "Produtos", url: "#produtos" },
                { label: "Contato", url: "#contato" }
            ]
        },
        render: (props) => {
            return (
                <div className="min-h-screen bg-white">
                    <Navbar {...props} links={props.menuLinks} />
                    <div className="pt-20 md:pt-24">
                        {props.children}
                    </div>
                    <Footer {...props} links={props.menuLinks} />
                </div>
            );
        }
    },
    categories: {
        layout: {
            title: "Estrutura & Layout",
            components: ["Section", "Columns", "Spacer"]
        },
        widgets: {
            title: "Widgets Básicos",
            components: ["Button", "Accordion", "Video"]
        },
        header: {
            title: "Cabeçalhos & Banners",
            components: ["Hero", "HeroSlider", "PromoBanners"]
        },
        commerce: {
            title: "Catálogo",
            components: ["Categories", "Products"]
        },
        value: {
            title: "Proposta de Valor",
            components: ["Process", "Benefits", "Sustainability", "VisualProof"]
        },
        conversion: {
            title: "Conversão & Prova Social",
            components: ["Testimonials", "Cta", "Newsletter"]
        },
        institutional: {
            title: "Institucional",
            components: ["About", "Contact"]
        }
    },
    components: {
        Section: {
            fields: {
                padding: { type: "text" },
                maxWidth: { type: "text" },
                backgroundColor: { type: "text" },
                backgroundImage: mediaField,
            },
            defaultProps: {
                padding: "80px",
                maxWidth: "1200px",
                backgroundColor: "transparent",
            },
            render: ({ padding, maxWidth, backgroundColor, backgroundImage, puck }: any) => (
                <Section 
                    padding={padding} 
                    maxWidth={maxWidth} 
                    backgroundColor={backgroundColor} 
                    backgroundImage={backgroundImage}
                >
                    {puck.renderSlot("children")}
                </Section>
            )
        },
        Columns: {
            fields: {
                distribution: {
                    type: "select",
                    options: [
                        { label: "1 Coluna", value: "1" },
                        { label: "2 Colunas (50/50)", value: "1/2" },
                        { label: "2 Colunas (2/3 + 1/3)", value: "2/3" },
                        { label: "3 Colunas (1/3 cada)", value: "1/1/1" }
                    ]
                },
                gap: { type: "text" }
            },
            defaultProps: {
                distribution: "1/2",
                gap: "32px"
            },
            render: ({ distribution, gap, puck }: any) => (
                <Columns distribution={distribution} gap={gap}
                    column1={puck.renderSlot("column1")}
                    column2={puck.renderSlot("column2")}
                    column3={puck.renderSlot("column3")}
                />
            )
        },
        Spacer: {
            fields: { height: { type: "text" } },
            defaultProps: { height: "40px" },
            render: (props) => <Spacer {...props} />
        },
        Button: {
            fields: {
                text: { type: "text" },
                link: { type: "text" },
                variant: {
                    type: "select",
                    options: [
                        { label: "Principal (Verde)", value: "primary" },
                        { label: "Secundário (Laranja)", value: "secondary" },
                        { label: "Vazado (Outline)", value: "outline" }
                    ]
                },
                alignment: {
                    type: "radio",
                    options: [
                        { label: "Esquerda", value: "left" },
                        { label: "Centro", value: "center" },
                        { label: "Direita", value: "right" }
                    ]
                }
            },
            defaultProps: {
                text: "Saiba Mais",
                variant: "primary",
                alignment: "center"
            },
            render: (props) => <Button {...props} />
        },
        Video: {
            fields: {
                url: { type: "text" },
                ratio: {
                    type: "select",
                    options: [
                        { label: "16:9 (Padrão)", value: "16/9" },
                        { label: "4:3 (Clássico)", value: "4/3" },
                        { label: "1:1 (Quadrado)", value: "1/1" }
                    ]
                }
            },
            defaultProps: {
                url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                ratio: "16/9"
            },
            render: (props) => <Video {...props} />
        },
        Accordion: {
            fields: {
                items: {
                    type: "array",
                    arrayFields: {
                        title: { type: "text" },
                        content: { type: "textarea" }
                    },
                    defaultItemProps: {
                        title: "Título da Pergunta",
                        content: "Conteúdo da resposta..."
                    }
                }
            },
            defaultProps: {
                items: [
                    { title: "Como solicitar um orçamento?", content: "Basta clicar nos botões de WhatsApp espalhados pelo site ou preencher o formulário de contato." },
                    { title: "Qual o prazo de entrega?", content: "Depende da sua região e da disponibilidade em estoque. Geralmente enviamos em até 48h úteis." }
                ]
            },
            render: (props) => <Accordion {...props} />
        },
        VisualProof: {
            fields: {
                title: { type: "text" },
                subtitle: { type: "text" },
                beforeLabel: { type: "text" },
                beforeText: { type: "textarea" },
                beforeImage: mediaField,
                afterLabel: { type: "text" },
                afterText: { type: "textarea" },
                afterBadge: { type: "text" },
                afterImage: mediaField
            },
            defaultProps: {
                title: "A Diferença é Visual",
                subtitle: "O cuidado com a estética impacta diretamente no faturamento.",
                beforeLabel: "Comum",
                beforeText: "Apenas um recipiente.",
                afterLabel: "Premium",
                afterText: "Uma extensão da sua marca que os clientes fotografam e desejam.",
                afterBadge: "$$$"
            },
            render: (props) => <VisualProof {...props} />
        },
        HeroSlider: {
            fields: {
                slides: {
                    type: "array",
                    arrayFields: {
                        badge: { type: "text" },
                        title: { type: "text" },
                        subtitle: { type: "textarea" },
                        buttonText: { type: "text" },
                        buttonLink: { type: "text" },
                        image: mediaField,
                        layout: {
                            type: "select",
                            options: [
                                { label: "Texto + Imagem Direita (Dividido)", value: "split" },
                                { label: "Arte Completa 16:9 (Fundo)", value: "full" },
                                { label: "Banner Inteiro (Sem Corte)", value: "banner" }
                            ]
                        }
                    },
                    defaultItemProps: {
                        badge: "Ecofoodpack — Sustentável",
                        title: "Embalagens que Valorizam sua Marca.",
                        subtitle: "Destaque-se com o Kraft Certificado.",
                        buttonText: "Explorar Catálogo",
                        buttonLink: "#produtos"
                    }
                }
            },
            defaultProps: {
                slides: [
                    {
                        id: "1",
                        badge: "Ecofoodpack — 100% Sustentável",
                        title: "Embalagens que Valorizam sua Marca.",
                        subtitle: "Destaque-se com o Kraft Certificado e garanta a melhor experiência para seu cliente.",
                        buttonText: "Explorar Catálogo",
                        buttonLink: "#produtos",
                        image: "/ecofood_packaging_hero_product_1775152849305.png",
                        layout: "split"
                    },
                    {
                        id: "2",
                        badge: "Compromisso Verde",
                        title: "Inovação em Cada Detalhe Ecológico.",
                        subtitle: "Consumidores premium preferem marcas que reduzem o uso de plásticos descartáveis.",
                        buttonText: "Nossa Missão",
                        buttonLink: "#sobre",
                        image: "/ecofood_sustainability_hero_detail_1775152908993.png",
                        layout: "split"
                    },
                    {
                        id: "3",
                        badge: "Linha Completa",
                        title: "Soluções Versáteis para seu Delivery.",
                        subtitle: "De potes a sacolas personalizadas. Tudo o que seu negócio precisa em um só lugar.",
                        buttonText: "Solicitar Orçamento",
                        buttonLink: "#contato",
                        image: "/ecofood_catalog_hero_arrangement_1775152928875.png",
                        layout: "split"
                    }
                ]
            },
            render: (props: any) => <HeroSlider {...props} />,
        },
        HeroBanner: {
            fields: {
                image: mediaField,
                mobileImage: mediaField,
                alt: { type: "text" },
                fitMode: {
                    type: "radio",
                    options: [
                        { label: "Inteira (Contain)", value: "contain" },
                        { label: "Preencher (Cover)", value: "cover" },
                    ],
                },
                heightMode: {
                    type: "select",
                    options: [
                        { label: "Proporcional (Auto)", value: "auto" },
                        { label: "Altura Fixa", value: "fixed" },
                        { label: "Tela Cheia (Full)", value: "full" },
                    ],
                },
                customHeight: { type: "number" },
                bgColor: { type: "text" },
                aspectRatio: {
                    type: "select",
                    options: [
                        { label: "Livre (Auto)", value: "auto" },
                        { label: "Padrão (16:9)", value: "16/9" },
                        { label: "Ultra-wide (21:9)", value: "21/9" },
                    ],
                },
            },
            defaultProps: {
                image: "/hero-banner.png",
                mobileImage: "",
                alt: "Banner MCosta Representações — Embalagens que valorizam a sua marca",
                fitMode: "contain",
                heightMode: "auto",
                customHeight: 600,
                bgColor: "#f5f4f0",
                aspectRatio: "auto",
            },
            render: (props: any) => <HeroBanner {...props} />,
        },
        Hero: {
            fields: {
                badgeText: { type: "text" },
                titleStart: { type: "text" },
                titleHighlight: { type: "text" },
                titleEnd: { type: "text" },
                description: { type: "textarea" },
                primaryButtonText: { type: "text" },
                secondaryButtonText: { type: "text" },
                whatsappLink: { type: "text" },
                image: mediaField,
                ...typographyFields
            },
            defaultProps: {
                badgeText: "Ecofoodpack — Embalagens Sustentáveis",
                titleStart: "Diferencie",
                titleHighlight: "sua marca.",
                titleEnd: "Valorize o seu produto.",
                description: "Aqui você encontra uma variety de embalagens sustentáveis para alimentos. Ideal para restaurantes, fast food ou até mesmo consumo próprio.",
                primaryButtonText: "Explorar Catálogo",
                secondaryButtonText: "Solicitar Orçamento",
                whatsappLink: "https://wa.me/5521960142258",
                fontFamily: "inherit",
                fontSize: 0,
                textColor: ""
            },
            render: (props: any) => <Hero {...props} />,
        },
        PromoBanners: {
            fields: {
                banners: {
                    type: "array",
                    arrayFields: {
                        badge: { type: "text" },
                        titleStart: { type: "textarea" },
                        titleHighlight: { type: "text" },
                        linkText: { type: "text" },
                        linkUrl: { type: "text" },
                        bgColor: { type: "text" },
                        glowColor: { type: "text" },
                        image: mediaField,
                        imageType: {
                            type: "select",
                            options: [
                                { label: "Kraft", value: "kraft" },
                                { label: "Selada", value: "selada" }
                            ]
                        }
                    },
                    defaultItemProps: {
                        badge: "Novo Badge",
                        titleStart: "Novo Título",
                        titleHighlight: "Destaque",
                        linkText: "Novo Link",
                        linkUrl: "#",
                        bgColor: "surface-section-alt",
                        imageType: "kraft"
                    }
                }
            },
            defaultProps: {
                banners: [
                    {
                        id: "1",
                        badge: "Biodegradável",
                        titleStart: "Sua marca \n com o",
                        titleHighlight: "Kraft Certificado",
                        linkText: "Explorar Linha",
                        linkUrl: "#produtos",
                        bgColor: "surface-section-alt",
                        imageType: "kraft"
                    },
                    {
                        id: "2",
                        badge: "Embalagens Seladas",
                        titleStart: "Segurança \n e",
                        titleHighlight: "Higiene Total",
                        linkText: "Descobrir",
                        linkUrl: "#produtos",
                        bgColor: "[#F0F4F2]",
                        glowColor: "accent-primary",
                        imageType: "selada"
                    }
                ]
            },
            render: (props) => <PromoBanners {...props} />
        },
        Categories: {
            fields: {
                title: { type: "text" },
                subtitle: { type: "textarea" },
                linkText: { type: "text" },
                linkUrl: { type: "text" },
                categories: {
                    type: "array",
                    arrayFields: {
                        title: { type: "text" },
                        items: { type: "text" },
                        image: mediaField,
                        iconType: {
                            type: "select",
                            options: [
                                { label: "Kraft", value: "kraft" },
                                { label: "Oriental", value: "oriental" },
                                { label: "Potes", value: "potes" },
                                { label: "Sacolas", value: "sacolas" }
                            ]
                        }
                    },
                    defaultItemProps: {
                        title: 'Nova Categoria',
                        items: 'Novos itens',
                        iconType: 'kraft'
                    }
                }
            },
            defaultProps: {
                title: "Nossas Linhas",
                subtitle: "Embalagens sustentáveis para cada tipo de alimento.",
                linkText: "Ver Catálogo Completo",
                linkUrl: "#produtos",
                categories: [
                    { id: "1", title: 'Linha Kraft', items: 'Bandejas, Caixas e Marmitas', iconType: 'kraft' },
                    { id: "2", title: 'Linha Oriental', items: 'Box Kraft, Branca, Preta e Impressa', iconType: 'oriental' },
                    { id: "3", title: 'Potes & Copos', items: 'Copos de papel, Potes e Tampas', iconType: 'potes' },
                    { id: "4", title: 'Sacos & Sacolas', items: 'Kraft, Brancas, Temáticas e Pouch', iconType: 'sacolas' }
                ]
            },
            render: (props) => <Categories {...props} />
        },
        Products: {
            fields: {
                titleStart: { type: "text" },
                titleHighlight: { type: "text" },
                subtitle: { type: "textarea" },
                whatsappPhone: { type: "text" },
                products: {
                    type: "array",
                    arrayFields: {
                        title: { type: "text" },
                        category: { type: "text" },
                        description: { type: "textarea" },
                        tags: { type: "text" },
                        image: mediaField,
                        iconType: {
                            type: "select",
                            options: [
                                { label: "Kraft", value: "kraft" },
                                { label: "Selada", value: "selada" },
                                { label: "Print", value: "print" }
                            ]
                        }
                    },
                    defaultItemProps: {
                        title: 'Novo Produto',
                        category: 'Categoria',
                        description: 'Descrição do produto',
                        tags: 'Ecológico, Kraft',
                        iconType: 'kraft'
                    }
                }
            },
            defaultProps: {
                titleStart: "Soluções em",
                titleHighlight: "Embalagens",
                subtitle: "Qualidade que os seus clientes merecem",
                whatsappPhone: "5521960142258",
                products: [
                    {
                        id: "1",
                        title: 'Bandeja Kraft Multiuso',
                        category: 'Linha Kraft',
                        description: 'Balanças de papel kraft com tamanhos que variam de 600ml a 1500ml. Ideais para porções, lanches ou sobremesas.',
                        tags: ['Multiuso', 'Papel Kraft Certificado'] as any,
                        iconType: 'kraft'
                    },
                    {
                        id: "2",
                        title: 'Embalagens Seladas CP3 a CP8',
                        category: 'Linha Selada',
                        description: 'Bandejas prontas para selamento, garantindo que o alimento não vaze ou perca temperatura. Perfeitas para delivery.',
                        tags: ['Anti-Vazamento', 'Higiene Total'] as any,
                        iconType: 'selada'
                    },
                    {
                        id: "3",
                        title: 'Embalagens Personalizadas',
                        category: 'Exclusividade & Branding',
                        description: 'Valorize o branding do seu negócio! Caixa Box padrão oriental, Kraft, papel manteiga, sacolas e copos.',
                        tags: ['Impressão Premium', 'Valorize a Marca'] as any,
                        iconType: 'print'
                    }
                ]
            },
            render: (props) => {
                const productsFormatted = (props.products || []).map(p => ({
                    ...p,
                    tags: typeof p.tags === 'string' ? (p.tags as string).split(',').map(t => t.trim()) : (Array.isArray(p.tags) ? p.tags : [])
                }));
                return <Products {...props} products={productsFormatted} />
            }
        },
        Process: {
            fields: {
                title: { type: "text" },
                subtitle: { type: "text" },
                steps: {
                    type: "array",
                    arrayFields: {
                        num: { type: "text" },
                        title: { type: "text" },
                        description: { type: "textarea" }
                    },
                    defaultItemProps: {
                        num: "99",
                        title: 'Novo Passo',
                        description: 'Descrição do novo passo.'
                    }
                }
            },
            defaultProps: {
                title: "Processo Descomplicado",
                subtitle: "Da escolha à entrega, facilitamos o seu dia a dia.",
                steps: [
                    { id: "1", num: "1", title: 'Escolha suas Embalagens', description: 'Navegue pelas nossas linhas: Kraft, Oriental, Potes, Sacolas e muito mais.' },
                    { id: "2", num: "2", title: 'Personalize sua Marca', description: 'Aplicamos sua logomarca e identidade visual nas caixas, copos e sacolas.' },
                    { id: "3", num: "3", title: 'Receba com Agilidade', description: 'Preparamos e enviamos seu pedido com diversas opções de entrega.' }
                ]
            },
            render: (props) => <Process {...props} />
        },
        Benefits: {
            fields: {
                titleStart: { type: "text" },
                titleHighlight: { type: "text" },
                subtitle: { type: "textarea" },
                experienceValue: { type: "text" },
                experienceText: { type: "text" },
                projectsValue: { type: "text" },
                projectsText: { type: "text" },
                benefits: {
                    type: "array",
                    arrayFields: {
                        title: { type: "text" },
                        description: { type: "textarea" },
                        metrics: { type: "text" },
                        image: mediaField,
                    },
                    defaultItemProps: {
                        title: 'Novo Benefício',
                        description: 'Descrição deste benefício.',
                        metrics: '100%'
                    }
                }
            },
            defaultProps: {
                titleStart: "Uma Parceria",
                titleHighlight: "De Confiança",
                subtitle: "Nosso padrão de qualidade garante muito mais do que estética. Oferecemos segurança operacional e previsibilidade para o seu negócio crescer sem gargalos de embalagem.",
                experienceValue: "+10",
                experienceText: "Anos de Mercado",
                projectsValue: "+5k",
                projectsText: "Clientes Ativos",
                benefits: [
                    { id: "1", title: 'Opções de Entrega Variáveis', description: 'Logística pensada para não deixar sua operação parar de funcionar.', metrics: 'Praticidade total' },
                    { id: "2", title: 'Pagamento Flexível', description: 'Além de desconto no formato PIX, é possível parcelar seu pedido em até 6x sem juros.', metrics: '6x Sem Juros' },
                    { id: "3", title: 'Atendimento Próximo', description: 'Vendedores consultivos. Nossa equipe atende direto via WhatsApp.', metrics: 'Suporte Rápido' }
                ]
            },
            render: (props) => <Benefits {...props} />
        },
        Testimonials: {
            fields: {
                title: { type: "text" },
                subtitle: { type: "textarea" },
                testimonials: {
                    type: "array",
                    arrayFields: {
                        name: { type: "text" },
                        role: { type: "text" },
                        content: { type: "textarea" },
                        image: { type: "text" },
                        avatarImage: mediaField
                    },
                    defaultItemProps: {
                        name: 'Nome do Cliente',
                        role: 'Cargo / Empresa',
                        content: 'Depoimento...',
                        image: 'CL'
                    }
                }
            },
            defaultProps: {
                title: "Depoimentos de Clientes",
                subtitle: "Veja o que dizem aqueles que já transformaram seus negócios com nossas embalagens.",
                testimonials: [
                    { id: "1", name: 'Elizete', role: 'Panini Pizzaria - Três Rios - RJ', content: 'Foi ótima embalagem de excelente qualidade. Prazo de entrega certinho material chegou tudo ok amei e comprarei mais.', image: 'EP' },
                    { id: "2", name: 'Silvania Herculano', role: 'Cliente Ecofoodpack', content: 'Produto de ótima qualidade de excelente acabamento parabéns aos envolvidos.', image: 'SH' },
                    { id: "3", name: 'Tatiane', role: 'Cliente Ecofoodpack', content: 'Foi ótima embalagem de excelente qualidade. Prazo de entrega certinho material chegou tudo ok.', image: 'TA' }
                ]
            },
            render: (props) => <Testimonials {...props} />
        },
        Sustainability: {
            fields: {
                badgeText: { type: "text" },
                titleStart: { type: "text" },
                titleHighlight: { type: "text" },
                subtitle: { type: "textarea" },
                imageBadge1: { type: "text" },
                imageBadge2: { type: "text" },
                image: mediaField,
                features: {
                    type: "array",
                    arrayFields: {
                        num: { type: "text" },
                        title: { type: "text" },
                        description: { type: "textarea" }
                    },
                    defaultItemProps: {
                        num: "99",
                        title: 'Tópico Verde',
                        description: 'Descrição do tópico.'
                    }
                }
            },
            defaultProps: {
                badgeText: "Compromisso Verde",
                titleStart: "Embalagens que",
                titleHighlight: "cuidam do planeta",
                subtitle: "Consumidores premium preferem marcas que reduzem o uso de plásticos descartáveis. Trabalhamos com papel kraft certificado para contato com alimentos, aliando a estética natural a tecnologias que garantem total impermeabilidade.",
                imageBadge1: "ECO",
                imageBadge2: "BIOFOODPACK",
                features: [
                    { id: "1", num: "1", title: 'Kraft Certificado', description: 'Maior segurança alimentar e alinhamento com práticas sustentáveis.' },
                    { id: "2", num: "2", title: 'Menos Plástico', description: 'Vários opções que degradam com facilidade, reduzindo a poluição.' }
                ]
            },
            render: (props) => <Sustainability {...props} />
        },
        Cta: {
            fields: {
                badgeText: { type: "text" },
                titleStart: { type: "textarea" },
                titleHighlight: { type: "text" },
                subtitle: { type: "textarea" },
                primaryButtonText: { type: "text" },
                secondaryButtonText: { type: "text" },
                primaryButtonLink: { type: "text" },
                secondaryButtonLink: { type: "text" },
                bgText: { type: "text" },
                ...typographyFields
            },
            defaultProps: {
                badgeText: "Eleve o seu Delivery",
                titleStart: "Mude para as dezenas \n de opções na nossa",
                titleHighlight: "Linha Embalagens",
                subtitle: "Entre em contato via WhatsApp e conte com atendimento rápido e suporte da MCosta Representações.",
                primaryButtonText: "Chamar no WhatsApp",
                secondaryButtonText: "Ver Produtos",
                primaryButtonLink: "https://wa.me/5521960142258",
                secondaryButtonLink: "#produtos",
                bgText: "ECOFOODPACK",
                fontFamily: "inherit",
                fontSize: 0,
                textColor: ""
            },
            render: (props) => <Cta {...props} />
        },
        About: {
            fields: {
                badge: { type: "text" },
                title: { type: "text" },
                subtitle: { type: "text" },
                description: { type: "textarea" },
                media: mediaField,
                stats: {
                    type: "array",
                    arrayFields: {
                        label: { type: "text" },
                        value: { type: "text" }
                    }
                },
                ...typographyFields
            },
            defaultProps: {
                badge: "Nossa História",
                title: "Sustentabilidade e Inovação",
                subtitle: "Desde o início dos anos 2000 no mercado gráfico.",
                description: "A MCosta Representações e a Ecofoodpack nasceram com o DNA de solucionar problemas ambientais através de embalagens práticas e de baixo impacto.",
                media: "/ecofood_sustainability_hero_detail_1775152908993.png",
                stats: [
                    { label: "Experiência", value: "+20 Anos" },
                    { label: "Certificação", value: "Kraft FSC" },
                    { label: "Eco-Friendly", value: "100%" }
                ],
                fontFamily: "inherit",
                fontSize: 0,
                textColor: ""
            },
            render: (props: any) => <About {...props} />
        },
        Contact: {
            fields: {
                title: { type: "text" },
                subtitle: { type: "text" },
                description: { type: "textarea" },
                phone_whatsapp: { type: "text" },
                phone_fixed: { type: "text" },
                email: { type: "text" },
                instagram: { type: "text" },
                whatsapp_link: { type: "text" }
            },
            defaultProps: {
                title: "Vamos Iniciar um Projeto?",
                subtitle: "Falar com Especialista",
                description: "Seja para tirar dúvidas sobre materiais ou solicitar um orçamento personalizado.",
                phone_whatsapp: "(21) 96014-2258",
                phone_fixed: "(22) 2654-2082",
                email: "contato@ecofoodpack.com.br",
                instagram: "@mcostaecofoodpack",
                whatsapp_link: "https://wa.me/5521960142258"
            },
            render: (props) => <Contact {...props} />
        },
        Newsletter: {
            fields: {
                title: { type: "text" },
                subtitle: { type: "text" },
                placeholder: { type: "text" },
                buttonText: { type: "text" },
                disclaimer: { type: "text" }
            },
            defaultProps: {
                title: "Fique por Dentro das Novidades",
                subtitle: "Receba em primeira mão lançamentos, promoções exclusivas e dicas de sustentabilidade para o seu negócio.",
                placeholder: "Seu melhor e-mail",
                buttonText: "Inscrever-se",
                disclaimer: "Respeitamos sua privacidade. Cancele quando quiser."
            },
            render: (props) => <Newsletter {...props} />
        }
    },
};
