"use client";

import { useTranslations } from "next-intl";

export default function FilterBar({
  query,
  onQueryChange,
  language,
  onLanguageChange,
  languages,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  language: string;
  onLanguageChange: (v: string) => void;
  languages: string[];
}) {
  const t = useTranslations("projects");

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <input
        type="text"
        placeholder={t("searchPlaceholder")}
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="flex-1 rounded-xl bg-zinc-800 p-3 outline-none focus:ring-2 ring-teal-500"
      />
      <select
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="rounded-xl bg-zinc-800 p-3"
      >
        {languages.map((l) => (
          <option key={l}>{l === "-" ? t("filters.all") : l}</option>
        ))}
      </select>
    </div>
  );
}
