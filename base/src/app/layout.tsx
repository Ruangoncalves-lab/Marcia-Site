import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MCosta Representações | Embalagens Sustentáveis",
  description: "Representação comercial especializada em embalagens sustentáveis para alimentos. Representamos a EcoFoodPack, líder em embalagens para delivery, restaurantes e estabelecimentos alimentícios.",
  keywords: ["embalagens sustentáveis", "embalagens ecológicas", "delivery", "restaurantes", "fast food", "EcoFoodPack", "kraft", "embalagens biodegradáveis", "representação comercial"],
  authors: [{ name: "MCosta Representações" }],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "MCosta Representações | Embalagens Sustentáveis",
    description: "Soluções ecológicas para o seu negócio. Representamos a EcoFoodPack, líder em embalagens para delivery.",
    url: "https://mcosta.com.br",
    siteName: "MCosta Representações",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "MCosta Representações | Embalagens Sustentáveis",
    description: "Soluções ecológicas para o seu negócio. Representamos a EcoFoodPack, líder em embalagens para delivery.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
