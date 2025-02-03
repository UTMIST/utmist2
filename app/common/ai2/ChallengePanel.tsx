'use client'

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@ai2components/ui/card";
import { Button } from "@ai2components/ui/button";
import { ScrollArea } from "@ai2components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@ai2components/ui/dialog";
import { Input } from "@ai2components/ui/input";
import { Swords, Upload, Video } from "lucide-react";
import { FileSubmission } from "./FileSubmission";
import { VideoPlayer } from "./VideoPlayer";
import AI2Layout from './layouts/AI2Layout'

const AZURE_BLOB_BASE_URL = "https://ai2tournament.blob.core.windows.net/gamevideos";
const AZURE_SAS_TOKEN = "sp=r&st=2025-02-02T20:34:53Z&se=2025-02-03T04:34:53Z&sv=2022-11-02&sr=c&sig=4VrKhTHiszoWq9u7ZuO5BIG6GSvwW%2F970lsuVW8te1A%3D";

export const ChallengePanel = () => {
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);
  const [challenges] = useState([
    { 
      id: 1, 
      status: "pending", 
      opponent: "Team Alpha", 
      code: "ABC123",
      result: null,
      videoUrl: null,
      entryName: null,
      opponentEntryName: null
    },
    { 
      id: 2, 
      status: "ongoing", 
      opponent: "Team Beta", 
      code: "XYZ789",
      result: null,
      videoUrl: null,
      entryName: "BattleBot9000",
      opponentEntryName: "DestroyerBot"
    },
    { 
      id: 3, 
      status: "complete", 
      opponent: "Team Gamma", 
      code: "DEF456",
      result: "3-2",
      videoUrl: "/match-replay.mp4",
      entryName: "UltraBot3000",
      opponentEntryName: "MegaBot5000"
    },
  ]);

  const getVideoUrl = (videoFileName: string) => {
    const url = `${AZURE_BLOB_BASE_URL}/${videoFileName}?${AZURE_SAS_TOKEN}`;
    console.log('Generated video URL:', url);
    return url;
  };

  return (
    <AI2Layout>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Swords className="h-6 w-6" />
            Challenges
          </CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button>New Challenge</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Challenge</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p>Challenge code: XYZ789</p>
                <p>Share this code with the team you want to challenge!</p>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="flex justify-between items-center p-3 border-b last:border-0 transition-[background-color,border-color] duration-200"
              >
                <div>
                  <p className="font-medium">vs {challenge.opponent}</p>
                  <p className="text-sm text-gray-500">Code: {challenge.code}</p>
                  {challenge.entryName && (
                    <div className="flex gap-2 text-sm text-gray-500">
                      <span>Your Bot: {challenge.entryName}</span>
                      {challenge.opponentEntryName && (
                        <span>• Opponent: {challenge.opponentEntryName}</span>
                      )}
                    </div>
                  )}
                  <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                    challenge.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                    challenge.status === "ongoing" ? "bg-blue-100 text-blue-800" :
                    "bg-green-100 text-green-800"
                  }`}>
                    {challenge.status}
                  </span>
                  {challenge.result && (
                    <p className="text-sm font-semibold mt-1">Result: {challenge.result}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {challenge.status === "pending" && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Submit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Submit Challenge Entry</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Entry Name</label>
                            <Input placeholder="Enter your bot's name" />
                          </div>
                          <FileSubmission label="Upload your bot (.ipynb)" />
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                  {challenge.videoUrl && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const url = getVideoUrl(challenge.videoUrl);
                        console.log('Opening video with URL:', url);
                        setSelectedVideo({
                          url,
                          title: `Challenge vs ${challenge.opponent} Recording`
                        });
                      }}
                    >
                      <Video className="h-4 w-4" />
                      Watch
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        {selectedVideo && (
          <VideoPlayer
            isOpen={!!selectedVideo}
            onClose={() => setSelectedVideo(null)}
            videoUrl={selectedVideo.url}
            title={selectedVideo.title}
          />
        )}
      </Card>
    </AI2Layout>
  );
};