"use client";
import { useState } from "react";
import { FORMULES, ENTREES, PLATS, DESSERTS, VINS_VERRE, type MenuCategory } from "@/data/menu";
import { openResa } from "@/lib/modal-store";
import RevealSection from "./RevealSection";

const TABS = [
  { key: "formules", label: "Formules" },
  { key: "entrees", label: "Entr\u00E9es" },
  { key: "plats", label: "Plats" },
  { key: "desserts", label: "Desserts" },
  { key: "vins-verre", label: "Vins au verre" },
];

const DATA_MAP: Record<string, MenuCategory[]> = {
  entrees: ENTREES,
  plats: PLATS,
  desserts: DESSERTS,
  "vins-verre": VINS_VERRE,
};

export default function RestaurantMenu() {
  const [activeTab, setActiveTab] = useState("formules");

  return (
    <section id="restaurant" className="relative z-[2] flex min-h-screen items-center bg-[linear-gradient(to_right,rgba(92,26,26,0.07)_0%,transparent_40%),#0a0807]">
      <div className="w-full px-12 py-[100px] max-md:px-6 xl:px-24 2xl:px-40">
        <RevealSection>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="mb-3 block font-jost text-[0.58rem] uppercase tracking-[0.5em] text-or opacity-80">La Table</span>
              <h2 className="font-cormorant text-[clamp(2.2rem,4.5vw,4rem)] font-light leading-[1.1]">
                Notre <em className="italic text-or">Carte</em>
              </h2>
            </div>
            <button
              onClick={() => openResa()}
              className="cursor-pointer border-none bg-or px-9 py-3.5 font-jost text-[0.62rem] uppercase tracking-[0.3em] text-noir transition-all hover:bg-or-p"
            >
              R&eacute;server &rarr;
            </button>
          </div>
        </RevealSection>

        <RevealSection>
          {/* Tabs */}
          <div className="scrollbar-none mb-12 flex overflow-x-auto border-b border-or/20">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`relative shrink-0 cursor-pointer border-none bg-transparent px-[1.4rem] py-[0.8rem] font-jost text-[0.62rem] uppercase tracking-[0.25em] transition-colors ${
                  activeTab === key ? "text-or" : "text-pierre hover:text-or-p"
                }`}
              >
                {label}
                <span className={`absolute bottom-[-1px] left-0 right-0 h-0.5 bg-or transition-transform ${activeTab === key ? "scale-x-100" : "scale-x-0"}`} />
              </button>
            ))}
          </div>
        </RevealSection>

        <RevealSection>
          {/* Formules */}
          {activeTab === "formules" && (
            <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
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
          )}

          {/* Menu Categories */}
          {activeTab !== "formules" && DATA_MAP[activeTab] && (
            <div className="grid grid-cols-2 gap-x-20 gap-y-12 max-md:grid-cols-1">
              {DATA_MAP[activeTab].map((cat) => (
                <div key={cat.title}>
                  <div className="mb-5 border-b border-or/20 pb-2.5 font-cormorant text-[1.3rem] italic text-or-p">
                    {cat.title}
                  </div>
                  {cat.items.map((item) => (
                    <div key={item.name} className="flex items-baseline justify-between border-b border-white/5 py-3 transition-colors hover:bg-white/[0.02] last:border-none">
                      <div>
                        <span className="mb-0.5 block font-cormorant text-[0.95rem] font-medium text-creme">{item.name}</span>
                        <span className="font-jost text-[0.65rem] leading-[1.5] text-text-l">{item.desc}</span>
                      </div>
                      <span className="ml-4 shrink-0 font-cormorant text-[0.95rem] text-or">{item.price}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </RevealSection>
      </div>
    </section>
  );
}
