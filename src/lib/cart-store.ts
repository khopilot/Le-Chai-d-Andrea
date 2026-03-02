"use client";
import { useSyncExternalStore, useCallback } from "react";
import { Product, SHIPPING_OPTIONS, EU_COUNTRIES } from "@/data/products";

export interface CartItem extends Product {
  qty: number;
}

type Listener = () => void;

let cart: CartItem[] = [];
let discount = 0;
let selectedShipping: string | null = null;
let currentPayMethod = "card";
let listeners: Listener[] = [];
let snapshot: { cart: CartItem[]; discount: number; selectedShipping: string | null; currentPayMethod: string } = { cart, discount, selectedShipping, currentPayMethod };

function emit() {
  snapshot = { cart, discount, selectedShipping, currentPayMethod };
  listeners.forEach((l) => l());
}

function subscribe(l: Listener) {
  listeners.push(l);
  return () => {
    listeners = listeners.filter((x) => x !== l);
  };
}

function getSnapshot() {
  return snapshot;
}

export function useCartStore() {
  const snap = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return snap;
}

export function addToCart(product: Product) {
  const existing = cart.find((c) => c.id === product.id);
  if (existing) {
    cart = cart.map((c) => (c.id === product.id ? { ...c, qty: c.qty + 1 } : c));
  } else {
    cart = [...cart, { ...product, qty: 1 }];
  }
  emit();
}

export function removeFromCart(id: number) {
  cart = cart.filter((c) => c.id !== id);
  emit();
}

export function updateQty(id: number, delta: number) {
  const item = cart.find((c) => c.id === id);
  if (!item) return;
  if (item.qty + delta <= 0) {
    removeFromCart(id);
    return;
  }
  cart = cart.map((c) => (c.id === id ? { ...c, qty: c.qty + delta } : c));
  emit();
}

export function cartTotal() {
  return cart.reduce((s, i) => s + i.price * i.qty, 0);
}

export function cartCount() {
  return cart.reduce((s, i) => s + i.qty, 0);
}

export function setDiscount(d: number) {
  discount = d;
  emit();
}

export function setSelectedShipping(id: string) {
  selectedShipping = id;
  emit();
}

export function setPayMethod(method: string) {
  currentPayMethod = method;
  emit();
}

export function resetCart() {
  cart = [];
  discount = 0;
  selectedShipping = null;
  emit();
}

export function getShippingZone(country: string): string {
  if (country === "FR") return "FR";
  if (EU_COUNTRIES.includes(country)) return "EU";
  return "WORLD";
}

export function getShippingPrice(country: string): number {
  if (!selectedShipping) return 0;
  const zone = getShippingZone(country);
  const all = [...SHIPPING_OPTIONS.FR, ...SHIPPING_OPTIONS.EU, ...SHIPPING_OPTIONS.WORLD];
  const opt = all.find((o) => o.id === selectedShipping);
  if (!opt) return 0;
  const total = cartTotal() - discount;
  if (opt.free_above && total >= opt.free_above) return 0;
  return opt.price;
}

export function formatPrice(n: number): string {
  return n.toFixed(2).replace(".", ",") + " \u20AC";
}
