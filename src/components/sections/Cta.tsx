import { Button } from '../ui/Button';

export interface CtaProps {
    badgeText: string;
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonLink: string;
    bgText: string;
}

export const Cta = ({
    badgeText = "Eleve o seu Delivery",
    titleStart = "Mude para as dezenas \n de opções na nossa",
    titleHighlight = "Linha Embalagens",
    subtitle = "Entre em contato via WhatsApp e conte com atendimento rápido e suporte da MCosta Representações.",
    primaryButtonText = "Chamar no WhatsApp",
    secondaryButtonText = "Ver Produtos",
    primaryButtonLink = "https://wa.me/5521960142258",
    secondaryButtonLink = "#produtos",
    bgText = "ECOFOODPACK"
}: CtaProps) => {
    return (
        <section className="py-24 md:py-32 w-full relative overflow-hidden bg-accent-primary text-white" id="contato">
            <div className="absolute inset-0 bg-texture opacity-10"></div>

            {/* Decorative large text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[15vw] font-bold text-white opacity-5 whitespace-nowrap select-none pointer-events-none">
                {bgText}
            </div>

            <div className="max-w-[800px] mx-auto px-6 text-center relative z-10 space-y-8">
                <div>
                    <div className="inline-block px-4 py-1.5 rounded-badge bg-white/10 text-white font-body text-caption font-bold tracking-widest uppercase mb-6 backdrop-blur-sm border border-white/20">
                        {badgeText}
                    </div>

                    <h2 className="font-display text-section-title uppercase leading-[1.1] mb-6 whitespace-pre-line">
                        {titleStart} <br />
                        <span className="text-accent-hover bg-white px-4 rounded transform -rotate-1 inline-block mt-2 shadow-lg">{titleHighlight}</span>
                    </h2>

                    <p className="font-body text-lg text-white/80 max-w-lg mx-auto mb-10">
                        {subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href={primaryButtonLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto"
                        >
                            <Button className="bg-white text-accent-primary hover:bg-surface-page shadow-[0_0_30px_rgba(255,255,255,0.3)] w-full">
                                {primaryButtonText}
                            </Button>
                        </a>
                        <a href={secondaryButtonLink} className="w-full sm:w-auto">
                            <Button className="bg-transparent border-white text-white hover:bg-white/10 w-full">
                                {secondaryButtonText}
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
