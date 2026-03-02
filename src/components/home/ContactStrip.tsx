"use client";
import Link from "next/link";
import { openResa } from "@/lib/modal-store";
import RevealSection from "@/components/RevealSection";

export default function ContactStrip() {
  return (
    <section className="relative z-[2] flex min-h-screen items-center bg-[linear-gradient(160deg,#0d0a07,#110d09)]">
      <div className="w-full px-12 py-16 max-md:px-6 xl:px-24 2xl:px-40">
        <RevealSection>
          <div className="flex flex-wrap items-center justify-between gap-10 border-t border-or/15 pt-16 max-md:flex-col max-md:text-center">
            <div className="flex flex-wrap gap-12 max-md:flex-col max-md:gap-6">
              <div>
                <span className="mb-2 block font-cinzel text-[0.62rem] tracking-[0.2em] text-or">Adresse</span>
                <p className="font-cormorant text-[0.95rem] leading-[1.8] text-pierre">
                  Le Chai d&apos;Andrea<br />
                  Fontevraud-l&apos;Abbaye, Maine-et-Loire
                </p>
              </div>
              <div>
                <span className="mb-2 block font-cinzel text-[0.62rem] tracking-[0.2em] text-or">Horaires</span>
                <p className="font-cormorant text-[0.95rem] leading-[1.8] text-pierre">
                  Mardi &ndash; Dimanche<br />
                  12h &ndash; 14h30 &middot; 19h &ndash; 22h30
                </p>
              </div>
              <div>
                <span className="mb-2 block font-cinzel text-[0.62rem] tracking-[0.2em] text-or">Contact</span>
                <p className="font-cormorant text-[0.95rem] leading-[1.8] text-pierre">
                  <a href="tel:+33200000000" className="text-or-p no-underline hover:text-or">+33 (0)2 XX XX XX XX</a><br />
                  <a href="mailto:contact@lechaididandrea.fr" className="text-or-p no-underline hover:text-or">contact@lechaididandrea.fr</a>
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 max-md:items-center">
              <button
                onClick={() => openResa()}
                className="cursor-pointer border-none bg-or px-9 py-3.5 font-jost text-[0.62rem] uppercase tracking-[0.3em] text-noir transition-all hover:bg-or-p"
              >
                Réserver une table
              </button>
              <Link
                href="/contact"
                className="text-center font-jost text-[0.58rem] uppercase tracking-[0.25em] text-or no-underline opacity-70 transition-opacity hover:opacity-100"
              >
                Nous écrire &rarr;
              </Link>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
