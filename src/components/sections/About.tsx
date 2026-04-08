import { motion } from 'framer-motion';
import { Leaf, Award, Recycle } from 'lucide-react';

export interface AboutProps {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    media?: string; // Pode ser URL de imagem ou vídeo (Base64 ou Link)
    stats: { label: string; value: string }[];
    // Tipografia
    fontFamily?: string;
    fontSize?: number;
    textColor?: string;
}

export const About = ({
    badge = "Nossa História",
    title = "Sustentabilidade e Inovação",
    subtitle = "Desde o início dos anos 2000 no mercado gráfico.",
    description = "A MCosta Representações e a Ecofoodpack nasceram com o DNA de solucionar problemas ambientais através de embalagens práticas e de baixo impacto.",
    media = "/ecofood_sustainability_hero_detail_1775152908993.png",
    stats = [
        { label: "Experiência", value: "+20 Anos" },
        { label: "Certificação", value: "Kraft FSC" },
        { label: "Eco-Friendly", value: "100%" }
    ],
    fontFamily = "inherit",
    fontSize = 0,
    textColor = ""
}: AboutProps) => {
    
    // Função para detectar se a mídia é um vídeo
    const isVideo = (url: any) => {
        if (typeof url !== "string") return false;
        return url.startsWith("data:video/") || url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".ogg");
    };

    const isVideoContent = isVideo(media);

    const titleStyle = {
        fontFamily: fontFamily !== "inherit" ? fontFamily : undefined,
        fontSize: fontSize > 0 ? `${fontSize}px` : undefined,
        color: textColor || undefined,
        lineHeight: "1.2"
    };

    const textStyle = {
        fontFamily: fontFamily !== "inherit" ? fontFamily : undefined,
        color: textColor ? `${textColor}cc` : undefined
    };

    return (
        <section id="quem-somos" className="py-24 bg-white overflow-hidden scroll-mt-20">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Visual Side */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-square rounded-2xl bg-surface-hero overflow-hidden relative shadow-inner border border-gray-100/50">
                            {isVideoContent ? (
                                <video 
                                    src={media}
                                    autoPlay 
                                    muted 
                                    loop 
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <img 
                                    src={media || "/ecofood_sustainability_hero_detail_1775152908993.png"} 
                                    alt={title} 
                                    className="w-full h-full object-cover"
                                />
                            )}
                            <div className="absolute inset-0 bg-accent-primary/5 mix-blend-multiply pointer-events-none"></div>
                        </div>
                        
                        {/* Floating Card */}
                        <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-2xl shadow-xl max-w-xs border border-gray-100 hidden md:block z-10">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-accent-subtle flex items-center justify-center">
                                    <Leaf className="text-accent-primary" size={24} />
                                </div>
                                <div className="font-display font-bold text-lg text-text-primary">DNA Sustentável</div>
                            </div>
                            <p className="text-sm text-text-muted leading-relaxed">
                                Focados em reduzir a pegada de carbono através de embalagens biodegradáveis de alta performance.
                            </p>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-subtle text-accent-primary font-bold text-xs uppercase tracking-widest leading-none">
                            <Award size={14} /> {badge}
                        </div>
                        
                        <h2 
                            className="font-serif-headline text-4xl md:text-5xl font-bold text-text-primary leading-[1.2]"
                            style={titleStyle}
                        >
                            {title} <br/>
                            <span className="text-accent-primary" style={{ color: textColor ? undefined : "inherit" }}>{subtitle}</span>
                        </h2>

                        <p 
                            className="font-body text-lg text-text-muted leading-relaxed"
                            style={textStyle}
                        >
                            {description}
                        </p>

                        <div className="grid grid-cols-3 gap-8 py-8 border-y border-gray-100">
                            {stats.map((stat, i) => (
                                <div key={i} className="text-center md:text-left">
                                    <div className="font-display font-black text-3xl text-accent-primary mb-1">{stat.value}</div>
                                    <div className="text-xs font-bold uppercase tracking-widest text-text-muted">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <div className="flex items-center gap-3 text-sm font-medium text-text-primary bg-surface-hero px-5 py-3 rounded-xl border border-gray-100">
                                <Recycle size={18} className="text-accent-primary" /> Matéria-prima Renovável
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium text-text-primary bg-surface-hero px-5 py-3 rounded-xl border border-gray-100">
                                <Award size={18} className="text-accent-primary" /> Qualidade Certificada
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
