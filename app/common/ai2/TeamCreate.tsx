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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { db } = useFirebase();
  const { data: session } = useSession();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!db || !session?.user?.email) {
      toast({
        title: "Error",
        description: "Not authenticated",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    const registrationDoc = await getDoc(doc(db, 'AI2Registration', session.user.email));
    if (registrationDoc.exists() && registrationDoc.data().team) {
        toast({
            title: "Already in team",
            description: "You must leave your current team before creating a new one",
            variant: "destructive"
        });
        setIsSubmitting(false);
        return;
    }

    if (!/^[\p{Emoji}A-Za-z0-9 ]{3,60}$/iu.test(teamName)) {
      toast({
        title: "Invalid team name",
        description: "3-60 characters, only letters, numbers, spaces and emojis",
        variant: "destructive"
      });
      setIsSubmitting(false);
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
        setIsSubmitting(false);
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
        elo: 1200,
        autoAcceptChallenge: false,
        isBanned: false,
        members: [{
          email: session.user.email,
          displayName: session.user.displayName
        }],
        memberEmails: [session.user.email],
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
    } finally {
      setIsSubmitting(false);
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
              maxLength={60}
              onChange={(e) => {
                const val = e.target.value;
                if (!/^[\p{Emoji}A-Za-z0-9 ]+$/iu.test(val)) {
                  toast({
                    title: "Invalid characters",
                    description: "Max 60 chars. Only letters, numbers, spaces and emojis allowed",
                    variant: "destructive"
                  });
                  return;
                }
                setTeamName(val);
              }}
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
          <Button 
            type="submit" 
            className="w-full bg-hackathon-primary hover:bg-hackathon-secondary text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Team"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};