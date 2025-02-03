'use client';

import { FileSubmission } from "@ai2components/FileSubmission";
import { ChallengePanel } from "@ai2components/ChallengePanel";
import { ExperimentPanel } from "@ai2components/ExperimentPanel";
import { TournamentPanel } from "@ai2components/TournamentPanel";
import { Header } from "@ai2/Header";
import { Button } from "@ai2components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@ai2components/ui/card";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const router = useRouter();
  const [teamName, setTeamName] = useState<string | null>(null);

  useEffect(() => {
    // Access localStorage only after component mounts
    const storedTeamName = localStorage.getItem("teamName");
    setTeamName(storedTeamName);
  }, []);

  if (!teamName) {
    return (
      <div className="min-h-screen bg-background dark:bg-gray-900 transition-colors duration-200">
        <Header />
        <div className="pt-16 p-4">
          <Card className="w-[350px] mx-auto mt-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center dark:text-white">
                Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={() => router.push('/ai2/dashboard/join')}
                className="w-full bg-hackathon-primary hover:bg-hackathon-secondary"
              >
                Join Existing Team
              </Button>
              <Button 
                onClick={() => router.push('/ai2/dashboard/create')}
                className="w-full bg-hackathon-secondary hover:bg-hackathon-accent"
              >
                Create New Team
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hackathon-background dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <div className="pt-16 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <h1 className="text-2xl font-bold text-center dark:text-white mt-4">
            Team {teamName}
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TournamentPanel />
            <div className="space-y-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-background dark:bg-gray-900 px-3 text-sm text-gray-500 dark:text-gray-400 transition-[background-color,border-color] duration-200">
                    Challenges & Experiments
                  </span>
                </div>
              </div>
              <ChallengePanel />
              <ExperimentPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;