"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import ReservationModal from "@/components/ReservationModal";
import Notification from "@/components/Notification";
import { useModalStore, closeCart, openCheckout, closeCheckout, closeResa } from "@/lib/modal-store";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const { cartOpen, checkoutOpen, resaOpen } = useModalStore();

  return (
    <>
      <Notification />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={closeCart} onCheckout={openCheckout} />
      <CheckoutModal open={checkoutOpen} onClose={closeCheckout} />
      <ReservationModal open={resaOpen} onClose={closeResa} />
    </>
  );
}
