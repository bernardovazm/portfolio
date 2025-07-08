import RepoCard from "./RepoCard";

type Repo = {
  id: string | number;
  name: string;
  html_url: string;
  social_preview: string;
  // Add other repo properties as needed
};

interface RepoGridProps {
  readonly repos: ReadonlyArray<Repo>;
}

export default function RepoGrid({ repos }: RepoGridProps) {
  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </section>
  );
}
