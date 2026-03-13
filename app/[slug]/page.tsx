// app/[slug]/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// SERVER COMPONENT — runs on the server on every request (no-store cache).
// Fetches the CSV, resolves the slug, then passes clean data to the
// client-side ShopPage component. CSS and Tailwind are never touched here.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import { getShopBySlug } from "@/lib/csvFetcher";
import ShopPage from "@/components/ShopPage";
import { I18nProvider } from "@/lib/i18n";

// ── ⚙️  CONFIGURED CSV URL ──────────────────────────────────────────────────
// This points directly to your Vercel_Feed tab in Google Sheets
const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR_IZ7tV2IyFoByBc17bHtEE_KGs-t1VYvgT12mKuXqZU0ZlLkbEJCxVHORzjYLfg/pub?gid=135683381&single=true&output=csv";
// ─────────────────────────────────────────────────────────────────────────────

// ── Types ─────────────────────────────────────────────────────────────────────
interface PageProps {
  params: { slug: string };
}

// ── Metadata (dynamic <title>) ────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const shop = await getShopBySlug(CSV_URL, params.slug);
  return {
    title:       `${shop.name} | Premium Barbershop`,
    description: `Book your appointment at ${shop.name} — ${shop.address}.`,
    openGraph: {
      title:       `${shop.name} | Premium Barbershop`,
      description: `Premium barber services in ${shop.address}.`,
      type:        "website",
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function SlugPage({ params }: PageProps) {
  // Fetch is called on every request — no stale data because of cache: 'no-store' in csvFetcher
  const shop = await getShopBySlug(CSV_URL, params.slug);

  return (
    // I18nProvider wraps ShopPage for dual-language support
    <I18nProvider>
      <ShopPage
        dynamicShop={{
          name:    shop.name,
          phone:   shop.phone,
          address: shop.address,
        }}
      />
    </I18nProvider>
  );

}
