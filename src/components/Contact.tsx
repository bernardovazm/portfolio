"use client";

import { useState } from "react";
import { SiGithub, SiLinkedin, SiInstagram } from "react-icons/si";
import { FileText, Send } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailSubject = encodeURIComponent(`Form - ${formData.subject}`);
    const emailBody = encodeURIComponent(`
      Subject: ${formData.name}
      Email: ${formData.email}
      Message: ${formData.message}`);
    window.open(`mailto:?subject=${emailSubject}&body=${emailBody}`);
  };

  const socialLinks = [
    {
      name: t("links.github"),
      url: "https://github.com/bernardovazm",
      icon: SiGithub,
    },
    {
      name: t("links.linkedin"),
      url: "https://www.linkedin.com/in/bernardovazm",
      icon: SiLinkedin,
    },
    {
      name: t("links.lattes"),
      url: "https://lattes.cnpq.br/0822217141495921",
      icon: FileText,
    },
    {
      name: t("links.instagram"),
      url: "https://instagram.com/bernardovazmelo",
      icon: SiInstagram,
    },
  ];

  return (
    <section id="contact" className="container mx-auto py-20 px-4 text-center">
      <h2 className="text-3xl font-bold mb-6">{t("title")}</h2>
      <p className="mb-8 max-w-xl mx-auto opacity-80">{t("subtitle")}</p>

      <div className="flex justify-center gap-6 mb-8 flex-wrap">
        {socialLinks.map(({ name, url, icon: Icon }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
          >
            <Icon size={20} />
            <span>{name}</span>
          </a>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder={t("form.name")}
            value={formData.name}
            onChange={handleInputChange}
            required
            className="px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-teal-500 focus:outline-none transition-colors"
          />
          <input
            type="email"
            name="email"
            placeholder={t("form.email")}
            value={formData.email}
            onChange={handleInputChange}
            required
            className="px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-teal-500 focus:outline-none transition-colors"
          />
        </div>
        <input
          type="text"
          name="subject"
          placeholder={t("form.subject")}
          value={formData.subject}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-teal-500 focus:outline-none transition-colors"
        />
        <textarea
          name="message"
          placeholder={t("form.message")}
          value={formData.message}
          onChange={handleInputChange}
          required
          rows={5}
          className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-teal-500 focus:outline-none transition-colors resize-none"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500/20 hover:bg-teal-500/30 rounded-lg transition-colors text-teal-400 hover:text-teal-300"
        >
          <Send size={20} />
          {t("form.send")}
        </button>
      </form>
    </section>
  );
}
