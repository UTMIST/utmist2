import { BaseMetaData } from "./BaseMetaData";
import { TeamMember } from "./ProjectMetaData";

export interface DepartmentMetaData extends BaseMetaData {
  title: string; // Team title or name
  description: string; // Description of the team
  team: TeamMember[]; // Array of team members
}