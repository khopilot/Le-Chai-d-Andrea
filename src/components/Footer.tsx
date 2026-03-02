"use client";

import Link from "next/link";
import { openResa } from "@/lib/modal-store";

export default function Footer() {
  return (
    <footer className="relative z-[2] border-t border-or/10 bg-[#080604] px-12 py-14 max-md:px-6 max-md:py-10">
      <div className="mx-auto grid max-w-[1300px] grid-cols-[2fr_1fr_1fr_1fr] gap-14 max-lg:grid-cols-2 max-md:grid-cols-1">
        <div>
          <span className="mb-1 block font-cinzel text-[1.1rem] tracking-[0.1em] text-or">Le Chai d&apos;Andrea</span>
          <span className="mb-5 block font-jost text-[0.55rem] uppercase tracking-[0.3em] text-pierre opacity-70">
            &amp; L&apos;Annexe du Chai — SCI ANDREA
          </span>
          <p className="font-cormorant text-[0.9rem] leading-[1.8] text-pierre">
            Un lieu unique d&eacute;di&eacute; aux plaisirs de la table et de la vigne. Restaurant gastronomique, cave &agrave; vins et &eacute;picerie fine. Livraison dans le monde entier.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["SSL 256", "3D Secure", "RGPD"].map((b) => (
              <span key={b} className="border border-white/10 bg-white/[0.06] px-2.5 py-1 font-jost text-[0.5rem] uppercase tracking-[0.15em] text-pierre">{b}</span>
            ))}
          </div>
        </div>

        <div>
          <span className="mb-5 block font-cinzel text-[0.68rem] tracking-[0.2em] text-or-p">Restaurant</span>
          <ul className="flex list-none flex-col gap-2.5">
            <li><Link href="/restaurant" className="font-jost text-[0.72rem] text-pierre no-underline hover:text-or">La Carte</Link></li>
            <li><Link href="/restaurant" className="font-jost text-[0.72rem] text-pierre no-underline hover:text-or">Formules</Link></li>
            <li><Link href="/evenements" className="font-jost text-[0.72rem] text-pierre no-underline hover:text-or">&Eacute;v&eacute;nements</Link></li>
            <li><button onClick={openResa} className="cursor-pointer border-none bg-transparent p-0 font-jost text-[0.72rem] text-pierre hover:text-or">R&eacute;server</button></li>
          </ul>
        </div>

        <div>
          <span className="mb-5 block font-cinzel text-[0.68rem] tracking-[0.2em] text-or-p">L&apos;Annexe du Chai</span>
          <ul className="flex list-none flex-col gap-2.5">
            {["Cave \u00E0 vins", "\u00C9picerie fine", "Coffrets cadeaux", "Spiritueux"].map((l) => (
              <li key={l}><Link href="/boutique" className="font-jost text-[0.72rem] text-pierre no-underline hover:text-or">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <span className="mb-5 block font-cinzel text-[0.68rem] tracking-[0.2em] text-or-p">Informations</span>
          <ul className="flex list-none flex-col gap-2.5">
            {[
              { label: "Contact", href: "/contact" },
              { label: "CGV", href: "#" },
              { label: "Livraison & Retours", href: "#" },
              { label: "Mentions l\u00E9gales", href: "#" },
              { label: "Politique de confidentialit\u00E9", href: "#" },
            ].map(({ label, href }) => (
              <li key={label}>
                {href === "#" ? (
                  <a href="#" className="font-jost text-[0.72rem] text-pierre no-underline hover:text-or">{label}</a>
                ) : (
                  <Link href={href} className="font-jost text-[0.72rem] text-pierre no-underline hover:text-or">{label}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-[1300px] flex-wrap items-center justify-between gap-y-4 border-t border-white/[0.06] pt-7">
        <span className="font-jost text-[0.62rem] text-pierre opacity-50">
          &copy; 2025 Le Chai d&apos;Andrea — SCI ANDREA. Tous droits r&eacute;serv&eacute;s.
        </span>
        <div className="flex gap-5">
          {["Instagram", "Facebook", "TripAdvisor"].map((s) => (
            <a key={s} href="#" className="font-jost text-[0.58rem] uppercase tracking-[0.2em] text-pierre no-underline hover:text-or">{s}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
