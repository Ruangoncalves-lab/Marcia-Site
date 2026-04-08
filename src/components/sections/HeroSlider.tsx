import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import "./HeroSlider.css";

export interface SlideData {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  layout?: "split" | "full" | "banner";
}

export interface HeroSliderProps {
  slides?: SlideData[];
}

const defaultSlides: SlideData[] = [
  {
    id: "1",
    badge: "Ecofoodpack — 100% Sustentável",
    title: "Embalagens que Valorizam sua Marca.",
    subtitle: "Destaque-se com o Kraft Certificado e garanta a melhor experiência para seu cliente.",
    buttonText: "Explorar Catálogo",
    buttonLink: "#produtos",
    image: "/ecofood_packaging_hero_product_1775152849305.png",
    layout: "split"
  },
  {
    id: "2",
    badge: "Compromisso Verde",
    title: "Inovação em Cada Detalhe Ecológico.",
    subtitle: "Consumidores premium preferem marcas que reduzem o uso de plásticos descartáveis.",
    buttonText: "Nossa Missão",
    buttonLink: "#sobre",
    image: "/ecofood_sustainability_hero_detail_1775152908993.png",
    layout: "split"
  },
  {
    id: "3",
    badge: "Linha Completa",
    title: "Soluções Versáteis para seu Delivery.",
    subtitle: "De potes a sacolas personalizadas. Tudo o que seu negócio precisa em um só lugar.",
    buttonText: "Solicitar Orçamento",
    buttonLink: "#contato",
    image: "/ecofood_catalog_hero_arrangement_1775152928875.png",
    layout: "split"
  }
];

