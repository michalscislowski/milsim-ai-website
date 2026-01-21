import "./globals.css";

export const metadata = {
  title: "Advanced Scroll Animations | Codegrid",
  description: "A collection of advanced scroll-based animations built with GSAP and Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
