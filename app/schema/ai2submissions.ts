export interface AI2Submission {
  id: string;
  team: string;
  statusCode: number;
  status: 'uploading/verifying' | 'pending' | 'failed' | 'accepted';
  createdAt: { seconds: number; nanoseconds: number };
  filename: string;
  traceback: string;
}