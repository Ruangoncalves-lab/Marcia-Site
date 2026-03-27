export interface TestimonialItem {
    id: string;
    name: string;
    role: string;
    content: string;
    image: string; // initials
    avatarImage?: string;
}

export interface TestimonialsProps {
    title: string;
    subtitle: string;
    testimonials: TestimonialItem[];
}

const defaultTestimonials: TestimonialItem[] = [
    {
        id: "1",
        name: 'Elizete',
        role: 'Panini Pizzaria - Três Rios - RJ',
        content: 'Foi ótima embalagem de excelente qualidade. Prazo de entrega certinho material chegou tudo ok amei e comprarei mais. Muito obrigado amei muito top.',
        image: 'EP'
    },
    {
        id: "2",
        name: 'Silvania Herculano',
        role: 'Cliente Ecofoodpack',
        content: 'Produto de ótima qualidade de excelente acabamento parabéns aos envolvidos.',
        image: 'SH'
    },
    {
        id: "3",
        name: 'Tatiane',
        role: 'Cliente Ecofoodpack',
        content: 'Foi ótima embalagem de excelente qualidade. Prazo de entrega certinho material chegou tudo ok amei e comprarei. Muito obrigado amei muito bom.',
        image: 'TA'
    }
];

export const Testimonials = ({
    title = "Depoimentos de Clientes",
    subtitle = "Veja o que dizem aqueles que já transformaram seus negócios com nossas embalagens.",
    testimonials = defaultTestimonials
}: TestimonialsProps) => {
    return (
        <section className="py-24 md:py-32 w-full bg-surface-section-alt relative overflow-hidden" id="depoimentos">
            <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center space-x-2 text-accent-primary mb-4">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        ))}
                    </div>
                    <h2 className="font-display text-section-title text-text-primary uppercase mb-4">
                        {title}
                    </h2>
                    <p className="font-body text-section-subtitle text-text-muted">
                        {subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white p-8 rounded-card border border-[#E2E6E4] shadow-nav hover:shadow-card transition-shadow relative z-10"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                {testimonial.avatarImage ? (
                                    <img src={testimonial.avatarImage} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover border border-[#D5E3DA]" />
                                ) : (
                                    <div className="w-14 h-14 rounded-full bg-[#F0F4F2] text-accent-primary flex items-center justify-center font-display font-bold text-lg border border-[#D5E3DA]">
                                        {testimonial.image}
                                    </div>
                                )}
                                <div>
                                    <h4 className="font-display text-text-primary font-bold text-lg">{testimonial.name}</h4>
                                    <p className="font-body text-xs text-text-muted font-bold uppercase tracking-wider">{testimonial.role}</p>
                                </div>
                            </div>

                            <p className="font-body text-text-secondary leading-relaxed italic text-sm">
                                "{testimonial.content}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
