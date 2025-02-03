import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@ai2components/ui/dialog";
import { Button } from "@ai2components/ui/button";
import { Download } from "lucide-react";

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

export const VideoPlayer = ({ isOpen, onClose, videoUrl, title }: VideoPlayerProps) => {
  const handleDownload = () => {
    console.log('Downloading video from URL:', videoUrl);
    window.open(videoUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>{title}</span>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </DialogTitle>
        </DialogHeader>
        <div className="aspect-video w-full">
          <video
            className="w-full h-full"
            controls
            src={videoUrl}
            onError={(e) => {
              console.error('Video playback error:', e);
              console.log('Failed video URL:', videoUrl);
            }}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </DialogContent>
    </Dialog>
  );
};