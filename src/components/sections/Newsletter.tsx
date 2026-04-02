import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Leaf } from 'lucide-react';

export interface NewsletterProps {
    title: string;
    subtitle: string;
    placeholder: string;
    buttonText: string;
    disclaimer: string;
}

export const Newsletter = ({
    title = "Fique por Dentro das Novidades",
    subtitle = "Receba em primeira mão lançamentos, promoções exclusivas e dicas de sustentabilidade para o seu negócio.",
    placeholder = "Seu melhor e-mail",
    buttonText = "Inscrever-se",
    disclaimer = "Respeitamos sua privacidade. Cancele quando quiser."
}: NewsletterProps) => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail('');
        }
    };

    return (
        <section className="py-20 md:py-28 bg-accent-primary relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
                <svg viewBox="0 0 100 100" className="absolute top-8 right-12 w-20 h-20 opacity-10 text-white">
                    <path d="M50 80 C80 80, 80 40, 50 20 C20 40, 20 80, 50 80 Z" fill="currentColor" />
                </svg>
                <svg viewBox="0 0 100 100" className="absolute bottom-8 left-16 w-16 h-16 opacity-10 text-white rotate-45">
                    <path d="M50 80 C80 80, 80 40, 50 20 C20 40, 20 80, 50 80 Z" fill="currentColor" />
                </svg>
            </div>

            <div className="max-w-[700px] mx-auto px-6 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
                        <Leaf size={14} /> Newsletter Ecofoodpack
                    </div>

                    <h2 className="font-serif-headline text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                        {title}
                    </h2>

                    <p className="font-body text-white/80 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
                        {subtitle}
                    </p>

                    {subscribed ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 text-white"
                        >
                            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                                <Mail size={28} />
                            </div>
                            <p className="font-display text-xl font-bold mb-2">Inscrição Confirmada! 🌿</p>
                            <p className="font-body text-white/70">Em breve você receberá nossas novidades.</p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                            <div className="relative flex-1">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={placeholder}
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-800 font-body placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-8 py-4 rounded-xl bg-[#1a1a1a] text-white font-bold uppercase tracking-wider text-sm hover:bg-[#333] transition-all flex items-center justify-center gap-2 group shadow-lg whitespace-nowrap"
                            >
                                {buttonText}
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    )}

                    <p className="font-body text-white/50 text-xs mt-6 tracking-wide">
                        {disclaimer}
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
