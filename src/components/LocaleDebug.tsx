"use client";

import { useLocale, useTranslations } from "next-intl";

export default function LocaleDebug() {
  const locale = useLocale();
  const t = useTranslations("navigation");

  return (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg text-sm z-50">
      <div>
        <strong>Current Locale:</strong> {locale}
      </div>
      <div>
        <strong>Experience:</strong> {t("experience")}
      </div>
      <div>
        <strong>Education:</strong> {t("education")}
      </div>
    </div>
  );
}
