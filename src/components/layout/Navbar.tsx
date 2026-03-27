import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const menuItems = [
    { label: 'Início', href: '/' },
    { label: 'Quem Somos', href: '/quem-somos' },
    { label: 'Linha Kraft', href: '/#categorias' },
    { label: 'Embalagens', href: '/#produtos' },
    { label: 'Outlet', href: '/#produtos' },
];

export const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { scrollY } = useScroll();

    const navBackground = useTransform(
        scrollY,
        [0, 50],
        ['rgba(247, 246, 242, 0)', 'rgba(255, 255, 255, 0.95)']
    );

    const navBlur = useTransform(scrollY, [0, 50], ['blur(0px)', 'blur(8px)']);
    const navShadow = useTransform(
        scrollY,
        [0, 50],
        ['0 0 0 rgba(0,0,0,0)', '0 2px 10px rgba(0,0,0,0.03)']
    );

    return (
        <motion.header
            style={{
                backgroundColor: navBackground,
                backdropFilter: navBlur,
                WebkitBackdropFilter: navBlur,
                boxShadow: navShadow,
            }}
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        >
            <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
                <a href="#" className="flex items-center gap-2 relative z-50">
                    <img src="/logo-icon.png" alt="MCosta Representações — Ecofoodpack" className="h-12 w-auto object-contain" />
                </a>

                <nav className="hidden md:flex items-center gap-8">
                    {menuItems.map((item) => (
                        <a key={item.label} href={item.href} className="text-text-secondary hover:text-accent-primary transition-colors text-caption font-medium uppercase tracking-widest relative group">
                            {item.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent-primary transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                    <a
                        href="https://wa.me/5521960142258?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20as%20embalagens%20Ecofoodpack."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary py-2 px-5 text-sm uppercase tracking-wider"
                    >
                        Falar com Especialista
                    </a>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden relative z-50 w-8 h-8 flex flex-col items-center justify-center gap-1.5"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Menu"
                >
                    <span className={`w-6 h-0.5 bg-text-primary transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`w-6 h-0.5 bg-text-primary transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`w-6 h-0.5 bg-text-primary transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden bg-white border-t border-[#E2E6E4] shadow-lg"
                >
                    <div className="max-w-[1200px] mx-auto px-6 py-6 flex flex-col gap-4">
                        {menuItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="text-text-secondary hover:text-accent-primary transition-colors font-medium uppercase tracking-widest text-sm py-2 border-b border-[#F0F0F0]"
                            >
                                {item.label}
                            </a>
                        ))}
                        <a
                            href="https://wa.me/5521960142258?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20as%20embalagens%20Ecofoodpack."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary py-3 px-5 text-sm uppercase tracking-wider text-center mt-2"
                        >
                            Falar com Especialista
                        </a>
                    </div>
                </motion.div>
            )}
        </motion.header>
    );
};
