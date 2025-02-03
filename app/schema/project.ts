import { TeamMember } from "@/schemas/TeamMetaData";

export interface Project {
  id: string;
  teamId: string;  // Reference to the team in charge
  startDate: string;  // Format: "YYYY-MM"
  endDate: string;    // Format: "YYYY-MM"
  title: string;
  thumbnail: string;
  status: 'hiring' | 'not hiring';
  synopsis: string;
  slug: string | null;  // Can be null for hidden projects
  content: string;      // Markdown content
  type: 'Academic' | 'Applied' | 'Infrastructure';  // Maintaining existing filter functionality
  description: string;  // Detailed description of the project
  team?: TeamMember[];  // Team members working on the project
  youtube?: string;     // YouTube video link if available
  proposal?: string;    // Project proposal link if available
}