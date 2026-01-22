import "../globals.css";
import { Black_Ops_One, Quantico } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { locales } from "@/i18n/config";
import Menu from "@/components/Menu";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const blackOpsOne = Black_Ops_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-military",
});

const quantico = Quantico({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-quantico",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  const title = messages.metadata?.title || "MILSIM.AI | Command Your Battlefield";
  const description = messages.metadata?.description || "Tactical airsoft community platform with real-time battlefield awareness";

  return {
    title,
    description,
    metadataBase: new URL("https://milsim.ai"),
    openGraph: {
      title,
      description,
      url: "https://milsim.ai",
      siteName: "MILSIM.AI",
      images: [
        {
          url: "/milsima-open-graph.webp",
          width: 1200,
          height: 630,
          alt: "MILSIM.AI - Command Your Battlefield",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/milsima-open-graph.webp"],
    },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Fetch messages for the current locale
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${blackOpsOne.variable} ${quantico.variable}`}>
      <head>
        <link rel="preload" href="/hero-img.webp" as="image" type="image/webp" />
        <link rel="preload" href="/mask.svg" as="image" type="image/svg+xml" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <LanguageSwitcher />
          <Menu />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
