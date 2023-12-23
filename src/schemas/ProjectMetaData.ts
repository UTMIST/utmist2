import { BaseMetaData } from "./BaseMetaData";

export interface SocialInfo {
  name: string;
  url: string;
}

export interface TeamMember {
  image?: string;
  socials: SocialInfo[];
}

export interface ProjectMetaData extends BaseMetaData {
  title: string;
  status: string; // project status
  type: string; // project type: can be academic, applied or infrastructure
  publishDate: string; // YYYY-MM-DD
  team: TeamMember[]; // team members
  description: string;
  images: string[]; // paths to public img of project
}