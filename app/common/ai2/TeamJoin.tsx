import { useState } from "react";
import { Button } from "@ai2components/ui/button";
import { Input } from "@ai2components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@ai2components/ui/card";
import { useToast } from "@ai2components/ui/use-toast";
import { useFirebase } from "@app/firebase/useFirebase";
import { useSession } from "next-auth/react";

interface TeamJoinProps {
  onTeamJoined: (teamName: string, password: string) => Promise<void>;
}

export const TeamJoin = ({ onTeamJoined }: TeamJoinProps) => {
  const [teamName, setTeamName] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const { db } = useFirebase();
  const { data: session } = useSession();

  const handleJoin = async (e: React.FormEvent) => {
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
      await onTeamJoined(teamName, password)
        .catch(error => {
          throw error;
        });
      
      toast({
        title: "Team Joined Successfully",
        description: `You have joined team ${teamName}`,
      });
    } catch (error) {
      toast({
        title: "Join Failed",
        description: error instanceof Error ? error.message : "Could not join team",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="w-[350px] animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-hackathon-text dark:text-white">
          Join Team
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleJoin} className="space-y-4">
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
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Team Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full transition-colors duration-200"
            />
          </div>
          <Button type="submit" className="w-full bg-hackathon-primary hover:bg-hackathon-secondary text-white">
            Join Team
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};