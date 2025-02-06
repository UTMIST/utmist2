export interface AI2Submission {
  id: string;
  team: string;
  writeup: string;
  status: 'uploading/verifying' | 'pending' | 'failed' | 'accepted';
  createdAt: { seconds: number; nanoseconds: number };
  filename: string;
}