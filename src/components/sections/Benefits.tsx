export interface BenefitItem {
    id: string;
    title: string;
    description: string;
    metrics: string;
}

export interface BenefitsProps {
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    experienceValue: string;
    experienceText: string;
    projectsValue: string;
    projectsText: string;
    benefits: BenefitItem[];
}

const defaultBenefits: BenefitItem[] = [
    {
        id: "1",
        title: 'Opções de Entrega Variáveis',
        description: 'Logística pensada para não deixar sua operação parar de funcionar. Dependendo das necessidades, despachamos o pedido pelo modo mais seguro e rápido.',
        metrics: 'Praticidade total'
    },
    {
        id: "2",
        title: 'Pagamento Flexível',
        description: 'Além de desconto no formato PIX, é possível parcelar seu pedido em até 6x sem juros.',
        metrics: '6x Sem Juros'
    },
    {
        id: "3",
        title: 'Atendimento Próximo',
        description: 'Vendedores consultivos. Nossa equipe atende direto via WhatsApp, te auxiliando a escolher a embalagem perfeita.',
        metrics: 'Suporte Rápido'
    }
];

export const Benefits = ({
    titleStart = "Uma Parceria",
    titleHighlight = "De Confiança",
    subtitle = "Nosso padrão de qualidade garante muito mais do que estética.",
    experienceValue = "+10",
    experienceText = "Anos de Mercado",
    projectsValue = "+5k",
    projectsText = "Clientes Ativos",
    benefits = defaultBenefits
}: BenefitsProps) => {
    return (
        <section className="py-24 md:py-32 w-full bg-surface-page relative overflow-hidden" id="sobre">
            <div className="max-w-[1200px] mx-auto px-6 lg:flex items-center gap-20">

                {/* Left: Branding & Stats */}
                <div className="lg:w-[40%] space-y-12 mb-16 lg:mb-0">
                    <div className="space-y-6">
                        <h2 className="font-display text-section-title text-text-primary uppercase leading-tight">
                            {titleStart} <br />
                            <span className="text-accent-primary">{titleHighlight}</span>
                        </h2>
                        <p className="font-body text-body text-text-secondary">
                            {subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 border-t border-border-subtle pt-10">
                        <div className="space-y-1">
                            <div className="font-display text-4xl font-bold text-text-primary">{experienceValue}</div>
                            <div className="font-body text-xs text-text-muted uppercase tracking-widest font-bold">{experienceText}</div>
                        </div>
                        <div className="space-y-1">
                            <div className="font-display text-4xl font-bold text-accent-primary">{projectsValue}</div>
                            <div className="font-body text-xs text-text-muted uppercase tracking-widest font-bold">{projectsText}</div>
                        </div>
                    </div>

                    <div className="p-8 bg-surface-hero rounded-card border border-accent-primary/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-texture opacity-5"></div>
                        <div className="relative z-10 flex items-center justify-between">
                            <span className="font-display font-medium text-text-primary">Especialistas em Branding Ambiental</span>
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-accent-primary shadow-sm group-hover:bg-accent-primary group-hover:text-white transition-colors">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Benefits List */}
                <div className="lg:w-[60%] space-y-6">
                    {benefits.map((benefit) => (
                        <div
                            key={benefit.id}
                            className="bg-white p-8 rounded-card border border-[#E2E6E4] hover:border-accent-primary/20 hover:shadow-card transition-all duration-300 group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="font-display text-xl font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                                    {benefit.title}
                                </h4>
                                <span className="font-body text-[10px] font-bold uppercase tracking-widest text-accent-primary bg-accent-subtle px-2 py-1 rounded">
                                    {benefit.metrics}
                                </span>
                            </div>
                            <p className="font-body text-text-secondary text-sm leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};
