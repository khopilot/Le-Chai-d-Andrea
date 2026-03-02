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
    showNotif("\u2713", "Message envoy\u00E9", "Nous vous r\u00E9pondrons dans les plus brefs d\u00E9lais.");
  };

  return (
    <section id="contact" className="relative z-[2] flex min-h-screen items-center bg-[linear-gradient(160deg,#0d0a07,#0f0b08)]">
      <div className="w-full px-12 py-[100px] max-md:px-6 xl:px-24 2xl:px-40">
        <div className="mx-auto max-w-[700px]">
          <RevealSection>
            <div className="mb-10 text-center">
              <span className="mb-3 block font-jost text-[0.58rem] uppercase tracking-[0.5em] text-or opacity-80">Nous trouver</span>
              <h2 className="font-cormorant text-[clamp(2.2rem,4.5vw,4rem)] font-light leading-[1.1]">
                Venez <em className="italic text-or">nous rendre visite</em>
              </h2>
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
