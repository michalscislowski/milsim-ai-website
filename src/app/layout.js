import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