export const HeroSlider = ({ slides = defaultSlides }: HeroSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Guard: reset index when slides are deleted in the editor
  useEffect(() => {
    if (slides.length > 0 && currentIndex >= slides.length) {
      setCurrentIndex(slides.length - 1);
    }
  }, [slides.length, currentIndex]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex, slides.length]);

  const paginate = (newDirection: number) => {
    if (slides.length <= 1) return;
    setDirection(newDirection);
    const nextIndex = (currentIndex + newDirection + slides.length) % slides.length;
    setCurrentIndex(nextIndex);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 500 : -500,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 500 : -500,
      opacity: 0
    })
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, rotate: -5 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 1, delay: 0.3 } }
  };

  // Safe access: never crash if currentIndex is temporarily out of bounds
  const safeIndex = Math.min(currentIndex, Math.max(0, slides.length - 1));
  const safeSlide = slides[safeIndex];

  // While slides array is empty or undefined, render an empty placeholder
  if (!safeSlide) {
    return (
      <section className="hero-slider-wrap relative w-full overflow-hidden flex items-center justify-center min-h-[400px]">
        <p className="text-gray-400 text-sm italic">Adicione um slide para começar.</p>
      </section>
    );
  }

  return (
    <section className={`hero-slider-wrap relative w-full overflow-hidden ${safeSlide.layout === 'banner' ? 'hero-slider-banner-mode' : ''}`}>
      <div className="absolute inset-0 bg-texture opacity-[0.03] pointer-events-none z-[1]"></div>
      
      {/* Organic Ornaments */}
      <div className="ornament ornament-top z-[1]">
        <svg viewBox="0 0 100 100" className="w-48 h-48 opacity-10">
          <path d="M50 0C50 0 80 30 80 60C80 90 50 100 50 100C50 100 20 90 20 60C20 30 50 0 50 0Z" fill="currentColor" className="text-secondary-100" />
        </svg>
      </div>
      <div className="ornament ornament-bottom z-[1]">
        <svg viewBox="0 0 100 100" className="w-64 h-64 opacity-5">
           <path d="M50 0C50 0 80 30 80 60C80 90 50 100 50 100C50 100 20 90 20 60C20 30 50 0 50 0Z" fill="currentColor" className="text-primary-100" />
        </svg>
      </div>

      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 }
          }}
          className="absolute inset-0 w-full h-full"
        >
          {/* BANNER mode: imagem inteira sem corte como fundo */}
          {safeSlide.layout === 'banner' && (
            <div className="absolute inset-0 w-full h-full z-0">
              {/* Fundo difuso da própria imagem para preencher bordas sem esticar */}
              <img 
                src={safeSlide.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-40"
              />
              <motion.img 
                src={safeSlide.image} 
                alt={safeSlide.title}
                className="relative w-full h-full object-contain z-10"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
              />
              {/* Overlay suave para texto legível */}
              {(safeSlide.title || safeSlide.subtitle) && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20"></div>
              )}
            </div>
          )}

          {/* FULL mode: imagem como fundo em cover (pode cortar) */}
          {safeSlide.layout === 'full' && (
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
              <motion.img 
                src={safeSlide.image} 
                alt={safeSlide.title}
                className="w-full h-full object-cover object-center"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
              />
              {(safeSlide.title || safeSlide.subtitle) && (
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
              )}
            </div>
          )}

          <div className="max-w-[1240px] mx-auto px-6 h-full relative z-10 flex">
            <div className={`w-full h-full pt-16 md:pt-20 lg:pt-24 ${
              safeSlide.layout === 'full' || safeSlide.layout === 'banner'
                ? 'flex flex-col justify-end pb-20' 
                : 'grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pb-12'
            }`}>
            
              {/* Left Content */}
              {(safeSlide.badge || safeSlide.title || safeSlide.subtitle) && (
                <motion.div 
                  className={`slide-content relative z-20 ${
                    safeSlide.layout === 'full' || safeSlide.layout === 'banner'
                      ? 'max-w-2xl px-2 lg:px-6' 
                      : ''
                  }`}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {safeSlide.badge && (
                    <div className="mb-6 inline-flex items-center gap-2">
                      <span className="slide-badge">{safeSlide.badge}</span>
                    </div>
                  )}
                  {safeSlide.title && (
                    <h1 className={`font-serif-headline text-4xl md:text-5xl lg:text-5xl font-bold leading-[1.1] mb-6 ${
                      safeSlide.layout === 'full' || safeSlide.layout === 'banner' 
                        ? 'text-white drop-shadow-lg' 
                        : 'text-text-primary'
                    }`}>
                      {safeSlide.title}
                    </h1>
                  )}
                  {safeSlide.subtitle && (
                    <p className={`font-body text-xl mb-10 max-w-lg leading-relaxed ${
                      safeSlide.layout === 'full' || safeSlide.layout === 'banner'
                        ? 'text-white/90 drop-shadow-md' 
                        : 'text-text-muted'
                    }`}>
                      {safeSlide.subtitle}
                    </p>
                  )}
                  {safeSlide.buttonText && (
                    <div className="flex flex-wrap gap-4 mt-6">
                      <a href={safeSlide.buttonLink} className="inline-block">
                        <button className="btn-grocee font-bold uppercase tracking-widest text-sm py-5 px-10 rounded-full transition-all flex items-center gap-2 group">
                          {safeSlide.buttonText}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </a>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Right Image (only if split) */}
              {(!safeSlide.layout || safeSlide.layout === 'split') && (
                <motion.div 
                  className="slide-image-wrap flex justify-center lg:justify-end items-center relative overflow-hidden h-full max-h-[480px]"
                  variants={imageVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="relative w-full max-w-[480px] aspect-[4/5] flex items-center justify-center mx-auto">
                     <div className="absolute inset-0 bg-accent-subtle/30 rounded-full blur-3xl scale-110 z-0"></div>
                     <img 
                       src={safeSlide.image} 
                       alt={safeSlide.title}
                       className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                     />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons (only if more than 1 slide) */}
      {slides.length > 1 && (
        <div className="absolute bottom-10 left-6 flex gap-4 z-30">
          <button 
            onClick={() => paginate(-1)}
            className="nav-btn"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => paginate(1)}
            className="nav-btn"
            aria-label="Próximo"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Indicators (only if more than 1 slide) */}
      {slides.length > 1 && (
        <div className="absolute right-6 bottom-10 flex flex-col gap-3 z-30">
           {slides.map((_, i) => (
             <button
               key={i}
               onClick={() => {
                 setDirection(i > currentIndex ? 1 : -1);
                 setCurrentIndex(i);
               }}
               className={`indicator ${currentIndex === i ? 'active' : ''}`}
               aria-label={`Slide ${i + 1}`}
             />
           ))}
        </div>
      )}
    </section>
  );
};
