"use client";
import { useState, useMemo, useEffect } from "react";
import { MONTHS_FR, TIME_MIDI, TIME_SOIR, UNAVAIL_MIDI, UNAVAIL_SOIR } from "@/data/menu";
import { showNotif } from "@/lib/notification";

interface ReservationModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ReservationModal({ open, onClose }: ReservationModalProps) {
  const now = new Date();
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [service, setService] = useState("midi");
  const [couverts, setCouverts] = useState("2 personnes");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ fname: "", lname: "", email: "", phone: "", occasion: "", notes: "" });

  const calDays = useMemo(() => {
    const first = new Date(calYear, calMonth, 1).getDay();
    const offset = (first + 6) % 7;
    const days = new Date(calYear, calMonth + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const result: { day: number; disabled: boolean; today: boolean; dateStr: string }[] = [];
    for (let i = 0; i < offset; i++) result.push({ day: 0, disabled: true, today: false, dateStr: "" });
    for (let d = 1; d <= days; d++) {
      const date = new Date(calYear, calMonth, d);
      const isPast = date < today;
      const isMon = date.getDay() === 1;
      const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      result.push({ day: d, disabled: isPast || isMon, today: date.toDateString() === today.toDateString(), dateStr });
    }
    return result;
  }, [calYear, calMonth]);

  const timeSlots = service === "midi" ? TIME_MIDI : TIME_SOIR;
  const unavail = service === "midi" ? UNAVAIL_MIDI : UNAVAIL_SOIR;

  const dateDisplay = selectedDate
    ? new Date(selectedDate + "T12:00:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    : "Non s\u00E9lectionn\u00E9e";

  const prevMonth = () => { if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); } else setCalMonth(calMonth - 1); };
  const nextMonth = () => { if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); } else setCalMonth(calMonth + 1); };

  const goResaStep = (n: number, force = false) => {
    if (!force && n > step) {
      if (step === 1) {
        if (!selectedDate) { showNotif("!", "Date requise", "Veuillez s\u00E9lectionner une date"); return; }
        if (!selectedTime) { showNotif("!", "Heure requise", "Veuillez s\u00E9lectionner un cr\u00E9neau horaire"); return; }
      }
      if (step === 2) {
        if (!form.fname || !form.lname || !form.email || !form.phone) {
          showNotif("!", "Champs manquants", "Tous les champs requis doivent \u00EAtre remplis");
          return;
        }
      }
    }
    setStep(n);
  };

  const confirmResa = () => {
    if (!form.fname || !form.email) { showNotif("!", "Champs requis", "Veuillez remplir tous les champs obligatoires"); return; }
    const refNum = "RES" + Date.now().toString().slice(-5);
    goResaStep(3, true);
    showNotif("\u2713", "R\u00E9servation confirm\u00E9e !", "Table r\u00E9serv\u00E9e le " + dateDisplay + " \u00E0 " + selectedTime);
  };

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (open) requestAnimationFrame(() => setVisible(true));
    else setVisible(false);
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div className={`fixed inset-0 z-[1001] bg-black/85 backdrop-blur-[5px] transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`} onClick={onClose} />
      <div className="fixed inset-0 z-[1002] flex items-center justify-center p-4">
        <div className={`custom-scrollbar max-h-[92vh] w-full max-w-[820px] overflow-y-auto border border-or/25 bg-[#120d09] transition-all duration-300 ${visible ? "scale-100 opacity-100" : "scale-[0.97] opacity-0"}`} onClick={(e) => e.stopPropagation()}>
          <div className="sticky top-0 z-[1] flex items-center justify-between border-b border-or/15 bg-[#120d09] px-10 py-8">
            <span className="font-cinzel text-base tracking-[0.15em] text-or">Réserver une table</span>
            <button onClick={onClose} className="flex h-9 w-9 cursor-pointer items-center justify-center border border-or/30 bg-transparent text-[1.1rem] text-or hover:border-bordeaux hover:bg-bordeaux">✕</button>
          </div>

          <div className="p-10 max-md:p-6">
            {/* Steps */}
            <div className="scrollbar-none mb-10 flex overflow-x-auto border-b border-or/15">
              {["Date & Heure", "Vos infos", "Confirmation"].map((label, i) => {
                const n = i + 1;
                return (
                  <div key={n} className={`relative flex shrink-0 items-center gap-0 px-[1.5rem] py-[0.8rem] font-jost text-[0.6rem] uppercase tracking-[0.2em] ${step === n ? "text-or" : step > n ? "text-success" : "text-pierre"}`}>
                    <span className={`flex h-[22px] w-[22px] items-center justify-center rounded-full border text-[0.6rem] ${step > n ? "border-success bg-success text-white" : "border-current"}`}>
                      {step > n ? "\u2713" : n}
                    </span>
                    {label}
                    <span className={`absolute bottom-[-1px] left-0 right-0 h-0.5 bg-or transition-transform ${step === n ? "scale-x-100" : "scale-x-0"}`} />
                  </div>
                );
              })}
            </div>

            {/* Step 1 */}
            {step === 1 && (
              <div>
                <div className="grid grid-cols-2 gap-10 max-md:grid-cols-1">
                  {/* Calendar */}
                  <div>
                    <span className="mb-5 block border-b border-or/[0.12] pb-2.5 font-cinzel text-[0.78rem] tracking-[0.15em] text-or-p">Choisissez une date</span>
                    <div className="border border-or/15 bg-white/[0.02] p-6">
                      <div className="mb-5 flex items-center justify-between">
                        <button onClick={prevMonth} className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center border border-or/30 bg-transparent text-or hover:bg-or/10">&lsaquo;</button>
                        <span className="font-cinzel text-[0.9rem] tracking-[0.1em] text-or">{MONTHS_FR[calMonth]} {calYear}</span>
                        <button onClick={nextMonth} className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center border border-or/30 bg-transparent text-or hover:bg-or/10">&rsaquo;</button>
                      </div>
                      <div className="mb-2 grid grid-cols-7 gap-0.5">
                        {["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"].map((d) => (
                          <div key={d} className="py-1 text-center font-jost text-[0.55rem] uppercase tracking-[0.2em] text-pierre">{d}</div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {calDays.map((d, i) => (
                          <div
                            key={i}
                            onClick={() => !d.disabled && d.day > 0 && setSelectedDate(d.dateStr)}
                            className={`flex aspect-square cursor-pointer items-center justify-center rounded-sm border border-transparent font-jost text-[0.72rem] text-pierre transition-all ${
                              d.day === 0 ? "" : d.disabled ? "pointer-events-none opacity-30" : d.dateStr === selectedDate ? "!border-or !bg-or font-semibold !text-noir" : d.today ? "border-or/40 text-or-p" : "hover:border-or/40 hover:bg-or/[0.06] hover:text-or"
                            }`}
                          >
                            {d.day > 0 ? d.day : ""}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex flex-col gap-6">
                    <div>
                      <span className="mb-5 block border-b border-or/[0.12] pb-2.5 font-cinzel text-[0.78rem] tracking-[0.15em] text-or-p">Service</span>
                      <select className="f-select" value={service} onChange={(e) => { setService(e.target.value); setSelectedTime(null); }}>
                        <option value="midi">Déjeuner (12h–14h30)</option>
                        <option value="soir">Dîner (19h–22h)</option>
                      </select>
                    </div>

                    <div>
                      <span className="mb-5 block border-b border-or/[0.12] pb-2.5 font-cinzel text-[0.78rem] tracking-[0.15em] text-or-p">Créneau horaire</span>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((t) => {
                          const u = unavail.includes(t);
                          return (
                            <div
                              key={t}
                              onClick={() => !u && setSelectedTime(t)}
                              className={`cursor-pointer border px-2 py-2.5 text-center font-jost text-[0.68rem] transition-all ${
                                u ? "pointer-events-none border-or/20 text-pierre line-through opacity-30" : t === selectedTime ? "border-or bg-or text-noir" : "border-or/20 text-pierre hover:border-or/50 hover:bg-or/[0.06] hover:text-or"
                              }`}
                            >
                              {t}
                              {u && <br />}
                              {u && <span className="text-[0.5rem]">Complet</span>}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <span className="mb-5 block border-b border-or/[0.12] pb-2.5 font-cinzel text-[0.78rem] tracking-[0.15em] text-or-p">Couverts</span>
                      <select className="f-select" value={couverts} onChange={(e) => setCouverts(e.target.value)}>
                        {["1 personne", "2 personnes", "3 personnes", "4 personnes", "5 personnes", "6 personnes", "7 personnes", "8+ personnes (nous contacter)"].map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </div>

                    {(selectedDate || selectedTime) && (
                      <div className="border border-or/20 bg-or/[0.04] p-5">
                        {[["Date", dateDisplay], ["Heure", selectedTime || "Non s\u00E9lectionn\u00E9"], ["Couverts", couverts]].map(([k, v]) => (
                          <div key={k} className="flex justify-between py-1 font-jost text-[0.68rem] text-pierre">
                            <span>{k}</span><span className="text-or-p">{v}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <button onClick={() => goResaStep(2)} className="cursor-pointer border-none bg-or px-12 py-3.5 font-jost text-[0.6rem] uppercase tracking-[0.25em] text-noir transition-all hover:-translate-y-px hover:bg-or-p">
                    Continuer &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div>
                <span className="mb-5 block border-b border-or/[0.12] pb-2.5 font-cinzel text-[0.78rem] tracking-[0.15em] text-or-p">Vos coordonnées</span>
                <div className="mb-4 grid grid-cols-2 gap-4 max-md:grid-cols-1">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-jost text-[0.58rem] uppercase tracking-[0.25em] text-pierre">Prénom *</label>
                    <input className="f-input" value={form.fname} onChange={(e) => setForm({ ...form, fname: e.target.value })} placeholder="Jean" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-jost text-[0.58rem] uppercase tracking-[0.25em] text-pierre">Nom *</label>
                    <input className="f-input" value={form.lname} onChange={(e) => setForm({ ...form, lname: e.target.value })} placeholder="Dupont" />
                  </div>
                </div>
                <div className="mb-4 grid grid-cols-2 gap-4 max-md:grid-cols-1">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-jost text-[0.58rem] uppercase tracking-[0.25em] text-pierre">Email *</label>
                    <input className="f-input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jean@exemple.fr" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-jost text-[0.58rem] uppercase tracking-[0.25em] text-pierre">Téléphone *</label>
                    <input className="f-input" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+33 6 00 00 00 00" />
                  </div>
                </div>
                <div className="mb-4 flex flex-col gap-1.5">
                  <label className="font-jost text-[0.58rem] uppercase tracking-[0.25em] text-pierre">Occasion spéciale</label>
                  <select className="f-select" value={form.occasion} onChange={(e) => setForm({ ...form, occasion: e.target.value })}>
                    <option value="">Aucune</option>
                    <option>Anniversaire</option>
                    <option>Repas romantique</option>
                    <option>R&eacute;union d&apos;affaires</option>
                    <option>Repas de famille</option>
                    <option>Autre occasion</option>
                  </select>
                </div>
                <div className="mb-6 flex flex-col gap-1.5">
                  <label className="font-jost text-[0.58rem] uppercase tracking-[0.25em] text-pierre">Allergies ou demandes particulières</label>
                  <textarea className="f-textarea" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Allergie aux fruits \u00E0 coque, chaise haute, table en terrasse..." />
                </div>

                <div className="mb-6 border border-or/20 bg-or/[0.04] p-5">
                  {[["Date", dateDisplay], ["Heure", selectedTime || "\u2014"], ["Couverts", couverts]].map(([k, v]) => (
                    <div key={k} className="flex justify-between py-1 font-jost text-[0.68rem] text-pierre">
                      <span>{k}</span><span className="text-or-p">{v}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between gap-4">
                  <button onClick={() => goResaStep(1, true)} className="cursor-pointer border border-or/25 bg-transparent px-8 py-3.5 font-jost text-[0.6rem] uppercase tracking-[0.25em] text-or">&larr; Retour</button>
                  <button onClick={confirmResa} className="flex-1 cursor-pointer border-none bg-or px-8 py-3.5 font-jost text-[0.6rem] uppercase tracking-[0.25em] text-noir transition-all hover:-translate-y-px hover:bg-or-p">
                    Confirmer la réservation {"\u2713"}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="py-8 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-success bg-success/15 text-[2rem]">{"\u2713"}</div>
                <div className="mb-2 font-cormorant text-[2rem] italic text-creme">Réservation confirmée !</div>
                <div className="mb-8 font-jost text-[0.72rem] tracking-[0.15em] text-pierre">
                  Confirmation envoyée à {form.email}
                </div>
                <div className="mb-6 border border-or/[0.12] bg-white/[0.02] p-6">
                  {[
                    ["Nom", form.fname + " " + form.lname],
                    ["Date", dateDisplay],
                    ["Heure", selectedTime || "\u2014"],
                    ["Couverts", couverts],
                    ...(form.occasion ? [["Occasion", form.occasion]] : []),
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-white/5 py-1.5 font-jost text-[0.7rem] text-pierre last:border-none">
                      <span>{k}</span><span className="text-creme">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="mb-6 border border-or/15 bg-or/[0.04] p-6">
                  <p className="font-cormorant text-[1.05rem] font-light italic leading-[1.8] text-pierre">
                    Un email de confirmation vous a été envoyé. Nous avons hâte de vous accueillir au Chai d&apos;Andrea.
                  </p>
                </div>
                <button onClick={onClose} className="cursor-pointer border-none bg-or px-9 py-3.5 font-jost text-[0.62rem] uppercase tracking-[0.3em] text-noir transition-all hover:bg-or-p">
                  Parfait, merci !
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
