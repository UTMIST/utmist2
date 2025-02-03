'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@ai2components/ui/card";
import { Button } from "@ai2components/ui/button";
import { ScrollArea } from "@ai2components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@ai2components/ui/dialog";
import { Beaker } from "lucide-react";
import { useToast } from "@ai2components/ui/use-toast";
import { VideoPlayer } from "./VideoPlayer";
import { ExperimentListItem } from "./ExperimentListItem";
import { ExperimentSubmissionForm } from "./ExperimentSubmissionForm";

const AZURE_BLOB_BASE_URL = "https://ai2tournament.blob.core.windows.net/gamevideos";
const AZURE_SAS_TOKEN = "sp=r&st=2025-02-02T20:34:53Z&se=2025-02-03T04:34:53Z&sv=2022-11-02&sr=c&sig=4VrKhTHiszoWq9u7ZuO5BIG6GSvwW%2F970lsuVW8te1A%3D";

export const ExperimentPanel = () => {
  const [cooldown, setCooldown] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);
  const [experiments] = useState([
    { 
      id: 1, 
      date: "2024-02-20 15:30", 
      result: "4-1",
      videoUrl: "example_video.mp4",
      status: "complete"
    },
    { 
      id: 2, 
      date: "2024-02-20 15:20", 
      result: "2-3",
      videoUrl: "example_video.mp4",
      status: "ongoing"
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (cooldown > 0) {
        setCooldown(c => c - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const handleNewExperiment = () => {
    if (cooldown > 0) {
      toast({
        title: "Cooldown Active",
        description: `Please wait ${cooldown} seconds before starting a new experiment.`,
        variant: "destructive"
      });
      return;
    }
    setIsDialogOpen(true);
  };

  const handleSubmitExperiment = () => {
    console.log('Submitting experiment...');
    setCooldown(600); // 10 minutes in seconds
    setIsDialogOpen(false);
    toast({
      title: "Experiment Started",
      description: "Your experiment has been submitted and will begin shortly.",
    });
  };

  const getVideoUrl = (videoFileName: string) => {
    const url = `${AZURE_BLOB_BASE_URL}/${videoFileName}?${AZURE_SAS_TOKEN}`;
    console.log('Generated video URL:', url);
    return url;
  };

  const handleWatchVideo = (videoFileName: string, experimentId: number) => {
    const url = getVideoUrl(videoFileName);
    console.log('Opening video with URL:', url);
    setSelectedVideo({
      url,
      title: `Experiment #${experimentId} Recording`
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Beaker className="h-6 w-6" />
          Experiments
        </CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              disabled={cooldown > 0}
              onClick={handleNewExperiment}
            >
              {cooldown > 0 ? `${Math.floor(cooldown / 60)}:${(cooldown % 60).toString().padStart(2, '0')}` : "New Experiment"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Start New Experiment</DialogTitle>
            </DialogHeader>
            <ExperimentSubmissionForm onSubmit={handleSubmitExperiment} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] w-full rounded-md border p-4">
          {experiments.map((experiment) => (
            <ExperimentListItem
              key={experiment.id}
              experiment={experiment}
              onWatchVideo={handleWatchVideo}
            />
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
  );
};