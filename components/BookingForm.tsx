"use client";

import { useState, useRef } from "react";
import {
  motion, AnimatePresence, useMotionValue, useTransform,
} from "framer-motion";
import {
  X, User, Mail, Phone, Scissors, CalendarDays, Clock,
  CheckCircle2, ChevronRight, ChevronLeft, Loader2,
} from "lucide-react";
import Image from "next/image";
import { SHOP } from "@/config/shopData";
import { useI18n } from "@/lib/i18n";

interface Props { onClose: () => void; }

type Step = 1 | 2 | 3 | 4 | 5;

interface FormState {
  name: string;
  email: string;
  phone: string;
  barberId: string;
  serviceId: string;
  date: string;
  time: string;
}

const EMPTY: FormState = {
  name: "", email: "", phone: "",
  barberId: "", serviceId: "", date: "", time: "",
};

function validate(step: Step, form: FormState) {
  if (step === 1) {
    if (!form.name.trim()) return "name";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "email";
    if (!form.phone.trim()) return "phone";
  }
  if (step === 3 && !form.serviceId) return "service";
  if (step === 4 && (!form.date || !form.time)) return "datetime";
  return null;
}

// Simulate email send
async function sendConfirmation(form: FormState) {
  await new Promise((r) => setTimeout(r, 1600));
  console.log("[EMAIL TRIGGER] Booking confirmation to:", form.email, form);
  return true;
}

