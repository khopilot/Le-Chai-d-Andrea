import Ornament from "@/components/ui/Ornament";
import RevealSection from "@/components/RevealSection";

interface PageHeroProps {
  label: string;
  title: React.ReactNode;
  subtitle?: string;
}

export default function PageHero({ label, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative z-[2] flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_20%_50%,rgba(92,26,26,0.3)_0%,transparent_60%),linear-gradient(160deg,#0d0a07_0%,#1a0f0a_40%,#0f0b08_100%)]">
      <RevealSection className="flex flex-col items-center text-center">
        <span className="mb-3 font-jost text-[0.62rem] uppercase tracking-[0.5em] text-or opacity-80">
          {label}
        </span>
        <Ornament className="mb-4" />
        <h1 className="font-cormorant text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.1] text-creme">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-[500px] font-cormorant text-lg font-light leading-[1.8] text-pierre">
            {subtitle}
          </p>
        )}
      </RevealSection>
    </section>
  );
}
