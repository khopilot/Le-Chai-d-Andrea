"use client";
import Link from "next/link";
import { EVENTS } from "@/data/menu";
import { openResa } from "@/lib/modal-store";
import RevealSection from "./RevealSection";

export default function Events() {
  return (
    <section id="evenements" className="relative z-[2] overflow-hidden bg-bordeaux">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_50%,rgba(13,10,7,0.5)_0%,transparent_50%),radial-gradient(ellipse_at_100%_50%,rgba(13,10,7,0.5)_0%,transparent_50%)]" />
      <div className="absolute inset-0 events-dot-pattern" />

      <div className="relative z-[2] mx-auto max-w-[1300px] px-12 py-[100px] max-md:px-6">
        <RevealSection>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="mb-3 block font-jost text-[0.58rem] uppercase tracking-[0.5em] text-or-p opacity-80">Agenda</span>
              <h2 className="font-cormorant text-[clamp(2.2rem,4.5vw,4rem)] font-light leading-[1.1] text-creme">
                Prochains <em className="italic text-or">Événements</em>
              </h2>
            </div>
            <Link href="/contact" className="inline-block border border-or/50 bg-transparent px-9 py-3.5 font-jost text-[0.62rem] uppercase tracking-[0.3em] text-or no-underline transition-all hover:border-or hover:bg-or/[0.08]">
              Privatisation
            </Link>
          </div>
        </RevealSection>

        <RevealSection>
          <div className="mt-12 grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1">
            {EVENTS.map((ev) => (
              <div
                key={ev.name}
                className="border border-or/15 bg-noir/60 p-8 backdrop-blur-[10px] transition-all hover:-translate-y-1 hover:border-or/50"
              >
                <div className="mb-5 flex items-center gap-[0.8rem]">
                  <span className="font-cormorant text-[2.8rem] font-light leading-none text-or">{ev.day}</span>
                  <div>
                    <div className="font-jost text-[0.58rem] uppercase tracking-[0.3em] text-or-p">{ev.month}</div>
                    <div className="font-jost text-[0.58rem] text-pierre">{ev.year}</div>
                  </div>
                </div>
                <span className="mb-2 block font-jost text-[0.55rem] uppercase tracking-[0.35em] text-or opacity-70">{ev.type}</span>
                <div className="mb-3 font-cormorant text-[1.4rem] italic text-creme">{ev.name}</div>
                <p className="mb-5 font-jost text-[0.68rem] leading-[1.7] text-pierre">{ev.desc}</p>
                {ev.linkAction === "resa" ? (
                  <button
                    onClick={openResa}
                    className="inline-flex cursor-pointer items-center gap-2 border-none bg-transparent font-jost text-[0.58rem] uppercase tracking-[0.3em] text-or no-underline transition-all hover:gap-4"
                  >
                    {ev.linkText} &rarr;
                  </button>
                ) : (
                  <Link href="/contact" className="inline-flex items-center gap-2 font-jost text-[0.58rem] uppercase tracking-[0.3em] text-or no-underline transition-all hover:gap-4">
                    {ev.linkText} &rarr;
                  </Link>
                )}
              </div>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
