import { useState } from "react";
import { Button } from "@ai2components/ui/button";
import { Card, CardContent } from "@ai2components/ui/card";
import { useToast } from "@ai2components/ui/use-toast";

interface FileSubmissionProps {
  label?: string;
  onSubmit: (file: File) => Promise<void>;
  text?: string;
  allowedExtensions?: string[];
}

export const FileSubmission = ({ 
  label = "Upload file (.ipynb or .py)",
  onSubmit,
  text = "",
  allowedExtensions = ['.ipynb', '.py']
}: FileSubmissionProps) => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 2 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Maximum file size is 2MB",
          variant: "destructive",
        });
        return;
      }
      if (!allowedExtensions.some(ext => selectedFile.name.endsWith(ext))) {
        toast({
          title: "Invalid file type",
          description: `Only ${allowedExtensions.join(', ')} files are allowed`,
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({ title: "No file selected", variant: "destructive" });
      return;
    }


    try {
      await onSubmit(file);
      toast({ title: "Submission received!", description: "Your entry is being processed" });
      setFile(null);
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive"
      });
    };
  };

  return (
    <Card className="w-full max-w-2xl animate-fade-in">
      <CardContent className="pt-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">{label}</label>
            <input
              type="file"
              accept={allowedExtensions.join(', ')}
              onChange={handleFileChange}
              className="w-full text-sm text-foreground file:mr-4 file:py-2 file:px-4 
                file:rounded-md file:border-0 file:text-sm file:font-semibold
                file:bg-secondary file:text-secondary-foreground
                hover:file:bg-secondary/90
                dark:file:bg-gray-800 dark:file:text-gray-300
                dark:hover:file:bg-gray-700
                file:cursor-pointer cursor-pointer transition-colors duration-200"
            />
            <p className="text-xs text-muted-foreground">
              Maximum file size: 2MB
            </p>
          </div>
          <Button 
            type="submit" 
            disabled={!file}
            variant="default"
            className="w-full bg-hackathon-primary hover:bg-hackathon-secondary text-white dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
          >
            Submit Entry
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};