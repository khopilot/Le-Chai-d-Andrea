import type { Metadata } from "next";
import PageHero from "@/components/pages/PageHero";
import Boutique from "@/components/Boutique";

export const metadata: Metadata = {
  title: "Boutique — Le Chai d'Andrea & L'Annexe du Chai",
  description: "Cave à vins, épicerie fine, coffrets cadeaux et spiritueux. Livraison sécurisée dans le monde entier.",
};

export default function BoutiquePage() {
  return (
    <>
      <PageHero
        label="L'Annexe du Chai — Boutique en ligne"
        title={<>Nos <em className="italic text-or">Sélections</em></>}
        subtitle="Cave à vins, épicerie fine, spiritueux et coffrets cadeaux. Expédition mondiale."
        backgroundImage="/images/hero-cave.png"
      />
      <Boutique />
    </>
  );
}
