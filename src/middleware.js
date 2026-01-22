import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n/config";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Static files (images, etc.)
  // - Next.js internals
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
