"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Scissors, Menu, X, Globe } from "lucide-react";
import { SHOP } from "@/config/shopData";
import { useI18n } from "@/lib/i18n";

interface NavbarProps {
  onBookClick: () => void;
}

export default function Navbar({ onBookClick }: NavbarProps) {
  const { lang, setLang, dict, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const btnRef = useRef<HTMLButtonElement>(null);

  // Scroll detection
  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 40));
    return unsub;
  }, [scrollY]);

  // Magnetic CTA effect
  const handleMagnet = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.35;
    const dy = (e.clientY - cy) * 0.35;
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

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-navy/80 backdrop-blur-xl border-b border-aqua/10 shadow-[0_4px_40px_rgba(0,255,255,0.06)]"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2.5 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-full bg-aqua/20 blur-md group-hover:bg-aqua/40 transition-all" />
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full border border-aqua/40 bg-navy">
                <Scissors size={14} className="text-aqua rotate-45" />
              </div>
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-white">
              {SHOP.name}
            </span>
          </motion.a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative text-sm font-medium text-slate tracking-wide hover:text-white transition-colors group"
                >
                  {l.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-aqua group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            ))}
          </ul>

          {/* Right cluster */}
          <div className="flex items-center gap-3">
            {/* Lang toggle */}
            <button
              onClick={() => setLang(lang === "sk" ? "en" : "sk")}
              className="hidden md:flex items-center gap-1.5 text-xs font-bold text-slate hover:text-aqua transition-colors border border-white/10 hover:border-aqua/40 rounded-full px-3 py-1.5"
            >
              <Globe size={12} />
              {lang.toUpperCase()}
            </button>

            {/* Book CTA */}
            <button
              ref={btnRef}
              onMouseMove={handleMagnet}
              onMouseLeave={resetMagnet}
              onClick={onBookClick}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-navy bg-aqua transition-all duration-300 hover:shadow-[0_0_24px_rgba(0,255,255,0.55)] hover:scale-105 active:scale-95"
            >
              <Scissors size={13} />
              {t(dict.nav.book)}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 text-slate hover:text-white transition-colors"
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
            className="fixed inset-0 z-40 flex flex-col bg-navy/95 backdrop-blur-2xl pt-24 px-8"
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
                    className="block text-2xl font-display font-bold text-white hover:text-aqua transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-4">
              <button
                onClick={() => { setLang(lang === "sk" ? "en" : "sk"); }}
                className="flex items-center gap-2 text-slate hover:text-aqua transition-colors text-sm font-bold w-fit"
              >
                <Globe size={16} />
                {lang === "sk" ? "Switch to English" : "Prepnúť na Slovenčinu"}
              </button>
              <button
                onClick={() => { onBookClick(); setOpen(false); }}
                className="w-full py-4 rounded-2xl bg-aqua text-navy font-bold text-lg hover:shadow-[0_0_32px_rgba(0,255,255,0.5)] transition-all"
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
