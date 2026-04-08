
export interface FooterProps {
    headerLogo?: string;
    footerLogo?: string;
    footerLogoWidth?: number;
    footerDescription?: string;
    headerEmail?: string;
    headerPhone?: string;
    headerFixedPhone?: string;
    instagramUrl?: string;
    facebookUrl?: string;
    linkedinUrl?: string;
    footerBgColor?: string;
    links?: Array<{ label: string; url: string }>;
}

export const Footer = ({
    headerLogo = "/logo-mcosta.png",
    footerLogo,
    footerLogoWidth = 140,
    footerDescription = "Especialistas em embalagens sustentáveis e premium que aumentam o valor percebido do seu produto, garantem higiene e transformam a experiência do seu delivery.",
    headerEmail = "mcostaecofoodpack@gmail.com",
    headerPhone = "21 98233-6850",
    headerFixedPhone = "22 2654-2082",
    instagramUrl = "https://www.instagram.com/mcostaecofoodpack/",
    facebookUrl = "#",
    footerBgColor = "#ff7c08",
    links = []
}: FooterProps) => {
    const activeLogo = footerLogo || headerLogo;
    
    return (
        <footer className="py-16 px-6" style={{ backgroundColor: footerBgColor }}>
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-white">
                <div className="col-span-1 lg:col-span-2">
                    <div className="flex items-center gap-2 mb-4 text-white">
                        <img 
                            src={activeLogo} 
                            alt="MCosta Representações" 
                            className="w-auto object-contain drop-shadow-md brightness-200 contrast-200" 
                            style={{ height: footerLogoWidth ? 'auto' : '3.5rem', width: footerLogoWidth || 'auto' }}
                        />
                    </div>
                    <p className="text-white/80 font-body max-w-sm">
                        {footerDescription}
                    </p>
                    <div className="flex items-center gap-4 mt-6">
                        {facebookUrl && facebookUrl !== "#" && (
                            <a href={facebookUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                            </a>
                        )}
                        {instagramUrl && (
                            <a href={instagramUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" /></svg>
                            </a>
                        )}
                    </div>
                </div>

                <div>
                    <h4 className="font-body font-bold text-lg mb-4">Links Rápidos</h4>
                    <ul className="space-y-3 font-body text-white/80">
                        {links && links.length > 0 ? (
                            links.map((link, idx) => (
                                <li key={idx}>
                                    <a href={link.url} className="hover:text-white transition-colors">{link.label}</a>
                                </li>
                            ))
                        ) : (
                            <>
                                <li><a href="#home" className="hover:text-white transition-colors">Página Inicial</a></li>
                                <li><a href="#categorias" className="hover:text-white transition-colors">Nossas Linhas</a></li>
                                <li><a href="#produtos" className="hover:text-white transition-colors">Produtos Premium</a></li>
                                <li><a href="#beneficios" className="hover:text-white transition-colors">Benefícios</a></li>
                                <li><a href="#contato" className="hover:text-white transition-colors">Contato</a></li>
                            </>
                        )}
                    </ul>
                </div>

                <div>
                    <h4 className="font-body font-bold text-lg mb-4 text-white">Contato MCosta</h4>
                    <ul className="space-y-3 font-body text-white/80">
                        <li className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            {headerEmail}
                        </li>
                        <li className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            {headerPhone}
                        </li>
                        {headerFixedPhone && (
                            <li className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                {headerFixedPhone}
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto mt-16 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-sm font-body text-white/60 gap-4">
                <div>
                    © {new Date().getFullYear()} MCosta Representações. Todos os direitos reservados.
                </div>
                <div className="text-xs">
                    Representante Oficial <span className="text-white font-bold">Ecofoodpack</span>
                </div>
            </div>
        </footer>
    );
};
