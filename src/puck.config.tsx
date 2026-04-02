// @ts-nocheck
import type { Config } from "@measured/puck";
import { Hero } from "./components/sections/Hero";
import { HeroSlider } from "./components/sections/HeroSlider";
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

const imageField = {
    type: "custom" as const,
    render: ({ value, onChange }: any) => {
        return (
            <div className="flex flex-col gap-2 relative mt-2 bg-gray-50 border p-3 rounded-md">
                <label className="text-xs font-bold text-gray-500 uppercase">Upload de Imagem</label>
                <input
                    type="file"
                    accept="image/*"
                    className="text-xs w-full cursor-pointer file:cursor-pointer file:bg-emerald-700 file:text-white file:border-0 file:py-1 file:px-3 file:rounded file:mr-2 file:hover:bg-emerald-800 transition"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                                const img = new Image();
                                img.onload = () => {
                                    const canvas = document.createElement('canvas');
                                    const MAX = 800; // compress to save localstorage quota
                                    let w = img.width;
                                    let h = img.height;
                                    if (w > h && w > MAX) { h *= MAX / w; w = MAX; }
                                    else if (h > MAX) { w *= MAX / h; h = MAX; }
                                    canvas.width = w; canvas.height = h;
                                    const ctx = canvas.getContext('2d');
                                    ctx?.drawImage(img, 0, 0, w, h);
                                    onChange(canvas.toDataURL('image/webp', 0.8));
                                };
                                img.src = ev.target?.result as string;
                            };
                            reader.readAsDataURL(file);
                        }
                    }}
                />
                <div className="text-[10px] text-gray-400 text-center uppercase tracking-widest font-bold mt-1 mb-1">- ou url -</div>
                <input
                    type="text"
                    placeholder="http://..."
                    className="w-full p-2 border border-gray-200 rounded text-sm bg-white"
                    value={typeof value === 'string' && value.startsWith('http') ? value : ""}
                    onChange={(e) => onChange(e.target.value)}
                />

                {value && (
                    <div className="relative mt-2 border-t pt-2">
                        <img src={value} className="w-full max-h-32 object-contain rounded border border-gray-200 bg-white" />
                        <button
                            onClick={() => onChange("")}
                            className="absolute top-3 right-1 bg-red-500 hover:bg-red-600 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center shadow"
                            title="Remover Imagem"
                        >X</button>
                    </div>
                )}
            </div>
        );
    }
};

export const config: Config<any> = {
    categories: {
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
        VisualProof: {
            fields: {
                title: { type: "text" },
                subtitle: { type: "text" },
                beforeLabel: { type: "text" },
                beforeText: { type: "textarea" },
                beforeImage: imageField,
                afterLabel: { type: "text" },
                afterText: { type: "textarea" },
                afterBadge: { type: "text" },
                afterImage: imageField
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
                        image: imageField,
                        layout: {
                            type: "select",
                            options: [
                                { label: "Texto + Imagem Direita (Dividido)", value: "split" },
                                { label: "Arte Completa 16:9 (Fundo)", value: "full" }
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
                image: imageField,
            },
            defaultProps: {
                badgeText: "Ecofoodpack — Embalagens Sustentáveis",
                titleStart: "Diferencie",
                titleHighlight: "sua marca.",
                titleEnd: "Valorize o seu produto.",
                description: "Aqui você encontra uma variedade de embalagens sustentáveis para alimentos. Ideal para restaurantes, fast food ou até mesmo consumo próprio.",
                primaryButtonText: "Explorar Catálogo",
                secondaryButtonText: "Solicitar Orçamento",
                whatsappLink: "https://wa.me/5521960142258"
            },
            render: (props) => <Hero {...props} />,
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
                        image: imageField,
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
                        image: imageField,
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
                        image: imageField,
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
                        image: imageField,
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
                        avatarImage: imageField
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
                image: imageField,
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
                bgText: { type: "text" }
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
                bgText: "ECOFOODPACK"
            },
            render: (props) => <Cta {...props} />
        },
        About: {
            fields: {
                badge: { type: "text" },
                title: { type: "text" },
                subtitle: { type: "text" },
                description: { type: "textarea" },
                stats: {
                    type: "array",
                    arrayFields: {
                        label: { type: "text" },
                        value: { type: "text" }
                    }
                }
            },
            defaultProps: {
                badge: "Nossa História",
                title: "Sustentabilidade e Inovação",
                subtitle: "Desde o início dos anos 2000 no mercado gráfico.",
                description: "A MCosta Representações e a Ecofoodpack nasceram com o DNA de solucionar problemas ambientais através de embalagens práticas e de baixo impacto.",
                stats: [
                    { label: "Experiência", value: "+20 Anos" },
                    { label: "Certificação", value: "Kraft FSC" },
                    { label: "Eco-Friendly", value: "100%" }
                ]
            },
            render: (props) => <About {...props} />
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
                subtitle: { type: "textarea" },
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

