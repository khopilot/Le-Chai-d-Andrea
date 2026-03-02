"use client";
import { useCartStore, updateQty, removeFromCart, cartTotal, formatPrice } from "@/lib/cart-store";
import { CAT_LABELS } from "@/data/products";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function CartDrawer({ open, onClose, onCheckout }: CartDrawerProps) {
  const { cart, discount } = useCartStore();
  const count = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <div className={`fixed inset-0 z-[1000] bg-black/85 backdrop-blur-[5px] transition-opacity duration-350 ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`} onClick={onClose} />
      <div className={`custom-scrollbar fixed bottom-0 right-0 top-0 z-[1001] flex w-[460px] max-w-full flex-col border-l border-or/20 bg-[#120d09] transition-transform duration-400 ${open ? "translate-x-0" : "translate-x-full"}`}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-or/15 p-8">
          <span className="font-cinzel text-base tracking-[0.15em] text-or">Mon Panier</span>
          <button onClick={onClose} className="flex h-9 w-9 cursor-pointer items-center justify-center border border-or/30 bg-transparent text-[1.1rem] text-or transition-all hover:border-bordeaux hover:bg-bordeaux">
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="custom-scrollbar flex flex-1 flex-col gap-4 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-pierre">
              <span className="text-[3rem] opacity-30">{"\u{1F6D2}"}</span>
              <p className="font-cormorant text-[1.1rem] italic">Votre panier est vide</p>
              <span className="font-jost text-[0.65rem] tracking-[0.15em]">Parcourez notre boutique</span>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 border border-or/10 bg-white/[0.03] p-4">
                <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center bg-white/[0.04] text-[1.8rem]">{item.icon}</div>
                <div className="flex-1">
                  <span className="mb-0.5 block font-cormorant text-[0.95rem] text-creme">{item.name}</span>
                  <span className="mb-2 block font-jost text-[0.58rem] uppercase tracking-[0.2em] text-or opacity-70">
                    {CAT_LABELS[item.cat] || item.cat}
                  </span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(item.id, -1)} className="flex h-[26px] w-[26px] cursor-pointer items-center justify-center border border-or/30 bg-transparent text-[0.9rem] text-or transition-all hover:bg-or hover:text-noir">−</button>
                    <span className="min-w-[20px] text-center font-jost text-[0.8rem] text-creme">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="flex h-[26px] w-[26px] cursor-pointer items-center justify-center border border-or/30 bg-transparent text-[0.9rem] text-or transition-all hover:bg-or hover:text-noir">+</button>
                  </div>
                </div>
                <span className="self-center font-cormorant text-[1.1rem] text-or">{formatPrice(item.price * item.qty)}</span>
                <button onClick={() => removeFromCart(item.id)} className="cursor-pointer self-center border-none bg-transparent p-1 text-[0.9rem] text-pierre opacity-60 transition-opacity hover:text-error hover:opacity-100">✕</button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-or/15 p-6">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-jost text-[0.72rem] uppercase tracking-[0.15em] text-pierre">Total</span>
              <strong className="font-cormorant text-[1.5rem] text-or">{formatPrice(cartTotal() - discount)}</strong>
            </div>
            <button
              onClick={onCheckout}
              className="mb-3 w-full cursor-pointer border-none bg-or px-4 py-4 font-jost text-[0.65rem] uppercase tracking-[0.3em] text-noir transition-all hover:-translate-y-px hover:bg-or-p"
            >
              Proc&eacute;der au paiement &rarr;
            </button>
            <button
              onClick={onClose}
              className="w-full cursor-pointer border border-or/25 bg-transparent px-4 py-3 font-jost text-[0.6rem] uppercase tracking-[0.25em] text-or transition-all hover:border-or hover:bg-or/[0.06]"
            >
              Continuer mes achats
            </button>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {["\u{1F4B3} Carte", "\u{1F17F}\uFE0F PayPal", "\uF8FF Apple Pay", "G Pay", "Virement"].map((p) => (
                <span key={p} className="border border-white/10 bg-white/[0.06] px-2.5 py-1 font-jost text-[0.5rem] tracking-[0.1em] text-pierre">{p}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
