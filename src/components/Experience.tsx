"use client";

import React from "react";
import { useTranslations } from "next-intl";

interface ExperienceItemProps {
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  skills?: string[];
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  company,
  role,
  duration,
  location,
  description,
  skills,
}) => {
  return (
    <div className="mb-8 p-6 bg-zinc-800 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-teal-400">{role}</h3>
      <p className="text-lg text-white opacity-90">{company}</p>
      <p className="text-sm opacity-70">
        {location} {duration && ` · ${duration}`}
      </p>
      <p className="mt-4 opacity-80">{description}</p>
      {skills && skills.length > 0 && (
        <div className="mt-4">
          <ul className="flex flex-wrap gap-2 mt-2 text-sm opacity-70">
            {skills.map((skill) => (
              <li key={skill} className="bg-zinc-700 px-3 py-1 rounded-full">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default function Experience() {
  const t = useTranslations("experience");

  const experiences = [
    {
      company: t("jobs.attime.company"),
      role: t("jobs.attime.title"),
      duration: t("jobs.attime.period"),
      location: t("jobs.attime.location"),
      description: t("jobs.attime.description"),
      skills: [".NET", "SQL", "C#"],
    },
    {
      company: t("jobs.teknisa.company"),
      role: t("jobs.teknisa.title"),
      duration: t("jobs.teknisa.period"),
      location: t("jobs.teknisa.location"),
      description: t("jobs.teknisa.description"),
      skills: [
        "TypeScript",
        "SQL",
        "npm",
        "PHP",
        "JSON",
        "SASS",
        "Vue.js",
        "Scrum",
        "BIRT",
        "GitLab",
      ],
    },
    {
      company: t("jobs.outlier.company"),
      role: t("jobs.outlier.title"),
      duration: t("jobs.outlier.period"),
      location: t("jobs.outlier.location"),
      description: t("jobs.outlier.description"),
      skills: ["IA Generativa", "Machine Learning", "Análise de Dados"],
    },
    {
      company: t("jobs.teamhub.company"),
      role: t("jobs.teamhub.title"),
      duration: t("jobs.teamhub.period"),
      location: t("jobs.teamhub.location"),
      description: t("jobs.teamhub.description"),
      skills: [
        "JavaScript",
        "npm",
        "Node.js",
        "Git",
        "React.js",
        "API REST",
        "TypeScript",
      ],
    },
  ];

  return (
    <section id="experience" className="container mx-auto py-20 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">{t("title")}</h2>
      <div className="max-w-3xl mx-auto">
        {experiences.map((exp) => (
          <ExperienceItem key={`${exp.company}-${exp.role}`} {...exp} />
        ))}
      </div>
    </section>
  );
}
