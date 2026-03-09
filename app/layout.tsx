import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import { SHOP } from "@/config/shopData";

export const metadata: Metadata = {
  title:       `${SHOP.name} — Premium Barbershop`,
  description: `${SHOP.name} — Where style meets precision. Book your appointment online.`,
  keywords:    "barbershop, haircut, beard trim, fade, booking",
  openGraph: {
    title:       `${SHOP.name} — Premium Barbershop`,
    description: "Book your premium haircut experience.",
    type:        "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
