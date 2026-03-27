export interface StepItem {
    id: string;
    num: string;
    title: string;
    description: string;
}

export interface ProcessProps {
    title: string;
    subtitle: string;
    steps: StepItem[];
}

const defaultSteps: StepItem[] = [
    {
        id: "1",
        num: "1",
        title: 'Escolha suas Embalagens',
        description: 'Navegue pelas nossas linhas: Kraft, Oriental, Potes, Sacolas e muito mais.'
    },
    {
        id: "2",
        num: "2",
        title: 'Personalize sua Marca',
        description: 'Aplicamos sua logomarca e identidade visual nas caixas, copos e sacolas.'
    },
    {
        id: "3",
        num: "3",
        title: 'Receba com Agilidade',
        description: 'Preparamos e enviamos seu pedido com diversas opções de entrega.'
    }
];

export const Process = ({
    title = "Processo Descomplicado",
    subtitle = "Da escolha à entrega, facilitamos o seu dia a dia.",
    steps = defaultSteps
}: ProcessProps) => {
    return (
        <section className="py-24 md:py-32 w-full bg-white relative" id="processo">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="font-display text-section-title text-text-primary uppercase mb-4">
                        {title}
                    </h2>
                    <p className="font-body text-section-subtitle text-text-muted">
                        {subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
                    {/* Connecting line */}
                    <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-border-subtle z-0"></div>

                    {steps.map((step) => (
                        <div
                            key={step.id}
                            className="flex flex-col items-center text-center px-8 relative z-10 space-y-6 group"
                        >
                            <div className="w-24 h-24 rounded-full bg-surface-section-alt border border-border-default flex items-center justify-center font-display text-3xl font-bold text-accent-primary shadow-sm group-hover:bg-white group-hover:shadow-card transition-all duration-500">
                                {step.num}
                            </div>

                            <div className="space-y-3">
                                <h4 className="font-display text-xl font-bold text-text-primary">
                                    {step.title}
                                </h4>
                                <p className="font-body text-text-secondary text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
