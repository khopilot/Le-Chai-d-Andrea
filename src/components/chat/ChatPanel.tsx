"use client";
import { useRef, useEffect, useState, type ReactNode } from "react";
import { useChatStore, sendMessage, closeChat, resetChat } from "@/lib/chat-store";
import { openResa, type ResaPreFill } from "@/lib/modal-store";
import { openCart } from "@/lib/modal-store";
import { addToCart } from "@/lib/cart-store";
import { showNotif } from "@/lib/notification";
import { PRODUCTS } from "@/data/products";
import type { ChatMessage } from "@/lib/chat-store";

/* ── Route mapping for NAV markers ── */
const NAV_ROUTES: Record<string, { label: string; path: string }> = {
  restaurant: { label: "Voir la carte", path: "/restaurant" },
  boutique: { label: "Voir la boutique", path: "/boutique" },
  evenements: { label: "Voir les événements", path: "/evenements" },
  contact: { label: "Nous contacter", path: "/contact" },
};

/* ── Inline SVG icons ── */
function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

/* ── Resa marker parser ── */

function parseResaMarker(marker: string): ResaPreFill | null {
  const colonIdx = marker.indexOf(":");
  if (colonIdx === -1) return null;
  const parts = marker.slice(colonIdx + 1).split("|");
  if (parts.length < 3) return null;

  const dateOk = /^\d{4}-\d{2}-\d{2}$/.test(parts[0]) && !isNaN(Date.parse(parts[0]));
  const service = parts[1] === "midi" || parts[1] === "soir" ? parts[1] : null;
  const n = parseInt(parts[2], 10);
  const couverts = !isNaN(n) && n >= 1 && n <= 20 ? n : null;

  if (!dateOk && !service && !couverts) return null;
  return { date: dateOk ? parts[0] : null, service, couverts };
}

/* ── Action components ── */

function ResaButton({ preFill }: { preFill?: ResaPreFill | null }) {
  return (
    <button
      onClick={() => { closeChat(); openResa(preFill ?? undefined); }}
      className="mt-2 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition hover:brightness-110"
      style={{ background: "var(--color-or)", color: "var(--color-noir)" }}
    >
      <CalendarIcon />
      <span>Réserver une table</span>
    </button>
  );
}

function NavButton({ target }: { target: string }) {
  const route = NAV_ROUTES[target];
  if (!route) return null;
  return (
    <a
      href={route.path}
      onClick={(e) => { e.preventDefault(); closeChat(); window.location.href = route.path; }}
      className="mt-2 inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition hover:bg-white/5"
      style={{ borderColor: "var(--color-or)", color: "var(--color-or)" }}
    >
      <span>{route.label}</span>
      <ArrowIcon />
    </a>
  );
}

function CartButton() {
  return (
    <button
      onClick={() => { closeChat(); openCart(); }}
      className="mt-2 inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition hover:bg-white/5"
      style={{ borderColor: "var(--color-or)", color: "var(--color-or)" }}
    >
      <CartIcon />
      <span>Voir mon panier</span>
    </button>
  );
}

function ProductCard({ productId }: { productId: number }) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return null;

  const handleAdd = () => {
    addToCart(product);
    showNotif("🛒", "Ajouté au panier", product.name);
  };

  return (
    <div
      className="mt-2 mb-1 flex items-center gap-3 rounded-xl p-2.5"
      style={{ background: "rgba(183,142,85,0.08)", border: "1px solid rgba(183,142,85,0.2)" }}
    >
      <img
        src={product.image}
        alt={product.name}
        className="h-12 w-12 shrink-0 rounded-lg object-cover"
        style={{ background: "rgba(255,255,255,0.05)" }}
      />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold leading-tight truncate" style={{ color: "var(--color-creme)" }}>
          {product.name}
        </p>
        <p className="text-xs mt-0.5" style={{ color: "var(--color-or)" }}>
          {product.price.toFixed(2).replace(".", ",")} €
        </p>
      </div>
      <button
        onClick={handleAdd}
        className="shrink-0 flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition hover:brightness-110"
        style={{ background: "var(--color-or)", color: "var(--color-noir)" }}
      >
        <PlusIcon />
        Ajouter
      </button>
    </div>
  );
}

/* ── Rich content renderer ── */

const MARKER_RE = /\[(RESA_BUTTON(?::[^\]]+)?|NAV:\w+|PRODUCT:\d+|CART_BUTTON)\]/g;

