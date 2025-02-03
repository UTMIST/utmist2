import { useState } from "react";
import { Button } from "@ai2components/ui/button";
import { Card, CardContent } from "@ai2components/ui/card";
import { useToast } from "@ai2components/ui/use-toast";

interface FileSubmissionProps {
  label?: string;
}

export const FileSubmission = ({ label = "Upload file (.ipynb)" }: FileSubmissionProps) => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Maximum file size is 10MB",
          variant: "destructive",
        });
        return;
      }
      if (!selectedFile.name.endsWith('.ipynb')) {
        toast({
          title: "Invalid file type",
          description: "Only .ipynb files are allowed",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    
    // TODO: Implement file submission logic
    console.log("Submitting file:", file.name);
    toast({
      title: "File Submission Attempted",
      description: "Backend integration pending",
    });
  };

  return (
    <Card className="w-full max-w-2xl animate-fade-in">
      <CardContent className="pt-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-500">{label}</label>
            <input
              type="file"
              accept=".ipynb"
              onChange={handleFileChange}
              className="w-full"
            />
            <p className="text-xs text-gray-500">
              Maximum file size: 10MB
            </p>
          </div>
          <Button 
            type="submit" 
            disabled={!file}
            className="w-full bg-hackathon-primary hover:bg-hackathon-secondary"
          >
            Submit Entry
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};