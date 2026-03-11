"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Scissors, Menu, X, Globe } from "lucide-react";
import { SHOP } from "@/config/shopData";
import { useI18n } from "@/lib/i18n";

interface NavbarProps {
  onBookClick: () => void;
}

export default function Navbar({ onBookClick }: NavbarProps) {
  const { lang, setLang, dict, t } = useI18n();
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY }             = useScroll();
  const btnRef                  = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 40));
    return unsub;
  }, [scrollY]);

  const handleMagnet = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn  = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const dx   = (e.clientX - (rect.left + rect.width  / 2)) * 0.35;
    const dy   = (e.clientY - (rect.top  + rect.height / 2)) * 0.35;
    btn.style.transform = `translate(${dx}px,${dy}px)`;
  };
  const resetMagnet = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = "";
  };

  const links = [
    { href: "#services", label: t(dict.nav.services) },
    { href: "#gallery",  label: t(dict.nav.gallery)  },
    { href: "#team",     label: t(dict.nav.team)     },
    { href: "#contact",  label: t(dict.nav.contact)  },
  ];

  // When not scrolled: white text for dark hero. When scrolled: dark text for white nav bg.
  const linkBase    = scrolled ? "text-mid hover:text-charcoal"   : "text-white/90 hover:text-white";
  const logoText    = scrolled ? "text-charcoal"                  : "text-white";
  const langBtn     = scrolled
    ? "text-mid hover:text-accent border-black/12 hover:border-accent/40 bg-white/60"
    : "text-white/80 hover:text-white border-white/30 hover:border-white/60 bg-white/10 backdrop-blur-sm";
  const bookBtn     = scrolled
    ? "bg-accent text-white hover:bg-accent-dark hover:shadow-[0_0_24px_rgba(209,0,0,0.45)]"
    : "bg-white text-accent hover:bg-white/90 hover:shadow-[0_0_24px_rgba(255,255,255,0.3)]";
  const underline   = scrolled ? "bg-accent" : "bg-white";

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-white/85 backdrop-blur-xl border-b border-black/8 shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <motion.a href="#" className="flex items-center gap-2.5 group" whileHover={{ scale: 1.02 }}>
            <div className="relative w-8 h-8">
              <div className={`absolute inset-0 rounded-full blur-md transition-all ${
                scrolled ? "bg-accent/15 group-hover:bg-accent/30" : "bg-white/20 group-hover:bg-white/35"
              }`} />
              <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border shadow-sm transition-all ${
                scrolled ? "border-accent/30 bg-white" : "border-white/40 bg-white/15 backdrop-blur-sm"
              }`}>
                <Scissors size={14} className={scrolled ? "text-accent rotate-45" : "text-white rotate-45"} />
              </div>
            </div>
            <span className={`font-display text-xl font-bold tracking-tight transition-colors duration-300 ${logoText}`}>
              {SHOP.name}
            </span>
          </motion.a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`relative text-sm font-medium tracking-wide transition-colors duration-300 group ${linkBase}`}
                >
                  {l.label}
                  <span className={`absolute -bottom-0.5 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 rounded-full ${underline}`} />
                </a>
              </li>
            ))}
          </ul>

          {/* Right cluster */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "sk" ? "en" : "sk")}
              className={`hidden md:flex items-center gap-1.5 text-xs font-bold transition-all duration-300 border rounded-full px-3 py-1.5 ${langBtn}`}
            >
              <Globe size={12} />
              {lang.toUpperCase()}
            </button>

            <button
              ref={btnRef}
              onMouseMove={handleMagnet}
              onMouseLeave={resetMagnet}
              onClick={onBookClick}
              className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 ${bookBtn}`}
            >
              <Scissors size={13} />
              {t(dict.nav.book)}
            </button>

            <button
              onClick={() => setOpen(!open)}
              className={`md:hidden p-2 transition-colors ${scrolled ? "text-mid hover:text-charcoal" : "text-white/80 hover:text-white"}`}
              aria-label="Menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-white/97 backdrop-blur-2xl pt-24 px-8"
          >
            <ul className="flex flex-col gap-6 mt-4">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <a
                    href={l.href}
                    className="block text-2xl font-display font-bold text-charcoal hover:text-accent transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-4">
              <button
                onClick={() => setLang(lang === "sk" ? "en" : "sk")}
                className="flex items-center gap-2 text-mid hover:text-accent transition-colors text-sm font-semibold w-fit"
              >
                <Globe size={16} />
                {lang === "sk" ? "Switch to English" : "Prepnúť na Slovenčinu"}
              </button>
              <button
                onClick={() => { onBookClick(); setOpen(false); }}
                className="w-full py-4 rounded-2xl bg-accent text-white font-bold text-lg hover:bg-accent-dark hover:shadow-[0_0_32px_rgba(209,0,0,0.4)] transition-all"
              >
                {t(dict.nav.book)}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
