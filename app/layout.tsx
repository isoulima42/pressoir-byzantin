import type { Metadata } from "next";
import {
  Playfair_Display,
  Cormorant_Garamond,
  Raleway,
  Source_Serif_4,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { RESTAURANT } from "@/lib/constants";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import CustomCursor from "@/components/CustomCursor";
import MobileStickyActions from "@/components/MobileStickyActions";
import MotionProvider from "@/components/MotionProvider";
import PageTransition from "@/components/PageTransition";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["600"],
  style: ["normal", "italic"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: RESTAURANT.name,
    template: `%s — ${RESTAURANT.name}`,
  },
  description: RESTAURANT.description,
  metadataBase: new URL(RESTAURANT.url),
  openGraph: {
    type: "website",
    locale: "fr_CH",
    siteName: RESTAURANT.name,
    title: RESTAURANT.name,
    description: RESTAURANT.description,
    images: [{ url: "/images/logo/Artboard-1.png", alt: RESTAURANT.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: RESTAURANT.name,
    description: RESTAURANT.description,
    images: ["/images/logo/Artboard-1.png"],
  },
  robots: { index: true, follow: true },
  other: { google: "notranslate" },
  icons: {
    icon: "/images/logo/Artboard-1-150x150.png",
    apple: "/images/logo/Artboard-1-150x150.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" translate="no" className="notranslate scroll-smooth" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${cormorant.variable} ${raleway.variable} ${sourceSerif.variable} ${jetbrains.variable} antialiased relative bg-brand-dark min-h-screen text-brand-cream overflow-x-hidden`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-sm focus:bg-brand-orange focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-brand-dark"
        >
          Aller au contenu principal
        </a>

        <MotionProvider>
          <CustomCursor />

          <div
            className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-noise"
            aria-hidden="true"
          />

          <div className="relative z-10 flex min-h-[100dvh] flex-col">
            <PageTransition>{children}</PageTransition>
          </div>

          <MobileStickyActions />
        </MotionProvider>

        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
