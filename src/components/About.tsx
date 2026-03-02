"use client";
import RevealSection from "./RevealSection";

export default function About() {
  return (
    <section id="about" className="relative z-[2] flex min-h-screen items-center bg-[linear-gradient(160deg,#0d0a07,#110d09_50%,#0d0a07)]">
      <div className="w-full px-12 py-[100px] max-md:px-6 xl:px-24 2xl:px-40">
        <RevealSection>
          <div className="grid grid-cols-2 items-center gap-28 max-lg:grid-cols-1">
            {/* Image */}
            <div className="relative max-lg:hidden">
              <div className="relative w-full overflow-hidden" style={{ paddingBottom: "115%" }}>
                <img
                  src="/images/about-cave.png"
                  alt="Cave à vins du Chai d'Andrea"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(13,10,7,0.2),rgba(13,10,7,0.1)),radial-gradient(ellipse_at_40%_60%,rgba(92,26,26,0.15)_0%,transparent_60%)]" />
              </div>
              <div className="absolute -right-[15px] -top-[15px] h-full w-full border border-or/25 pointer-events-none" />
              <div className="absolute -bottom-6 -left-6 font-cormorant text-[6rem] font-semibold leading-none text-bordeaux opacity-30">2024</div>
            </div>

            {/* Text */}
            <div className="flex flex-col gap-7">
              <div>
                <span className="mb-3 block font-jost text-[0.58rem] uppercase tracking-[0.5em] text-or opacity-80">Notre Histoire</span>
                <h2 className="font-cormorant text-[clamp(2.2rem,4.5vw,4rem)] font-light leading-[1.1]">
                  Un chai, une <em className="italic text-or">âme</em>,<br />une table
                </h2>
              </div>
              <p className="font-cormorant text-[1.1rem] font-light leading-[1.9] text-pierre">
                Né d&apos;une passion pour les belles tables et les grands vins, <strong className="font-normal text-or-p">Le Chai d&apos;Andrea</strong> est bien plus qu&apos;un restaurant. C&apos;est un voyage sensoriel où chaque plat raconte une histoire, où chaque bouteille est le fruit d&apos;une rencontre avec un vigneron passionné.
              </p>
              <p className="font-cormorant text-[1.1rem] font-light leading-[1.9] text-pierre">
                Dans cet espace chaleureux aux pierres apparentes, nous proposons une cuisine du terroir revisitée, mettant en valeur les producteurs locaux. <strong className="font-normal text-or-p">L&apos;Annexe du Chai</strong> prolonge l&apos;expérience avec notre boutique de vins, épicerie fine et spiritueux — disponibles à emporter ou livrés partout dans le monde.
              </p>
              <div className="mt-2 grid grid-cols-2 gap-5">
                {[
                  { t: "Terroir", d: "Producteurs locaux sélectionnés, respect des saisons." },
                  { t: "Cave", d: "Plus de 200 références sélectionnées par notre sommelier." },
                  { t: "Livraison", d: "Expédition sécurisée dans 50+ pays à travers le monde." },
                  { t: "Événements", d: "Privatisation, séminaires, dégustations sur mesure." },
                ].map(({ t, d }) => (
                  <div key={t} className="border-l-2 border-or/30 pl-3.5">
                    <span className="mb-1 block font-cinzel text-[0.68rem] tracking-[0.15em] text-or">{t}</span>
                    <p className="font-cormorant text-[0.8rem] leading-[1.6] text-pierre">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
