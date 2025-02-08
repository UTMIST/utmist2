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
import React from "react";
import { useFirebase } from "@app/firebase/useFirebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { generateRandomCode } from "@ai2/utils/generateRandomCode";
import { Switch } from "@ai2components/ui/switch";

export const TeamSettings: React.ForwardRefExoticComponent<
  { 
    teamName: string | null; 
    teamId: string | null;
    onSave?: (newName: string) => void;
    currentJoinCode: string;
    setJoinCode: (newCode: string) => void;
    currentAutoAcceptChallenge: boolean;
  } & React.RefAttributes<HTMLButtonElement>
> = React.forwardRef(({ teamName, teamId, onSave, currentJoinCode, setJoinCode, currentAutoAcceptChallenge }, ref) => {
  const { toast } = useToast();
  const { db } = useFirebase();
  const router = useRouter();
  const [newTeamName, setNewTeamName] = useState(teamName || "");
  const [website, setWebsite] = useState("");
  const [repolink, setRepolink] = useState("");
  const [autoAcceptChallenge, setAutoAcceptChallenge] = useState(currentAutoAcceptChallenge || false);

  const handleSaveTeamSettings = async () => {
    if (!teamId || !db) {
      toast({
        title: "Error",
        description: "No team found",
        variant: "destructive"
      });
      return;
    }

    try {
      const teamRef = doc(db, "AI2Teams", teamId);
      const teamSnap = await getDoc(teamRef);
      
      if (!teamSnap.exists()) {
        throw new Error("Team does not exist");
      }

      const teamData = teamSnap.data();
      const updateData: any = {};

      if (newTeamName && newTeamName !== teamData.name) {
        updateData.name = newTeamName;
      }
      if (website && website !== teamData.website) {
        updateData.website = website;
      }
      if (repolink && repolink !== teamData.repolink) {
        updateData.repolink = repolink;
      }
      if (autoAcceptChallenge !== teamData.autoAcceptChallenge) {
        updateData.autoAcceptChallenge = autoAcceptChallenge;
      }

      if (Object.keys(updateData).length > 0) {
        await updateDoc(teamRef, updateData);
        toast({
          title: "Settings saved",
          description: "Your team settings have been updated successfully.",
        });
        if (onSave && updateData.name) {
          onSave(updateData.name);
        }
      } else {
        toast({
          title: "No changes",
          description: "No changes were made to the team settings.",
        });
      }

    } catch (error) {
      console.error("Error saving team settings:", error);
      toast({
        title: "Error saving settings",
        description: error instanceof Error ? error.message : "Failed to update team settings",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          ref={ref}
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
        >
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
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Your team's website"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="repolink">Repo Link</Label>
            <Input
              id="repolink"
              value={repolink}
              onChange={(e) => setRepolink(e.target.value)}
              placeholder="https://github.com/your-team"
              pattern="^https?://github.com/.*"
              title="Must be a valid GitHub URL"
            />
          </div>
          <div className="grid gap-2">
            <Label>Current Join Code</Label>
            <div className="font-mono p-2 bg-accent rounded">{currentJoinCode}</div>
          </div>
          <div className="flex items-center gap-4">
            <Label htmlFor="autoAcceptChallenge">Auto Accept Challenges</Label>
            <Switch
              id="autoAcceptChallenge"
              checked={autoAcceptChallenge}
              onCheckedChange={setAutoAcceptChallenge}
            />
          </div>
          <div className="grid gap-2">
            <Button 
              variant="destructive"
              onClick={async () => {
                const newCode = generateRandomCode();
                const teamRef = doc(db, "AI2Teams", teamId!);
                await updateDoc(teamRef, { joinCode: newCode });
                setJoinCode(newCode);
                toast({ title: "Join code regenerated!" });
              }}
            >
              Regenerate Join Code
            </Button>
          </div>
          <Button onClick={handleSaveTeamSettings}>Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
});