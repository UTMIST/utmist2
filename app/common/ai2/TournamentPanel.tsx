'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@ai2components/ui/card";
import { ScrollArea } from "@ai2components/ui/scroll-area";
import { Trophy, FileText, MousePointerClick } from "lucide-react";
import { FileSubmission } from "./FileSubmission";
import { Button } from "@ai2components/ui/button";
import { useState, useEffect } from "react";
import { Badge } from "@ai2components/ui/badge";
import { Label } from "@ai2components/ui/label";
import { Textarea } from "@ai2components/ui/textarea";
import { useFirebase } from "@app/firebase/useFirebase";
import { useSession } from "next-auth/react";
import { query, collection, where, orderBy, getDocs, doc, setDoc } from "firebase/firestore";
import { useToast } from "@ai2components/ui/use-toast";
import { AI2Submission } from "@app/schema/ai2submissions";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@ai2components/ui/dialog";

export const TournamentPanel = ({ teamId }: { teamId: string }) => {
  const [submissions, setSubmissions] = useState<AI2Submission[]>([]);
  const { toast } = useToast();
  const { db } = useFirebase();
  const { data: session } = useSession();
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!db || !teamId) return;
      
      const submissionsQuery = query(
        collection(db, 'AI2Submissions'),
        where('team', '==', teamId),
        orderBy('createdAt', 'desc')
      );
      
      const snapshot = await getDocs(submissionsQuery);
      setSubmissions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AI2Submission)));
    };

    fetchSubmissions();
  }, [db, teamId]);

  const handleSubmission = async (file: File) => {
    if (!db || !session?.user?.email || !teamId) return;

    try {
      const lastSubmission = submissions[0]?.createdAt;
      if (lastSubmission && submissions[0]?.statusCode === 3) {
        const lastSubmissionTime = new Date(lastSubmission.seconds * 1000);
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
        if (lastSubmissionTime > tenMinutesAgo) {
          const remaining = Math.ceil(
            (lastSubmissionTime.getTime() + 10 * 60 * 1000 - Date.now()) / 1000 / 60
          );
          throw new Error(`Please wait ${remaining} minutes before submitting again`);
        }
      }

      const docRef = doc(collection(db, 'AI2Submissions'));
      const submissionId = docRef.id; 

      await setDoc(docRef, {
        team: teamId,
        statusCode: 0,
        status: 'uploading/verifying',
        createdAt: new Date(),
        filename: file.name
      }); 
      setSubmissions(prev => [
        {
          id: docRef.id,
          team: teamId,
          statusCode: 0,
          status: 'uploading/verifying',
          createdAt: { seconds: new Date().getTime() / 1000, nanoseconds: 0 },
          filename: file.name,
          traceback: ''
        },
        ...prev
      ]);

      const formData = new FormData();
      formData.append('submission', file);
      formData.append('submissionId', submissionId);
      
      const response = await fetch(process.env.NEXT_PUBLIC_TOURNAMENT_WEBHOOK_URL + '/submit', {
        method: 'POST',
        body: formData
      });

      const res = await response.json();

      if (response.ok) {
        // await setDoc(docRef, { status: 'pending' }, { merge: true });
      } else {
        await setDoc(docRef, { status: 'failed' }, { merge: true });
        throw new Error('Upload failed');
      }

    } catch (error) {
      console.error('Submission failed:', error);
      if (error instanceof Error && error.message.includes('Please wait')) {
        toast({
          title: "Cooldown",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }
    }
  };

  return (
    <Card className="h-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-6 w-6" />
          Tournament Submission
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Daily Submissions Left: 5/5</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Submission
            </h3>
          </div>
          {/* <div className="space-y-2">
            <p className="text-sm text-gray-500">
              Upload your bot as a .ipynb file
            </p>
          </div> */}
        </div>
          
          <FileSubmission 
            label="Upload your bot (.ipynb)"
            onSubmit={handleSubmission}
          />
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Submission History</h3>
          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            {submissions.map((submission) => (
              <div key={submission.id} className="border-b last:border-0 p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{submission.filename}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(submission.createdAt.seconds * 1000).toLocaleString()}
                    </p>
                  </div>
                  <Badge 
                    variant={
                      submission.statusCode === 0 ? 'secondary' : 
                      submission.statusCode === 3 ? 'default' : 'destructive'
                    }
                    className={`
                      ${submission.statusCode === 3 ? "bg-green-600 hover:bg-green-700 text-white" : ""}
                      ${(submission.statusCode === 1 || submission.statusCode === 2) ? 
                        "cursor-pointer hover:underline relative pr-2" : ""}
                    `}
                    onClick={() => (submission.statusCode === 1 || submission.statusCode === 2) && setSelectedSubmissionId(submission.id)}
                  >
                    {(submission.statusCode === 1 || submission.statusCode === 2) && submission.traceback && (
                      <MousePointerClick 
                        className="w-5 h-5 absolute -left-2 -bottom-2 text-black rotate-90 drop-shadow-sm" 
                        fill="currentColor"
                      />
                    )}
                    {submission.status}
                  </Badge>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
        

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Team Writeup
            </h3>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              Please provide a writeup for the bot you are submitting at
            </p>
            <p>
              <a href="https://forms.gle/4ZiJa2qRGJYP2EDn6" target="_blank" rel="noopener noreferrer">https://forms.gle/4ZiJa2qRGJYP2EDn6</a>.
            </p>
          </div>
        </div>


        {/* <div className="w-full h-px bg-border my-6 transition-[background-color,border-color] duration-200" /> */}
        
        <Dialog open={!!selectedSubmissionId} onOpenChange={(open) => !open && setSelectedSubmissionId(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Submission Details</DialogTitle>
            </DialogHeader>
            <pre className="whitespace-pre-wrap text-sm max-h-[60vh] overflow-auto">
              {submissions.find(s => s.id === selectedSubmissionId)?.traceback || "No error details available"}
            </pre>
            <div className="flex justify-end">
              <Button onClick={() => setSelectedSubmissionId(null)}>Close</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};