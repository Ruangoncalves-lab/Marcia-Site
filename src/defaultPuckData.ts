export const defaultHomeData = {
    content: [
        {
            "type": "HeroSlider",
            "props": {
                "id": "hero-1",
                "slides": [
                    {
                        "id": "1",
                        "badge": "Ecofoodpack — 100% Sustentável",
                        "title": "Embalagens que Valorizam sua Marca.",
                        "subtitle": "Destaque-se com o Kraft Certificado e garanta a melhor experiência para seu cliente.",
                        "buttonText": "Conhecer Produtos",
                        "buttonLink": "#produtos",
                        "image": "/ecofood_packaging_hero_product_1775152849305.png" 
                    },
                    {
                        "id": "2",
                        "badge": "Nossa Missão",
                        "title": "Conectando Negócios a um Futuro Verde.",
                        "subtitle": "Desde o início dos anos 2000, unindo alta tecnologia com baixo impacto ambiental.",
                        "buttonText": "Quem Somos",
                        "buttonLink": "#quem-somos",
                        "image": "/ecofood_sustainability_hero_detail_1775152908993.png"
                    },
                    {
                        "id": "3",
                        "badge": "Atendimento Especializado",
                        "title": "Soluções Versáteis para seu Delivery.",
                        "subtitle": "Representante oficial Ecofoodpack. Qualidade certificada para o seu restaurante.",
                        "buttonText": "Solicitar Orçamento",
                        "buttonLink": "#contato",
                        "image": "/ecofood_catalog_hero_arrangement_1775152928875.png"
                    }
                ]
            }
        },
        {
            "type": "About",
            "props": {
                "id": "about-1",
                "badge": "Quem Somos",
                "title": "Experiência e Compromisso",
                "subtitle": "DNA focado em soluções ambientais.",
                "description": "A MCosta Representações atua no mercado gráfico desde o início dos anos 2000. Como representante da Ecofoodpack, nossa missão é fornecer embalagens de alta tecnologia que resolvem problemas ambientais através de soluções práticas, utilizando matérias-primas 100% renováveis.",
                "stats": [
                    { "label": "No Mercado", "value": "+20 Anos" },
                    { "label": "Produtos", "value": "50+" },
                    { "label": "Sustentável", "value": "100%" }
                ]
            }
        },
        {
            "type": "Categories",
            "props": {
                "id": "cat-1",
                "title": "Nossas Linhas",
                "subtitle": "Embalagens sustentáveis para cada tipo de alimento.",
                "categories": [
                    { "id": "1", "title": "Linha Kraft", "items": "Bandejas, Caixas e Marmitas", "iconType": "kraft" },
                    { "id": "2", "title": "Linha Oriental", "items": "Box Kraft, Branca e Personalizada", "iconType": "oriental" },
                    { "id": "3", "title": "Potes & Copos", "items": "Copos de papel, Potes e Tampas", "iconType": "potes" },
                    { "id": "4", "title": "Sacos & Sacolas", "items": "Papel SOS e Sacolas de Viagem", "iconType": "sacolas" }
                ]
            }
        },
        {
            "type": "Products",
            "props": {
                "id": "prod-1",
                "titleStart": "Destaques do",
                "titleHighlight": "Catálogo",
                "subtitle": "Confira as soluções mais procuradas para um delivery premium e sustentável.",
                "products": [
                    { "id": "1", "title": "Bandeja Kraft Multiuso", "category": "Linha Kraft", "description": "Resistência e estética natural para porções e lanches.", "iconType": "kraft", "tags": "Ecológico, Kraft" },
                    { "id": "2", "title": "Box Oriental", "category": "Linha Oriental", "description": "Design clássico com vedação superior para culinária asiática.", "iconType": "oriental", "tags": "Veda Bem, Térmica" },
                    { "id": "3", "title": "Embalagens Seladas", "category": "Higiene Total", "description": "Segurança contra vazamentos, ideal para Delivery de alto fluxo.", "iconType": "selada", "tags": "Anti-Vazamento" }
                ]
            }
        },
        {
            "type": "Testimonials",
            "props": {
                "id": "test-1",
                "title": "O que dizem nossos parceiros",
                "subtitle": "Satisfação garantida em cada entrega."
            }
        },
        {
            "type": "Contact",
            "props": {
                "id": "contact-1",
                "title": "Pronto para Mudar?",
                "subtitle": "Fale com nosso Time",
                "description": "Estamos prontos para tirar suas dúvidas sobre materiais, personalização e prazos de entrega.",
                "phone_whatsapp": "(21) 96014-2258",
                "phone_fixed": "(22) 2654-2082",
                "email": "contato@ecofoodpack.com.br",
                "instagram": "@mcostaecofoodpack",
                "whatsapp_link": "https://wa.me/5521960142258"
            }
        }
    ],
    root: {}
};

// We keep the about data for legacy if needed, but the focus is now the single-page Home
export const defaultAboutData = defaultHomeData;
