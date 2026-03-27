export interface CategoryItem {
    id: string;
    title: string;
    items: string;
    iconType: 'kraft' | 'oriental' | 'potes' | 'sacolas';
    image?: string;
}

export interface CategoriesProps {
    title: string;
    subtitle: string;
    linkText: string;
    linkUrl: string;
    categories: CategoryItem[];
}

const getIcon = (type: string) => {
    switch (type) {
        case 'kraft': return (
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-accent-primary" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        );
        case 'oriental': return (
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-accent-primary" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3l1.8 1.8M21 3l-1.8 1.8M3 21l1.8-1.8m14.4 0L21 21M9 9h6v6H9V9z" />
            </svg>
        );
        case 'potes': return (
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-accent-primary" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M7 7h10M9 3h6v4H9V3zM6 12l1 9h10l1-9H6z" />
            </svg>
        );
        case 'sacolas': return (
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-accent-primary" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
        );
        default: return null;
    }
};

const defaultCategories: CategoryItem[] = [
    { id: "1", title: 'Linha Kraft', items: 'Bandejas, Caixas e Marmitas', iconType: 'kraft' },
    { id: "2", title: 'Linha Oriental', items: 'Box Kraft, Branca, Preta e Impressa', iconType: 'oriental' },
    { id: "3", title: 'Potes & Copos', items: 'Copos de papel, Potes e Tampas', iconType: 'potes' },
    { id: "4", title: 'Sacos & Sacolas', items: 'Kraft, Brancas, Temáticas e Pouch', iconType: 'sacolas' }
];

export const Categories = ({
    title = "Nossas Linhas",
    subtitle = "Embalagens sustentáveis para cada tipo de alimento.",
    linkText = "Ver Catálogo Completo",
    linkUrl = "#produtos",
    categories = defaultCategories
}: CategoriesProps) => {
    return (
        <section className="py-24 md:py-32 w-full bg-white relative overflow-hidden" id="categorias">
            <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                    <div className="max-w-xl">
                        <h2 className="font-display text-section-title text-text-primary uppercase mb-4">
                            {title}
                        </h2>
                        <p className="font-body text-section-subtitle text-text-muted">
                            {subtitle}
                        </p>
                    </div>

                    <a
                        href={linkUrl}
                        className="btn-secondary px-6 py-3 text-sm group"
                    >
                        {linkText}
                        <svg className="w-4 h-4 inline-block ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="bg-surface-section-alt p-10 rounded-card border border-border-subtle hover:border-accent-primary/20 hover:bg-white hover:shadow-card transition-all duration-300 group cursor-pointer"
                        >
                            {category.image ? (
                                <div className="w-24 h-24 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 border border-border-subtle group-hover:bg-accent-subtle transition-colors duration-500 overflow-hidden">
                                    <img src={category.image} className="w-full h-full object-cover" alt={category.title} />
                                </div>
                            ) : (
                                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 border border-border-subtle group-hover:bg-accent-subtle transition-colors duration-500">
                                    {getIcon(category.iconType)}
                                </div>
                            )}

                            <h4 className="font-display text-xl font-bold text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
                                {category.title}
                            </h4>

                            <p className="font-body text-text-muted text-xs uppercase tracking-widest font-bold">
                                {category.items}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
