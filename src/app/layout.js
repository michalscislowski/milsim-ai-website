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
      <body>
        <Menu />
        {children}
      </body>
    </html>
  );
}
