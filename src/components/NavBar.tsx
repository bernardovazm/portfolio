"use client";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { Menu, X, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function NavBar() {
  const t = useTranslations("navigation");
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const links = useMemo(
    () => [
      { href: "#experience", label: t("experience") },
      { href: "#education", label: t("education") },
      { href: "#projects", label: t("projects") },
      { href: "#contact", label: t("contact") },
    ],
    [t]
  );

  useEffect(() => {
    const findActiveSection = () => {
      const sections = links.map((link) => link.href.substring(1));
      let closestSection = "";
      let closestDistance = Infinity;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionBottom = rect.bottom;

        // Check if section is in viewport with tolerance
        if (sectionTop <= 150 && sectionBottom >= 50) {
          const distanceFromTop = Math.abs(sectionTop);
          if (distanceFromTop < closestDistance) {
            closestDistance = distanceFromTop;
            closestSection = `#${section}`;
          }
        }
      }

      return closestSection;
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);
      setActiveSection(findActiveSection());
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [links]);
  return (
    <header
      className={`fixed top-0 w-full backdrop-blur z-50 transition-all duration-300 ${
        scrolled ? "border-b border-zinc-800" : "border-b border-transparent"
      }`}
      style={{ mixBlendMode: "difference" }}
    >
      <nav
        className={`container mx-auto flex items-center justify-between transition-all duration-300 ease-in-out px-4 ${
          scrolled ? "py-4" : "py-5"
        }`}
      >
        <Link
          href="/"
          className={`font-bold flex items-center gap-2 transition-all duration-300 ease-in-out ${(() => {
            if (scrolled) return "text-lg";
            return "text-xl";
          })()} ${(() => {
            if (scrolled) {
              return "text-white navbar-blend";
            }
            return "text-teal-400";
          })()}`}
        >
          <Code
            size={scrolled ? 20 : 24}
            className={`transition-all duration-300 ${
              scrolled ? "navbar-blend" : ""
            }`}
          />
          <span className={scrolled ? "navbar-blend" : ""}>Bernardo Vaz</span>
        </Link>
        <button className="sm:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
        <div className="hidden sm:flex items-center gap-6">
          <ul className="flex gap-6 transition-all duration-300 text-sm">
            {links.map((l) => {
              const getTextColor = () => {
                if (activeSection === l.href) return "text-teal-400";
                return "text-white";
              };

              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`hover:text-teal-400 transition-colors duration-200 relative ${getTextColor()}`}
                    style={{ mixBlendMode: "difference" }}
                  >
                    {l.label}
                    {activeSection === l.href && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal-400"
                        initial={false}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
          <LanguageSwitcher />
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="sm:hidden bg-zinc-900 border-t border-zinc-800"
          >
            {links.map((l) => (
              <li key={l.href} className="p-4 border-b border-zinc-800">
                <a
                  href={l.href}
                  className={`transition-colors duration-200 ${
                    activeSection === l.href ? "text-teal-400" : ""
                  }`}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="p-4 flex justify-center">
              <LanguageSwitcher />
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
