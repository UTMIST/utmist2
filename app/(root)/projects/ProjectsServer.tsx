import { sanityFetch } from "@/sanity/lib/live";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import { ProjectTypeCard } from "@/components/ProjectCard";

type ProjectsServerProps = {
  query: string | null;
};

export default async function ProjectsServer({ query }: ProjectsServerProps): Promise<ProjectTypeCard[]> {
  const params = { search: query || null };
  const { data } = await sanityFetch({ query: PROJECTS_QUERY, params });
  return data;
}
