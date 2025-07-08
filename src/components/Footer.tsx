"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="py-10 text-center text-xs opacity-60">
      © {new Date().getFullYear()} {t("madeWith")}
    </footer>
  );
}
