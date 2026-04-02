export const defaultHomeData = {
    content: [
        {
            "type": "HeroSlider",
            "props": {
                "slides": [
                    {
                        "id": "1",
                        "badge": "Ecofoodpack — 100% Sustentável",
                        "title": "Embalagens que Valorizam sua Marca.",
                        "subtitle": "Destaque-se com o Kraft Certificado e garanta a melhor experiência para seu cliente.",
                        "buttonText": "Explorar Catálogo",
                        "buttonLink": "#produtos",
                        "image": "/ecofood_packaging_hero_product_1775152849305.png" 
                    },
                    {
                        "id": "2",
                        "badge": "Compromisso Verde",
                        "title": "Inovação em Cada Detalhe Ecológico.",
                        "subtitle": "Consumidores premium preferem marcas que reduzem o uso de plásticos descartáveis.",
                        "buttonText": "Nossa Missão",
                        "buttonLink": "#sobre",
                        "image": "/ecofood_sustainability_hero_detail_1775152908993.png"
                    },
                    {
                        "id": "3",
                        "badge": "Linha Completa",
                        "title": "Soluções Versáteis para seu Delivery.",
                        "subtitle": "De potes a sacolas personalizadas. Tudo o que seu negócio precisa em um só lugar.",
                        "buttonText": "Solicitar Orçamento",
                        "buttonLink": "#contato",
                        "image": "/ecofood_catalog_hero_arrangement_1775152928875.png"
                    }
                ]
            }
        },
        { type: "PromoBanners", props: { id: "promo-1" } },
        {
            type: "Products",
            props: {
                id: "prod-1",
                titleStart: "Nossos",
                titleHighlight: "Produtos",
                subtitle: "Representamos a linha completa de embalagens EcoFoodPack, líderes em soluções sustentáveis para o setor alimentício.",
                products: [
                    { id: "1", title: 'Linha Kraft', category: 'Quentes e Frios', description: 'Embalagens kraft para delivery, ideais para alimentos quentes e frios. Resistência e praticidade em um só produto.', iconType: 'kraft', tags: ['Kraft', 'Resistente'] },
                    { id: "2", title: 'Linha Kraft Plus', category: 'Premium', description: 'Versão premium com maior resistência e acabamento diferenciado. Perfeita para quem busca excelência.', iconType: 'kraft', tags: ['Premium', 'Kraft'] },
                    { id: "3", title: 'Linha P&B', category: 'Alimentos Secos', description: 'Embalagens brancas e kraft para alimentos secos. Versatilidade para diversos tipos de negócio.', iconType: 'print', tags: ['Branco', 'Secos'] },
                    { id: "4", title: 'Embalagens Seladas', category: 'Alto Vácuo', description: 'Bandejas e tampas para selagem a vácuo. Mantenha seus produtos frescos por mais tempo.', iconType: 'selada', tags: ['Vácuo', 'Tampas'] },
                    { id: "5", title: 'Potes e Copos', category: 'Bebidas e Alimentos', description: 'Linha completa de potes e copos para bebidas e alimentos. Qualidade que seu cliente percebe.', iconType: 'selada', tags: ['Bebidas', 'Sopas'] },
                    { id: "6", title: 'Personalizados', category: 'Marca Própria', description: 'Produtos com personalização exclusiva para sua marca. Destaque-se da concorrência.', iconType: 'print', tags: ['Personalizado', 'Branding'] }
                ]
            }
        },
        { type: "Categories", props: { id: "cat-1" } },
        {
            type: "Benefits",
            props: {
                id: "ben-1",
                titleStart: "Temos a nossa",
                titleHighlight: "Garantia",
                subtitle: "Mais do que representação, entregamos resultados e compromisso.",
                experienceValue: "+50",
                experienceText: "Tipos de Produtos",
                projectsValue: "+500",
                projectsText: "Clientes Atendidos",
                benefits: [
                    { id: "1", title: '100% Sustentável', description: 'A EcoFoodPack garante materiais ecológicos.', metrics: '100%' },
                    { id: "2", title: 'Avaliação 5 Estrelas', description: 'Satisfação garantida pelos restaurantes parceiros.', metrics: '5★' },
                    { id: "3", title: 'Atendimento Próximo', description: 'Contato ágil via WhatsApp ou e-mail.', metrics: 'Rápido' }
                ]
            }
        },
        { type: "Testimonials", props: { id: "test-1" } },
        {
            type: "Cta",
            props: {
                id: "cta-1",
                badgeText: "Fale Conosco",
                titleStart: "Envie sua",
                titleHighlight: "Mensagem",
                subtitle: "Receba novidades e tire dúvidas. E-mail: mcostaecofoodpack@gmail.com",
                primaryButtonText: "Chamar no WhatsApp",
                secondaryButtonText: "Voltar ao topo",
                primaryButtonLink: "https://wa.me/5521982336850",
                bgText: "CONTATO"
            }
        }
    ],
    root: {}
};

export const defaultAboutData = {
    content: [
        {
            type: "Hero",
            props: {
                id: "hero-about",
                badgeText: "Sobre Nós",
                titleStart: "Especialistas em",
                titleHighlight: "Embalagens",
                titleEnd: "Sustentáveis",
                description: "A MCosta Representações é uma empresa especializada em representação comercial de embalagens sustentáveis. Como representante autorizado da EcoFoodPack, oferecemos soluções completas em embalagens para restaurantes, fast food, delivery e estabelecimentos alimentícios em geral.",
                primaryButtonText: "Ver Produtos",
                secondaryButtonText: "Falar com Consultor",
                whatsappLink: "https://wa.me/5521982336850"
            }
        },
        {
            type: "Process",
            props: {
                id: "proc-about",
                title: "Nossos Pilares",
                subtitle: "O que nos move diariamente",
                steps: [
                    { id: "1", num: "1", title: "Missão", description: "Conectar empresas a produtos de qualidade que respeitam o meio ambiente, com atendimento personalizado." },
                    { id: "2", num: "2", title: "Visão", description: "Ser referência em representação comercial de embalagens sustentáveis." },
                    { id: "3", num: "3", title: "Valores", description: "Ética, transparência e compromisso inabalável com o cliente e a natureza." }
                ]
            }
        },
        {
            type: "Sustainability",
            props: {
                id: "sust-about",
                badgeText: "Inovação Eco-Friendly",
                titleStart: "Indo além da",
                titleHighlight: "Caixinha",
                subtitle: "Nossa missão é conectar empresas a produtos de qualidade que respeitam o meio ambiente, proporcionando um atendimento personalizado e comprometido com a satisfação de nossos clientes.",
                imageBadge1: "ECOFOODPACK",
                imageBadge2: "100% SUSTENTÁVEL"
            }
        },
        {
            type: "Cta",
            props: {
                id: "cta-about",
                badgeText: "Fale Conosco",
                titleStart: "Entre em",
                titleHighlight: "Contato",
                subtitle: "E-mail: mcostaecofoodpack@gmail.com | (21) 98233-6850",
                primaryButtonText: "Chamar no WhatsApp",
                primaryButtonLink: "https://wa.me/5521982336850"
            }
        }
    ],
    root: {}
};
