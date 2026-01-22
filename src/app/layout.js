import "./globals.css";
import { Black_Ops_One, Quantico } from "next/font/google";
import Menu from "@/components/Menu";

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

export const metadata = {
  title: "MILSIM.AI | Command Your Battlefield",
  description: "Tactical airsoft community platform with real-time battlefield awareness",
  openGraph: {
    title: "MILSIM.AI | Command Your Battlefield",
    description: "Tactical airsoft community platform with real-time battlefield awareness",
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
    title: "MILSIM.AI | Command Your Battlefield",
    description: "Tactical airsoft community platform with real-time battlefield awareness",
    images: ["/milsima-open-graph.webp"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${blackOpsOne.variable} ${quantico.variable}`}>
      <head>
        <link rel="preload" href="/hero-img.webp" as="image" type="image/webp" />
        <link rel="preload" href="/mask.svg" as="image" type="image/svg+xml" />
      </head>
      <body>
        <Menu />
        {children}
      </body>
    </html>
  );
}
