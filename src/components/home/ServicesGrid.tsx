import Link from "next/link";
import Ornament from "@/components/ui/Ornament";
import RevealSection from "@/components/RevealSection";
import { Utensils, WineGlass, Champagne } from "@/components/ui/Icons";
import { type ReactNode } from "react";

const SERVICES: { icon: ReactNode; label: string; title: string; desc: string; href: string }[] = [
  {
    icon: <Utensils className="h-8 w-8 text-or" />,
    label: "La Table",
    title: "Restaurant Gastronomique",
    desc: "Cuisine du terroir revisitée, produits locaux de saison et accords mets-vins sélectionnés par notre sommelier.",
    href: "/restaurant",
  },
  {
    icon: <WineGlass className="h-8 w-8 text-or" />,
    label: "L'Annexe du Chai",
    title: "Cave & Épicerie Fine",
    desc: "Plus de 200 références de vins, spiritueux, fromages affinés et produits d'exception. Livraison mondiale.",
    href: "/boutique",
  },
  {
    icon: <Champagne className="h-8 w-8 text-or" />,
    label: "Agenda",
    title: "Événements & Privatisation",
    desc: "Dégustations verticales, soirées thématiques, séminaires. Privatisez le Chai pour vos événements.",
    href: "/evenements",
  },
];

export default function ServicesGrid() {
  return (
    <section className="relative z-[2] flex min-h-screen items-center bg-[linear-gradient(160deg,#0a0806,#120e0a_50%,#0a0806)]">
      <div className="w-full px-12 py-[100px] max-md:px-6 xl:px-24 2xl:px-40">
        <RevealSection className="mb-16 flex flex-col items-center text-center">
          <span className="mb-4 font-jost text-[0.58rem] uppercase tracking-[0.5em] text-or opacity-80">
            Nos Univers
          </span>
          <Ornament />
        </RevealSection>

        <RevealSection>
          <div className="grid grid-cols-3 gap-8 max-md:grid-cols-1 max-md:gap-4">
            {SERVICES.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group flex flex-col items-center border border-or/15 bg-white/[0.02] p-10 text-center no-underline transition-all duration-300 hover:-translate-y-1 hover:border-or/40 hover:bg-white/[0.04] hover:shadow-[0_8px_30px_rgba(201,168,76,0.12)]"
              >
                <span className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-or/[0.06] transition-colors group-hover:bg-or/[0.15]">
                  {s.icon}
                </span>
                <span className="mb-2 font-cinzel text-[0.62rem] uppercase tracking-[0.25em] text-or">
                  {s.label}
                </span>
                <span className="mb-3 font-cormorant text-[1.6rem] italic leading-tight text-creme">
                  {s.title}
                </span>
                <p className="mb-6 font-jost text-[0.72rem] leading-[1.7] text-pierre">
                  {s.desc}
                </p>
                <span className="mt-auto font-jost text-[0.58rem] uppercase tracking-[0.3em] text-or transition-all group-hover:tracking-[0.4em]">
                  Découvrir &rarr;
                </span>
              </Link>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
