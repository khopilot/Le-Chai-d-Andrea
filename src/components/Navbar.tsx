"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";
import { openCart, openResa } from "@/lib/modal-store";

const NAV_LINKS = [
  { label: "Notre Histoire", href: "/#about" },
  { label: "Boutique", href: "/boutique" },
  { label: "Restaurant", href: "/restaurant" },
  { label: "Événements", href: "/evenements" },
  { label: "Contact", href: "/contact" },
];

function BagIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" x2="21" y1="6" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useCartStore();
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/#about") return pathname === "/";
    return pathname === href;
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Gold accent top line ── */}
      <div className="fixed inset-x-0 top-0 z-[510] h-px bg-gradient-to-r from-transparent via-or to-transparent" />

      <nav
        className={`fixed inset-x-0 top-px z-[500] flex items-center justify-between transition-all duration-500 ease-out max-md:px-6 ${
          scrolled || menuOpen
            ? "bg-noir/[0.97] px-10 py-3 shadow-[0_1px_0_rgba(201,168,76,0.15)] backdrop-blur-xl max-md:py-3"
            : "bg-transparent px-12 py-[1.2rem] backdrop-blur-none max-md:py-4"
        }`}
      >
        {/* ── Logo ── */}
        <Link
          href="/"
          className="group flex flex-col items-start no-underline transition-transform duration-300 hover:scale-[1.03]"
        >
          <span
            className={`font-cinzel tracking-[0.12em] text-or transition-all duration-500 ${
              scrolled ? "text-[0.9rem]" : "text-base"
            }`}
          >
            Le Chai d&apos;Andrea
          </span>
          <span className="flex items-center gap-2">
            <span className="text-[0.5rem] text-or/50">◆</span>
            <span
              className={`font-jost uppercase tracking-[0.3em] text-or-p transition-all duration-500 ${
                scrolled ? "text-[0.45rem] opacity-0 max-h-0" : "text-[0.55rem] opacity-70 max-h-4"
              }`}
            >
              &amp; L&apos;Annexe du Chai
            </span>
          </span>
        </Link>

        {/* ── Desktop nav links ── */}
        <ul className="flex list-none items-center gap-0 max-md:hidden">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href} className="flex items-center">
              {i > 0 && (
                <span className="mx-5 text-[0.45rem] text-or/30 select-none">·</span>
              )}
              <Link
                href={link.href}
                className={`nav-link-luxury font-jost text-[0.65rem] uppercase tracking-[0.2em] no-underline transition-colors duration-300 hover:text-or ${
                  isActive(link.href)
                    ? "active text-or"
                    : "text-creme/70"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-4">
          {/* Réserver */}
          <button
            onClick={openResa}
            className="group/btn relative cursor-pointer overflow-hidden border border-or/30 bg-or px-6 py-2.5 font-jost text-[0.62rem] uppercase tracking-[0.25em] text-noir transition-all duration-300 hover:-translate-y-px hover:border-or hover:shadow-[0_4px_20px_rgba(201,168,76,0.25)] max-sm:hidden"
          >
            R&eacute;server
          </button>

          {/* Cart */}
          <button
            onClick={openCart}
            className="relative flex cursor-pointer items-center gap-2 border border-or/30 bg-transparent px-3.5 py-2 font-jost text-[0.65rem] uppercase tracking-[0.2em] text-or transition-all duration-300 hover:border-or hover:bg-or/5"
          >
            <BagIcon className="h-[14px] w-[14px]" />
            <span className="max-sm:hidden">Panier</span>
            <span
              className={`absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-or text-[0.55rem] font-semibold text-noir transition-all duration-300 ${
                count > 0 ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
            >
              {count}
            </span>
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="hidden cursor-pointer flex-col items-center justify-center gap-[5px] border-none bg-transparent p-2 max-md:flex"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <span className={`block h-[1.5px] w-[22px] bg-or transition-all duration-300 ${menuOpen ? "translate-y-[6.5px] rotate-45" : ""}`} />
            <span className={`block h-[1.5px] w-[22px] bg-or transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-[1.5px] w-[22px] bg-or transition-all duration-300 ${menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* ── Mobile fullscreen overlay ── */}
      <div className={`fixed inset-0 z-[490] flex flex-col items-center justify-center bg-noir/[0.98] transition-all duration-500 ${menuOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
          {/* Logo at top */}
          <div className="absolute top-20 flex flex-col items-center">
            <span className="font-cinzel text-sm tracking-[0.12em] text-or">Le Chai d&apos;Andrea</span>
            <span className="mt-1 text-[0.45rem] text-or/50">◆</span>
          </div>

          {/* Top ornament */}
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px w-[40px] bg-gradient-to-r from-transparent to-or/60" />
            <div className="h-1.5 w-1.5 rotate-45 bg-or/80" />
            <div className="h-px w-[40px] bg-gradient-to-l from-transparent to-or/60" />
          </div>

          <ul className="flex list-none flex-col items-center gap-0">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                {i > 0 && (
                  <div className="mx-auto my-4 h-px w-8 bg-gradient-to-r from-transparent via-or/25 to-transparent" />
                )}
                <div
                  className="animate-fadeUp opacity-0"
                  style={{ animationDelay: `${i * 70}ms`, animationFillMode: "forwards" }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`font-cormorant text-[1.8rem] italic no-underline transition-colors duration-300 hover:text-or ${
                      isActive(link.href) ? "text-or" : "text-creme"
                    }`}
                  >
                    {link.label}
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          {/* Mobile CTA */}
          <div
            className="animate-fadeUp mt-10 opacity-0"
            style={{ animationDelay: `${NAV_LINKS.length * 70}ms`, animationFillMode: "forwards" }}
          >
            <button
              onClick={() => { setMenuOpen(false); openResa(); }}
              className="cursor-pointer border border-or/30 bg-or px-9 py-3.5 font-jost text-[0.62rem] uppercase tracking-[0.3em] text-noir transition-all duration-300 hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(201,168,76,0.25)]"
            >
              R&eacute;server une table
            </button>
          </div>

          {/* Bottom ornament */}
          <div className="mt-8 flex items-center gap-4">
            <div className="h-px w-[40px] bg-gradient-to-r from-transparent to-or/60" />
            <div className="h-1.5 w-1.5 rotate-45 bg-or/80" />
            <div className="h-px w-[40px] bg-gradient-to-l from-transparent to-or/60" />
          </div>

          {/* Contact info at bottom */}
          <div
            className="animate-fadeUp absolute bottom-10 flex flex-col items-center gap-2 opacity-0"
            style={{ animationDelay: `${(NAV_LINKS.length + 1) * 70}ms`, animationFillMode: "forwards" }}
          >
            <a href="tel:+85563964271" className="font-jost text-[0.6rem] uppercase tracking-[0.25em] text-or/40 no-underline transition-colors hover:text-or">
              +855 63 964 271
            </a>
          </div>
        </div>
    </>
  );
}
