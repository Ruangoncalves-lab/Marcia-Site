export interface BannerItem {
    id: string;
    badge: string;
    titleStart: string;
    titleHighlight: string;
    linkText: string;
    linkUrl: string;
    bgColor: string;
    glowColor?: string;
    imageType: 'kraft' | 'selada';
    image?: string;
}

export interface PromoBannersProps {
    banners: BannerItem[];
}

const defaultBanners: BannerItem[] = [
    {
        id: "1",
        badge: "Biodegradável",
        titleStart: "Sua marca \n com o",
        titleHighlight: "Kraft Certificado",
        linkText: "Explorar Linha",
        linkUrl: "#produtos",
        bgColor: "surface-section-alt",
        imageType: "kraft"
    },
    {
        id: "2",
        badge: "Embalagens Seladas",
        titleStart: "Segurança \n e",
        titleHighlight: "Higiene Total",
        linkText: "Descobrir",
        linkUrl: "#produtos",
        bgColor: "[#F0F4F2]",
        glowColor: "accent-primary",
        imageType: "selada"
    }
];

export const PromoBanners = ({
    banners = defaultBanners
}: PromoBannersProps) => {
    return (
        <section className="py-20 w-full overflow-hidden bg-white">
            <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {banners.map((banner) => (
                    <div
                        key={banner.id}
                        className={`relative rounded-card overflow-hidden group min-h-[350px] flex items-center p-10 bg-${banner.bgColor || 'surface-section-alt'} ${(banner.bgColor || '').startsWith('[') ? `bg-${banner.bgColor}` : ''}`}
                        style={(banner.bgColor || '').startsWith('[') ? { backgroundColor: banner.bgColor.slice(1, -1) } : {}}
                    >
                        {/* Interactive glow effect */}
                        {banner.glowColor && (
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary opacity-[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
                        )}

                        <div className="relative z-10 max-w-[60%] space-y-6">
                            <span className="font-body text-xs font-bold uppercase tracking-widest text-accent-primary/80 bg-white/50 backdrop-blur-sm px-3 py-1 rounded-badge border border-accent-primary/10">
                                {banner.badge}
                            </span>

                            <h3 className="font-display text-3xl lg:text-4xl text-text-primary leading-tight uppercase whitespace-pre-line">
                                {banner.titleStart} <span className="text-accent-primary">{banner.titleHighlight}</span>
                            </h3>

                            <a
                                href={banner.linkUrl}
                                className="inline-flex items-center gap-2 font-body font-bold text-sm uppercase tracking-wider text-text-primary group/link"
                            >
                                {banner.linkText}
                                <div className="w-8 h-[1px] bg-text-primary transform origin-left group-hover/link:scale-x-150 transition-transform"></div>
                            </a>
                        </div>

                        {/* Banner Image / Illustration */}
                        <div className="absolute right-0 bottom-0 w-[55%] h-full flex items-end justify-center pointer-events-none p-6">
                            <div className="relative w-full aspect-square shadow-card rounded-xl overflow-hidden flex items-center justify-center transform group-hover:translate-y-[-10px] group-hover:scale-105 transition-all duration-700">
                                {banner.image ? (
                                    <img src={banner.image} className="w-full h-full object-cover rounded-xl border border-border-subtle" alt="" />
                                ) : (
                                    <div className="w-full h-full bg-white border border-border-subtle rounded-xl flex items-center justify-center">
                                        <div className="absolute inset-0 bg-texture opacity-[0.02]"></div>
                                        {banner.imageType === 'kraft' ? (
                                            <svg viewBox="0 0 24 24" className="w-16 h-16 text-accent-primary/30" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                        ) : (
                                            <svg viewBox="0 0 24 24" className="w-16 h-16 text-accent-primary/30" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
