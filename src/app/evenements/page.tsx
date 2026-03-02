import type { Metadata } from "next";
import PageHero from "@/components/pages/PageHero";
import Events from "@/components/Events";

export const metadata: Metadata = {
  title: "Événements — Le Chai d'Andrea",
  description: "Dégustations, privatisations, séminaires et événements au Chai d'Andrea. Fontevraud-l'Abbaye.",
};

export default function EvenementsPage() {
  return (
    <>
      <PageHero
        label="Agenda"
        title={<>Nos <em className="italic text-or">Événements</em></>}
        subtitle="Dégustations, privatisations, séminaires et soirées thématiques."
        backgroundImage="/images/hero-cave.png"
      />
      <Events />
    </>
  );
}
