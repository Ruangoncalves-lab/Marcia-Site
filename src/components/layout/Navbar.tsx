import { useState, forwardRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { ChevronDown, Search, Heart, User, ShoppingCart, Instagram, Youtube, Globe } from 'lucide-react';
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

export const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { scrollY } = useScroll();

    const navBackground = useTransform(
        scrollY,
        [0, 50],
        ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.98)']
    );

    const navShadow = useTransform(
        scrollY,
        [0, 50],
        ['0 0 0 rgba(0,0,0,0)', '0 4px 20px rgba(0,0,0,0.08)']
    );

    const topBannerHeight = 45;
    
    // Animate navbar up when scrolling past the top banner
    const navTop = useTransform(
        scrollY,
        [0, topBannerHeight],
        [`${topBannerHeight}px`, '0px']
    );

    return (
        <>
            {/* Top Banner */}
            <div className="fixed top-0 left-0 right-0 h-[45px] bg-[#ff7c08] text-white z-50 flex items-center px-4 lg:px-12 text-xs md:text-sm font-body justify-between shadow-sm">
                <div className="truncate pr-4">
                   🌱 Bem-vindo à MCosta Representações!
                </div>
                <div className="flex items-center gap-4 md:gap-6">
                    <div className="hidden sm:flex items-center gap-1 cursor-pointer hover:text-gray-200 transition">
                        <Globe size={14} /> PT-BR <ChevronDown size={14} />
                    </div>
                    <div className="flex items-center gap-3">
                        <a href="https://www.instagram.com/mcostaecofoodpack/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition"><Instagram size={14} /></a>
                        <a href="#" className="hover:text-gray-200 transition"><Youtube size={14} /></a>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <motion.header
                style={{
                    backgroundColor: navBackground,
                    boxShadow: navShadow,
                    top: navTop
                }}
                className="fixed left-0 right-0 z-40 transition-all duration-300 border-b border-transparent data-[scrolled=true]:border-gray-100"
            >
                <div className="max-w-[1400px] mx-auto px-4 lg:px-8 h-[90px] flex items-center justify-between">
                    <a href="/" className="flex items-center gap-2 relative z-50 mr-8">
                        <img src="/logo-icon.png" alt="MCosta Representações" className="h-14 w-auto object-contain" />
                    </a>

                    {/* Navigation Menu (Shadcn UI structure) */}
                    <div className="hidden lg:flex flex-1 justify-center">
                        <NavigationMenu.Root className="relative flex w-full justify-center z-10">
                            <NavigationMenu.List className="flex items-center gap-2 m-0 list-none">
                                <NavigationMenu.Item>
                                    <NavigationMenu.Link className="nav-link block select-none rounded-md px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none hover:bg-gray-100 hover:text-accent-primary" href="#">
                                        Início
                                    </NavigationMenu.Link>
                                </NavigationMenu.Item>

                                <NavigationMenu.Item>
                                    <NavigationMenu.Trigger className="nav-trigger group">
                                        Explorar <ChevronDown className="nav-chevron transition-transform duration-200 group-data-[state=open]:rotate-180" aria-hidden="true" />
                                    </NavigationMenu.Trigger>
                                    <NavigationMenu.Content className="nav-content absolute top-0 left-0 w-full sm:w-auto">
                                        <ul className="m-0 grid list-none gap-x-2 gap-y-1 p-4 sm:w-[500px] sm:grid-cols-2 lg:w-[600px]">
                                            <ListItem href="#produtos" title="Embalagens Kraft">Potes, saladeiras e bandejas biodegradáveis.</ListItem>
                                            <ListItem href="#produtos" title="Oriental">Caixas e displays para comida asiática.</ListItem>
                                            <ListItem href="#produtos" title="Sacos & Sacolas">Papel SOS e sacos viagem sustentáveis.</ListItem>
                                            <ListItem href="#produtos" title="Personalizados">Valorize sua marca com embalagens únicas.</ListItem>
                                        </ul>
                                    </NavigationMenu.Content>
                                </NavigationMenu.Item>

                                <NavigationMenu.Item>
                                    <NavigationMenu.Link className="nav-link block select-none rounded-md px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none hover:bg-gray-100 hover:text-accent-primary" href="#quem-somos">
                                        Quem Somos
                                    </NavigationMenu.Link>
                                </NavigationMenu.Item>

                                <NavigationMenu.Item>
                                    <NavigationMenu.Link className="nav-link block select-none rounded-md px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none hover:bg-gray-100 hover:text-accent-primary" href="#contato">
                                        Contato
                                    </NavigationMenu.Link>
                                </NavigationMenu.Item>

                                <NavigationMenu.Indicator className="nav-indicator z-10 flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform] duration-300">
                                    <div className="relative top-[70%] h-2 w-2 rotate-45 rounded-tl-sm bg-white border-t border-l border-gray-200 shadow-sm" />
                                </NavigationMenu.Indicator>
                            </NavigationMenu.List>

                            <div className="absolute top-full left-0 flex w-full justify-center">
                                <NavigationMenu.Viewport className="nav-viewport relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[center_top] overflow-hidden rounded-xl bg-white border border-gray-200 shadow-xl transition-[width,height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
                            </div>
                        </NavigationMenu.Root>
                    </div>

                    {/* Right Icons */}
                    <div className="hidden lg:flex items-center gap-5 ml-8 text-gray-700">
                        <button className="hover:text-accent-primary transition-colors flex items-center justify-center bg-[#f5f5f5] w-10 h-10 rounded-full hover:bg-accent-primary hover:text-white"><Search size={18} /></button>
                        <button className="hover:text-accent-primary transition-colors flex items-center justify-center bg-[#f5f5f5] w-10 h-10 rounded-full relative group hover:bg-accent-primary hover:text-white">
                            <Heart size={18} />
                            <span className="absolute -top-1 -right-1 bg-[#ff7c08] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">0</span>
                        </button>
                        <button className="hover:text-accent-primary transition-colors flex items-center justify-center bg-[#f5f5f5] w-10 h-10 rounded-full hover:bg-accent-primary hover:text-white"><User size={18} /></button>
                        <button className="hover:text-accent-primary transition-colors flex items-center justify-center bg-[#f5f5f5] w-10 h-10 rounded-full relative group hover:bg-accent-primary hover:text-white">
                            <ShoppingCart size={18} />
                            <span className="absolute -top-1 -right-1 bg-[#255937] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">3</span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-[5px] bg-[#f5f5f5] rounded-full"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Menu"
                    >
                        <span className={`w-4 h-[2px] bg-gray-800 transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
                        <span className={`w-4 h-[2px] bg-gray-800 transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`w-4 h-[2px] bg-gray-800 transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="lg:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full left-0 top-full"
                    >
                        <div className="px-6 py-6 flex flex-col gap-2 overflow-y-auto max-h-[70vh]">
                            <a href="#" onClick={() => setMobileOpen(false)} className="font-bold py-3 border-b border-gray-100">Home</a>
                            <a href="#quem-somos" onClick={() => setMobileOpen(false)} className="font-bold py-3 border-b border-gray-100">Quem Somos</a>
                            <a href="#produtos" onClick={() => setMobileOpen(false)} className="font-bold py-3 border-b border-gray-100">Produtos</a>
                            <a href="#contato" onClick={() => setMobileOpen(false)} className="font-bold py-3">Contato</a>
                        </div>
                    </motion.div>
                )}
            </motion.header>
        </>
    );
};
