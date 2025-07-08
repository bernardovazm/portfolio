interface GithubRepo {
  name: string;
  owner: {
    login: string;
  };
  [key: string]: unknown;
}

export async function fetchRepos(username: string) {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
    {
      headers: {
        ...(process.env.GH_TOKEN && {
          Authorization: `token ${process.env.GH_TOKEN}`,
        }),
      },
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) throw new Error("Falha ao buscar repositórios");
  const data = await res.json();
  return data.map((r: GithubRepo) => ({
    ...r,
    social_preview: `https://opengraph.githubassets.com/1/${r.owner.login}/${r.name}`,
  }));
}
