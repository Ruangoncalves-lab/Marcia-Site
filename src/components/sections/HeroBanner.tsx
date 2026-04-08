import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export interface HeroBannerProps {
  image?: string;
  mobileImage?: string;
  alt?: string;
  fitMode?: "cover" | "contain";
  heightMode?: "auto" | "fixed" | "full";
  customHeight?: number;
  bgColor?: string;
  aspectRatio?: string;
}

/**
 * HeroBanner — exibe um banner full-width (imagem ou vídeo) com controles de ajuste.
 * Suporta mídia específica para mobile e proporção 9:16.
 */
export const HeroBanner = ({
  image = "/hero-banner.png",
  mobileImage = "",
  alt = "Banner MCosta Representações — Embalagens que valorizam a sua marca",
  fitMode = "contain",
  heightMode = "auto",
  customHeight = 600,
  bgColor = "#f5f4f0",
  aspectRatio = "auto",
}: HeroBannerProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mídia final baseada no dispositivo
  const currentMedia = (isMobile && mobileImage) ? mobileImage : image;

  // Função para detectar se a mídia é um vídeo
  const isVideo = (url: any) => {
    if (typeof url !== "string") return false;
    return url.startsWith("data:video/") || url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".ogg");
  };

  const isVideoContent = isVideo(currentMedia);

  // Determina a altura baseada no modo
  const getSectionHeight = () => {
    if (isMobile) {
      return "auto";
    }
    switch (heightMode) {
      case "full":
        return "100vh";
      case "fixed":
        return `${customHeight}px`;
      case "auto":
      default:
        return "auto";
    }
  };

  return (
    <section
      aria-label="Banner principal"
      className="hero-banner-section overflow-hidden"
      style={{
        width: "100.1vw",
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50.05vw",
        marginRight: "-50.05vw",
        lineHeight: 0,
        background: bgColor,
        height: getSectionHeight(),
        display: (heightMode !== "auto" || isMobile) ? "flex" : "block",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        outline: "none",
        aspectRatio: isMobile ? "9/16" : "auto",
      }}
    >
      {isVideoContent ? (
        <video
          key={currentMedia}
          src={currentMedia}
          autoPlay
          muted
          loop
          playsInline
          style={{
            display: "block",
            width: "100.5%",
            height: "100%",
            objectFit: fitMode,
            marginLeft: "-0.25%",
          }}
        />
      ) : (
        <motion.img
          key={currentMedia}
          src={currentMedia}
          alt={alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            display: "block",
            width: "100.5%",
            height: (heightMode === "auto" && !isMobile) ? "auto" : "100%",
            maxHeight: (heightMode === "auto" && !isMobile) ? "85vh" : "none",
            objectFit: fitMode,
            objectPosition: "center",
            aspectRatio: (aspectRatio !== "auto" && !isMobile) ? aspectRatio : undefined,
            border: "none",
            outline: "none",
            marginLeft: "-0.25%",
          }}
          loading="eager"
          decoding="async"
        />
      )}
    </section>
  );
};
