import type { Metadata } from "next";
import PageHero from "@/components/pages/PageHero";
import RestaurantMenu from "@/components/RestaurantMenu";

export const metadata: Metadata = {
  title: "Restaurant — Le Chai d'Andrea",
  description: "Cuisine du terroir revisitée, formules déjeuner et dîner, accords mets-vins. Fontevraud-l'Abbaye.",
};

export default function RestaurantPage() {
  return (
    <>
      <PageHero
        label="La Table"
        title={<>Notre <em className="italic text-or">Carte</em></>}
        subtitle="Cuisine du terroir revisitée, produits locaux de saison."
        backgroundImage="/images/hero-restaurant.png"
      />
      <RestaurantMenu />
    </>
  );
}
