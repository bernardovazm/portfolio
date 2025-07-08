"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, useMemo } from "react";
import {
  SiReact,
  SiNodedotjs,
  SiDotnet,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiMysql,
  SiTailwindcss,
  SiNextdotjs,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");
  const [showAllSkills, setShowAllSkills] = useState(false);

  const mainSkills = useMemo(
    () => [
      { name: t("skills.react"), icon: SiReact },
      { name: t("skills.typescript"), icon: SiTypescript },
      { name: t("skills.nodejs"), icon: SiNodedotjs },
    ],
    [t]
  );

  const allSkills = useMemo(
    () => [
      { name: t("skills.react"), icon: SiReact },
      { name: t("skills.typescript"), icon: SiTypescript },
      { name: t("skills.nodejs"), icon: SiNodedotjs },
      { name: t("skills.javascript"), icon: SiJavascript },
      { name: t("skills.nextjs"), icon: SiNextdotjs },
      { name: t("skills.tailwind"), icon: SiTailwindcss },
      { name: t("skills.csharp"), icon: TbBrandCSharp },
      { name: t("skills.dotnet"), icon: SiDotnet },
      { name: t("skills.python"), icon: SiPython },
      { name: t("skills.mysql"), icon: SiMysql },
    ],
    [t]
  );
  const skillsToShow = showAllSkills ? allSkills : mainSkills;
  return (
    <section
      className="h-screen flex flex-col justify-center items-center text-center gap-6 relative px-4"
      id="top"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-4xl font-extrabold bg-gradient-to-br from-teal-400 to-indigo-500 bg-clip-text text-transparent">
          {t("title")}
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-xl text-lg opacity-90"
        >
          {t("description")}
        </motion.p>
      </motion.div>
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="flex flex-wrap justify-center gap-4 mt-4"
      >
        {skillsToShow.map(({ name, icon: Icon }) => (
          <li
            key={name}
            className="flex flex-col items-center gap-1 w-16 group"
          >
            <Icon size={24} />
            <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              {name}
            </span>
          </li>
        ))}
        {!showAllSkills && (
          <li className="flex flex-col items-center gap-1 w-16 group">
            <button
              onClick={() => setShowAllSkills(true)}
              className="flex items-center justify-center w-6 h-6 text-white/60 hover:text-white/90 transition-all duration-200 cursor-pointer"
            >
              <span className="text-lg font-bold leading-none">⋯</span>
            </button>
          </li>
        )}
      </motion.ul>

      <motion.a
        href="#experience"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: [0, -2, 0],
        }}
        transition={{
          delay: 1.5,
          opacity: { duration: 0.8 },
          y: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="absolute bottom-8 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronDown
          size={32}
          className="opacity-50 hover:opacity-80 transition-opacity duration-300"
        />
      </motion.a>
    </section>
  );
}
