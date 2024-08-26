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
    year: string[]; // Added year to filter team members by year
}

export interface DepartmentMetaData extends BaseMetaData {
  title: string; // Team title or name
  description: string; // Description of the team
  team: TeamMember[]; // Array of team members
}