export default function BookingForm({ onClose }: Props) {
  const { t, lang, dict } = useI18n();
  const bd = dict.booking;

  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k: keyof FormState, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    setError(null);
  };

  const next = () => {
    const err = validate(step, form);
    if (err) { setError(err); return; }
    setStep((s) => Math.min(s + 1, 5) as Step);
    setError(null);
  };

  const back = () => setStep((s) => Math.max(s - 1, 1) as Step);

  const submit = async () => {
    setLoading(true);
    await sendConfirmation(form);
    setLoading(false);
    setDone(true);
  };

  const selectedBarber = SHOP.team.find((b) => b.id === form.barberId);
  const selectedService = SHOP.services.find((s) => s.id === form.serviceId);

  const steps = [
    t(bd.steps.personal),
    t(bd.steps.barber),
    t(bd.steps.service),
    t(bd.steps.datetime),
    t(bd.steps.confirm),
  ];

  // Magnetic close btn
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const closeRef = useRef<HTMLButtonElement>(null);

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <motion.div
      className="fixed inset-0 z-60 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-navy/80 backdrop-blur-xl"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Panel */}
      <motion.div
        className="relative w-full max-w-lg bg-[#0D2137] border border-aqua/15 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,255,255,0.1)]"
        initial={{ scale: 0.88, opacity: 0, y: 40 }}
        animate={{ scale: 1,    opacity: 1, y: 0  }}
        exit={   { scale: 0.88, opacity: 0, y: 40 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      >
        {/* Header */}
        <div className="relative px-8 pt-8 pb-6 border-b border-white/5">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-aqua/40 to-transparent" />
          <button
            ref={closeRef}
            onClick={onClose}
            onMouseMove={(e) => {
              const r = closeRef.current!.getBoundingClientRect();
              mx.set((e.clientX - r.left - r.width / 2) * 0.4);
              my.set((e.clientY - r.top  - r.height / 2) * 0.4);
            }}
            onMouseLeave={() => { mx.set(0); my.set(0); }}
            className="absolute top-6 right-6 p-2 rounded-full border border-white/10 text-slate hover:text-white hover:border-aqua/40 transition-all"
            style={{ x: mx, y: my } as any}
          >
            <X size={16} />
          </button>

          <h2 className="font-display text-2xl font-bold text-white">{t(bd.title)}</h2>

          {/* Step indicator */}
          <div className="flex items-center gap-1 mt-5">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-1">
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i + 1 < step ? "bg-aqua w-6" :
                    i + 1 === step ? "bg-aqua w-10 shadow-[0_0_8px_rgba(0,255,255,0.7)]" :
                    "bg-white/10 w-6"
                  }`}
                />
              </div>
            ))}
          </div>
          <p className="text-xs text-slate mt-2">
            {t(bd.steps[Object.keys(bd.steps)[step - 1] as keyof typeof bd.steps])}
          </p>
        </div>

        {/* Body */}
        <div className="px-8 py-6 min-h-[320px] max-h-[65vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-8 gap-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                  className="w-16 h-16 rounded-full bg-aqua/10 border border-aqua/30 flex items-center justify-center"
                >
                  <CheckCircle2 size={32} className="text-aqua" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{t(bd.success.title)}</h3>
                  <p className="text-slate text-sm">{t(bd.success.body)}</p>
                </div>
                <button
                  onClick={() => { setDone(false); setStep(1); setForm(EMPTY); }}
                  className="mt-4 px-6 py-2.5 rounded-full border border-aqua/40 text-aqua text-sm font-semibold hover:bg-aqua/10 transition-all"
                >
                  {t(bd.success.new)}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-5"
              >

                {/* STEP 1 — Personal Info */}
                {step === 1 && (
                  <>
                    <Field
                      icon={<User size={15} />}
                      label={t(bd.fields.name)}
                      placeholder={t(bd.fields.namePh)}
                      value={form.name}
                      onChange={(v) => set("name", v)}
                      error={error === "name"}
                      errMsg={t(bd.errors.required)}
                    />
                    <Field
                      icon={<Mail size={15} />}
                      label={t(bd.fields.email)}
                      placeholder="name@email.com"
                      value={form.email}
                      type="email"
                      onChange={(v) => set("email", v)}
                      error={error === "email"}
                      errMsg={t(bd.errors.email)}
                    />
                    <Field
                      icon={<Phone size={15} />}
                      label={t(bd.fields.phone)}
                      placeholder={t(bd.fields.phonePh)}
                      value={form.phone}
                      type="tel"
                      onChange={(v) => set("phone", v)}
                      error={error === "phone"}
                      errMsg={t(bd.errors.required)}
                    />
                  </>
                )}

                {/* STEP 2 — Choose Barber */}
                {step === 2 && (
                  <div className="flex flex-col gap-3">
                    <BarberCard
                      selected={form.barberId === ""}
                      onClick={() => set("barberId", "")}
                      name={t(bd.anyBarber)}
                      role=""
                      isAny
                    />
                    {SHOP.team.map((b) => (
                      <BarberCard
                        key={b.id}
                        selected={form.barberId === b.id}
                        onClick={() => set("barberId", b.id)}
                        name={b.name}
                        role={b.role[lang]}
                        image={b.image}
                      />
                    ))}
                  </div>
                )}

                {/* STEP 3 — Select Service */}
                {step === 3 && (
                  <div className="flex flex-col gap-3">
                    {error === "service" && (
                      <p className="text-red-400 text-xs">{t(bd.errors.required)}</p>
                    )}
                    {SHOP.services.map((s) => (
                      <ServiceCard
                        key={s.id}
                        selected={form.serviceId === s.id}
                        onClick={() => set("serviceId", s.id)}
                        name={s.name[lang]}
                        desc={s.desc[lang]}
                        duration={s.duration}
                        price={s.price}
                        minLabel={t(dict.services.min)}
                      />
                    ))}
                  </div>
                )}

                {/* STEP 4 — Date & Time */}
                {step === 4 && (
                  <div className="flex flex-col gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate mb-2">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={13} className="text-aqua" />
                          {t(bd.selectDate)}
                        </span>
                      </label>
                      <input
                        type="date"
                        min={todayStr}
                        value={form.date}
                        onChange={(e) => set("date", e.target.value)}
                        className={`w-full bg-white/5 border ${
                          error === "datetime" && !form.date
                            ? "border-red-500/60" : "border-white/10"
                        } rounded-xl px-4 py-3 text-white focus:outline-none focus:border-aqua/60 transition-all text-sm`}
                      />
                    </div>
                    {form.date && (
                      <div>
                        <label className="block text-xs font-semibold text-slate mb-3">
                          <span className="flex items-center gap-1.5">
                            <Clock size={13} className="text-aqua" />
                            {t(bd.selectTime)}
                          </span>
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {SHOP.timeSlots.map((ts) => (
                            <button
                              key={ts}
                              onClick={() => set("time", ts)}
                              className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                                form.time === ts
                                  ? "bg-aqua text-navy border-aqua shadow-[0_0_12px_rgba(0,255,255,0.4)]"
                                  : "border-white/10 text-slate hover:border-aqua/40 hover:text-white"
                              }`}
                            >
                              {ts}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 5 — Confirm */}
                {step === 5 && (
                  <div className="flex flex-col gap-4">
                    <SummaryRow
                      icon={<User size={14} />}
                      label={t(bd.summary.barber)}
                      value={selectedBarber ? selectedBarber.name : t(bd.anyBarber)}
                    />
                    <SummaryRow
                      icon={<Scissors size={14} />}
                      label={t(bd.summary.service)}
                      value={selectedService ? selectedService.name[lang] : "—"}
                    />
                    <SummaryRow
                      icon={<CalendarDays size={14} />}
                      label={t(bd.summary.date)}
                      value={form.date}
                    />
                    <SummaryRow
                      icon={<Clock size={14} />}
                      label={t(bd.summary.time)}
                      value={form.time}
                    />
                    {selectedService && (
                      <>
                        <SummaryRow
                          icon={<Clock size={14} />}
                          label={t(bd.summary.duration)}
                          value={`${selectedService.duration} ${t(dict.services.min)}`}
                        />
                        <div className="mt-2 p-4 rounded-2xl bg-aqua/5 border border-aqua/20 flex items-center justify-between">
                          <span className="text-sm text-slate font-medium">{t(bd.summary.price)}</span>
                          <span className="text-2xl font-bold text-aqua">{selectedService.price} €</span>
                        </div>
                      </>
                    )}
                  </div>
                )}

              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer nav */}
        {!done && (
          <div className="px-8 pb-7 pt-2 flex items-center justify-between gap-3 border-t border-white/5">
            {step > 1 ? (
              <button
                onClick={back}
                className="flex items-center gap-1.5 text-sm text-slate hover:text-white transition-colors"
              >
                <ChevronLeft size={15} />
                {t(bd.back)}
              </button>
            ) : <div />}

            {step < 5 ? (
              <MagneticBtn onClick={next} label={t(bd.next)} />
            ) : (
              <MagneticBtn
                onClick={submit}
                label={loading ? t(bd.sending) : t(bd.submit)}
                disabled={loading}
                icon={loading ? <Loader2 size={15} className="animate-spin" /> : undefined}
              />
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Field({
  icon, label, placeholder, value, onChange, type = "text", error, errMsg,
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: boolean;
  errMsg?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate mb-1.5">
        <span className="flex items-center gap-1.5">
          <span className="text-aqua">{icon}</span>
          {label}
        </span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-white/5 border ${
          error ? "border-red-500/60" : "border-white/10"
        } rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-aqua/60 transition-all text-sm`}
      />
      {error && errMsg && (
        <p className="text-red-400 text-xs mt-1">{errMsg}</p>
      )}
    </div>
  );
}

function BarberCard({
  selected, onClick, name, role, image, isAny,
}: {
  selected: boolean;
  onClick: () => void;
  name: string;
  role: string;
  image?: string;
  isAny?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${
        selected
          ? "border-aqua/60 bg-aqua/5 shadow-[0_0_16px_rgba(0,255,255,0.1)]"
          : "border-white/10 hover:border-white/25"
      }`}
    >
      {isAny ? (
        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <Scissors size={16} className="text-slate" />
        </div>
      ) : (
        <div className="w-10 h-10 rounded-full overflow-hidden bg-white/5 border border-white/10 relative">
          {image && (
            <Image src={image} alt={name} fill className="object-cover" />
          )}
        </div>
      )}
      <div>
        <p className={`text-sm font-semibold ${selected ? "text-aqua" : "text-white"}`}>{name}</p>
        {role && <p className="text-xs text-slate">{role}</p>}
      </div>
      {selected && (
        <CheckCircle2 size={16} className="text-aqua ml-auto" />
      )}
    </button>
  );
}

function ServiceCard({
  selected, onClick, name, desc, duration, price, minLabel,
}: {
  selected: boolean;
  onClick: () => void;
  name: string;
  desc: string;
  duration: number;
  price: number;
  minLabel: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-start justify-between p-4 rounded-2xl border transition-all text-left ${
        selected
          ? "border-aqua/60 bg-aqua/5 shadow-[0_0_16px_rgba(0,255,255,0.1)]"
          : "border-white/10 hover:border-white/25"
      }`}
    >
      <div className="flex flex-col gap-0.5">
        <p className={`text-sm font-semibold ${selected ? "text-aqua" : "text-white"}`}>{name}</p>
        <p className="text-xs text-slate">{desc}</p>
        <p className="text-xs text-white/30 mt-1">{duration} {minLabel}</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className={`text-lg font-bold ${selected ? "text-aqua" : "text-white"}`}>{price} €</span>
        {selected && <CheckCircle2 size={14} className="text-aqua" />}
      </div>
    </button>
  );
}

function SummaryRow({
  icon, label, value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5">
      <span className="flex items-center gap-2 text-sm text-slate">
        <span className="text-aqua">{icon}</span>
        {label}
      </span>
      <span className="text-sm font-semibold text-white">{value}</span>
    </div>
  );
}

function MagneticBtn({
  onClick, label, disabled, icon,
}: {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = ref.current!.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * 0.35;
    const dy = (e.clientY - (r.top  + r.height / 2)) * 0.35;
    ref.current!.style.transform = `translate(${dx}px,${dy}px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = ""; };

  return (
    <button
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="flex items-center gap-2 px-7 py-3 rounded-full bg-aqua text-navy font-bold text-sm disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-[0_0_24px_rgba(0,255,255,0.55)] transition-all hover:scale-105 active:scale-95"
    >
      {icon}
      {label}
      {!icon && <ChevronRight size={15} />}
    </button>
  );
}
