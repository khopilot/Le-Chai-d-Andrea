"use client";
import { useChatStore, toggleChat } from "@/lib/chat-store";
import ChatPanel from "./ChatPanel";

export default function ChatBubble() {
  const { open } = useChatStore();

  return (
    <>
      {/* Panel */}
      <div
        className="fixed bottom-24 right-4 z-[1500] w-[380px] max-w-[calc(100vw-2rem)] transition-all duration-300 origin-bottom-right"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? "scale(1)" : "scale(0.9)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {open && <ChatPanel />}
      </div>

      {/* Floating button */}
      <button
        onClick={toggleChat}
        aria-label={open ? "Fermer le chat" : "Ouvrir le concierge"}
        className="group fixed bottom-4 right-4 z-[1500] flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-200"
        style={{
          background: open ? "var(--color-or)" : "var(--color-noir)",
          border: "2px solid var(--color-or)",
          color: open ? "var(--color-noir)" : "var(--color-or)",
        }}
        onMouseEnter={(e) => {
          if (!open) {
            e.currentTarget.style.background = "var(--color-or)";
            e.currentTarget.style.color = "var(--color-noir)";
          }
        }}
        onMouseLeave={(e) => {
          if (!open) {
            e.currentTarget.style.background = "var(--color-noir)";
            e.currentTarget.style.color = "var(--color-or)";
          }
        }}
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </>
  );
}
