import { BaseMetaData } from "./BaseMetaData"; 

export interface TeamMember {
    name: string;
    image?: string;
    socials: {
        LinkedIn?: string;
        GitHub?: string;
        Twitter?: string;
        GoogleScholar?: string;
        Medium?: string;
        Website?: string;
    };
    role: string;
}

export interface ProjectMetaData extends BaseMetaData {
  title: string;
  status: string;
  type: string;
  publishDate: string;
  team: TeamMember[];
  description: string;
  youtube: string;
  proposal: string;
  images: string[];
}