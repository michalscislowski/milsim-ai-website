"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale) => {
    // Remove current locale from pathname and add new one
    const pathWithoutLocale = pathname.replace(/^\/(en|pl)/, "");
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="language-switcher">
      <button
        className={`language-switcher-btn ${locale === "en" ? "language-switcher-btn--active" : ""}`}
        onClick={() => switchLocale("en")}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="language-switcher-divider">/</span>
      <button
        className={`language-switcher-btn ${locale === "pl" ? "language-switcher-btn--active" : ""}`}
        onClick={() => switchLocale("pl")}
        aria-label="Przełącz na Polski"
      >
        PL
      </button>
    </div>
  );
}
