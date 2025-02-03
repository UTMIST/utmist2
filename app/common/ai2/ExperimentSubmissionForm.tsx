import { Button } from "@ai2components/ui/button";
import { FileSubmission } from "./FileSubmission";

interface ExperimentSubmissionFormProps {
  onSubmit: () => void;
}

export const ExperimentSubmissionForm = ({ onSubmit }: ExperimentSubmissionFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium mb-2">Bot A</p>
        <FileSubmission label="Upload bot A (.ipynb)" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Bot B</p>
        <FileSubmission label="Upload bot B (.ipynb)" />
      </div>
      <Button onClick={onSubmit} className="w-full">
        Submit Experiment
      </Button>
    </div>
  );
};