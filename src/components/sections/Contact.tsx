import { motion } from 'framer-motion';
import { Phone, MessageCircle, Mail, MapPin, Instagram, Clock, Send } from 'lucide-react';

export interface ContactProps {
    title: string;
    subtitle: string;
    description: string;
    phone_whatsapp: string;
    phone_fixed: string;
    email: string;
    instagram: string;
    whatsapp_link: string;
}

export const Contact = ({
    title = "Vamos Iniciar um Projeto?",
    subtitle = "Falar com Especialista",
    description = "Seja para tirar dúvidas sobre materiais ou solicitar um orçamento personalizado, nossa equipe está pronta para te atender com agilidade.",
    phone_whatsapp = "(21) 96014-2258",
    phone_fixed = "(22) 2654-2082",
    email = "contato@ecofoodpack.com.br",
    instagram = "@mcostaecofoodpack",
    whatsapp_link = "https://wa.me/5521960142258"
}: ContactProps) => {
    return (
        <section id="contato" className="py-24 bg-surface-hero relative overflow-hidden scroll-mt-20">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-accent-primary rounded-full blur-[120px]"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-secondary rounded-full blur-[150px]"></div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    
                    {/* Contact Info */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-10"
                    >
                        <div>
                            <div className="inline-flex items-center gap-2 mb-4 text-accent-primary font-bold text-xs uppercase tracking-widest bg-accent-subtle px-4 py-1.5 rounded-full leading-none">
                                <Send size={14} /> {subtitle}
                            </div>
                            <h2 className="font-serif-headline text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-6">
                               {title}
                            </h2>
                            <p className="font-body text-lg text-text-muted max-w-md leading-relaxed">
                                {description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-6">
                            <div className="group">
                                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-5 group-hover:bg-accent-primary group-hover:text-white transition-all duration-300">
                                    <MessageCircle size={24} />
                                </div>
                                <h4 className="font-display font-bold text-text-primary text-xl mb-2">WhatsApp</h4>
                                <a href={whatsapp_link} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent-primary transition-colors text-lg font-body">
                                    {phone_whatsapp}
                                </a>
                            </div>

                            <div className="group">
                                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-5 group-hover:bg-accent-primary group-hover:text-white transition-all duration-300">
                                    <Phone size={24} />
                                </div>
                                <h4 className="font-display font-bold text-text-primary text-xl mb-2">Telefone Fixo</h4>
                                <p className="text-text-muted text-lg font-body">{phone_fixed}</p>
                            </div>

                            <div className="group">
                                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-5 group-hover:bg-accent-primary group-hover:text-white transition-all duration-300">
                                    <Mail size={24} />
                                </div>
                                <h4 className="font-display font-bold text-text-primary text-xl mb-2">E-mail</h4>
                                <a href={`mailto:${email}`} className="text-text-muted hover:text-accent-primary transition-colors text-lg font-body block truncate">
                                    {email}
                                </a>
                            </div>

                            <div className="group">
                                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-5 group-hover:bg-accent-primary group-hover:text-white transition-all duration-300">
                                    <Instagram size={24} />
                                </div>
                                <h4 className="font-display font-bold text-text-primary text-xl mb-2">Instagram</h4>
                                <a href="https://www.instagram.com/mcostaecofoodpack/" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent-primary transition-colors text-lg font-body">
                                    {instagram}
                                </a>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-gray-200/50">
                            <div className="flex items-center gap-4 text-text-muted">
                                <Clock className="text-accent-primary" size={20} />
                                <span className="font-body">Atendimento: Segunda a Sexta, das 08h às 18h</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Contact Form Placeholder / visual decoration */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-white p-10 md:p-12 rounded-2xl shadow-xl shadow-accent-primary/5 border border-gray-100 flex flex-col justify-between"
                    >
                        <div className="space-y-6">
                            <h3 className="font-display font-bold text-2xl text-text-primary">Fale Conosco Agora</h3>
                            <p className="text-text-muted leading-relaxed font-body">
                                Clique no botão abaixo para iniciar uma conversa direta no WhatsApp e receber um atendimento personalizado.
                            </p>
                        </div>

                        <div className="mt-12 space-y-4">
                            <a 
                                href={whatsapp_link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full btn-primary py-5 rounded-xl flex items-center justify-center gap-3 text-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <MessageCircle size={24} /> Chamar no WhatsApp
                            </a>
                            <p className="text-xs text-center text-gray-400 font-body uppercase tracking-[0.1em] font-bold">
                                Atendimento Imediato em Horário Comercial
                            </p>
                        </div>
                        
                        <div className="mt-12 flex items-start gap-4 p-5 bg-surface-hero rounded-xl border border-gray-100">
                             <MapPin className="text-accent-primary mt-1 shrink-0" size={20} />
                             <div>
                                <h5 className="font-display font-bold text-text-primary text-sm mb-1 uppercase tracking-wider">Showroom & Vendas</h5>
                                <p className="text-xs text-text-muted leading-relaxed font-body">
                                   Região dos Lagos e Grande Rio - RJ.<br/>
                                   Consulte disponibilidade para todo o Brasil.
                                </p>
                             </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
