import { useState } from "react";
import { Button } from "@ai2components/ui/button";
import { Input } from "@ai2components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@ai2components/ui/card";
import { useToast } from "@ai2components/ui/use-toast";

interface TeamJoinProps {
  onTeamJoined: (teamName: string) => void;
}

export const TeamJoin = ({ onTeamJoined }: TeamJoinProps) => {
  const [teamName, setTeamName] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual team join logic with backend
    console.log("Joining team:", teamName);
    toast({
      title: "Team Joined Successfully",
      description: `You have joined team ${teamName}`,
    });
    onTeamJoined(teamName);
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