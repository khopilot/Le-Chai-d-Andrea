import type { Metadata } from "next";
import PageHero from "@/components/pages/PageHero";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact — Le Chai d'Andrea",
  description: "Contactez Le Chai d'Andrea. Adresse, horaires d'ouverture, formulaire de contact. Fontevraud-l'Abbaye.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Nous trouver"
        title={<>Venez nous <em className="italic text-or">rendre visite</em></>}
        subtitle="Restaurant, cave à vins et épicerie fine à Fontevraud-l'Abbaye."
      />
      <Contact />
    </>
  );
}
