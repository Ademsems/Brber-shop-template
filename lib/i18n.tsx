"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { Lang } from "@/config/shopData";

// ── Dictionary ────────────────────────────────────────────────────────────────
const dict = {
  nav: {
    services:    { sk: "Služby",         en: "Services"       },
    gallery:     { sk: "Galéria",        en: "Gallery"        },
    team:        { sk: "Náš tím",        en: "Our Team"       },
    contact:     { sk: "Kontakt",        en: "Contact"        },
    book:        { sk: "Rezervovať",     en: "Book Now"       },
  },
  hero: {
    badge:       { sk: "Prémiový barber", en: "Premium Barber" },
    cta:         { sk: "Rezervuj termín", en: "Book Your Appointment" },
    secondary:   { sk: "Pozrieť služby", en: "View Services"  },
    scroll:      { sk: "Skrolovať nadol", en: "Scroll down"   },
  },
  services: {
    title:       { sk: "Naše služby",    en: "Our Services"   },
    subtitle:    { sk: "Každý strih je umenie.", en: "Every cut is a craft." },
    search:      { sk: "Hľadať službu…", en: "Search service…" },
    categories: {
      all:       { sk: "Všetko",         en: "All"            },
      haircut:   { sk: "Strihy",         en: "Haircuts"       },
      beard:     { sk: "Brada",          en: "Beard"          },
      combo:     { sk: "Kombo",          en: "Combos"         },
    },
    min:         { sk: "min",            en: "min"            },
    from:        { sk: "od",             en: "from"           },
    bookThis:    { sk: "Rezervovať",     en: "Book This"      },
  },
  gallery: {
    title:       { sk: "Galéria práce", en: "Work Gallery"    },
    subtitle:    { sk: "Výsledky hovoria za všetko.", en: "Results speak for themselves." },
  },
  team: {
    title:       { sk: "Spoznajte náš tím", en: "Meet the Team" },
    subtitle:    { sk: "Odborníci za každým strihom.", en: "Craftsmen behind every cut." },
    follow:      { sk: "Sledovať",       en: "Follow"         },
  },
  booking: {
    title:       { sk: "Rezervácia termínu", en: "Book an Appointment" },
    steps: {
      personal:  { sk: "Osobné údaje",  en: "Personal Info"  },
      barber:    { sk: "Výber barbera", en: "Choose Barber"   },
      service:   { sk: "Služba",        en: "Service"        },
      datetime:  { sk: "Dátum & čas",  en: "Date & Time"     },
      confirm:   { sk: "Potvrdenie",    en: "Confirm"        },
    },
    fields: {
      name:      { sk: "Celé meno",     en: "Full Name"      },
      email:     { sk: "E-mail",        en: "Email"          },
      phone:     { sk: "Telefón",       en: "Phone"          },
      namePh:    { sk: "Ján Novák",     en: "John Smith"     },
      phonePh:   { sk: "+421 900 000 000", en: "+44 7000 000000" },
    },
    anyBarber:   { sk: "Ktokoľvek",     en: "Anyone available" },
    selectDate:  { sk: "Vybrať dátum",  en: "Select Date"   },
    selectTime:  { sk: "Vybrať čas",    en: "Select Time"   },
    next:        { sk: "Ďalej",         en: "Next"           },
    back:        { sk: "Späť",          en: "Back"           },
    submit:      { sk: "Potvrdiť rezerváciu", en: "Confirm Booking" },
    sending:     { sk: "Odosielam…",    en: "Sending…"       },
    success: {
      title:     { sk: "Rezervácia potvrdená!", en: "Booking Confirmed!" },
      body:      { sk: "Potvrdenie sme poslali na váš e-mail.", en: "A confirmation has been sent to your email." },
      new:       { sk: "Nová rezervácia",  en: "New Booking"  },
    },
    summary: {
      barber:    { sk: "Barber",        en: "Barber"         },
      service:   { sk: "Služba",        en: "Service"        },
      date:      { sk: "Dátum",         en: "Date"           },
      time:      { sk: "Čas",           en: "Time"           },
      duration:  { sk: "Trvanie",       en: "Duration"       },
      price:     { sk: "Cena",          en: "Price"          },
    },
    errors: {
      required:  { sk: "Povinné pole",  en: "Required field" },
      email:     { sk: "Neplatný e-mail", en: "Invalid email" },
    },
  },
  contact: {
    title:       { sk: "Kontakt",       en: "Contact"        },
    subtitle:    { sk: "Príďte nás navštíviť.", en: "Come find us." },
    address:     { sk: "Adresa",        en: "Address"        },
    phone:       { sk: "Telefón",       en: "Phone"          },
    email:       { sk: "E-mail",        en: "Email"          },
    hours:       { sk: "Otváracie hodiny", en: "Opening Hours" },
    closed:      { sk: "Zatvorené",     en: "Closed"         },
    getDir:      { sk: "Navigovať",     en: "Get Directions" },
  },
  footer: {
    rights:      { sk: "Všetky práva vyhradené.", en: "All rights reserved." },
    privacy:     { sk: "Ochrana súkromia", en: "Privacy Policy" },
  },
} as const;

// ── Context ───────────────────────────────────────────────────────────────────
type DictValue = { sk: string; en: string };

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (obj: DictValue) => string;
  dict: typeof dict;
}

import { createContext as _cc } from "react";
export const I18nContext = createContext<I18nCtx>({
  lang: "sk",
  setLang: () => {},
  t: (o) => o.sk,
  dict,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("sk");
  const t = (obj: DictValue) => obj[lang];
  return (
    <I18nContext.Provider value={{ lang, setLang, t, dict }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
