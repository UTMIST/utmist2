import { Button } from "@ai2components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ai2components/ui/dialog";
import { Input } from "@ai2components/ui/input";
import { Label } from "@ai2components/ui/label";
import { Settings2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@ai2components/ui/use-toast";

export const TeamSettings = ({ teamName }: { teamName: string | null }) => {
  const { toast } = useToast();
  const [newTeamName, setNewTeamName] = useState(teamName || "");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [website, setWebsite] = useState("");
  const [affiliation, setAffiliation] = useState("");

  const handleSaveTeamSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your team settings have been updated successfully.",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Settings2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Team</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="teamName">Team Name</Label>
            <Input
              id="teamName"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              placeholder="Your team's public name shown to other competitors"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="newPassword">New Team Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Set a new team join password"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="currentPassword">Confirm Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Provide your current team password"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Your team's website"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="affiliation">Affiliation</Label>
            <Input
              id="affiliation"
              value={affiliation}
              onChange={(e) => setAffiliation(e.target.value)}
              placeholder="Your team's affiliation"
            />
          </div>
          <Button onClick={handleSaveTeamSettings}>Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};