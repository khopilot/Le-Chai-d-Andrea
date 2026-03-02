"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { openResa } from "@/lib/modal-store";

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const el = contentRef.current;
      if (el && y < window.innerHeight) {
        el.style.transform = `translateY(${y * 0.25}px)`;
        el.style.opacity = String(1 - (y / window.innerHeight) * 1.5);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="hero" className="relative z-[2] flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(92,26,26,0.4)_0%,transparent_60%),radial-gradient(ellipse_at_80%_20%,rgba(201,168,76,0.08)_0%,transparent_50%),linear-gradient(160deg,#0d0a07_0%,#1a0f0a_40%,#0f0b08_100%)]" />

      <div ref={contentRef} className="relative z-[2] flex flex-col items-center text-center">
        <span className="animate-fadeUp font-jost text-[0.62rem] uppercase tracking-[0.5em] text-or opacity-0 [animation-delay:0.3s]">
          Restaurant &middot; Cave &agrave; Vin &middot; &Eacute;picerie Fine &middot; Livraison mondiale
        </span>

        {/* Ornament */}
        <div className="animate-fadeUp mt-4 mb-2 flex items-center gap-4 opacity-0 [animation-delay:0.5s]">
          <div className="h-px w-[60px] bg-gradient-to-r from-transparent to-or" />
          <div className="h-2 w-2 rotate-45 bg-or" />
          <div className="h-px w-[60px] bg-gradient-to-l from-transparent to-or" />
        </div>

        <h1 className="animate-fadeUp12 font-cormorant text-[clamp(3.5rem,9vw,8rem)] font-light italic leading-[0.9] text-creme">
          Le Chai<br />
          <span className="font-normal text-or">d&apos;Andrea</span>
        </h1>

        <p className="animate-fadeUp mt-5 font-cinzel text-[clamp(0.6rem,1.3vw,0.8rem)] uppercase tracking-[0.6em] text-or-p opacity-0 [animation-delay:1s]">
          &amp; L&apos;Annexe du Chai
        </p>

        <p className="animate-fadeUp mt-7 max-w-[500px] font-cormorant text-lg font-light leading-[1.8] text-pierre opacity-0 [animation-delay:1.2s]">
          Un lieu d&apos;exception o&ugrave; la gastronomie rencontre l&apos;art de la vigne. D&icirc;nez chez nous ou faites livrer nos s&eacute;lections partout dans le monde.
        </p>

        <div className="animate-fadeUp mt-10 flex flex-wrap justify-center gap-5 opacity-0 [animation-delay:1.4s] max-md:flex-col">
          <button
            onClick={openResa}
            className="btn-primary inline-block cursor-pointer border-none bg-or px-9 py-3.5 font-jost text-[0.62rem] uppercase tracking-[0.3em] text-noir no-underline transition-all hover:-translate-y-0.5 hover:bg-or-p hover:shadow-[0_8px_30px_rgba(201,168,76,0.3)]"
          >
            R&eacute;server une table
          </button>
          <Link
            href="/boutique"
            className="inline-block border border-or/50 bg-transparent px-9 py-3.5 font-jost text-[0.62rem] uppercase tracking-[0.3em] text-or no-underline transition-all hover:-translate-y-0.5 hover:border-or hover:bg-or/[0.08]"
          >
            Commander en ligne
          </Link>
        </div>

        <div className="animate-fadeUp mt-12 flex flex-wrap justify-center gap-8 max-md:gap-4 opacity-0 [animation-delay:1.6s]">
          {[
            { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", text: "Paiement s\u00E9curis\u00E9 SSL" },
            { icon: "M12 6v6l4 2", circle: true, text: "Livraison 48h France" },
            { icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-10 2a2 2 0 100 4 2 2 0 000-4z", text: "Exp\u00E9dition mondiale" },
          ].map(({ text }, i) => (
            <div key={i} className="flex items-center gap-2 font-jost text-[0.6rem] uppercase tracking-[0.15em] text-pierre">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-or">
                {text === "Livraison 48h France" ? (
                  <>
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </>
                ) : text === "Paiement s\u00E9curis\u00E9 SSL" ? (
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                ) : (
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-10 2a2 2 0 100 4 2 2 0 000-4z" />
                )}
              </svg>
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="animate-fadeIn absolute bottom-10 left-1/2 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-2.5 opacity-0 [animation-delay:2s]"
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="font-jost text-[0.55rem] uppercase tracking-[0.4em] text-or opacity-60">D&eacute;couvrir</span>
        <div className="animate-scrollL h-[45px] w-px bg-gradient-to-b from-or to-transparent" />
      </div>
    </section>
  );
}
