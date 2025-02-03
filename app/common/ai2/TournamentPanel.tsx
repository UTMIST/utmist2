'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@ai2components/ui/card";
import { ScrollArea } from "@ai2components/ui/scroll-area";
import { Trophy, FileText } from "lucide-react";
import { FileSubmission } from "./FileSubmission";
import { Button } from "@ai2components/ui/button";
import { useState, useEffect } from "react";
import { Badge } from "@ai2components/ui/badge";

export const TournamentPanel = () => {
  const [writeupFile, setWriteupFile] = useState<File | null>(null);
  const [submissionsLeft, setSubmissionsLeft] = useState(5);
  const [timeUntilReset, setTimeUntilReset] = useState("");
  
  const submissions = [
    { id: 1, filename: "submission1.ipynb", date: "2024-02-20", status: "accepted" },
    { id: 2, filename: "submission2.ipynb", date: "2024-02-19", status: "validating" },
  ];

  useEffect(() => {
    const updateTimeUntilReset = () => {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeUntilReset(`${hours}h ${minutes}m`);
    };

    updateTimeUntilReset();
    const interval = setInterval(updateTimeUntilReset, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const handleWriteupUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith('.md')) {
      setWriteupFile(file);
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
            <span className="text-sm text-muted-foreground">Daily Submissions Left: {submissionsLeft}/5</span>
            <span className="text-sm text-muted-foreground">Resets in: {timeUntilReset}</span>
          </div>
          <FileSubmission />
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Submission History</h3>
          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="flex justify-between items-center p-3 border-b last:border-0 transition-[background-color,border-color] duration-200"
              >
                <div>
                  <p className="font-medium">{submission.filename}</p>
                  <p className="text-sm text-gray-500">{submission.date}</p>
                </div>
                <Badge variant={submission.status === "accepted" ? "default" : "secondary"} className={
                  submission.status === "accepted" ? "bg-green-100 text-green-800 hover:bg-green-100" : 
                  "bg-blue-100 text-blue-800 hover:bg-blue-100"
                }>
                  {submission.status}
                </Badge>
              </div>
            ))}
          </ScrollArea>
        </div>
        
        <div className="w-full h-px bg-border my-6 transition-[background-color,border-color] duration-200" />
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Team Writeup
            </h3>
          </div>
          <div className="space-y-2">
            <input
              type="file"
              accept=".md"
              onChange={handleWriteupUpload}
              className="w-full text-sm text-foreground file:mr-4 file:py-2 file:px-4 
                file:rounded-md file:border-0 file:text-sm file:font-semibold
                file:bg-secondary file:text-secondary-foreground
                hover:file:bg-secondary/90
                dark:file:bg-gray-800 dark:file:text-gray-300
                dark:hover:file:bg-gray-700
                file:cursor-pointer cursor-pointer"
            />
            <p className="text-sm text-gray-500">
              Upload your team&#39;s writeup as a Markdown (.md) file
            </p>
            {writeupFile && (
              <p className="text-sm text-green-600">
                Current writeup: {writeupFile.name}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};