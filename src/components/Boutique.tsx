"use client";
import { useState } from "react";
import Link from "next/link";
import { PRODUCTS, CAT_LABELS } from "@/data/products";
import { addToCart } from "@/lib/cart-store";
import { showNotif } from "@/lib/notification";
import RevealSection from "./RevealSection";

const FILTERS = [
  { key: "all", label: "Tout voir" },
  { key: "vin", label: "Vins" },
  { key: "spiritueux", label: "Spiritueux" },
  { key: "epicerie", label: "Épicerie" },
  { key: "coffret", label: "Coffrets" },
  { key: "fromage", label: "Fromagerie" },
];

export default function Boutique() {
  const [filter, setFilter] = useState("all");
  const items = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === filter);

  const handleAdd = (id: number) => {
    const prod = PRODUCTS.find((p) => p.id === id);
    if (!prod) return;
    addToCart(prod);
    showNotif("+", "Ajouté au panier", prod.name + " a été ajouté à votre panier");
  };

  return (
    <section id="boutique" className="relative z-[2] flex min-h-screen items-center bg-[#0f0b08]">
      <div className="w-full px-12 py-[100px] max-md:px-6 xl:px-24 2xl:px-40">
        <RevealSection>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="mb-3 block font-jost text-[0.58rem] uppercase tracking-[0.5em] text-or opacity-80">
                L&apos;Annexe du Chai — Boutique en ligne
              </span>
              <h2 className="font-cormorant text-[clamp(2.2rem,4.5vw,4rem)] font-light leading-[1.1]">
                Nos <em className="italic text-or">S&eacute;lections</em>
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`cursor-pointer border px-5 py-2 font-jost text-[0.6rem] uppercase tracking-[0.25em] transition-all ${
                    filter === key
                      ? "border-or bg-or/[0.06] text-or"
                      : "border-or/20 bg-transparent text-pierre hover:border-or hover:text-or"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </RevealSection>

        <RevealSection>
          <div className="grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
            {items.map((p) => (
              <div
                key={p.id}
                className="group relative cursor-pointer overflow-hidden border border-or/10 bg-white/[0.02] transition-all duration-400 hover:-translate-y-1 hover:border-or/35 hover:bg-white/[0.04] hover:shadow-[0_8px_24px_rgba(201,168,76,0.1)]"
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
                  {p.stock && (
                    <div className="mt-2 font-jost text-[0.55rem] text-success">
                      ● En stock
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection className="mt-12 text-center">
          <p className="mb-6 font-cormorant text-[1.1rem] italic text-pierre">
            Vous ne trouvez pas ce que vous cherchez ? Contactez notre sommelier.
          </p>
          <Link
            href="/contact"
            className="inline-block border border-or/50 bg-transparent px-9 py-3.5 font-jost text-[0.62rem] uppercase tracking-[0.3em] text-or no-underline transition-all hover:border-or hover:bg-or/[0.08]"
          >
            Demande personnalis&eacute;e
          </Link>
        </RevealSection>
      </div>
    </section>
  );
}
