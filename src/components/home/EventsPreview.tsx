"use client";
import Link from "next/link";
import { EVENTS } from "@/data/menu";
import { openResa } from "@/lib/modal-store";
import RevealSection from "@/components/RevealSection";
import SectionHeader from "@/components/ui/SectionHeader";

export default function EventsPreview() {
  return (
    <section className="relative z-[2] flex min-h-screen items-center overflow-hidden bg-bordeaux">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_50%,rgba(13,10,7,0.5)_0%,transparent_50%),radial-gradient(ellipse_at_100%_50%,rgba(13,10,7,0.5)_0%,transparent_50%)]" />
      <div className="absolute inset-0 events-dot-pattern" />

      <div className="relative z-[2] w-full px-12 py-[100px] max-md:px-6 xl:px-24 2xl:px-40">
        <RevealSection>
          <SectionHeader
            label="Agenda"
            title={<>Prochains <em className="italic text-or">Événements</em></>}
            action={
              <Link
                href="/evenements"
                className="inline-block border border-or/50 bg-transparent px-9 py-3.5 font-jost text-[0.62rem] uppercase tracking-[0.3em] text-or no-underline transition-all hover:border-or hover:bg-or/[0.08]"
              >
                Tous les événements &rarr;
              </Link>
            }
          />
        </RevealSection>

        <RevealSection>
          <div className="mt-12 grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-4">
            {EVENTS.map((ev) => (
              <div
                key={ev.name}
                className="overflow-hidden border border-or/15 bg-noir/60 backdrop-blur-[10px] transition-all hover:-translate-y-1 hover:border-or/50 hover:shadow-[0_12px_40px_rgba(201,168,76,0.15)]"
              >
                {/* Event image */}
                <div className="relative h-[160px] overflow-hidden">
                  <img
                    src={ev.image}
                    alt={ev.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-noir/80" />
                </div>
                {/* Content */}
                <div className="p-8">
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
              </div>
            ))}
          </div>
        </RevealSection>

      </div>
    </section>
  );
}
