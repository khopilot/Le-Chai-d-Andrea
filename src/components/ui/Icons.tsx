interface IconProps {
  className?: string;
}

export function WineGlass({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 2h8l-1 9a5 5 0 0 1-3 4.5A5 5 0 0 1 9 11L8 2z" />
      <path d="M12 15.5V22" />
      <path d="M8 22h8" />
    </svg>
  );
}

export function Utensils({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  );
}

export function Champagne({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 22h8" />
      <path d="M12 17v5" />
      <path d="M7 2h10l-2 11a4 4 0 0 1-3 3 4 4 0 0 1-3-3L7 2z" />
      <path d="M9 5l6 2" />
    </svg>
  );
}

export function Bottle({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M10 2h4v3l2 3v12a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V8l2-3V2z" />
      <path d="M8 12h8" />
    </svg>
  );
}

export function Cheese({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 12l10-8 10 8v2H2v-2z" />
      <path d="M2 14h20v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4z" />
      <circle cx="8" cy="17" r="1" />
      <circle cx="14" cy="16" r="0.5" />
    </svg>
  );
}

export function Gift({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5C9 3 12 8 12 8" />
      <path d="M16.5 8a2.5 2.5 0 0 0 0-5C15 3 12 8 12 8" />
    </svg>
  );
}

export function ShoppingBag({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

export function Olive({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <ellipse cx="12" cy="14" rx="6" ry="7" />
      <path d="M12 7V3" />
      <path d="M12 3c2 0 4 1.5 5 3" />
    </svg>
  );
}

export function Truffle({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="13" r="8" />
      <circle cx="10" cy="11" r="1.5" />
      <circle cx="15" cy="14" r="1" />
      <circle cx="11" cy="16" r="0.8" />
      <path d="M12 5V3" />
      <path d="M14 4l-2 1" />
    </svg>
  );
}

export function VineMotif({ className = "h-32 w-32" }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
      <path d="M60 100 C60 60, 30 50, 30 30" strokeOpacity="0.15" />
      <path d="M60 100 C60 60, 90 50, 90 30" strokeOpacity="0.15" />
      <circle cx="30" cy="25" r="8" strokeOpacity="0.12" />
      <circle cx="90" cy="25" r="8" strokeOpacity="0.12" />
      <circle cx="60" cy="15" r="10" strokeOpacity="0.12" />
      <path d="M60 100 C60 70, 60 50, 60 20" strokeOpacity="0.1" />
    </svg>
  );
}

/* ── Social Icons ── */

export function IconInstagram({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconFacebook({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z" />
    </svg>
  );
}

export function IconTripAdvisor({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C7.6 2 3.7 4.1 2 6.5h2.8A7 7 0 0 1 12 4a7 7 0 0 1 7.2 2.5H22C20.3 4.1 16.4 2 12 2z" />
      <circle cx="8.5" cy="13" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8.5" cy="13" r="2" />
      <circle cx="15.5" cy="13" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="15.5" cy="13" r="2" />
      <path d="M12 9.5a6.5 6.5 0 0 0-4.8-3A6.5 6.5 0 0 0 4 13a6.5 6.5 0 0 0 4.5 6.2L12 22l3.5-2.8A6.5 6.5 0 0 0 20 13a6.5 6.5 0 0 0-3.2-6.5A6.5 6.5 0 0 0 12 9.5z" fill="none" stroke="currentColor" strokeWidth="0" />
    </svg>
  );
}

/* ── Payment Icons ── */

export function IconVisa({ className = "h-6 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 48 32" fill="currentColor" className={className}>
      <rect width="48" height="32" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M19.5 21h-2.8l1.8-10.5h2.8L19.5 21zM15 10.5l-2.7 7.2-.3-1.5-1-5.2s-.1-.5-.7-.5H6.1l-.1.3s.7.2 1.6.5L10 21h2.9l4.4-10.5H15zM35.8 21h2.5l-2.2-10.5H33.7a1.2 1.2 0 0 0-1.1.7l-4 9.8h2.8l.6-1.5h3.4l.4 1.5zm-2.9-3.6l1.4-3.9.8 3.9h-2.2zM29.2 13.3l.4-2.2s-.8-.3-1.7-.3c-1 0-3.3.4-3.3 2.5 0 2 2.7 2 2.7 3s-2.4.9-3.2.1l-.4 2.3s.9.4 2.2.4c1.3 0 3.5-.7 3.5-2.6 0-2-2.7-2.2-2.7-3 0-.9 1.9-.8 2.5-.2z" />
    </svg>
  );
}

export function IconMastercard({ className = "h-6 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 48 32" fill="none" className={className}>
      <rect width="48" height="32" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="19" cy="16" r="8" fill="currentColor" opacity="0.6" />
      <circle cx="29" cy="16" r="8" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export function IconAmex({ className = "h-6 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 48 32" fill="currentColor" className={className}>
      <rect width="48" height="32" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="24" y="19" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fontWeight="bold" fill="currentColor">AMEX</text>
    </svg>
  );
}

export function IconPaypal({ className = "h-6 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 48 32" fill="currentColor" className={className}>
      <rect width="48" height="32" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20.5 8h5.6c2.7 0 4.6 1.8 4.2 4.5-.5 3.5-3 5.5-6 5.5h-1.5c-.5 0-.8.3-.9.8l-.8 4.7h-3l.5-2.5 1.9-13z" opacity="0.7" />
      <path d="M18 10h5.6c2.7 0 4.6 1.8 4.2 4.5-.5 3.5-3 5.5-6 5.5h-1.5c-.5 0-.8.3-.9.8L18.6 26h-3l2.4-16z" />
    </svg>
  );
}

export function IconApplePay({ className = "h-6 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 48 32" fill="currentColor" className={className}>
      <rect width="48" height="32" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16.5 11.5c.6-.7 1-1.7.9-2.7-1 0-2.1.6-2.8 1.4-.6.7-1.1 1.7-1 2.7 1.1 0 2.2-.6 2.9-1.4zM17.4 13c-1.6-.1-3 .9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 2.9-.4 7.3 1.2 9.7.8 1.2 1.8 2.5 3.1 2.4 1.2-.1 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-1.3-.5-2.5-2.1-2.5-4.3 0-1.8 1-3.3 2.4-4-.9-1.3-2.3-2.1-3.9-2.1z" />
      <text x="33" y="20" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="600" fill="currentColor">Pay</text>
    </svg>
  );
}

export function IconGooglePay({ className = "h-6 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 48 32" fill="currentColor" className={className}>
      <rect width="48" height="32" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="14" y="20" fontSize="11" fontFamily="sans-serif" fontWeight="bold" fill="currentColor">G</text>
      <text x="28" y="20" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="600" fill="currentColor">Pay</text>
    </svg>
  );
}

/** Returns the appropriate SVG icon component for a product category */
export function CategoryIcon({ cat, className = "h-16 w-16 text-or" }: { cat: string; className?: string }) {
  switch (cat) {
    case "vin":
      return <WineGlass className={className} />;
    case "spiritueux":
      return <Bottle className={className} />;
    case "epicerie":
      return <Olive className={className} />;
    case "fromage":
      return <Cheese className={className} />;
    case "coffret":
      return <Gift className={className} />;
    default:
      return <WineGlass className={className} />;
  }
}
