export default function Ornament({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className ?? ""}`}>
      <div className="h-px w-[40px] bg-gradient-to-r from-transparent to-or" />
      <div className="h-2 w-2 rotate-45 bg-or" />
      <div className="h-px w-[40px] bg-gradient-to-l from-transparent to-or" />
    </div>
  );
}
