import { useState } from "react";
import { Button } from "@ai2components/ui/button";
import { Input } from "@ai2components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@ai2components/ui/card";
import { useToast } from "@ai2components/ui/use-toast";

interface TeamCreateProps {
  onTeamCreated: (teamName: string) => void;
}

export const TeamCreate = ({ onTeamCreated }: TeamCreateProps) => {
  const [teamName, setTeamName] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual team creation logic with backend
    console.log("Creating team:", teamName);
    toast({
      title: "Team Created Successfully",
      description: `You are now the captain of team ${teamName}`,
    });
    onTeamCreated(teamName);
  };

  return (
    <Card className="w-[350px] animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-hackathon-text">
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
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Set Team Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full bg-hackathon-primary hover:bg-hackathon-secondary">
            Create Team
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};