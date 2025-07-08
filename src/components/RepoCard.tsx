import Image from "next/image";

interface Repo {
  html_url: string;
  social_preview: string;
  name: string;
  description?: string;
  language?: string;
  topics?: string[];
}

interface RepoCardProps {
  readonly repo: Readonly<Repo>;
}

export default function RepoCard({ repo }: RepoCardProps) {
  const mainTopics = repo.topics?.slice(0, 3) || [];
  const hasMoreTopics = (repo.topics?.length ?? 0) > 3;

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300"
    >
      <div className="relative overflow-hidden">
        <Image
          src={repo.social_preview}
          alt={`Preview do repositório ${repo.name}`}
          width={800}
          height={400}
          className="w-full h-48 object-cover object-bottom group-hover:scale-[1.05] transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-white group-hover:text-teal-400 transition-colors duration-200 line-clamp-1">
            {repo.name}
          </h3>
          {repo.language && (
            <span className="px-3 py-1 text-xs font-medium bg-teal-500/20 text-teal-400 rounded-full border border-teal-500/30 whitespace-nowrap ml-3">
              {repo.language}
            </span>
          )}
        </div>

        {repo.description && (
          <p className="text-sm text-zinc-300 mb-4 line-clamp-2 leading-relaxed">
            {repo.description}
          </p>
        )}

        <div className="mt-auto">
          {mainTopics.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {mainTopics.map((topic) => (
                <span
                  key={topic}
                  className="text-xs bg-zinc-700/50 hover:bg-zinc-700 text-zinc-300 px-2 py-1 rounded-md transition-colors duration-200 border border-zinc-600/50"
                >
                  {topic}
                </span>
              ))}
              {hasMoreTopics && (
                <span className="text-xs text-zinc-500 px-2 py-1">
                  +{(repo.topics?.length ?? 0) - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </a>
  );
}
