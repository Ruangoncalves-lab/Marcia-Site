import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
    id: string;
    children: ReactNode;
    className?: string;
    alternate?: boolean;
}

export const Section = ({ id, children, className = '', alternate = false }: SectionProps) => {
    const bgColor = alternate ? 'bg-surface-section-alt' : 'bg-surface-page';

    return (
        <section id={id} className={`py-24 md:py-32 w-full relative ${bgColor} overflow-hidden`}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`max-w-[1200px] mx-auto px-6 relative z-10 ${className}`}
            >
                {children}
            </motion.div>
        </section>
    );
};
