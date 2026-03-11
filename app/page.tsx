"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  motion, useScroll, useTransform, useInView, AnimatePresence,
} from "framer-motion";
import {
  Scissors, MapPin, Phone, Mail, Clock, Instagram,
  Facebook, ArrowRight, Search, Star,
} from "lucide-react";

import { SHOP } from "@/config/shopData";
import { useI18n } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import BookingForm from "@/components/BookingForm";

// ── Animation helpers ──────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16,1,0.3,1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

// ── Magnetic CTA ──────────────────────────────────────────────────────────────
function MagneticCTA({ children, onClick, variant = "primary", className = "" }: {
  children: React.ReactNode; onClick?: () => void;
  variant?: "primary" | "ghost"; className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const move = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * 0.38;
    const dy = (e.clientY - (r.top  + r.height / 2)) * 0.38;
    ref.current!.style.transform = `translate(${dx}px,${dy}px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <button
      ref={ref} onClick={onClick} onMouseMove={move} onMouseLeave={reset}
      className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm transition-all duration-200 active:scale-95 ${
        variant === "primary"
          ? "bg-red text-white hover:bg-red-dark hover:shadow-[0_0_40px_rgba(209,0,0,0.5)] hover:scale-105"
          : "border-2 border-white/70 text-white hover:border-white hover:bg-white/10 backdrop-blur-sm"
      } ${className}`}
    >
      {children}
    </button>
  );
}

