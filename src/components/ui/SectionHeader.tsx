interface SectionHeaderProps {
  label: string;
  title: React.ReactNode;
  action?: React.ReactNode;
}

export default function SectionHeader({ label, title, action }: SectionHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <span className="mb-3 block font-jost text-[0.58rem] uppercase tracking-[0.5em] text-or-p opacity-80">
          {label}
        </span>
        <h2 className="font-cormorant text-[clamp(2.2rem,4.5vw,4rem)] font-light leading-[1.1]">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