function renderRichContent(content: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  MARKER_RE.lastIndex = 0;
  while ((match = MARKER_RE.exec(content)) !== null) {
    // Text before the marker
    if (match.index > lastIndex) {
      parts.push(<span key={`t-${lastIndex}`}>{content.slice(lastIndex, match.index)}</span>);
    }

    const marker = match[1];
    if (marker === "RESA_BUTTON" || marker.startsWith("RESA_BUTTON:")) {
      const preFill = parseResaMarker(marker);
      parts.push(<ResaButton key={`m-${match.index}`} preFill={preFill} />);
    } else if (marker === "CART_BUTTON") {
      parts.push(<CartButton key={`m-${match.index}`} />);
    } else if (marker.startsWith("NAV:")) {
      const target = marker.slice(4);
      parts.push(<NavButton key={`m-${match.index}`} target={target} />);
    } else if (marker.startsWith("PRODUCT:")) {
      const id = parseInt(marker.slice(8), 10);
      parts.push(<ProductCard key={`m-${match.index}`} productId={id} />);
    }

    lastIndex = match.index + match[0].length;
  }

  // Remaining text after last marker
  if (lastIndex < content.length) {
    parts.push(<span key={`t-${lastIndex}`}>{content.slice(lastIndex)}</span>);
  }

  return parts.length > 0 ? parts : [<span key="full">{content}</span>];
}

/* ── Message bubble ── */

function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap"
        style={
          isUser
            ? { background: "rgba(183,142,85,0.15)", color: "var(--color-creme)" }
            : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(163,146,130,0.2)", color: "var(--color-creme)" }
        }
      >
        {isUser ? msg.content : renderRichContent(msg.content)}
      </div>
    </div>
  );
}

/* ── Typing indicator ── */

function TypingIndicator() {
  return (
    <div className="flex justify-start mb-3">
      <div
        className="flex items-center gap-1.5 rounded-2xl px-4 py-3"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(163,146,130,0.2)" }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="inline-block h-2 w-2 rounded-full animate-pulse"
            style={{ background: "var(--color-or)", animationDelay: `${i * 200}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Suggestion chips ── */

function SuggestionChips({ suggestions, onChip }: { suggestions: string[]; onChip: (text: string) => void }) {
  if (suggestions.length === 0) return null;
  return (
    <div className="flex gap-2 overflow-x-auto px-3 pb-2 pt-1 scrollbar-none animate-fadeIn">
      {suggestions.map((chip) => (
        <button
          key={chip}
          onClick={() => onChip(chip)}
          className="shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition hover:bg-[var(--color-or)] hover:text-[var(--color-noir)]"
          style={{ borderColor: "var(--color-or)", color: "var(--color-or)" }}
        >
          {chip}
        </button>
      ))}
    </div>
  );
}

/* ── Main panel ── */

export default function ChatPanel() {
  const { messages, streaming, error, suggestions } = useChatStore();
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || streaming) return;
    setInput("");
    sendMessage(msg);
  };

  return (
    <div
      className="flex flex-col overflow-hidden rounded-2xl shadow-2xl"
      style={{
        background: "var(--color-noir)",
        border: "1px solid rgba(183,142,85,0.3)",
        height: "min(520px, calc(100dvh - 120px))",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 shrink-0"
        style={{ borderBottom: "1px solid rgba(163,146,130,0.15)" }}
      >
        <div className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span className="text-sm font-semibold tracking-wide" style={{ color: "var(--color-or)" }}>
            Alexandre — Concierge
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetChat}
            className="rounded-lg p-1.5 transition hover:bg-white/10"
            title="Nouvelle conversation"
            style={{ color: "var(--color-taupe)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M3 21v-5h5" />
            </svg>
          </button>
          <button
            onClick={closeChat}
            className="rounded-lg p-1.5 transition hover:bg-white/10"
            style={{ color: "var(--color-taupe)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-3">
        {messages.map((msg, i) => (
          <MessageBubble key={i} msg={msg} />
        ))}
        {streaming && messages[messages.length - 1]?.role !== "assistant" && <TypingIndicator />}
        {streaming && messages[messages.length - 1]?.role === "assistant" && messages[messages.length - 1]?.content === "" && <TypingIndicator />}
      </div>

      {/* Error */}
      {error && (
        <div
          className="mx-4 mb-2 rounded-lg px-3 py-2 text-xs"
          style={{ background: "rgba(192,57,43,0.1)", border: "1px solid rgba(192,57,43,0.3)", color: "#e74c3c" }}
        >
          {error}
        </div>
      )}

      {/* Suggestion chips */}
      {!streaming && <SuggestionChips suggestions={suggestions} onChip={(t) => handleSend(t)} />}

      {/* Input */}
      <div className="shrink-0 px-3 pb-3 pt-1">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Votre question..."
            disabled={streaming}
            className="f-input flex-1 !rounded-xl !py-2.5 !text-sm"
          />
          <button
            onClick={() => handleSend()}
            disabled={streaming || !input.trim()}
            className="shrink-0 rounded-xl p-2.5 transition disabled:opacity-30"
            style={{ background: "var(--color-or)", color: "var(--color-noir)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
