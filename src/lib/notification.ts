"use client";
import { useSyncExternalStore } from "react";

interface NotifState {
  icon: string;
  title: string;
  msg: string;
  visible: boolean;
}

let state: NotifState = { icon: "", title: "", msg: "", visible: false };
let listeners: (() => void)[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;

function emit() { listeners.forEach(l => l()); }

export function showNotif(icon: string, title: string, msg: string) {
  if (timer) clearTimeout(timer);
  state = { icon, title, msg, visible: true };
  emit();
  timer = setTimeout(() => { state = { ...state, visible: false }; emit(); }, 4000);
}

export function useNotif() {
  return useSyncExternalStore(
    (l) => { listeners.push(l); return () => { listeners = listeners.filter(x => x !== l); }; },
    () => state,
    () => state
  );
}
