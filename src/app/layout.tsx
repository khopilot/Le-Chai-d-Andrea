import type { Metadata } from "next";
import { Cormorant_Garamond, Cinzel, Jost } from "next/font/google";
import ClientShell from "@/components/layout/ClientShell";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Le Chai d'Andrea — Restaurant, Cave & Épicerie Fine",
  description: "Un lieu d'exception où la gastronomie rencontre l'art de la vigne. Restaurant gastronomique, cave à vins et épicerie fine à Fontevraud-l'Abbaye.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${cinzel.variable} ${jost.variable}`}>
      <body><ClientShell>{children}</ClientShell></body>
    </html>
  );
}
