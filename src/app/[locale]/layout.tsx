import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import GoToTop from "@/components/GoToTop";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-main" });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Bernardo Vaz - Fullstack Developer",
  description: "Fullstack developer who loves building tools that help people.",
  icons: [
    {
      rel: "icon",
      url: "/code-icon.svg",
      media: "(prefers-color-scheme: dark)",
    },
    {
      rel: "icon",
      url: "/code-icon-light.svg",
      media: "(prefers-color-scheme: light)",
    },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  readonly children: React.ReactNode;
  readonly params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${nunito.className} text-zinc-100 bg-zinc-950`}>
        <NextIntlClientProvider messages={messages}>
          <SmoothScrollProvider>
            <NavBar />
            {children}
            <Footer />
            <GoToTop />
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
