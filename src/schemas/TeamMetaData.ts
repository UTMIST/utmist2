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
    year: string;
}

export interface TeamMetaData extends BaseMetaData {
  title: string;
  description: string;
  team: TeamMember[];
}
