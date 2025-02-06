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
import { hashPassword, comparePassword } from "@app/common/ai2/utils/auth";

export const TeamSettings: React.ForwardRefExoticComponent<
  { 
    teamName: string | null; 
    teamId: string | null;
    onSave?: (newName: string) => void;
  } & React.RefAttributes<HTMLButtonElement>
> = React.forwardRef(({ teamName, teamId, onSave }, ref) => {
  const { toast } = useToast();
  const { db } = useFirebase();
  const router = useRouter();
  const [newTeamName, setNewTeamName] = useState(teamName || "");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [website, setWebsite] = useState("");
  const [affiliation, setAffiliation] = useState("");

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

      if (!(await comparePassword(currentPassword, teamSnap.data().password))) {
      // if (teamSnap.data().password !== await hashPassword(currentPassword)) {
        toast({
          title: "Password mismatch",
          description: "Current password does not match our records",
          variant: "destructive"
        });
        return;
      }

      const teamData = teamSnap.data();
      const updateData: any = {};

      if (newTeamName && newTeamName !== teamData.name) {
        updateData.name = newTeamName;
      }
      if (website && website !== teamData.website) {
        updateData.website = website;
      }
      if (affiliation && affiliation !== teamData.affiliation) {
        updateData.affiliation = affiliation;
      }
      if (newPassword) {
        updateData.password = newPassword;
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
              placeholder="https://github.com/your-team"
              pattern="^https?://github.com/.*"
              title="Must be a valid GitHub URL"
            />
          </div>
          <Button onClick={handleSaveTeamSettings}>Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
});