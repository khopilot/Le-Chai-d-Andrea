"use client";
import { useNotif } from "@/lib/notification";

export default function Notification() {
  const { icon, title, msg, visible } = useNotif();
  return (
    <div
      className={`fixed bottom-4 right-4 z-[2000] max-w-[340px] max-md:left-4 max-md:right-4 max-md:max-w-none transition-all duration-400 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-[100px] opacity-0"
      }`}
    >
      <div className="flex items-center gap-4 border border-or/35 bg-[#1a1208] px-6 py-4">
        <span className="text-xl">{icon}</span>
        <div className="font-jost text-xs leading-relaxed text-creme">
          <strong className="mb-0.5 block text-or text-[0.75rem]">{title}</strong>
          <span>{msg}</span>
        </div>
      </div>
    </div>
  );
}
