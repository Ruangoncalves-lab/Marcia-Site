export interface HeroProps {
    badgeText: string;
    titleStart: string;
    titleHighlight: string;
    titleEnd: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    whatsappLink: string;
    image?: string;
    // Tipografia
    fontFamily?: string;
    fontSize?: number;
    textColor?: string;
}

export const Hero = ({
    badgeText = "Ecofoodpack — Embalagens Sustentáveis",
    titleStart = "Diferencie",
    titleHighlight = "sua marca.",
    titleEnd = "Valorize o seu produto.",
    description = "Aqui você encontra uma variedade de embalagens sustentáveis para alimentos. Ideal para restaurantes, fast food ou até mesmo consumo próprio.",
    primaryButtonText = "Explorar Catálogo",
    secondaryButtonText = "Solicitar Orçamento",
    whatsappLink = "https://wa.me/5521960142258",
    image,
    fontFamily = "inherit",
    fontSize = 0,
    textColor = ""
}: HeroProps) => {
    
    const titleStyle = {
        fontFamily: fontFamily !== "inherit" ? fontFamily : undefined,
        fontSize: fontSize > 0 ? `${fontSize}px` : undefined,
        color: textColor || undefined,
        lineHeight: fontSize > 0 ? "1.1" : undefined
    };

    const textStyle = {
        fontFamily: fontFamily !== "inherit" ? fontFamily : undefined,
        color: textColor ? `${textColor}cc` : undefined // Um pouco de transparência para a descrição
    };

    return (
        <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-surface-hero">
            {/* Background pattern/texture */}
            <div className="absolute inset-0 bg-texture opacity-20 pointer-events-none"></div>

            {/* Decorative organic shapes */}
            <div className="absolute -top-[10%] -right-[5%] w-[40%] h-[60%] bg-accent-primary opacity-[0.03] rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-[10%] -left-[5%] w-[35%] h-[50%] bg-accent-secondary opacity-[0.05] rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-[1200px] mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8 max-w-2xl">
                    <div>
                        <div className="inline-block px-4 py-1.5 rounded-badge bg-accent-subtle text-accent-primary font-body text-caption font-bold tracking-widest uppercase mb-6 border border-accent-primary/10">
                            {badgeText}
                        </div>

                        <h1 
                            className="font-display text-hero-title leading-[1.05] text-text-primary uppercase tracking-tight"
                            style={titleStyle}
                        >
                            {titleStart} <br />
                            <span className="text-accent-primary italic" style={{ color: textColor ? undefined : "inherit" }}>{titleHighlight}</span> <br />
                            {titleEnd}
                        </h1>
                    </div>

                    <p 
                        className="font-body text-hero-subtitle text-text-muted max-w-lg leading-relaxed"
                        style={textStyle}
                    >
                        {description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <a href="#produtos">
                            <button className="btn-primary w-full sm:w-auto px-8 py-4 text-lg">
                                {primaryButtonText}
                            </button>
                        </a>
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                            <button className="btn-secondary w-full sm:w-auto px-8 py-4 text-lg">
                                {secondaryButtonText}
                            </button>
                        </a>
                    </div>

                    <div className="flex items-center gap-6 pt-8 border-t border-border-default/50 max-w-md">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-surface-section-alt flex items-center justify-center overflow-hidden">
                                    <div className="w-full h-full bg-accent-subtle flex items-center justify-center text-[10px] font-bold text-accent-primary">ECO</div>
                                </div>
                            ))}
                        </div>
                        <div className="text-sm">
                            <p className="font-body font-bold text-text-primary">+500 Clientes Satisfeitos</p>
                            <p className="font-body text-text-muted text-xs">Qualidade comprovada</p>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:block relative h-[600px]">
                    <div className="absolute inset-0 bg-accent-primary/5 rounded-2xl transform rotate-3 scale-95 border border-accent-primary/10"></div>
                    <div className="absolute inset-0 bg-surface-card rounded-2xl shadow-float border border-border-default overflow-hidden flex items-center justify-center group p-8">
                        <div className="absolute inset-0 bg-texture opacity-5"></div>
                        {image ? (
                            <img src={image} className="w-full h-full object-cover rounded-xl relative z-10 animate-float" alt="Hero presentation" />
                        ) : (
                            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center space-y-8 animate-float">
                                <div className="w-48 h-48 rounded-2xl bg-accent-subtle border-2 border-accent-primary/20 shadow-lg flex items-center justify-center transform -rotate-6">
                                    <svg viewBox="0 0 100 100" className="w-24 h-24 text-accent-primary" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <div className="w-56 h-32 rounded-2xl bg-white border border-border-subtle shadow-card flex items-center justify-center transform rotate-3">
                                    <div className="space-y-3 w-full px-6">
                                        <div className="h-2 w-3/4 bg-border-subtle rounded"></div>
                                        <div className="h-2 w-1/2 bg-border-subtle/50 rounded"></div>
                                        <div className="h-6 w-1/3 bg-accent-subtle rounded-badge"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Floating badge */}
                    <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-card shadow-float border border-border-default z-20 max-w-[200px]">
                        <div className="text-accent-primary font-display font-bold text-2xl mb-1">100%</div>
                        <p className="font-body text-xs text-text-muted leading-tight">Biodegradável e Seguro para Alimentos</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
