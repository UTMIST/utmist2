'use client';

import { FileSubmission } from "@ai2components/FileSubmission";
import { ChallengePanel } from "@ai2components/ChallengePanel";
import { ExperimentPanel } from "@ai2components/ExperimentPanel";
import { TournamentPanel } from "@ai2components/TournamentPanel";
import { Header } from "@ai2/Header";
import { Button } from "@ai2components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@ai2components/ui/card";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ai2components/ui/tooltip";
import { TeamSettings } from "@ai2components/TeamSettings";
import { TeamMembers } from "@ai2components/TeamMembers";
import { signIn, useSession } from "next-auth/react";
import { useFirebase } from "@app/firebase/useFirebase";
import { doc, getDoc, setDoc, updateDoc, collection, getDocs, query, where, deleteDoc } from "firebase/firestore";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@ai2components/ui/dialog";
import { toast } from "@app/common/ai2/ui/use-toast";

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { db } = useFirebase();
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState<string | null>(null);
  const [teamId, setTeamId] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [showDisbandDialog, setShowDisbandDialog] = useState(false);

  useEffect(() => {
    const fetchTeam = async () => {
      console.log("[AI2] Fetching team");
      if (status === 'authenticated' && session?.user?.email && db) {
        try {
          if (!db) {
            console.error('Firestore database not initialized');
            return;
          }

          const registrationDoc = await getDoc(doc(db, 'AI2Registration', session.user.email));
          
          if (registrationDoc.exists()) {
            const teamId = registrationDoc.data().team || null;
            console.log("[AI2] Team name:", teamId);
            setTeamId(teamId);
            if (teamId) {
              const teamDoc = await getDoc(doc(db, "AI2Teams", teamId));
              
              if (!teamDoc.exists()) {
                throw new Error('Team does not exist');
              }

              console.log("[AI2] Team members:", teamDoc.data().members);
              setTeam(teamDoc.data()?.name || null);
              setTeamMembers(teamDoc.data().members || []);
            }
          } else {
            console.log("[AI2] Registering user");
            await setDoc(doc(db, 'AI2Registration', session.user.email), {
              email: session.user.email,
              name: session.user.displayName,
              team: null
            });
            setTeam(null);
          }
        } catch (error) {
          console.error('Error fetching team:', error);
        } finally {
          setLoading(false);
        }
      } else if (status === 'unauthenticated') {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [status, session, db]);

  const disbandTeam = async () => {
    setShowDisbandDialog(false);
    try {
      if (!db || !session?.user?.email || !team) return;

      const teamsQuery = query(
        collection(db, 'AI2Teams'),
        where('name', '==', team)
      );
      const querySnapshot = await getDocs(teamsQuery);
      
      if (querySnapshot.empty) {
        throw new Error('Team does not exist');
      }

      const teamDoc = querySnapshot.docs[0];
      const teamData = teamDoc.data();
      
      // console.log("[AI2] Team captain:", teamData.captain);
      // console.log("[AI2] Current user email:", session.user.email);
      if (teamData.captain !== session.user.email) {
        toast({
          title: "Disbanding team",
          description: "Only the team captain can disband the team",
          variant: "destructive"
        });
        return;
      }

      const members = teamData.members || [];
      
      const updatePromises = members.map(async (member: any) => 
        updateDoc(doc(db, 'AI2Registration', member.email), { team: null })
      );

      await Promise.all([
        ...updatePromises,
        deleteDoc(doc(db, 'AI2Teams', teamDoc.id))
      ]);

      setTeam(null);
      router.push('/ai2/dashboard');
    } catch (error) {
      console.error('Error disbanding team:', error);
      alert(error instanceof Error ? error.message : 'Failed to disband team');
    }
  };

  if (status === 'loading' || loading) {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated' || !session) {
    signIn('google', { callbackUrl: window.location.origin + '/ai2/' });
    return null;
  }

  if (!team) {
    return (
      <div className="min-h-screen bg-background dark:bg-gray-900 transition-colors duration-200">
        <Header />
        <div className="pt-16 p-4">
          <Card className="w-[350px] mx-auto mt-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center dark:text-white">
                Hi, {session?.user?.displayName || 'there'}!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={() => router.push('/ai2/dashboard/join')}
                className="w-full bg-hackathon-primary hover:bg-hackathon-secondary text-white"
              >
                Join Existing Team
              </Button>
              <Button 
                onClick={() => router.push('/ai2/dashboard/create')}
                className="w-full bg-hackathon-secondary hover:bg-hackathon-accent text-white"
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
      <div className="pt-20 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col items-center space-y-4 mt-8">
            <h1 className="text-2xl font-bold text-center dark:text-white">
              Welcome, {team}
            </h1>
            
            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TeamSettings 
                      teamName={team} 
                      teamId={teamId}
                      onSave={(newName) => setTeam(newName)}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit Team</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Dialog open={showDisbandDialog} onOpenChange={setShowDisbandDialog}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => setShowDisbandDialog(true)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Disband Team?</DialogTitle>
                          <DialogDescription>
                            This action is irreversible. All team members will be removed and team data will be permanently deleted.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button 
                            variant="outline"
                            onClick={() => setShowDisbandDialog(false)}
                          >
                            Cancel
                          </Button>
                          <Button 
                            variant="destructive"
                            onClick={disbandTeam}
                          >
                            Confirm Disband
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Disband Team</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <TeamMembers members={teamMembers.map(member => ({ displayName: member.displayName }))} />
          </div>
          {/* Panels grid */}
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