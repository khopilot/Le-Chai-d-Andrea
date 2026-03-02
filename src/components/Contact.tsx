"use client";
import { FormEvent } from "react";
import { showNotif } from "@/lib/notification";
import RevealSection from "./RevealSection";

export default function Contact() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const btn = (e.target as HTMLFormElement).querySelector("button[type=submit]") as HTMLButtonElement;
    const orig = btn.textContent;
    btn.textContent = "\u2713 Message envoy\u00E9 !";
    btn.style.background = "#2d6a4f";
    btn.style.color = "#fff";
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = "";
      btn.style.color = "";
      (e.target as HTMLFormElement).reset();
    }, 4000);
    showNotif("\u2709\uFE0F", "Message envoy\u00E9", "Nous vous r\u00E9pondrons dans les plus brefs d\u00E9lais.");
  };

  return (
    <section id="contact" className="relative z-[2] bg-[linear-gradient(160deg,#0d0a07,#0f0b08)]">
      <div className="mx-auto max-w-[1300px] px-12 py-[100px] max-md:px-6">
        <div className="grid grid-cols-2 gap-28 max-md:gap-10 max-md:grid-cols-1">
          <RevealSection>
            <div className="flex flex-col gap-10">
              <div>
                <span className="mb-3 block font-jost text-[0.58rem] uppercase tracking-[0.5em] text-or opacity-80">Nous trouver</span>
                <h2 className="font-cormorant text-[clamp(2.2rem,4.5vw,4rem)] font-light leading-[1.1]">
                  Venez <em className="italic text-or">nous rendre<br />visite</em>
                </h2>
              </div>

              <div>
                <span className="mb-3 block font-cinzel text-[0.72rem] tracking-[0.2em] text-or">Adresse</span>
                <p className="font-cormorant text-[1.05rem] font-light leading-[1.9] text-pierre">
                  Le Chai d&apos;Andrea — SCI Andrea<br />Fontevraud-l&apos;Abbaye, Maine-et-Loire
                </p>
              </div>

              <div>
                <span className="mb-3 block font-cinzel text-[0.72rem] tracking-[0.2em] text-or">Contact</span>
                <p className="font-cormorant text-[1.05rem] font-light leading-[1.9] text-pierre">
                  <a href="tel:+33200000000" className="text-or-p no-underline hover:text-or">+33 (0)2 XX XX XX XX</a><br />
                  <a href="mailto:contact@lechaididandrea.fr" className="text-or-p no-underline hover:text-or">contact@lechaididandrea.fr</a><br />
                  <a href="mailto:boutique@lechaididandrea.fr" className="text-or-p no-underline hover:text-or">boutique@lechaididandrea.fr</a>
                </p>
              </div>

              <div>
                <span className="mb-3 block font-cinzel text-[0.72rem] tracking-[0.2em] text-or">Horaires Restaurant</span>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1 max-md:grid-cols-1">
                  {[
                    ["Lundi", "Ferm\u00E9", true],
                    ["Mardi\u2013Mercredi", "12h\u201314h30", false],
                    ["Jeudi\u2013Vendredi", "12h & 19h\u201322h", false],
                    ["Samedi", "12h\u201315h & 19h\u201322h30", false],
                    ["Dimanche", "12h\u201315h", false],
                  ].map(([day, hours, closed]) => (
                    <div key={day as string} className="flex justify-between border-b border-white/5 py-1.5 font-jost text-[0.68rem] text-pierre">
                      <span>{day as string}</span>
                      <span className={closed ? "text-bordeaux-l" : "text-or-p"}>{hours as string}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="mb-3 block font-cinzel text-[0.72rem] tracking-[0.2em] text-or">L&apos;Annexe du Chai</span>
                <p className="font-cormorant text-[1.05rem] font-light leading-[1.9] text-pierre">
                  Mardi au Dimanche &middot; 10h&ndash;19h30<br />Boutique en ligne 24h/24, 7j/7
                </p>
              </div>

              <div>
                <span className="mb-3 block font-cinzel text-[0.72rem] tracking-[0.2em] text-or">Paiements accept&eacute;s</span>
                <div className="flex flex-wrap gap-2">
                  {["\u{1F4B3} Visa", "Mastercard", "Amex", "\u{1F17F}\uFE0F PayPal", "\uF8FF Apple Pay", "G Pay", "\u{1F3E6} Virement SEPA", "\u{1F4CB} Ch\u00E8que", "\u{1F4B5} Esp\u00E8ces"].map((p) => (
                    <span key={p} className="border border-white/10 bg-white/[0.06] px-2.5 py-1 font-jost text-[0.5rem] uppercase tracking-[0.15em] text-pierre">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </RevealSection>

          <RevealSection>
            <h3 className="mb-2 font-cormorant text-[2.2rem] font-light italic text-creme">Nous &eacute;crire</h3>
            <p className="mb-8 font-jost text-[0.7rem] leading-[1.7] text-pierre">
              Pour une r&eacute;servation de groupe, privatisation ou toute demande particuli&egrave;re.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <div className="flex flex-col gap-1.5">
                  <label className="font-jost text-[0.58rem] uppercase tracking-[0.25em] text-pierre">Pr&eacute;nom *</label>
                  <input className="f-input" required placeholder="Jean" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-jost text-[0.58rem] uppercase tracking-[0.25em] text-pierre">Nom *</label>
                  <input className="f-input" required placeholder="Dupont" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <div className="flex flex-col gap-1.5">
                  <label className="font-jost text-[0.58rem] uppercase tracking-[0.25em] text-pierre">Email *</label>
                  <input className="f-input" type="email" required placeholder="jean@exemple.fr" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-jost text-[0.58rem] uppercase tracking-[0.25em] text-pierre">T&eacute;l&eacute;phone</label>
                  <input className="f-input" type="tel" placeholder="+33 6 00 00 00 00" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-jost text-[0.58rem] uppercase tracking-[0.25em] text-pierre">Sujet *</label>
                <select className="f-select" required>
                  <option value="">Choisir...</option>
                  <option>R&eacute;servation table</option>
                  <option>Privatisation / &Eacute;v&eacute;nement</option>
                  <option>Commande boutique</option>
                  <option>Commande cave &agrave; vins</option>
                  <option>Coffret cadeau sur mesure</option>
                  <option>S&eacute;minaire d&apos;entreprise</option>
                  <option>Autre demande</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-jost text-[0.58rem] uppercase tracking-[0.25em] text-pierre">Message *</label>
                <textarea className="f-textarea" required placeholder="Votre message..." />
              </div>
              <button
                type="submit"
                className="cursor-pointer border-none bg-or px-8 py-4 font-jost text-[0.65rem] uppercase tracking-[0.3em] text-noir transition-colors hover:bg-or-p"
              >
                Envoyer le message
              </button>
            </form>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
