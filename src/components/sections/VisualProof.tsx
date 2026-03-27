export interface VisualProofProps {
    title: string;
    subtitle: string;
    beforeLabel: string;
    beforeText: string;
    beforeImage?: string;
    afterLabel: string;
    afterText: string;
    afterBadge: string;
    afterImage?: string;
}

export const VisualProof = ({
    title = "A Diferença é Visual",
    subtitle = "O cuidado com a estética impacta diretamente no faturamento.",
    beforeLabel = "Comum",
    beforeText = "Apenas um recipiente.",
    beforeImage,
    afterLabel = "Premium",
    afterText = "Uma extensão da sua marca que os clientes fotografam e desejam.",
    afterBadge = "$$$",
    afterImage
}: VisualProofProps) => {
    return (
        <section className="py-24 md:py-32 w-full bg-surface-section-alt relative overflow-hidden" id="beneficios">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-display text-section-title text-text-primary uppercase mb-4">
                        {title}
                    </h2>
                    <p className="font-body text-section-subtitle text-text-muted">
                        {subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative">
                    {/* Divider Line */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border-subtle -translate-x-1/2 z-0"></div>

                    {/* Before */}
                    <div className="bg-surface-page rounded-card p-6 border border-border-default h-[450px] flex flex-col items-center justify-between relative z-10">
                        <div className="w-full flex justify-between items-center bg-white p-4 rounded-t-lg shadow-sm border-b border-border-subtle">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                                <div>
                                    <div className="w-24 h-3 bg-gray-200 rounded mb-2"></div>
                                    <div className="w-16 h-2 bg-gray-100 rounded"></div>
                                </div>
                            </div>
                            <div className="w-16 h-5 bg-gray-200 rounded-badge"></div>
                        </div>

                        <figure className="flex-1 w-full flex items-center justify-center opacity-40 grayscale overflow-hidden relative">
                            {beforeImage ? (
                                <img src={beforeImage} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                                    <rect x="40" y="80" width="120" height="80" rx="4" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="2" />
                                    <path d="M40 80 L100 50 L160 80" stroke="#9CA3AF" strokeWidth="2" fill="none" />
                                </svg>
                            )}
                        </figure>

                        <div className="w-full text-center mt-6">
                            <span className="font-display text-text-muted uppercase text-sm tracking-widest block mb-2">{beforeLabel}</span>
                            <p className="font-body text-body text-text-secondary italic">"{beforeText}"</p>
                        </div>
                    </div>

                    {/* After */}
                    <div className="bg-surface-card rounded-card p-6 border-2 border-accent-subtle shadow-float h-[450px] flex flex-col items-center justify-between relative z-10 overflow-hidden group">
                        {/* Glow Accent */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary opacity-5 rounded-full blur-3xl -translate-y-1/2 transition-transform duration-700 group-hover:scale-150"></div>

                        <div className="w-full flex justify-between items-center bg-white p-4 rounded-t-lg shadow-sm border-b border-border-subtle relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full border-2 border-accent-primary overflow-hidden bg-accent-subtle flex items-center justify-center text-accent-primary font-bold text-xs">MR</div>
                                <div>
                                    <div className="font-body font-bold text-sm text-text-primary">Experiência Premium</div>
                                    <div className="text-xs text-text-muted mt-1 flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-green-500"></span> Entregue Agora
                                    </div>
                                </div>
                            </div>
                            <div className="px-3 py-1 bg-accent-primary text-white text-xs font-bold rounded-badge">{afterBadge}</div>
                        </div>

                        <figure className="flex-1 w-full flex items-center justify-center relative z-10 p-2 overflow-hidden">
                            {afterImage ? (
                                <img src={afterImage} alt="" className="w-full h-full object-cover rounded-xl shadow-lg border-2 border-[#DDD7B3]" />
                            ) : (
                                <svg width="240" height="240" viewBox="0 0 240 240" fill="none" className="transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2">
                                    <rect x="50" y="100" width="140" height="90" rx="8" fill="#DDD7B3" stroke="#255937" strokeWidth="3" className="shadow-lg" />
                                    <path d="M50 100 L120 70 L190 100" stroke="#255937" strokeWidth="3" fill="#EFEDE6" />
                                    <rect x="95" y="130" width="50" height="30" rx="4" fill="#255937" />
                                    <text x="120" y="150" fill="white" fontSize="12" fontFamily="Roboto" fontWeight="bold" textAnchor="middle">PREMIUM</text>
                                    <path d="M70 180 L170 180" stroke="#255937" strokeOpacity="0.2" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            )}
                        </figure>

                        <div className="w-full text-center mt-6 relative z-10">
                            <span className="font-display text-accent-primary font-bold uppercase text-sm tracking-widest block mb-2">{afterLabel}</span>
                            <p className="font-body text-body text-text-primary font-medium">"{afterText}"</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
