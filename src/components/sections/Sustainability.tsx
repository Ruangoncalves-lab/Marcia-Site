export interface SustainabilityFeature {
    id: string;
    num: string;
    title: string;
    description: string;
}

export interface SustainabilityProps {
    badgeText: string;
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    features: SustainabilityFeature[];
    imageBadge1: string;
    imageBadge2: string;
    image?: string;
}

const defaultFeatures: SustainabilityFeature[] = [
    {
        id: "1",
        num: "1",
        title: 'Kraft Certificado',
        description: 'Maior segurança alimentar e alinhamento com práticas de consumo sustentável.'
    },
    {
        id: "2",
        num: "2",
        title: 'Menos Plástico',
        description: 'Buscamos constantemente viabilizar opções que degradam com facilidade, reduzindo a poluição.'
    }
];

export const Sustainability = ({
    badgeText = "Compromisso Verde",
    titleStart = "Embalagens que",
    titleHighlight = "cuidam do planeta",
    subtitle = "Consumidores premium preferem marcas que reduzem o uso de plásticos descartáveis. Trabalhamos com papel kraft certificado para contato com alimentos, aliando a estética natural a tecnologias que garantem total impermeabilidade. Uma imagem limpa e eco-friendly para sua marca sem abrir mão da performance.",
    features = defaultFeatures,
    imageBadge1 = "ECO",
    imageBadge2 = "BIOFOODPACK",
    image
}: SustainabilityProps) => {
    return (
        <section className="py-24 md:py-32 w-full bg-surface-hero relative overflow-hidden" id="sustentabilidade">
            <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left Side: Image/Composition */}
                <div className="relative h-[500px] bg-accent-primary rounded-xl overflow-hidden flex flex-col items-center justify-center p-8 text-center group">
                    <div className="absolute inset-0 bg-texture opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
                    {image && <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" />}

                    <div className="relative z-10 space-y-6">
                        <svg viewBox="0 0 100 100" className="w-24 h-24 mx-auto" fill="none">
                            <path d="M50 80 C80 80, 80 40, 50 20 C20 40, 20 80, 50 80 Z" stroke="#ffffff" strokeWidth="4" strokeLinejoin="round" />
                            <path d="M50 80 L50 40" stroke="#ffffff" strokeWidth="4" />
                            <path d="M50 60 L65 45" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
                        </svg>

                        <h3 className="font-display text-white text-3xl mb-2">{badgeText}</h3>
                        <p className="font-body text-white/80 max-w-sm mx-auto">Nossa linha reduz significativamente o impacto ambiental por ser biodegradável.</p>

                        <div className="pt-6 flex justify-center gap-4">
                            <div className="px-4 h-12 rounded-full border border-white/30 flex items-center justify-center text-xs font-bold text-white tracking-widest bg-white/5">{imageBadge1}</div>
                            <div className="px-4 h-12 rounded-full border border-white/30 flex items-center justify-center text-xs font-bold text-white tracking-widest bg-white/5">{imageBadge2}</div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Copy & Branding Focus */}
                <div className="space-y-8">
                    <h2 className="font-display text-section-title text-text-primary uppercase leading-[1.1] tracking-tight">
                        {titleStart} <br /> <span className="text-accent-primary">{titleHighlight}</span>
                    </h2>

                    <p className="font-body text-body text-text-secondary leading-relaxed">
                        {subtitle}
                    </p>

                    <div className="space-y-6 pt-4">
                        {features.map(feature => (
                            <div key={feature.id} className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-full bg-surface-card shadow-sm border border-[#E2E6E4] flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="font-display font-bold text-accent-primary">{feature.num}</span>
                                </div>
                                <div>
                                    <h4 className="font-display font-bold text-text-primary text-lg mb-1">{feature.title}</h4>
                                    <p className="font-body text-text-secondary text-sm">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};