// ── Section Heading ───────────────────────────────────────────────────────────
function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <motion.div variants={fadeUp} className="text-center mb-16">
      <p className="text-xs tracking-[0.3em] uppercase text-red font-semibold mb-3">
        ✦ {subtitle}
      </p>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal tracking-tight">
        {title}
      </h2>
      <div className="w-12 h-0.5 bg-red mx-auto mt-5 rounded-full" />
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE
// ══════════════════════════════════════════════════════════════════════════════
export default function Home() {
  const { t, lang, dict } = useI18n();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [serviceSearch, setServiceSearch] = useState("");
  const [serviceCategory, setServiceCategory] = useState<"all" | "haircut" | "beard" | "combo">("all");

  // Parallax hero
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY  = useTransform(heroProgress, [0,1], ["0%", "35%"]);
  const heroOp = useTransform(heroProgress, [0,0.7], [1, 0]);

  const filtered = SHOP.services.filter((s) => {
    const matchCat = serviceCategory === "all" || s.category === serviceCategory;
    const matchQ   = s.name[lang].toLowerCase().includes(serviceSearch.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <main className="bg-cream min-h-screen overflow-x-hidden text-charcoal">
      <Navbar onBookClick={() => setBookingOpen(true)} />

      {/* ── HERO — keep dark so text stays readable over video ───────────── */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <video
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster={SHOP.heroFallbackImage}
          >
            <source src={SHOP.heroVideoUrl} type="video/mp4" />
          </video>
          {/* Strong dark overlay so white text stays legible */}
          <div className="absolute inset-0 bg-charcoal/70" />
          {/* Subtle warm-red vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_60%,rgba(209,0,0,0.12),transparent)]" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent" />
        </motion.div>

        {/* Hero content */}
        <motion.div
          className="relative z-10 text-center px-6 max-w-4xl"
          style={{ opacity: heroOp }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-white/90 font-semibold border border-white/25 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 mb-8">
              <Scissors size={11} />
              {t(dict.hero.badge)}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.16,1,0.3,1] }}
            className="font-display text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none mb-4 text-white"
          >
            {SHOP.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="w-16 h-0.5 bg-red mx-auto mb-6 rounded-full"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="text-lg text-white/75 mb-10 font-light tracking-wide"
          >
            {t(SHOP.tagline)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            <MagneticCTA onClick={() => setBookingOpen(true)}>
              <Scissors size={15} />
              {t(dict.hero.cta)}
            </MagneticCTA>
            <MagneticCTA variant="ghost" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>
              {t(dict.hero.secondary)}
              <ArrowRight size={15} />
            </MagneticCTA>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-5 h-9 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
            <div className="w-1 h-2 rounded-full bg-white animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* ── SERVICES ── white background ─────────────────────────────────── */}
      <section id="services" className="py-28 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <RevealSection>
            <SectionHeading title={t(dict.services.title)} subtitle={t(dict.services.subtitle)} />

            {/* Controls */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-10">
              <div className="relative w-full sm:w-72">
                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-soft" />
                <input
                  type="text"
                  placeholder={t(dict.services.search)}
                  value={serviceSearch}
                  onChange={(e) => setServiceSearch(e.target.value)}
                  className="w-full bg-offwhite border border-black/10 rounded-full pl-10 pr-4 py-2.5 text-sm text-charcoal placeholder-soft focus:outline-none focus:border-red/40 focus:bg-white transition-all"
                />
              </div>
              <div className="flex gap-2">
                {(["all","haircut","beard","combo"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setServiceCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                      serviceCategory === cat
                        ? "bg-red text-white shadow-[0_0_16px_rgba(209,0,0,0.35)]"
                        : "border border-black/12 text-mid hover:border-red/40 hover:text-red bg-white"
                    }`}
                  >
                    {t(dict.services.categories[cat])}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Service Cards */}
            <AnimatePresence mode="popLayout">
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((s) => (
                  <motion.div
                    key={s.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -6 }}
                    className="group relative p-6 rounded-2xl bg-white border border-black/8 hover:border-red/25 hover:shadow-[0_8px_40px_rgba(209,0,0,0.1)] transition-all duration-300 cursor-pointer"
                    onClick={() => setBookingOpen(true)}
                  >
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red/0 via-red/0 to-red/0 group-hover:from-red group-hover:via-red/60 group-hover:to-red/0 transition-all duration-500 rounded-t-2xl" />

                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-red/8 border border-red/15 flex items-center justify-center group-hover:bg-red/15 transition-all">
                        <Scissors size={16} className="text-red" />
                      </div>
                      <span className="text-2xl font-black text-charcoal">{s.price} €</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-charcoal mb-1">{s.name[lang]}</h3>
                    <p className="text-sm text-soft mb-4 leading-relaxed">{s.desc[lang]}</p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs text-soft/70">
                        <Clock size={11} />
                        {s.duration} {t(dict.services.min)}
                      </span>
                      <span className="text-xs text-red font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {t(dict.services.bookThis)}
                        <ArrowRight size={11} />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </RevealSection>
        </div>
      </section>

      {/* ── GALLERY ── light gray background ─────────────────────────────── */}
      <section id="gallery" className="py-28 px-6 bg-offwhite">
        <div className="max-w-6xl mx-auto">
          <RevealSection>
            <SectionHeading title={t(dict.gallery.title)} subtitle={t(dict.gallery.subtitle)} />
            <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {SHOP.gallery.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className={`group relative overflow-hidden rounded-2xl bg-mist border border-black/6 aspect-square cursor-pointer ${i === 0 ? "md:row-span-2 md:aspect-auto" : ""}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0" style={{ background: `hsl(${0},0%,${88 - i * 4}%)` }} />
                  <Image src={item.src} alt={item.alt} fill className="object-cover group-hover:scale-110 transition-all duration-500" />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-end p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-xs font-semibold text-white bg-charcoal/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      {item.alt}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </RevealSection>
        </div>
      </section>

      {/* ── TEAM ── white background ──────────────────────────────────────── */}
      <section id="team" className="py-28 px-6 bg-cream">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <SectionHeading title={t(dict.team.title)} subtitle={t(dict.team.subtitle)} />
            <motion.div variants={stagger} className="grid md:grid-cols-3 gap-6">
              {SHOP.team.map((member) => (
                <motion.div
                  key={member.id}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  className="group relative p-7 rounded-3xl bg-white border border-black/8 hover:border-red/20 hover:shadow-[0_12px_48px_rgba(209,0,0,0.1)] transition-all duration-400 text-center overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-3xl" />

                  {/* Avatar */}
                  <div className="relative w-24 h-24 mx-auto mb-5">
                    <div className="absolute inset-0 rounded-full bg-red/10 blur-xl group-hover:bg-red/20 transition-all" />
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-red/15 group-hover:border-red/40 transition-all">
                      <Image src={member.image} alt={member.name} fill className="object-cover" />
                      {/* Initials fallback */}
                      <div className="absolute inset-0 bg-mist flex items-center justify-center text-2xl font-bold text-mid">
                        {member.name[0]}
                      </div>
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold text-charcoal mb-1">{member.name}</h3>
                  <p className="text-xs text-red font-semibold tracking-wider uppercase mb-3">{member.role[lang]}</p>
                  <p className="text-sm text-soft leading-relaxed mb-5">{member.bio[lang]}</p>

                  {member.instagram && (
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-mid hover:text-red transition-colors border border-black/10 hover:border-red/30 rounded-full px-4 py-2 hover:bg-red/5"
                    >
                      <Instagram size={12} />
                      {t(dict.team.follow)}
                    </a>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </RevealSection>
        </div>
      </section>

      {/* ── BOOKING CTA BAND ── dark/charcoal for contrast ───────────────── */}
      <section className="py-24 px-6 bg-charcoal">
        <div className="max-w-4xl mx-auto">
          <RevealSection>
            <motion.div
              variants={fadeUp}
              className="relative rounded-3xl overflow-hidden border border-white/8 p-12 text-center"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(209,0,0,0.12),transparent)]" />
              <div className="relative">
                <Star size={20} className="text-red mx-auto mb-5 fill-red" />
                <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                  {t(dict.hero.cta)}
                </h2>
                <p className="text-white/50 mb-8">{t(SHOP.tagline)}</p>
                <MagneticCTA onClick={() => setBookingOpen(true)}>
                  <Scissors size={16} />
                  {t(dict.nav.book)}
                </MagneticCTA>
              </div>
            </motion.div>
          </RevealSection>
        </div>
      </section>

      {/* ── CONTACT ── light gray background ─────────────────────────────── */}
      <section id="contact" className="py-28 px-6 bg-offwhite">
        <div className="max-w-6xl mx-auto">
          <RevealSection>
            <SectionHeading title={t(dict.contact.title)} subtitle={t(dict.contact.subtitle)} />
            <motion.div variants={stagger} className="grid lg:grid-cols-2 gap-12">

              {/* Map */}
              <motion.div
                variants={fadeUp}
                className="rounded-3xl overflow-hidden border border-black/8 bg-mist aspect-video lg:aspect-auto lg:min-h-[380px] relative shadow-card"
              >
                <iframe
                  src={SHOP.mapEmbedUrl}
                  className="w-full h-full absolute inset-0"
                  loading="lazy"
                  title="Map"
                />
                <div className="absolute bottom-4 left-4">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(`${SHOP.address.street}, ${SHOP.address.city}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-red rounded-full px-4 py-2 hover:bg-red-dark hover:shadow-[0_0_16px_rgba(209,0,0,0.4)] transition-all"
                  >
                    <MapPin size={12} />
                    {t(dict.contact.getDir)}
                  </a>
                </div>
              </motion.div>

              {/* Info */}
              <motion.div variants={fadeUp} className="flex flex-col gap-8">
                <div className="flex flex-col gap-5">
                  <ContactItem icon={<MapPin size={16} className="text-red" />} label={t(dict.contact.address)} value={`${SHOP.address.street}, ${SHOP.address.zip} ${SHOP.address.city}`} />
                  <ContactItem icon={<Phone size={16} className="text-red" />}  label={t(dict.contact.phone)}   value={<a href={`tel:${SHOP.phone}`} className="hover:text-red transition-colors">{SHOP.phone}</a>} />
                  <ContactItem icon={<Mail size={16} className="text-red" />}   label={t(dict.contact.email)}   value={<a href={`mailto:${SHOP.email}`} className="hover:text-red transition-colors">{SHOP.email}</a>} />
                </div>

                {/* Hours */}
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-red mb-4">{t(dict.contact.hours)}</p>
                  <div className="flex flex-col gap-1.5">
                    {SHOP.hours.map((h, i) => {
                      const isToday = new Date().getDay() === (i === 6 ? 0 : i + 1);
                      return (
                        <div
                          key={i}
                          className={`flex items-center justify-between py-2.5 px-4 rounded-xl transition-all ${
                            isToday
                              ? "bg-red/8 border border-red/20 text-charcoal"
                              : "hover:bg-white"
                          }`}
                        >
                          <span className={`text-sm ${isToday ? "font-semibold text-red" : "text-mid"}`}>
                            {h.day[lang]}
                            {isToday && (
                              <span className="ml-2 text-[10px] bg-red/12 text-red rounded-full px-2 py-0.5 font-bold">TODAY</span>
                            )}
                          </span>
                          <span className={`text-sm font-medium ${h.closed ? "text-soft" : isToday ? "text-charcoal font-semibold" : "text-charcoal/70"}`}>
                            {h.closed ? t(dict.contact.closed) : `${h.open} – ${h.close}`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </RevealSection>
        </div>
      </section>

      {/* ── FOOTER ── dark charcoal ───────────────────────────────────────── */}
      <footer className="bg-charcoal py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <Scissors size={14} className="text-red rotate-45" />
            <span className="font-display font-bold text-white">{SHOP.name}</span>
          </div>
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} {SHOP.name} — {t(dict.footer.rights)}
          </p>
          <div className="flex items-center gap-4">
            {SHOP.socials.instagram && (
              <a href={SHOP.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-red transition-colors">
                <Instagram size={17} />
              </a>
            )}
            {SHOP.socials.facebook && (
              <a href={SHOP.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-red transition-colors">
                <Facebook size={17} />
              </a>
            )}
          </div>
        </div>
      </footer>

      {/* ── BOOKING MODAL ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {bookingOpen && <BookingForm onClose={() => setBookingOpen(false)} />}
      </AnimatePresence>
    </main>
  );
}

function ContactItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-9 h-9 rounded-xl bg-red/8 border border-red/15 flex items-center justify-center flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <p className="text-xs text-soft font-semibold uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-sm text-charcoal/85">{value}</p>
      </div>
    </div>
  );
}
