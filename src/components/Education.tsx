"use client";

import React from "react";
import { GraduationCap, Award, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

interface EducationItemProps {
  institution: string;
  degree: string;
  period: string;
  type: "education" | "certification";
  url?: string;
}

const EducationItem: React.FC<EducationItemProps> = ({
  institution,
  degree,
  period,
  type,
  url,
}) => {
  const content = (
    <div className="mb-6 p-6 bg-zinc-800 rounded-lg shadow-lg hover:bg-zinc-750 transition-colors">
      <div className="flex items-start gap-3">
        {type === "education" ? (
          <GraduationCap className="text-teal-400 mt-1" size={20} />
        ) : (
          <Award className="text-teal-400 mt-1" size={20} />
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-teal-400">{degree}</h3>
          <p className="text-white opacity-90">{institution}</p>
          <p className="text-sm opacity-70 mt-1">{period}</p>
        </div>
        {url && <ExternalLink className="text-teal-400 opacity-60" size={16} />}
      </div>
    </div>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
};

export default function Education() {
  const t = useTranslations("education");

  const education = [
    {
      institution: t("degree.institution"),
      degree: t("degree.title"),
      period: t("degree.period"),
      type: "education" as const,
    },
    {
      institution: t("technical.institution"),
      degree: t("technical.title"),
      period: t("technical.period"),
      type: "education" as const,
    },
  ];

  const certifications = [
    {
      institution: "EF SET",
      degree: t("certifications.efset"),
      period: "Mar 2024",
      type: "certification" as const,
      url: "https://cert.efset.org/EttSrV",
    },
    {
      institution: "Rocketseat",
      degree: t("certifications.rocketseat_especializar"),
      period: "Ago 2023",
      type: "certification" as const,
      url: "https://app.rocketseat.com.br/certificates/1956682f-2b1b-42a4-accd-26ce65d39cb0",
    },
    {
      institution: "Rocketseat",
      degree: t("certifications.rocketseat_fundamentar"),
      period: "Ago 2023",
      type: "certification" as const,
      url: "https://app.rocketseat.com.br/certificates/5c2760a6-0d77-4eff-8467-7fe5abd8f5d5",
    },
  ];

  return (
    <section id="education" className="container mx-auto py-20 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">{t("title")}</h2>

      <div className="max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold mb-4 text-teal-400">
          {t("education_section")}
        </h3>
        {education.map((edu) => (
          <EducationItem key={`${edu.institution}-${edu.degree}`} {...edu} />
        ))}

        <h3 className="text-xl font-semibold mb-4 mt-8 text-teal-400">
          {t("certifications.title")}
        </h3>
        {certifications.map((cert) => (
          <EducationItem key={`${cert.institution}-${cert.degree}`} {...cert} />
        ))}

        <div className="mt-8 p-6 bg-zinc-800 rounded-lg">
          <h4 className="font-semibold mb-2 text-teal-400">
            {t("languages.title")}
          </h4>
          <div className="flex gap-4 text-sm">
            <span>{t("languages.portuguese")}</span>
            <span>{t("languages.english")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
