export interface AI2Challenge {
  id: string;
  team1: string;
  team2: string;
  status: 'pending' | 'ongoing' | 'complete';
  createdAt: { seconds: number; nanoseconds: number };
  videoUrl: string | null;
  result: string | null;
  statusCode: number;
} 