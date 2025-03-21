export interface User {
  name: string;
  displayName: string;
  image: string;
  Joined: Date;
  createdAt: Date;
  role: string;
  socials?: {
    LinkedIn?: string;
    GitHub?: string;
    Twitter?: string;
    GoogleScholar?: string;
    Medium?: string;
    Website?: string;
  };
} 