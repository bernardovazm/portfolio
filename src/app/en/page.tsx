import { fetchRepos } from "@/lib/github";
import Hero from "@/components/Hero";
import RepoSection from "@/components/RepoSection";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Education from "@/components/Education";

export default async function Home() {
  const repos = await fetchRepos("bernardovazm");
  return (
    <main>
      <Hero />
      <Experience />
      <Education />
      <RepoSection repos={repos} />
      <Contact />
    </main>
  );
}

export async function generateStaticParams() {
  return [{ locale: "en" }];
}

export const dynamic = "force-dynamic";
