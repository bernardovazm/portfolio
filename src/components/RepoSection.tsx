"use client";
import { useState, useMemo } from "react";
import FilterBar from "./FilterBar";
import RepoGrid from "./RepoGrid";
import { useTranslations } from "next-intl";

// Defina o tipo Repo conforme usado no RepoGrid e RepoCard
interface Repo {
  id: string | number;
  name: string;
  html_url: string;
  social_preview: string;
  description?: string;
  language?: string;
  topics?: string[];
  stargazers_count?: number;
  created_at?: string;
  updated_at?: string;
}

export default function RepoSection({
  repos,
}: {
  readonly repos: readonly Repo[];
}) {
  const t = useTranslations("projects");
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("-");
  const [showAll, setShowAll] = useState(false);

  const languages = useMemo(() => {
    const langs = Array.from(
      new Set(
        repos.map((r) => r.language).filter((l): l is string => Boolean(l))
      )
    );
    return ["-", ...langs];
  }, [repos]);

  const sortedRepos = useMemo(() => {
    return [...repos].sort((a, b) => {
      const dateA = new Date(a.updated_at ?? a.created_at ?? 0);
      const dateB = new Date(b.updated_at ?? b.created_at ?? 0);
      return dateB.getTime() - dateA.getTime();
    });
  }, [repos]);

  const filtered = useMemo(() => {
    const result = sortedRepos.filter((r) => {
      const matchesLang = language === "-" || r.language === language;
      const matchesQuery = r.name.toLowerCase().includes(query.toLowerCase());
      return matchesLang && matchesQuery;
    });

    return showAll ? result : result.slice(0, 3);
  }, [sortedRepos, query, language, showAll]);

  return (
    <section id="projects" className="container mx-auto py-20 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">{t("title")}</h2>
      <FilterBar
        query={query}
        onQueryChange={setQuery}
        language={language}
        onLanguageChange={setLanguage}
        languages={languages}
      />
      <RepoGrid repos={filtered} />
      {!showAll && sortedRepos.length > 3 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-3 bg-teal-500/20 hover:bg-teal-500/30 rounded-lg transition-colors"
          >
            {t("viewMore")} ({sortedRepos.length})
          </button>
        </div>
      )}
    </section>
  );
}
