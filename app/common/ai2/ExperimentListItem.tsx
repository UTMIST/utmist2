import { Button } from "@ai2components/ui/button";
import { Video } from "lucide-react";

interface ExperimentListItemProps {
  experiment: {
    id: number;
    date: string;
    result: string;
    videoUrl: string;
    status: string;
  };
  onWatchVideo: (videoUrl: string, id: number) => void;
}

export const ExperimentListItem = ({ experiment, onWatchVideo }: ExperimentListItemProps) => {
  return (
    <div className="flex justify-between items-center p-3 border-b last:border-0 transition-[background-color,border-color] duration-200">
      <div>
        <p className="font-medium">Experiment #{experiment.id}</p>
        <p className="text-sm text-gray-500">{experiment.date}</p>
        <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${
          experiment.status === "pending" ? "bg-yellow-100 text-yellow-800" :
          experiment.status === "ongoing" ? "bg-blue-100 text-blue-800" :
          "bg-green-100 text-green-800"
        }`}>
          {experiment.status}
        </span>
        {experiment.result && (
          <p className="text-sm font-semibold mt-1">Result: {experiment.result}</p>
        )}
      </div>
      {experiment.videoUrl && (
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onWatchVideo(experiment.videoUrl, experiment.id)}
        >
          <Video className="h-4 w-4" />
          Watch
        </Button>
      )}
    </div>
  );
};