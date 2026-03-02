import Link from "next/link";
import { FORMULES } from "@/data/menu";
import RevealSection from "@/components/RevealSection";
import SectionHeader from "@/components/ui/SectionHeader";

export default function RestaurantPreview() {
  return (
    <section className="relative z-[2] flex min-h-screen items-center overflow-hidden bg-[linear-gradient(to_right,rgba(92,26,26,0.07)_0%,transparent_40%),#0a0807]">
      {/* Subtle background photo */}
      <img
        src="/images/restaurant-ambiance.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-[0.15]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0807]/80 via-[#0a0807]/60 to-[#0a0807]/80" />

      <div className="relative z-10 w-full px-12 py-[100px] max-md:px-6 xl:px-24 2xl:px-40">
        <RevealSection>
          <SectionHeader
            label="La Table"
            title={<>Nos <em className="italic text-or">Formules</em></>}
            action={
              <Link
                href="/restaurant"
                className="inline-block border border-or/50 bg-transparent px-9 py-3.5 font-jost text-[0.62rem] uppercase tracking-[0.3em] text-or no-underline transition-all hover:border-or hover:bg-or/[0.08]"
              >
                Découvrir la carte &rarr;
              </Link>
            }
          />
        </RevealSection>

        <RevealSection>
          <div className="mt-12 grid grid-cols-3 gap-6 max-md:grid-cols-1 max-md:gap-4">
            {FORMULES.map((f) => (
              <div
                key={f.name}
                className={`relative border p-8 transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(201,168,76,0.1)] ${
                  f.featured ? "border-or bg-or/[0.04]" : "border-or/20 hover:border-or"
                }`}
              >
                {f.badge && (
                  <div className="absolute -top-px right-8 bg-or px-3 py-1 font-jost text-[0.52rem] uppercase tracking-[0.3em] text-noir">
                    {f.badge}
                  </div>
                )}
                <div className="mb-2 font-cinzel text-[0.85rem] tracking-[0.1em] text-or-p">{f.name}</div>
                <div className="mb-1 font-cormorant text-[2.3rem] font-light leading-none text-or">
                  {f.price} <span className="text-[0.9rem]">&euro;</span>
                </div>
                <div className="whitespace-pre-line font-jost text-[0.68rem] leading-[1.8] text-pierre">{f.desc}</div>
              </div>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
