import { useState, useEffect } from "react";
import { Button } from "@ai2components/ui/button";
import { Input } from "@ai2components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@ai2components/ui/card";
import { useToast } from "@ai2components/ui/use-toast";
import { doc, setDoc, getDoc, updateDoc, getDocs, where, query, collection } from "firebase/firestore";
import { useFirebase } from "@app/firebase/useFirebase";
import { useSession } from "next-auth/react";
import { generateRandomCode } from "@ai2/utils/generateRandomCode";

interface TeamCreateProps {
  onTeamCreated: (teamName: string) => void;
}

export const TeamCreate = ({ onTeamCreated }: TeamCreateProps) => {
  const [teamName, setTeamName] = useState("");
  const { toast } = useToast();
  const { db } = useFirebase();
  const { data: session } = useSession();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!db || !session?.user?.email) {
      toast({
        title: "Error",
        description: "Not authenticated",
        variant: "destructive"
      });
      return;
    }

    try {
      const teamsQuery = query(
        collection(db, 'AI2Teams'),
        where('name', '==', teamName)
      );
      const querySnapshot = await getDocs(teamsQuery);

      if (!querySnapshot.empty) {
        toast({
          title: "Team exists",
          description: "This team name is already taken",
          variant: "destructive"
        });
        return;
      }

      const teamRef = doc(collection(db, 'AI2Teams'));
      await setDoc(teamRef, {
        name: teamName,
        joinCode: generateRandomCode(),
        createdAt: new Date(),
        lastSubmitted: null,
        wins: 0,
        losses: 0,
        draws: 0,
        openToChallenge: true,
        isBanned: false,
        members: [{
          email: session.user.email,
          displayName: session.user.displayName
        }],
        captain: session.user.email,
        captainDisplayName: session.user.displayName,
      });

      await updateDoc(doc(db, 'AI2Registration', session.user.email), {
        team: teamRef.id
      });

      toast({
        title: "Team Created Successfully",
        description: `You are now the captain of ${teamName}`,
      });
      
      onTeamCreated(teamName);
    } catch (error) {
      console.error('Team creation error:', error);
      toast({
        title: "Creation failed",
        description: "Could not create team",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="w-[350px] animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-hackathon-text dark:text-white">
          Create Team
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
              className="w-full transition-colors duration-200"
            />
          </div>
          {/* <div className="space-y-2">
            <Input
              type="text"
              placeholder="Join Code"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              required
              className="w-full transition-colors duration-200 font-mono"
            />
          </div> */}
          <Button type="submit" className="w-full bg-hackathon-primary hover:bg-hackathon-secondary text-white">
            Create Team
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};