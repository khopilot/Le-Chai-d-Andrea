"use client";
import { useState, useCallback, useEffect } from "react";
import {
  useCartStore, cartTotal, formatPrice, getShippingZone, getShippingPrice,
  setSelectedShipping, setDiscount, resetCart, setPayMethod,
} from "@/lib/cart-store";
import { SHIPPING_OPTIONS, COUNTRIES } from "@/data/products";
import { showNotif } from "@/lib/notification";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const { cart, discount, selectedShipping, currentPayMethod } = useCartStore();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ fname: "", lname: "", email: "", phone: "", addr1: "", addr2: "", zip: "", city: "", country: "FR" });
  const [cardForm, setCardForm] = useState({ num: "", holder: "", exp: "", cvv: "" });
  const [coupon, setCoupon] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [orderNum, setOrderNum] = useState("");

  const zone = getShippingZone(form.country);
  const shippingOpts = SHIPPING_OPTIONS[zone];
  const shipPrice = getShippingPrice(form.country);
  const subtotal = cartTotal();
  const total = subtotal - discount + shipPrice;

  const goStep = (n: number, force = false) => {
    if (!force && n > step) {
      if (step === 1) {
        const required = ["fname", "lname", "email", "addr1", "zip", "city"] as const;
        for (const f of required) {
          if (!form[f].trim()) {
            showNotif("!", "Champ manquant", f + " est requis");
            return;
          }
        }
      }
      if (step === 2 && !selectedShipping) {
        showNotif("!", "Transport requis", "Veuillez s\u00E9lectionner un mode d\u2019exp\u00E9dition");
        return;
      }
    }
    if (n === 2 && !selectedShipping && shippingOpts.length > 0) {
      setSelectedShipping(shippingOpts[0].id);
    }
    setStep(n);
  };

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (code === "CHAI10") { setDiscount(cartTotal() * 0.1); setCouponMsg({ text: "\u2713 Coupon appliqu\u00E9 : -10% sur votre commande !", ok: true }); }
    else if (code === "BIENVENUE") { setDiscount(5); setCouponMsg({ text: "\u2713 Coupon appliqu\u00E9 : -5\u20AC sur votre commande !", ok: true }); }
    else { setDiscount(0); setCouponMsg({ text: "\u2717 Code promo invalide ou expir\u00E9.", ok: false }); }
  };

  const processPayment = () => {
    if (currentPayMethod === "card") {
      if (cardForm.num.replace(/\s/g, "").length < 16) { showNotif("!", "Erreur", "Num\u00E9ro de carte invalide"); return; }
      if (!cardForm.holder) { showNotif("!", "Erreur", "Titulaire requis"); return; }
      if (cardForm.exp.length < 5) { showNotif("!", "Erreur", "Date d\u2019expiration invalide"); return; }
      if (cardForm.cvv.length < 3) { showNotif("!", "Erreur", "CVV invalide"); return; }
    }
    const num = "CHA" + Date.now().toString().slice(-6);
    setOrderNum(num);
    goStep(4, true);
    showNotif("\u2713", "Commande confirm\u00E9e !", "Merci " + form.fname + ". Votre commande " + num + " est enregistr\u00E9e.");
  };

  const formatCardNum = (v: string) => {
    const clean = v.replace(/\D/g, "").substring(0, 16);
    return clean.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExp = (v: string) => {
    const clean = v.replace(/\D/g, "");
    if (clean.length >= 2) return clean.substring(0, 2) + "/" + clean.substring(2, 4);
    return clean;
  };

  const payLabels: Record<string, string> = { card: "Carte bancaire", paypal: "PayPal", apple: "Apple Pay", gpay: "Google Pay", virement: "Virement SEPA", cheque: "Ch\u00E8que" };

  const OrderSummary = () => (
    <div className="mb-8 border border-or/[0.12] bg-white/[0.02] p-6">
      {cart.map((i) => (
        <div key={i.id} className="flex justify-between border-b border-white/5 py-2 font-jost text-[0.72rem] text-pierre">
          <span>{i.name} × {i.qty}</span>
          <span>{formatPrice(i.price * i.qty)}</span>
        </div>
      ))}
      {discount > 0 && (
        <div className="flex justify-between border-b border-white/5 py-2 font-jost text-[0.72rem] text-pierre">
          <span>Réduction</span>
          <span className="text-success">−{formatPrice(discount)}</span>
        </div>
      )}
      <div className="flex justify-between border-b border-white/5 py-2 font-jost text-[0.72rem] text-pierre">
        <span>Livraison</span>
        <span>{shipPrice === 0 ? "Gratuit" : formatPrice(shipPrice)}</span>
      </div>
      <div className="flex justify-between pt-3 font-cormorant text-[1.2rem] text-creme">
        <span>Total TTC</span>
        <span className="text-or">{formatPrice(total)}</span>
      </div>
    </div>
  );

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (open) requestAnimationFrame(() => setVisible(true));
    else setVisible(false);
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div className={`fixed inset-0 z-[1001] bg-black/85 backdrop-blur-[5px] transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`} onClick={onClose} />
      <div className="fixed inset-0 z-[1002] flex items-center justify-center p-4">
        <div className={`custom-scrollbar max-h-[92vh] w-full max-w-[820px] overflow-y-auto border border-or/25 bg-[#120d09] transition-all duration-300 ${visible ? "scale-100 opacity-100" : "scale-[0.97] opacity-0"}`} onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="sticky top-0 z-[1] flex items-center justify-between border-b border-or/15 bg-[#120d09] px-10 py-8">
            <span className="font-cinzel text-base tracking-[0.15em] text-or">Finaliser la commande</span>
            <button onClick={onClose} className="flex h-9 w-9 cursor-pointer items-center justify-center border border-or/30 bg-transparent text-[1.1rem] text-or hover:border-bordeaux hover:bg-bordeaux">✕</button>
          </div>

          <div className="p-10 max-md:p-6">
            {/* Steps */}
            <div className="scrollbar-none mb-10 flex overflow-x-auto border-b border-or/15">
              {["Livraison", "Exp\u00E9dition", "Paiement", "Confirmation"].map((label, i) => {
                const n = i + 1;
                const isActive = step === n;
                const isDone = step > n;
                return (
                  <div key={n} className={`relative flex shrink-0 items-center gap-0 px-[1.5rem] py-[0.8rem] font-jost text-[0.6rem] uppercase tracking-[0.2em] ${isActive ? "text-or" : isDone ? "text-success" : "text-pierre"}`}>
                    <span className={`flex h-[22px] w-[22px] items-center justify-center rounded-full border text-[0.6rem] ${isDone ? "border-success bg-success text-white" : "border-current"}`}>
                      {isDone ? "\u2713" : n}
                    </span>
                    {label}
                    <span className={`absolute bottom-[-1px] left-0 right-0 h-0.5 bg-or transition-transform ${isActive ? "scale-x-100" : "scale-x-0"}`} />
                  </div>
                );
              })}
            </div>

            {/* Step 1: Delivery */}
            {step === 1 && (
              <div>
                <span className="mb-5 block border-b border-or/[0.12] pb-2.5 font-cinzel text-[0.78rem] tracking-[0.15em] text-or-p">Informations personnelles</span>
                <div className="mb-4 grid grid-cols-2 gap-4 max-md:grid-cols-1">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-jost text-[0.58rem] uppercase tracking-[0.25em] text-pierre">Pr&eacute;nom *</label>
                    <input className="f-input" value={form.fname} onChange={(e) => setForm({ ...form, fname: e.target.value })} placeholder="Jean" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-jost text-[0.58rem] uppercase tracking-[0.25em] text-pierre">Nom *</label>
                    <input className="f-input" value={form.lname} onChange={(e) => setForm({ ...form, lname: e.target.value })} placeholder="Dupont" />
                  </div>
                </div>
                <div className="mb-8 grid grid-cols-2 gap-4 max-md:grid-cols-1">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-jost text-[0.58rem] uppercase tracking-[0.25em] text-pierre">Email *</label>
                    <input className="f-input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jean@exemple.fr" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-jost text-[0.58rem] uppercase tracking-[0.25em] text-pierre">T&eacute;l&eacute;phone</label>
                    <input className="f-input" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+33 6 00 00 00 00" />
                  </div>
                </div>

                <span className="mb-5 block border-b border-or/[0.12] pb-2.5 font-cinzel text-[0.78rem] tracking-[0.15em] text-or-p">Adresse de livraison</span>
                <div className="mb-4 flex flex-col gap-1.5">
                  <label className="font-jost text-[0.58rem] uppercase tracking-[0.25em] text-pierre">Adresse *</label>
                  <input className="f-input" value={form.addr1} onChange={(e) => setForm({ ...form, addr1: e.target.value })} placeholder="12 rue des Vignerons" />
                </div>
                <div className="mb-4 flex flex-col gap-1.5">
                  <label className="font-jost text-[0.58rem] uppercase tracking-[0.25em] text-pierre">Compl&eacute;ment</label>
                  <input className="f-input" value={form.addr2} onChange={(e) => setForm({ ...form, addr2: e.target.value })} placeholder="Appartement, b\u00E2timent..." />
                </div>
                <div className="mb-4 grid grid-cols-3 gap-4 max-md:grid-cols-1">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-jost text-[0.58rem] uppercase tracking-[0.25em] text-pierre">Code postal *</label>
                    <input className="f-input" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} placeholder="49590" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-jost text-[0.58rem] uppercase tracking-[0.25em] text-pierre">Ville *</label>
                    <input className="f-input" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Fontevraud" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-jost text-[0.58rem] uppercase tracking-[0.25em] text-pierre">Pays *</label>
                    <select className="f-select" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}>
                      {COUNTRIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button onClick={() => goStep(2)} className="cursor-pointer border-none bg-or px-12 py-3.5 font-jost text-[0.6rem] uppercase tracking-[0.25em] text-noir transition-all hover:-translate-y-px hover:bg-or-p">
                    Continuer &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Shipping */}
            {step === 2 && (
              <div>
                <span className="mb-5 block border-b border-or/[0.12] pb-2.5 font-cinzel text-[0.78rem] tracking-[0.15em] text-or-p">Mode d&apos;exp&eacute;dition</span>
                <div className="mb-8 flex flex-col gap-3">
                  {shippingOpts.map((o) => {
                    const free = o.free_above && (subtotal - discount) >= o.free_above;
                    const price = free ? 0 : o.price;
                    const sel = selectedShipping === o.id;
                    return (
                      <div
                        key={o.id}
                        onClick={() => setSelectedShipping(o.id)}
                        className={`flex cursor-pointer items-center justify-between border px-6 py-4 transition-all ${sel ? "border-or bg-or/5" : "border-or/20 hover:border-or hover:bg-or/5"}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-4 w-4 items-center justify-center rounded-full border border-or/40">
                            {sel && <div className="h-2 w-2 rounded-full bg-or" />}
                          </div>
                          <div>
                            <span className="block font-jost text-[0.72rem] tracking-[0.1em] text-creme">
                              {o.name} {free && <span className="text-[0.6rem] text-success">GRATUIT</span>}
                            </span>
                            <span className="font-jost text-[0.62rem] text-pierre">{o.delay}</span>
                          </div>
                        </div>
                        <span className="font-cormorant text-[1.1rem] text-or">{price === 0 ? "Gratuit" : formatPrice(price)}</span>
                      </div>
                    );
                  })}
                </div>

                <span className="mb-5 block border-b border-or/[0.12] pb-2.5 font-cinzel text-[0.78rem] tracking-[0.15em] text-or-p">Code promo</span>
                <div className="mb-2 flex gap-3">
                  <input className="f-input flex-1" value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Entrez votre code promo" />
                  <button onClick={applyCoupon} className="shrink-0 cursor-pointer border border-or/30 bg-transparent px-5 py-3 font-jost text-[0.6rem] uppercase tracking-[0.2em] text-or transition-all hover:border-or hover:bg-or hover:text-noir">Appliquer</button>
                </div>
                {couponMsg && <p className={`mb-6 font-jost text-[0.68rem] ${couponMsg.ok ? "text-success" : "text-error"}`}>{couponMsg.text}</p>}

                <OrderSummary />

                <div className="flex justify-between gap-4">
                  <button onClick={() => goStep(1, true)} className="cursor-pointer border border-or/25 bg-transparent px-8 py-3.5 font-jost text-[0.6rem] uppercase tracking-[0.25em] text-or transition-all hover:border-or hover:bg-or/[0.06]">&larr; Retour</button>
                  <button onClick={() => goStep(3)} className="flex-1 cursor-pointer border-none bg-or px-8 py-3.5 font-jost text-[0.6rem] uppercase tracking-[0.25em] text-noir transition-all hover:-translate-y-px hover:bg-or-p">Continuer &rarr;</button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div>
                <span className="mb-5 block border-b border-or/[0.12] pb-2.5 font-cinzel text-[0.78rem] tracking-[0.15em] text-or-p">Mode de paiement</span>
                <div className="mb-8 grid grid-cols-3 gap-4 max-md:grid-cols-2">
                  {[
                    { key: "card", icon: "M3 3h18v18H3z M7 7h10 M7 11h10 M7 15h6", name: "Carte bancaire", sub: "Visa \u2022 Mastercard \u2022 Amex" },
                    { key: "paypal", icon: "M7 21l2-8H3l10-10-2 8h6L7 21z", name: "PayPal", sub: "Paiement s\u00E9curis\u00E9" },
                    { key: "apple", icon: "M12 2a10 10 0 110 20 10 10 0 010-20z M8 12h8 M12 8v8", name: "Apple Pay", sub: "Paiement rapide" },
                    { key: "gpay", icon: "M12 2a10 10 0 110 20 10 10 0 010-20z M8 12h8 M12 8v8", name: "Google Pay", sub: "Paiement rapide" },
                    { key: "virement", icon: "M3 21h18 M3 10h18 M5 6l7-3 7 3", name: "Virement bancaire", sub: "SEPA / International" },
                    { key: "cheque", icon: "M9 11l3 3 8-8 M21 12a9 9 0 11-18 0 9 9 0 0118 0z", name: "Ch\u00E8que", sub: "\u00C0 l\u2019ordre de SCI Andrea" },
                  ].map(({ key, icon, name, sub }) => (
                    <div
                      key={key}
                      onClick={() => setPayMethod(key)}
                      className={`relative cursor-pointer border p-5 text-center transition-all ${currentPayMethod === key ? "border-or bg-or/[0.06]" : "border-or/20 hover:border-or hover:bg-or/[0.06]"}`}
                    >
                      {currentPayMethod === key && <span className="absolute right-3 top-2 text-[0.7rem] text-or">{"\u2713"}</span>}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 h-7 w-7 text-or">
                        <path d={icon} />
                      </svg>
                      <span className="mb-0.5 block font-jost text-[0.62rem] uppercase tracking-[0.15em] text-creme">{name}</span>
                      <span className="font-jost text-[0.55rem] text-pierre">{sub}</span>
                    </div>
                  ))}
                </div>

                {/* Card form */}
                {currentPayMethod === "card" && (
                  <div>
                    <div className="relative mb-6 overflow-hidden border border-or/20 bg-[linear-gradient(135deg,#1a0f0a,#2a1810)] px-8 py-6">
                      <div className="absolute -right-[30px] -top-[30px] h-[120px] w-[120px] rounded-full bg-or/5" />
                      <div className="mb-4 flex h-[26px] w-[35px] items-center justify-center rounded bg-gradient-to-br from-or to-or-p">
                        <div className="h-[14px] w-[20px] rounded-sm border border-black/30" />
                      </div>
                      <div className="mb-2 font-cormorant text-[1.4rem] tracking-[0.2em] text-creme">
                        {cardForm.num ? formatCardNum(cardForm.num).padEnd(19, "\u2022") : "\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022"}
                      </div>
                      <div className="flex justify-between">
                        <span className="font-jost text-[0.65rem] uppercase tracking-[0.15em] text-pierre">{cardForm.holder || "NOM PR\u00C9NOM"}</span>
                        <span className="font-jost text-[0.65rem] tracking-[0.15em] text-pierre">{cardForm.exp || "MM/AA"}</span>
                      </div>
                    </div>
                    <div className="mb-4 flex flex-col gap-1.5">
                      <label className="font-jost text-[0.58rem] uppercase tracking-[0.25em] text-pierre">Numéro de carte *</label>
                      <input className="f-input" maxLength={19} value={formatCardNum(cardForm.num)} onChange={(e) => setCardForm({ ...cardForm, num: e.target.value.replace(/\D/g, "") })} placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-jost text-[0.58rem] uppercase tracking-[0.25em] text-pierre">Titulaire *</label>
                        <input className="f-input" value={cardForm.holder} onChange={(e) => setCardForm({ ...cardForm, holder: e.target.value })} placeholder="Jean Dupont" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-jost text-[0.58rem] uppercase tracking-[0.25em] text-pierre">Expiration *</label>
                          <input className="f-input" maxLength={5} value={formatExp(cardForm.exp)} onChange={(e) => setCardForm({ ...cardForm, exp: e.target.value.replace(/\D/g, "") })} placeholder="MM/AA" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-jost text-[0.58rem] uppercase tracking-[0.25em] text-pierre">CVV *</label>
                          <input className="f-input" maxLength={4} type="password" value={cardForm.cvv} onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value })} placeholder="\u2022\u2022\u2022" />
                        </div>
                      </div>
                    </div>
                    <div className="mb-4 flex items-center gap-3 font-jost text-[0.62rem] text-pierre">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
                      Paiement 100% sécurisé — Chiffrement SSL 256 bits
                    </div>
                  </div>
                )}

                {currentPayMethod === "paypal" && (
                  <div className="mb-6 border border-[rgba(0,48,135,0.3)] bg-[rgba(0,48,135,0.15)] p-8 text-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-3 h-8 w-8 text-or"><path d="M7 21l2-8H3l10-10-2 8h6L7 21z" /></svg>
                    <p className="mb-2 font-jost text-[0.78rem] text-creme">Vous serez redirigé vers PayPal</p>
                    <p className="font-jost text-[0.65rem] text-pierre">Connectez-vous à votre compte PayPal pour finaliser votre paiement.</p>
                  </div>
                )}

                {(currentPayMethod === "apple" || currentPayMethod === "gpay") && (
                  <div className="mb-6 border border-white/10 bg-white/[0.04] p-8 text-center">
                    <p className="mb-2 font-jost text-[0.78rem] text-creme">Authentification biométrique</p>
                    <p className="font-jost text-[0.65rem] text-pierre">Confirmez le paiement via Face ID, Touch ID ou votre code PIN.</p>
                  </div>
                )}

                {currentPayMethod === "virement" && (
                  <div className="mb-6 border border-[rgba(45,106,79,0.3)] bg-[rgba(45,106,79,0.1)] p-8">
                    <span className="mb-4 block font-cinzel text-[0.75rem] tracking-[0.15em] text-[#5cad8a]">Coordonnées bancaires</span>
                    <div className="flex flex-col gap-2 font-jost text-[0.7rem] text-pierre">
                      {[
                        ["B\u00E9n\u00E9ficiaire", "SCI ANDREA"],
                        ["IBAN", "FR76 3000 6000 0123 4567 8901 234"],
                        ["BIC/SWIFT", "BNPAFRPPXXX"],
                        ["Banque", "BNP Paribas"],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between"><span>{k}</span><span className="text-creme">{v}</span></div>
                      ))}
                    </div>
                  </div>
                )}

                {currentPayMethod === "cheque" && (
                  <div className="mb-6 border border-or/20 bg-or/5 p-8">
                    <p className="mb-3 font-jost text-[0.75rem] text-creme">Chèque à l&apos;ordre de <strong>SCI ANDREA</strong></p>
                    <p className="font-jost text-[0.68rem] leading-[1.6] text-pierre">Envoyez votre chèque à l&apos;adresse du restaurant.</p>
                  </div>
                )}

                <OrderSummary />

                <div className="flex justify-between gap-4">
                  <button onClick={() => goStep(2, true)} className="cursor-pointer border border-or/25 bg-transparent px-8 py-3.5 font-jost text-[0.6rem] uppercase tracking-[0.25em] text-or transition-all hover:border-or hover:bg-or/[0.06]">&larr; Retour</button>
                  <button onClick={processPayment} className="flex-1 cursor-pointer border-none bg-or px-8 py-3.5 font-jost text-[0.6rem] uppercase tracking-[0.25em] text-noir transition-all hover:-translate-y-px hover:bg-or-p">Payer maintenant</button>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div className="py-8 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-success bg-success/15 text-[2rem]">{"\u2713"}</div>
                <div className="mb-2 font-cormorant text-[2rem] italic text-creme">Commande confirmée !</div>
                <div className="mb-8 font-jost text-[0.72rem] tracking-[0.15em] text-pierre">
                  N° commande : {orderNum} — Confirmation envoyée à {form.email}
                </div>
                <div className="mb-6 border border-or/[0.12] bg-white/[0.02] p-6">
                  {[
                    ["Commande", orderNum],
                    ["Client", form.fname],
                    ["Destination", COUNTRIES.find((c) => c.value === form.country)?.label || form.country],
                    ["Paiement", payLabels[currentPayMethod]],
                    ["Total pay\u00E9", formatPrice(total)],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-white/5 py-1.5 font-jost text-[0.7rem] text-pierre last:border-none">
                      <span>{k}</span>
                      <span className="text-creme">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="mb-6 border border-or/15 bg-or/[0.04] p-6">
                  <p className="font-cormorant text-[1.05rem] font-light italic leading-[1.8] text-pierre">
                    Merci pour votre confiance. Un email de confirmation avec le suivi de votre colis vous sera envoyé sous peu.
                  </p>
                </div>
                <button onClick={() => { onClose(); resetCart(); }} className="cursor-pointer border-none bg-or px-9 py-3.5 font-jost text-[0.62rem] uppercase tracking-[0.3em] text-noir transition-all hover:bg-or-p">
                  Retour à la boutique
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
