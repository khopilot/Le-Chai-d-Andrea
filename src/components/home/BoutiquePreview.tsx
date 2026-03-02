"use client";
import Link from "next/link";
import { PRODUCTS, CAT_LABELS } from "@/data/products";
import { addToCart } from "@/lib/cart-store";
import { showNotif } from "@/lib/notification";
import RevealSection from "@/components/RevealSection";
import SectionHeader from "@/components/ui/SectionHeader";

const FEATURED = PRODUCTS.filter((p) => p.badge).slice(0, 4);

export default function BoutiquePreview() {
  const handleAdd = (id: number) => {
    const prod = PRODUCTS.find((p) => p.id === id);
    if (!prod) return;
    addToCart(prod);
    showNotif("+", "Ajouté au panier", prod.name + " a été ajouté à votre panier");
  };

  return (
    <section className="relative z-[2] flex min-h-screen items-center bg-[#0f0b08]">
      <div className="w-full px-12 py-[100px] max-md:px-6 xl:px-24 2xl:px-40">
        <RevealSection>
          <SectionHeader
            label="L'Annexe du Chai — Boutique en ligne"
            title={<>Nos <em className="italic text-or">Sélections</em></>}
            action={
              <Link
                href="/boutique"
                className="inline-block border border-or/50 bg-transparent px-9 py-3.5 font-jost text-[0.62rem] uppercase tracking-[0.3em] text-or no-underline transition-all hover:border-or hover:bg-or/[0.08]"
              >
                Voir toute la boutique &rarr;
              </Link>
            }
          />
        </RevealSection>

        <RevealSection>
          <div className="mt-12 grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-4">
            {FEATURED.map((p) => (
              <div
                key={p.id}
                className="group relative overflow-hidden border border-or/10 bg-white/[0.02] transition-all duration-400 hover:-translate-y-1 hover:border-or/35 hover:bg-white/[0.04] hover:shadow-[0_8px_24px_rgba(201,168,76,0.1)]"
              >
                {p.badge && (
                  <div className={`absolute left-4 top-4 z-[1] px-[0.7rem] py-[0.3rem] font-jost text-[0.5rem] uppercase tracking-[0.3em] ${
                    p.badgeCls === "new" ? "bg-or text-noir" : "bg-bordeaux text-creme"
                  }`}>
                    {p.badge}
                  </div>
                )}
                <div className="relative flex h-[200px] items-center justify-center overflow-hidden bg-[linear-gradient(135deg,rgba(26,15,10,0.8),rgba(42,24,16,0.8))]">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="relative z-[1] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-noir/60" />
                </div>
                <div className="p-5">
                  <span className="mb-1.5 block font-jost text-[0.55rem] uppercase tracking-[0.3em] text-or opacity-70">
                    {CAT_LABELS[p.cat] || p.cat}
                  </span>
                  <div className="mb-1 font-cormorant text-[1.1rem] font-medium text-creme">{p.name}</div>
                  <div className="mb-4 font-jost text-[0.68rem] leading-[1.6] text-pierre">{p.desc}</div>
                  <div className="flex items-center justify-between">
                    <span className="font-cormorant text-[1.3rem] text-or">
                      {p.price.toFixed(2).replace(".", ",")} &euro;
                    </span>
                    <button
                      onClick={() => handleAdd(p.id)}
                      className="cursor-pointer border border-or/30 bg-transparent px-3.5 py-1.5 font-jost text-[0.58rem] uppercase tracking-[0.2em] text-or transition-all hover:border-or hover:bg-or hover:text-noir"
                    >
                      + Ajouter
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
