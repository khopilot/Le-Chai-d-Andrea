"use client";
import { useSyncExternalStore } from "react";
import { buildSystemPrompt } from "@/components/chat/system-prompt";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatState {
  open: boolean;
  messages: ChatMessage[];
  streaming: boolean;
  error: string | null;
  suggestions: string[];
}

const WELCOME_SUGGESTIONS = ["La carte", "Réserver", "Vins & accords", "Événements", "Boutique"];
const DEFAULT_SUGGESTIONS = ["La carte", "Réserver", "Événements", "Boutique"];

function deriveSuggestions(content: string): string[] {
  const lower = content.toLowerCase();
  if (/r[ée]serv/.test(lower)) return ["Midi", "Soir", "2 couverts", "4 couverts"];
  if (/vin|carte|menu|formule|plat/.test(lower)) return ["Accord mets-vins", "Réserver", "Vins au verre"];
  if (/[ée]v[ée]nement|d[ée]gustation|soir[ée]e/.test(lower)) return ["Réserver", "S'inscrire", "Voir les événements"];
  if (/boutique|coffret|cadeau|produit/.test(lower)) return ["Coffrets cadeaux", "Réserver", "La carte"];
  return DEFAULT_SUGGESTIONS;
}

const WELCOME_MSG: ChatMessage = {
  role: "assistant",
  content:
    "Bienvenue au Chai d\u2019Andrea\u00A0! Je suis Alexandre, votre ma\u00EEtre d\u2019h\u00F4tel. Je peux vous guider dans notre carte, vous recommander des vins, ou vous aider \u00E0 r\u00E9server une table. Que puis-je faire pour vous\u00A0?",
};

let state: ChatState = {
  open: false,
  messages: [WELCOME_MSG],
  streaming: false,
  error: null,
  suggestions: WELCOME_SUGGESTIONS,
};

let snapshot = { ...state };
let listeners: (() => void)[] = [];

function emit() {
  snapshot = { ...state };
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.push(l);
  return () => {
    listeners = listeners.filter((x) => x !== l);
  };
}

function getSnapshot() {
  return snapshot;
}

export function useChatStore() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function toggleChat() {
  state = { ...state, open: !state.open };
  emit();
}

export function openChat() {
  state = { ...state, open: true };
  emit();
}

export function closeChat() {
  state = { ...state, open: false };
  emit();
}

export function resetChat() {
  state = { open: state.open, messages: [WELCOME_MSG], streaming: false, error: null, suggestions: WELCOME_SUGGESTIONS };
  emit();
}

export async function sendMessage(text: string) {
  const userMsg: ChatMessage = { role: "user", content: text.trim() };
  state = { ...state, messages: [...state.messages, userMsg], streaming: true, error: null, suggestions: [] };
  emit();

  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (!apiKey) {
    state = { ...state, streaming: false, error: "Cl\u00E9 API manquante." };
    emit();
    return;
  }

  const systemPrompt = buildSystemPrompt();
  const apiMessages = [
    { role: "system" as const, content: systemPrompt },
    ...state.messages.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
  ];

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: apiMessages,
        stream: true,
        temperature: 0.7,
        max_tokens: 600,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      state = { ...state, streaming: false, error: `Erreur ${res.status}: ${err.slice(0, 120)}` };
      emit();
      return;
    }

    const reader = res.body?.getReader();
    if (!reader) {
      state = { ...state, streaming: false, error: "Stream non disponible." };
      emit();
      return;
    }

    const assistantMsg: ChatMessage = { role: "assistant", content: "" };
    state = { ...state, messages: [...state.messages, assistantMsg] };
    emit();

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data: ")) continue;
        const data = trimmed.slice(6);
        if (data === "[DONE]") break;

        try {
          const parsed = JSON.parse(data);
          const delta = parsed.choices?.[0]?.delta?.content;
          if (delta) {
            assistantMsg.content += delta;
            state = {
              ...state,
              messages: [...state.messages.slice(0, -1), { ...assistantMsg }],
            };
            emit();
          }
        } catch {
          // skip malformed chunk
        }
      }
    }

    state = {
      ...state,
      streaming: false,
      suggestions: deriveSuggestions(assistantMsg.content),
    };
    emit();
  } catch (err) {
    state = {
      ...state,
      streaming: false,
      error: err instanceof Error ? err.message : "Erreur r\u00E9seau.",
    };
    emit();
  }
}
