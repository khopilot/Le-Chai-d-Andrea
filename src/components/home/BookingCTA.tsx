"use client";
import { openResa } from "@/lib/modal-store";
import RevealSection from "@/components/RevealSection";

export default function BookingCTA() {
  return (
    <section className="relative z-[2] overflow-hidden bg-noir py-20 max-md:py-14">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,168,76,0.04)_0%,transparent_70%)]" />

      <div className="relative z-[1]">
        <RevealSection className="flex flex-col items-center text-center">
          {/* Decorative ornament */}
          <div className="mb-6 flex items-center gap-4">
            <span className="block h-px w-12 bg-or/30" />
            <span className="font-cormorant text-or/40 text-lg">&diams;</span>
            <span className="block h-px w-12 bg-or/30" />
          </div>

          <p className="mb-6 max-w-md font-cormorant text-[1.25rem] italic leading-relaxed text-creme">
            Privatisation, s&eacute;minaire ou soir&eacute;e sur mesure&nbsp;?
          </p>

          <button
            onClick={() => openResa()}
            className="cursor-pointer border-none bg-or px-10 py-3.5 font-jost text-[0.62rem] uppercase tracking-[0.3em] text-noir no-underline transition-all hover:-translate-y-0.5 hover:bg-or-p hover:shadow-[0_8px_30px_rgba(201,168,76,0.3)]"
          >
            R&eacute;server maintenant
          </button>
        </RevealSection>
      </div>
    </section>
  );
}
