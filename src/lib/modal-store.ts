"use client";
import { useSyncExternalStore } from "react";

export interface ResaPreFill {
  date: string | null;
  service: "midi" | "soir" | null;
  couverts: number | null;
}

interface ModalState {
  cartOpen: boolean;
  checkoutOpen: boolean;
  resaOpen: boolean;
  resaPreFill: ResaPreFill | null;
}

let state: ModalState = { cartOpen: false, checkoutOpen: false, resaOpen: false, resaPreFill: null };
let listeners: (() => void)[] = [];

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.push(l);
  return () => {
    listeners = listeners.filter((x) => x !== l);
  };
}

function getSnapshot() {
  return state;
}

export function useModalStore() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function openCart() {
  state = { ...state, cartOpen: true };
  emit();
}

export function closeCart() {
  state = { ...state, cartOpen: false };
  emit();
}

export function openCheckout() {
  state = { ...state, cartOpen: false, checkoutOpen: true };
  emit();
}

export function closeCheckout() {
  state = { ...state, checkoutOpen: false };
  emit();
}

export function openResa(preFill?: ResaPreFill) {
  state = { ...state, resaOpen: true, resaPreFill: preFill ?? null };
  emit();
}

export function closeResa() {
  state = { ...state, resaOpen: false, resaPreFill: null };
  emit();
}
