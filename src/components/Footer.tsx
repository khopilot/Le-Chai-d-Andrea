"use client";

import Link from "next/link";
import { openResa } from "@/lib/modal-store";
import {
  IconInstagram,
  IconFacebook,
  IconTripAdvisor,
  IconVisa,
  IconMastercard,
  IconAmex,
  IconPaypal,
  IconApplePay,
  IconGooglePay,
} from "@/components/ui/Icons";

export default function Footer() {
  return (
    <footer className="relative z-[2] border-t border-or/10 bg-[#080604]">
      {/* Main: left info + right map — full width, no horizontal padding on the grid */}
      <div className="grid grid-cols-2 max-lg:grid-cols-1">
        {/* ── Left: all text content ── */}
        <div className="px-12 py-14 max-md:px-6 max-md:py-10 xl:px-20">
          {/* Brand */}
          <div className="mb-8">
            <span className="mb-1 block font-cinzel text-[1.1rem] tracking-[0.1em] text-or">Le Chai d&apos;Andrea</span>
            <span className="block font-jost text-[0.55rem] uppercase tracking-[0.3em] text-pierre opacity-70">
              &amp; L&apos;Annexe du Chai — SCI ANDREA
            </span>
          </div>

          {/* 3 columns: Address+Contact | Hours | Nav+Legal */}
          <div className="grid grid-cols-3 gap-10 max-md:grid-cols-1 max-md:gap-8">
            {/* Address & Contact */}
            <div>
              <span className="mb-3 block font-cinzel text-[0.68rem] tracking-[0.2em] text-or-p">Adresse</span>
              <p className="mb-4 font-cormorant text-[0.95rem] leading-[1.8] text-pierre">
                Fontevraud-l&apos;Abbaye<br />Maine-et-Loire, France
              </p>
              <span className="mb-3 block font-cinzel text-[0.68rem] tracking-[0.2em] text-or-p">Contact</span>
              <div className="flex flex-col gap-1.5">
                <a href="tel:+33200000000" className="font-jost text-[0.72rem] text-pierre no-underline hover:text-or">+33 (0)2 XX XX XX XX</a>
                <a href="mailto:contact@lechaididandrea.fr" className="font-jost text-[0.72rem] text-pierre no-underline hover:text-or">contact@lechaidandrea.fr</a>
                <a href="mailto:boutique@lechaididandrea.fr" className="font-jost text-[0.72rem] text-pierre no-underline hover:text-or">boutique@lechaidandrea.fr</a>
              </div>
            </div>

            {/* Hours */}
            <div>
              <span className="mb-3 block font-cinzel text-[0.68rem] tracking-[0.2em] text-or-p">Restaurant</span>
              <div className="flex flex-col gap-1.5">
                {[
                  ["Lundi", "Ferm\u00E9", true],
                  ["Mar\u2013Mer", "12h\u201314h30", false],
                  ["Jeu\u2013Ven", "12h & 19h\u201322h", false],
                  ["Samedi", "12h\u201315h & 19h\u201322h30", false],
                  ["Dimanche", "12h\u201315h", false],
                ].map(([day, hours, closed]) => (
                  <div key={day as string} className="flex justify-between gap-3 font-jost text-[0.62rem] text-pierre">
                    <span>{day as string}</span>
                    <span className={closed ? "text-bordeaux-l" : "text-or-p"}>{hours as string}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t border-white/[0.06] pt-4">
                <span className="mb-1 block font-cinzel text-[0.62rem] tracking-[0.15em] text-or-p">L&apos;Annexe du Chai</span>
                <p className="font-jost text-[0.62rem] text-pierre">Mar &ndash; Dim &middot; 10h&ndash;19h30</p>
                <p className="mt-0.5 font-jost text-[0.55rem] text-pierre opacity-60">Boutique en ligne 24h/24</p>
              </div>
            </div>

            {/* Navigation + Legal */}
            <div>
              <span className="mb-3 block font-cinzel text-[0.68rem] tracking-[0.2em] text-or-p">Navigation</span>
              <ul className="mb-5 flex list-none flex-col gap-2">
                <li><Link href="/restaurant" className="font-jost text-[0.72rem] text-pierre no-underline hover:text-or">Restaurant</Link></li>
                <li><Link href="/boutique" className="font-jost text-[0.72rem] text-pierre no-underline hover:text-or">Boutique</Link></li>
                <li><Link href="/evenements" className="font-jost text-[0.72rem] text-pierre no-underline hover:text-or">&Eacute;v&eacute;nements</Link></li>
                <li><Link href="/contact" className="font-jost text-[0.72rem] text-pierre no-underline hover:text-or">Contact</Link></li>
                <li><button onClick={() => openResa()} className="cursor-pointer border-none bg-transparent p-0 font-jost text-[0.72rem] text-pierre hover:text-or">R&eacute;server</button></li>
              </ul>
            </div>
          </div>

          {/* Social + Payment icons */}
          <div className="mt-8 flex flex-col gap-5 border-t border-white/[0.06] pt-8">
            {/* Socials */}
            <div className="flex items-center gap-5">
              <a href="#" aria-label="Instagram" className="text-pierre transition-colors hover:text-or">
                <IconInstagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Facebook" className="text-pierre transition-colors hover:text-or">
                <IconFacebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="TripAdvisor" className="text-pierre transition-colors hover:text-or">
                <IconTripAdvisor className="h-5 w-5" />
              </a>
            </div>

            {/* Payments */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 font-jost text-[0.5rem] uppercase tracking-[0.15em] text-pierre opacity-50">Paiements</span>
              <IconVisa className="h-6 w-8 text-pierre/60" />
              <IconMastercard className="h-6 w-8 text-pierre/60" />
              <IconAmex className="h-6 w-8 text-pierre/60" />
              <IconPaypal className="h-6 w-8 text-pierre/60" />
              <IconApplePay className="h-6 w-8 text-pierre/60" />
              <IconGooglePay className="h-6 w-8 text-pierre/60" />
            </div>
          </div>
        </div>

        {/* ── Right: Google Maps embed ── */}
        <div className="relative min-h-[400px] max-lg:min-h-[300px]">
          <iframe
            title="Le Chai d'Andrea — Fontevraud-l'Abbaye"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2759.0!2d0.0516!3d47.1814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sFontevraud-l'Abbaye!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
            className="absolute inset-0 h-full w-full border-0 grayscale-[0.8] contrast-[1.1] invert-[0.92] hue-rotate-[180deg] saturate-[0.3]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          {/* Gold-tinted overlay to match site palette */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#080604] via-transparent to-transparent opacity-40 max-lg:bg-gradient-to-b max-lg:from-[#080604] max-lg:via-transparent" />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-wrap items-center justify-between gap-y-3 border-t border-white/[0.06] px-12 py-5 max-md:px-6 xl:px-20">
        <span className="font-jost text-[0.58rem] text-pierre opacity-50">
          &copy; 2025 Le Chai d&apos;Andrea — SCI ANDREA. Tous droits r&eacute;serv&eacute;s.
        </span>
        <div className="flex gap-4">
          {[
            { label: "CGV", href: "#" },
            { label: "Mentions l\u00E9gales", href: "#" },
            { label: "Confidentialit\u00E9", href: "#" },
          ].map(({ label, href }) => (
            <a key={label} href={href} className="font-jost text-[0.55rem] text-pierre no-underline opacity-50 hover:text-or hover:opacity-100">{label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
