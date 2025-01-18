import { BaseMetaData } from "./BaseMetaData"; 


export interface TeamMember {
    name: string;
    image?: string;
    socials: {
        LinkedIn: string;
        GitHub: string;
        Twitter: string;
    };
    role: string;
}

export interface ProjectMetaData extends BaseMetaData {
  title: string;
  status: string; // project status
  type: string; // project type: can be academic, applied or infrastructure
  publishDate: string; // YYYY-MM-DD
  team: TeamMember[]; // team members
  description: string;
  youtube: string;
  proposal: string;
  images: string[]; // paths to public img of project
}