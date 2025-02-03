import { useState } from "react";
import { Button } from "@ai2components/ui/button";
import { Input } from "@ai2components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@ai2components/ui/card";
import { useToast } from "@ai2components/ui/use-toast";
import { Trophy, Target } from "lucide-react";

export const ChallengeSystem = () => {
  const [challengeCode, setChallengeCode] = useState("");
  const { toast } = useToast();

  const handleChallenge = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Accessing challenge:", challengeCode);
    
    // Validate challenge code format
    if (!/^[A-Z0-9]{6}$/.test(challengeCode)) {
      toast({
        title: "Invalid Challenge Code",
        description: "Challenge code must be 6 characters (letters and numbers)",
        variant: "destructive"
      });
      return;
    }

    // TODO: Implement actual challenge logic with backend
    toast({
      title: "Challenge Accepted!",
      description: `Joining challenge room: ${challengeCode}`,
    });
  };

  const generateChallengeCode = () => {
    // Generate a random 6-character code using letters and numbers
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setChallengeCode(code); // Auto-fill the input with the generated code
    toast({
      title: "Challenge Code Generated",
      description: `Share this code with your opponent: ${code}`,
    });
  };

  return (
    <Card className="w-full max-w-2xl animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-hackathon-text flex items-center justify-center gap-2">
          <Trophy className="h-6 w-6" />
          Challenge System
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Button 
            onClick={generateChallengeCode}
            className="w-full bg-hackathon-secondary hover:bg-hackathon-accent flex items-center justify-center gap-2"
          >
            <Target className="h-5 w-5" />
            Generate Challenge Code
          </Button>
        </div>
        <form onSubmit={handleChallenge} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter Challenge Code"
              value={challengeCode}
              onChange={(e) => setChallengeCode(e.target.value.toUpperCase())}
              pattern="[A-Z0-9]{6}"
              maxLength={6}
              required
              className="w-full text-center text-xl tracking-wider font-mono"
            />
            <p className="text-sm text-gray-500 text-center">
              Enter a 6-character code to join a challenge
            </p>
          </div>
          <Button 
            type="submit"
            className="w-full bg-hackathon-primary hover:bg-hackathon-secondary"
          >
            Join Challenge
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};