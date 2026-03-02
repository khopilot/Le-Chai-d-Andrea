"use client";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import ReservationModal from "@/components/ReservationModal";
import Notification from "@/components/Notification";
import ChatBubble from "@/components/chat/ChatBubble";
import { useModalStore, closeCart, openCheckout, closeCheckout, closeResa } from "@/lib/modal-store";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const { cartOpen, checkoutOpen, resaOpen, resaPreFill } = useModalStore();
  const anyModalOpen = cartOpen || checkoutOpen || resaOpen;

  // Global ESC handler — close topmost modal first
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (resaOpen) { closeResa(); return; }
      if (checkoutOpen) { closeCheckout(); return; }
      if (cartOpen) { closeCart(); return; }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cartOpen, checkoutOpen, resaOpen]);

  // Body scroll lock when any modal is open
  useEffect(() => {
    if (anyModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [anyModalOpen]);

  return (
    <>
      <Notification />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={closeCart} onCheckout={openCheckout} />
      <CheckoutModal open={checkoutOpen} onClose={closeCheckout} />
      <ReservationModal open={resaOpen} onClose={closeResa} preFill={resaPreFill} />
      <ChatBubble />
    </>
  );
}
