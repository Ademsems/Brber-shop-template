// ============================================================
// SHOP CONFIGURATION — swap these values per client
// ============================================================

export const SHOP = {
  name: "[SHOP_NAME]",
  tagline: { sk: "Kde štýl stretáva precíznosť.", en: "Where style meets precision." },
  phone: "+421 900 000 000",
  email: "info@shopname.sk",
  address: { street: "Hlavná 42", city: "Bratislava", zip: "811 01", country: "SK" },
  mapEmbedUrl: "https://maps.google.com/maps?q=Bratislava&output=embed",
  heroVideoUrl: "/hero-bg.mp4",          // replace with actual video
  heroFallbackImage: "/hero-fallback.jpg",

  socials: {
    instagram: "https://instagram.com/shopname",
    facebook:  "https://facebook.com/shopname",
    tiktok:    "https://tiktok.com/@shopname",
  },

  hours: [
    { day: { sk: "Pondelok",   en: "Monday"    }, open: "09:00", close: "19:00", closed: false },
    { day: { sk: "Utorok",     en: "Tuesday"   }, open: "09:00", close: "19:00", closed: false },
    { day: { sk: "Streda",     en: "Wednesday" }, open: "09:00", close: "19:00", closed: false },
    { day: { sk: "Štvrtok",    en: "Thursday"  }, open: "09:00", close: "20:00", closed: false },
    { day: { sk: "Piatok",     en: "Friday"    }, open: "09:00", close: "20:00", closed: false },
    { day: { sk: "Sobota",     en: "Saturday"  }, open: "08:00", close: "16:00", closed: false },
    { day: { sk: "Nedeľa",     en: "Sunday"    }, open: "",      close: "",      closed: true  },
  ],

  team: [
    {
      id: "martin",
      name: "Martin Kováč",
      role:  { sk: "Hlavný barber", en: "Head Barber" },
      bio:   { sk: "10 rokov skúseností, špecialista na fade strihy.", en: "10 years of experience, fade cut specialist." },
      image: "/team/martin.jpg",
      instagram: "https://instagram.com/martinkovac",
    },
    {
      id: "lukas",
      name: "Lukáš Novák",
      role:  { sk: "Barber & Stylista", en: "Barber & Stylist" },
      bio:   { sk: "Majster klasických a moderných strihov.", en: "Master of classic and contemporary cuts." },
      image: "/team/lukas.jpg",
      instagram: "https://instagram.com/lukasnovak",
    },
    {
      id: "adam",
      name: "Adam Horváth",
      role:  { sk: "Juniorský barber", en: "Junior Barber" },
      bio:   { sk: "Vášnivý perfekcionista s okom pre detail.", en: "Passionate perfectionist with an eye for detail." },
      image: "/team/adam.jpg",
      instagram: "https://instagram.com/adamhorvath",
    },
  ],

  services: [
    // ── Haircuts ─────────────────────────────────────────────
    {
      id: "classic-cut",
      category: "haircut",
      name: { sk: "Klasický strih",    en: "Classic Cut"   },
      desc: { sk: "Umytie, strih, styling.", en: "Wash, cut, style." },
      duration: 30,
      price: 15,
    },
    {
      id: "fade-cut",
      category: "haircut",
      name: { sk: "Fade strih",        en: "Fade Cut"       },
      desc: { sk: "Presný gradient fade.", en: "Precision gradient fade." },
      duration: 40,
      price: 20,
    },
    {
      id: "textured-cut",
      category: "haircut",
      name: { sk: "Textúrovaný strih", en: "Textured Cut"   },
      desc: { sk: "Moderný textúrovaný strih.", en: "Modern textured styling." },
      duration: 45,
      price: 22,
    },
    // ── Beard ────────────────────────────────────────────────
    {
      id: "beard-trim",
      category: "beard",
      name: { sk: "Úprava brady",      en: "Beard Trim"     },
      desc: { sk: "Tvarovanie a úprava brady.", en: "Shape and tidy." },
      duration: 20,
      price: 10,
    },
    {
      id: "hot-towel-shave",
      category: "beard",
      name: { sk: "Holiaci rituál",    en: "Hot Towel Shave" },
      desc: { sk: "Tradičné holenie s horúcim uterákom.", en: "Traditional straight-razor shave." },
      duration: 35,
      price: 18,
    },
    // ── Combos ───────────────────────────────────────────────
    {
      id: "combo-classic",
      category: "combo",
      name: { sk: "Klasické kombo",    en: "Classic Combo"  },
      desc: { sk: "Strih + úprava brady.", en: "Cut + beard trim." },
      duration: 55,
      price: 23,
    },
    {
      id: "combo-premium",
      category: "combo",
      name: { sk: "Prémiové kombo",    en: "Premium Combo"  },
      desc: { sk: "Fade + holiaci rituál + styling.", en: "Fade + hot towel shave + styling." },
      duration: 75,
      price: 35,
    },
  ],

  gallery: [
    { src: "/gallery/g1.jpg", alt: "Fade cut" },
    { src: "/gallery/g2.jpg", alt: "Beard trim" },
    { src: "/gallery/g3.jpg", alt: "Classic cut" },
    { src: "/gallery/g4.jpg", alt: "Hot towel shave" },
    { src: "/gallery/g5.jpg", alt: "Textured styling" },
    { src: "/gallery/g6.jpg", alt: "Combo service" },
  ],

  // Time slots available for booking
  timeSlots: [
    "09:00","09:30","10:00","10:30","11:00","11:30",
    "12:00","12:30","13:00","13:30","14:00","14:30",
    "15:00","15:30","16:00","16:30","17:00","17:30","18:00",
  ],
} as const;

export type TeamMember = (typeof SHOP.team)[number];
export type Service    = (typeof SHOP.services)[number];
export type Lang       = "sk" | "en";
