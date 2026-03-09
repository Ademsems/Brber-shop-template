# 🪒 BarberShop Template — "Digital Current"

A high-performance Next.js 14 barber shop template with luxury dark mode aesthetic, Framer Motion animations, SK/EN i18n, and a multi-step booking system.

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:3000
```

---

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          ← Root layout + I18nProvider
│   ├── page.tsx            ← Main page (Hero, Services, Gallery, Team, Contact)
│   └── globals.css         ← Tailwind + custom theme tokens
│
├── components/
│   ├── Navbar.tsx          ← Glassmorphism sticky nav + Language toggle
│   └── BookingForm.tsx     ← 5-step booking modal
│
├── config/
│   └── shopData.ts         ← ⭐ ALL client-specific data lives here
│
├── lib/
│   └── i18n.tsx            ← SK/EN dictionary + React context hook
│
└── public/
    ├── hero-bg.mp4         ← Add your hero video
    ├── hero-fallback.jpg   ← Fallback image for video
    ├── team/               ← Add team member photos
    └── gallery/            ← Add gallery images
```

---

## 🔧 Customising for a New Client

**All you need to edit is `config/shopData.ts`:**

```ts
export const SHOP = {
  name: "Your Shop Name",     // ← Change this
  phone: "+1 555 000 0000",   // ← Change this
  address: { ... },           // ← Change this
  team: [ ... ],              // ← Add/remove barbers
  services: [ ... ],          // ← Add/remove services
  // ... etc
}
```

---

## 🌍 Adding a Language

Open `lib/i18n.tsx` and add your new language key to each entry:

```ts
const dict = {
  nav: {
    book: { sk: "Rezervovať", en: "Book Now", de: "Jetzt buchen" },
    // ...
  }
}
```

Then update the `Lang` type in `config/shopData.ts`:
```ts
export type Lang = "sk" | "en" | "de";
```

---

## 📧 Email Confirmation

The `sendConfirmation()` function in `BookingForm.tsx` is a stub:

```ts
async function sendConfirmation(form: FormState) {
  // TODO: Replace with real email service
  // Recommended: Resend (resend.com) or SendGrid
  await fetch("/api/send-booking", {
    method: "POST",
    body: JSON.stringify(form),
  });
}
```

Create `app/api/send-booking/route.ts` and wire up your email provider.

---

## 🎨 Design Tokens

| Token   | Value     | Usage                      |
|---------|-----------|----------------------------|
| `navy`  | `#0A192F` | Background                 |
| `aqua`  | `#00FFFF` | Accents, CTAs, glows       |
| `slate` | `#8892B0` | Body text, secondary info  |

---

## 🚀 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo at **vercel.com** — zero config needed.

---

## 📦 Tech Stack

| Library        | Version  | Purpose                         |
|----------------|----------|---------------------------------|
| Next.js        | 14.x     | App Router, SSR, Image opt.     |
| Tailwind CSS   | 3.4.x    | Utility-first styling           |
| Framer Motion  | 11.x     | Animations, parallax, reveals   |
| Lucide React   | 0.414.x  | Iconography                     |
| TypeScript     | 5.x      | Type safety                     |

---

## 📝 Notes

- Replace placeholder images in `/public/gallery/` and `/public/team/` with real photos.
- The map embed uses Google Maps iframe — replace `SHOP.mapEmbedUrl` with your actual embed URL from [maps.google.com](https://maps.google.com).
- For the hero video, place an MP4 at `/public/hero-bg.mp4` (compressed, < 5MB recommended).
