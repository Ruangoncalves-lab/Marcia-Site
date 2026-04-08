import { useState, forwardRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { 
    ChevronDown, 
    Instagram, MapPin, Mail, Phone, 
    Clock, Facebook, Linkedin 
} from 'lucide-react';
import { cn } from '../../lib/utils';
import './Navbar.css';

const ListItem = forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenu.Link asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent-subtle hover:text-accent-primary focus:bg-accent-subtle focus:text-accent-primary",
              className
            )}
            {...props}
          >
            <div className="text-sm font-bold leading-none mb-2">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-text-muted font-body">
              {children}
            </p>
          </a>
        </NavigationMenu.Link>
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';

export interface NavbarProps {
    headerLogo?: string;
    headerLogoWidth?: number;
    mobileLogoWidth?: number;
    headerEmail?: string;
    headerPhone?: string;
    headerAddress?: string;
    headerHours?: string;
    topBannerBg?: string;
    topBannerTextColor?: string;
    headerBg?: string;
    headerTextColor?: string;
    ctaButtonText?: string;
    ctaButtonUrl?: string;
    ctaButtonBg?: string;
    facebookUrl?: string;
    linkedinUrl?: string;
    instagramUrl?: string;
    links?: Array<{ label: string; url: string }>;
}

export const Navbar = ({
    headerLogo = "/logo-icon.png",
    headerLogoWidth = 150,
    mobileLogoWidth = 100,
    headerEmail = "mcostaecofoodpack@gmail.com",
    headerPhone = "21 98233-6850",
    headerAddress = "Rio de Janeiro, Brasil",
    headerHours = "Seg-Sex: 08:00 - 18:00",
    topBannerBg = "#ff7c08",
    topBannerTextColor = "#ffffff",
    headerBg = "#ffffff",
    headerTextColor = "#374151",
    ctaButtonText = "Fale Conosco!",
    ctaButtonUrl = "https://wa.me/5521982336850",
    ctaButtonBg = "#255937",
    facebookUrl = "#",
    linkedinUrl = "#",
    instagramUrl = "https://www.instagram.com/mcostaecofoodpack/",
    links = []
}: NavbarProps) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { scrollY } = useScroll();

    // Fade effect for the background on scroll
    const navBackground = useTransform(
        scrollY,
        [0, 50],
        [headerBg || '#ffffff', headerBg || 'rgba(255, 255, 255, 0.98)']
    );

    const navShadow = useTransform(
        scrollY,
        [0, 50],
        ['0 0 0 rgba(0,0,0,0)', '0 4px 20px rgba(0,0,0,0.08)']
    );

    const topBannerHeight = 50;
    
    // Animate navbar up when scrolling past the top banner
    const navTop = useTransform(
        scrollY,
        [0, topBannerHeight],
        [`${topBannerHeight}px`, '0px']
    );

    return (
        <div className="relative w-full">
            {/* Layer 1: Top Info Bar (Yellow/Orange) */}
            <div 
                className="fixed top-0 left-0 right-0 h-[50px] z-[60] flex items-center px-4 lg:px-12 text-[11px] md:text-xs font-body justify-between shadow-sm"
                style={{ backgroundColor: topBannerBg, color: topBannerTextColor }}
            >
                {/* Left Info List */}
                <div className="flex items-center gap-4 lg:gap-8 overflow-x-auto no-scrollbar py-1">
                    <div className="flex items-center gap-1.5 whitespace-nowrap opacity-95">
                        <MapPin size={12} className="shrink-0" />
                        <span>{headerAddress}</span>
                    </div>
                    <div className="hidden md:flex items-center gap-1.5 whitespace-nowrap opacity-95">
                        <Mail size={12} className="shrink-0" />
                        <a href={`mailto:${headerEmail}`} className="hover:underline">{headerEmail}</a>
                    </div>
                    <div className="flex items-center gap-1.5 whitespace-nowrap opacity-95">
                        <Phone size={12} className="shrink-0" />
                        <span>{headerPhone}</span>
                    </div>
                    <div className="hidden lg:flex items-center gap-1.5 whitespace-nowrap opacity-95">
                        <Clock size={12} className="shrink-0" />
                        <span>{headerHours}</span>
                    </div>
                </div>

                {/* Right Social Icons */}
                <div className="flex items-center gap-3 md:gap-4 shrink-0 pl-4 border-l border-white/20 ml-2">
                    <a href={facebookUrl} className="hover:opacity-80 transition"><Facebook size={14} fill="currentColor" /></a>
                    <a href={linkedinUrl} className="hover:opacity-80 transition"><Linkedin size={14} fill="currentColor" /></a>
                    <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition"><Instagram size={14} /></a>
                </div>
            </div>

            {/* Layer 2: Main Navigation Menu (White) */}
            <motion.header
                style={{
                    backgroundColor: navBackground,
                    boxShadow: navShadow,
                    top: navTop,
                    color: headerTextColor
                }}
                className="fixed left-0 right-0 z-50 transition-all duration-300 border-b border-gray-100"
            >
                <div className="max-w-[1400px] mx-auto px-4 lg:px-8 h-[85px] flex items-center justify-between">
                    {/* Brand Logo */}
                    <a href="/" className="flex items-center gap-2 relative z-50 shrink-0">
                        <img 
                            src={headerLogo} 
                            alt="MCosta Representações" 
                            className="w-auto object-contain transition-all duration-300 hidden md:block" 
                            style={{ 
                                width: headerLogoWidth ? `${headerLogoWidth}px` : '150px' 
                            }}
                        />
                        <img 
                            src={headerLogo} 
                            alt="MCosta Representações" 
                            className="w-auto object-contain transition-all duration-300 md:hidden" 
                            style={{ 
                                width: mobileLogoWidth ? `${mobileLogoWidth}px` : '100px' 
                            }}
                        />
                    </a>

                    {/* Navigation Menu (Centered) */}
                    <div className="hidden lg:flex flex-1 justify-center px-8">
                        <NavigationMenu.Root className="relative flex w-full justify-center z-50">
                            <NavigationMenu.List className="flex items-center gap-6 m-0 list-none">
                                {links && links.length > 0 ? (
                                    links.map((link, idx) => (
                                        <NavigationMenu.Item key={idx}>
                                            <NavigationMenu.Link 
                                                className="text-[15px] font-bold uppercase tracking-wide hover:text-accent-primary transition-colors"
                                                href={link.url}
                                            >
                                                {link.label}
                                            </NavigationMenu.Link>
                                        </NavigationMenu.Item>
                                    ))
                                ) : (
                                    <>
                                        <NavigationMenu.Item>
                                            <NavigationMenu.Link 
                                                className="text-[15px] font-bold uppercase tracking-wide hover:text-accent-primary transition-colors"
                                                href="/"
                                            >
                                                Início
                                            </NavigationMenu.Link>
                                        </NavigationMenu.Item>

                                        <NavigationMenu.Item>
                                            <NavigationMenu.Trigger className="flex items-center gap-1 text-[15px] font-bold uppercase tracking-wide hover:text-accent-primary transition-colors group">
                                                Explorar <ChevronDown className="transition-transform duration-200 group-data-[state=open]:rotate-180 shrink-0" size={14} />
                                            </NavigationMenu.Trigger>
                                            <NavigationMenu.Content className="absolute top-full left-0 w-full sm:w-auto mt-2">
                                                <ul className="m-0 grid list-none gap-x-2 gap-y-1 p-4 sm:w-[500px] sm:grid-cols-2 lg:w-[600px] bg-white rounded-xl shadow-2xl border border-gray-100">
                                                    <ListItem href="#produtos" title="Embalagens Kraft">Potes, saladeiras e bandejas biodegradáveis.</ListItem>
                                                    <ListItem href="#produtos" title="Oriental">Caixas e displays para comida asiática.</ListItem>
                                                    <ListItem href="#produtos" title="Sacos & Sacolas">Papel SOS e sacos viagem sustentáveis.</ListItem>
                                                    <ListItem href="#produtos" title="Personalizados">Valorize sua marca com embalagens únicas.</ListItem>
                                                </ul>
                                            </NavigationMenu.Content>
                                        </NavigationMenu.Item>

                                        <NavigationMenu.Item>
                                            <NavigationMenu.Link 
                                                className="text-[15px] font-bold uppercase tracking-wide hover:text-accent-primary transition-colors"
                                                href="/quem-somos"
                                            >
                                                Quem Somos
                                            </NavigationMenu.Link>
                                        </NavigationMenu.Item>

                                        <NavigationMenu.Item>
                                            <NavigationMenu.Link 
                                                className="text-[15px] font-bold uppercase tracking-wide hover:text-accent-primary transition-colors"
                                                href="#contato"
                                            >
                                                Contato
                                            </NavigationMenu.Link>
                                        </NavigationMenu.Item>
                                    </>
                                )}
                            </NavigationMenu.List>
                        </NavigationMenu.Root>
                    </div>

                    {/* Action Button: Fale Conosco! */}
                    <div className="flex items-center gap-3 shrink-0">
                        <a 
                            href={ctaButtonUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-emerald-900/10 hover:shadow-emerald-900/20 hover:scale-105 active:scale-95 transition-all duration-300"
                            style={{ backgroundColor: ctaButtonBg }}
                        >
                            <svg 
                                viewBox="0 0 24 24" 
                                width="20" 
                                height="20" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                fill="none" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                                className="mr-1"
                            >
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" fill="currentColor" />
                                <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" fill="currentColor" />
                                <path d="M12 15c-1.1 0-2-.9-2-2" stroke="currentColor" />
                            </svg>
                            {ctaButtonText}
                        </a>

                        <a 
                            href={ctaButtonUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="md:hidden flex items-center justify-center w-11 h-11 rounded-full text-white shadow-lg transition-all"
                            style={{ backgroundColor: ctaButtonBg }}
                            aria-label={ctaButtonText}
                        >
                            <svg 
                                viewBox="0 0 24 24" 
                                width="22" 
                                height="22" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                fill="none" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            >
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                <path d="M12 15c-1.1 0-2-.9-2-2" stroke="currentColor" />
                            </svg>
                        </a>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden w-11 h-11 flex flex-col items-center justify-center gap-[5px] bg-gray-50 rounded-full border border-gray-100"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            <span className={`w-4 h-[2px] bg-gray-800 transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
                            <span className={`w-4 h-[2px] bg-gray-800 transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`w-4 h-[2px] bg-gray-800 transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="lg:hidden bg-white border-t border-gray-100 shadow-2xl absolute w-full left-0 top-full overflow-hidden"
                    >
                        <div className="px-6 py-8 flex flex-col gap-1 items-center">
                            {links && links.length > 0 ? (
                                links.map((link, idx) => (
                                    <a 
                                        key={idx}
                                        href={link.url} 
                                        onClick={() => setMobileOpen(false)} 
                                        className="text-lg font-bold uppercase tracking-widest py-3 border-b border-gray-50 w-full text-center hover:text-accent-primary"
                                    >
                                        {link.label}
                                    </a>
                                ))
                            ) : (
                                <>
                                    <a href="/" onClick={() => setMobileOpen(false)} className="text-lg font-bold uppercase tracking-widest py-3 border-b border-gray-50 w-full text-center hover:text-accent-primary">Home</a>
                                    <a href="/quem-somos" onClick={() => setMobileOpen(false)} className="text-lg font-bold uppercase tracking-widest py-3 border-b border-gray-50 w-full text-center hover:text-accent-primary">Quem Somos</a>
                                    <a href="#produtos" onClick={() => setMobileOpen(false)} className="text-lg font-bold uppercase tracking-widest py-3 border-b border-gray-50 w-full text-center hover:text-accent-primary">Produtos</a>
                                    <a href="#contato" onClick={() => setMobileOpen(false)} className="text-lg font-bold uppercase tracking-widest py-3 w-full text-center hover:text-accent-primary">Contato</a>
                                </>
                            )}
                            
                            <div className="mt-8 flex items-center gap-6 pb-4">
                               <a href={facebookUrl} className="text-gray-400 hover:text-blue-600 transition"><Facebook size={24} fill="currentColor" /></a>
                               <a href={linkedinUrl} className="text-gray-400 hover:text-blue-800 transition"><Linkedin size={24} fill="currentColor" /></a>
                               <a href={instagramUrl} className="text-gray-400 hover:text-pink-600 transition"><Instagram size={24} /></a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.header>
        </div>
    );
};
