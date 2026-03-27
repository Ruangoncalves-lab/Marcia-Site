export interface ProductItem {
    id: string;
    title: string;
    category: string;
    description: string;
    tags: string[];
    iconType: 'kraft' | 'selada' | 'print';
    image?: string;
}

export interface ProductsProps {
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    whatsappPhone: string;
    products: ProductItem[];
}

const getIcon = (type: string) => {
    switch (type) {
        case 'kraft': return (
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-accent-primary" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
        );
        case 'selada': return (
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-accent-primary" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        );
        case 'print': return (
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-accent-primary" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
        );
        default: return null;
    }
};

const defaultProducts: ProductItem[] = [
    {
        id: "1",
        title: 'Bandeja Kraft Multiuso',
        category: 'Linha Kraft',
        description: 'Balanças de papel kraft com tamanhos que variam de 600ml a 1500ml. Ideais para porções, lanches ou sobremesas.',
        tags: ['Multiuso', 'Papel Kraft Certificado'],
        iconType: 'kraft'
    },
    {
        id: "2",
        title: 'Embalagens Seladas CP3 a CP8',
        category: 'Linha Selada',
        description: 'Bandejas prontas para selamento, garantindo que o alimento não vaze ou perca temperatura. Perfeitas para delivery.',
        tags: ['Anti-Vazamento', 'Higiene Total'],
        iconType: 'selada'
    },
    {
        id: "3",
        title: 'Embalagens Personalizadas',
        category: 'Exclusividade & Branding',
        description: 'Valorize o branding do seu negócio! Caixa Box padrão oriental, Kraft, papel manteiga, sacolas e copos.',
        tags: ['Impressão Premium', 'Valorize a Marca'],
        iconType: 'print'
    }
];

export const Products = ({
    titleStart = "Soluções em",
    titleHighlight = "Embalagens",
    subtitle = "Qualidade que os seus clientes merecem",
    whatsappPhone = "5521960142258",
    products = defaultProducts
}: ProductsProps) => {
    return (
        <section className="py-24 md:py-32 w-full bg-[#f8faf9] relative" id="produtos">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="font-display text-section-title text-text-primary uppercase mb-4">
                        {titleStart} <span className="text-accent-primary">{titleHighlight}</span>
                    </h2>
                    <p className="font-body text-section-subtitle text-text-muted">
                        {subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-card overflow-hidden shadow-card border border-[#E2E6E4] hover:shadow-float transition-all duration-300 flex flex-col group h-full"
                        >
                            <div className="h-48 bg-surface-hero relative flex items-center justify-center border-b border-[#E2E6E4]">
                                {product.image ? (
                                    <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt={product.title} />
                                ) : (
                                    <>
                                        <div className="absolute inset-0 bg-texture opacity-[0.03]"></div>
                                        <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500 z-10">
                                            {getIcon(product.iconType)}
                                        </div>
                                    </>
                                )}
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-badge text-[10px] font-bold uppercase tracking-widest text-text-primary shadow-sm z-20">
                                    {product.category}
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="font-display text-2xl font-bold text-text-primary mb-3 leading-tight group-hover:text-accent-primary transition-colors">
                                    {product.title}
                                </h3>

                                <p className="font-body text-text-secondary text-sm leading-relaxed mb-6 flex-grow">
                                    {product.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {(product.tags || []).map((tag, i) => (
                                        <span key={i} className="inline-block px-3 py-1 bg-surface-section-alt text-text-muted text-[11px] font-bold uppercase tracking-wider rounded-md">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <a
                                    href={`https://wa.me/${whatsappPhone.replace(/\D/g, '')}?text=Olá!%20Tenho%20interesse%20na%20${encodeURIComponent(product.title)}.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-accent-primary text-white font-body font-bold py-3 rounded-button flex items-center justify-center gap-2 hover:bg-accent-hover transition-colors shadow-lg mt-auto"
                                >
                                    Solicitar Cotação
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
