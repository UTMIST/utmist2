'use client';

// import { FileSubmission } from "@ai2components/FileSubmission";
import { ChallengePanel } from "@ai2components/ChallengePanel";
// import { ExperimentPanel } from "@ai2components/ExperimentPanel";
import { TournamentPanel } from "@ai2components/TournamentPanel";
import { Header } from "@ai2/Header";
import { Button } from "@ai2components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@ai2components/ui/card";
import { Trash2, Copy } from "lucide-react";
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
import { getAuth, onAuthStateChanged, signInWithCustomToken } from "firebase/auth";
import { useNotifications } from "@app/context/NotificationsContext";

const auth = getAuth();

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { db } = useFirebase();
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState<string | null>(null);
  const [teamId, setTeamId] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [showDisbandDialog, setShowDisbandDialog] = useState(false);
  const [isCaptain, setIsCaptain] = useState(false);
  const { notifications, addNotification, markRead } = useNotifications();
  const [revealCode, setRevealCode] = useState(false);
  const [joinCode, setJoinCode] = useState("");

  useEffect(() => {
    async function firebaseSignIn() {
      try {
        const response = await fetch("/api/firebaseToken");
        if (!response.ok) throw new Error("Failed to fetch custom token");
        const data = await response.json();
        await signInWithCustomToken(auth, data.token);
        console.log("Firebase sign-in successful");
      } catch (error) {
        console.error("Error during Firebase sign-in:", error);
      }
    }

    if (session) {
      firebaseSignIn();
    }
  }, [session]);

  useEffect(() => {
    const fetchTeam = async () => {
      console.log("[AI2] Fetching team");
      if (status === 'authenticated' && session?.user?.email && db) {
        try {
          if (!db) {
            console.error('Firestore database not initialized');
            return;
          }

          // const token = await auth.currentser?.getIdTokenResult();
          // console.log("Decoded token:", token, session.user.email);
          // console.log("Token email:", token?.claims.email);
          // console.log("[AI2] Fetching registration doc", session.user.email);
          const registrationDoc = await getDoc(doc(db, 'AI2Registration', session.user.email));
          // console.log("[AI2] Registration doc:", registrationDoc.data());
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
              const teamData = teamDoc.data();
              setTeam(teamData?.name || null);
              setTeamMembers(teamData.members || []);
              setIsCaptain(teamData.captain === session?.user?.email);
              setJoinCode(teamData.joinCode || "");
            }
          } else {
            console.log("[AI2] Registering user", session.user.email);
            await setDoc(doc(db, 'AI2Registration', session.user.email), {
              email: session.user.email,
              name: session.user.displayName,
              team: null
            });
            // console.log("[AI2] Registered user");
            setTeam(null);
          }
        } catch (error) {
          // console.error('Error fetching team:', error);
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


      // addNotification({
      //   title: "Team Disbanded",
      //   description: "Your team has been successfully disbanded",
      //   actionText: "Create New",
      //   onAction: () => router.push('/ai2/dashboard/create')
      // });

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
      // addNotification({
      //   title: "Team Disbanded",
      //   description: "Your team has been successfully disbanded",
      //   actionText: "Create New",
      //   onAction: () => router.push('/ai2/dashboard/create')
      // });
    } catch (error) {
      console.error('Error disbanding team:', error);
      // addNotification({
      //   title: "Disband Failed",
      //   description: error instanceof Error ? error.message : "Failed to disband team"
      // });
    }
  };

  const leaveTeam = async () => {
    try {
      if (!db || !session?.user?.email || !teamId) return;
      
      const teamRef = doc(db, 'AI2Teams', teamId);
      await updateDoc(teamRef, {
        members: teamMembers.filter(member => member.email !== session.user?.email)
      });

      await updateDoc(doc(db, 'AI2Registration', session.user.email), {
        team: null
      });

      setTeam(null);
      router.push('/ai2/dashboard');
      addNotification({
        title: "Left Team",
        description: "You've successfully left the team",
        actionText: "Join New",
        onAction: () => router.push('/ai2/dashboard/join')
      });
    } catch (error) {
      console.error('Error leaving team:', error);
      addNotification({
        title: "Leave Failed",
        description: error instanceof Error ? error.message : "Failed to leave team"
      });
    }
  };

  const handleKickMember = async (memberEmail: string) => {
    if (!db || !teamId || !isCaptain) return;

    try {
      const teamRef = doc(db, "AI2Teams", teamId);
      const teamDoc = await getDoc(teamRef);
      
      if (teamDoc.data()?.captain !== session?.user?.email) {
        throw new Error("Only the captain can kick members");
      }

      if (memberEmail === session?.user?.email) {
        toast({
          title: "Kick Failed",
          description: "You cannot kick yourself",
          variant: "destructive"
        });
        return;
      }
      await updateDoc(teamRef, {
        members: teamMembers.filter(m => m.email !== memberEmail),
        memberCount: teamMembers.length - 1
      });

      await updateDoc(doc(db, 'AI2Registration', memberEmail), {
        team: null
      });

      setTeamMembers(prev => prev.filter(m => m.email !== memberEmail));
      toast({ title: "Member kicked successfully" });
    } catch (error) {
      console.error('Kick failed:', error);
      toast({
        title: "Kick failed",
        description: error instanceof Error ? error.message : "Could not kick member",
        variant: "destructive"
      });
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
                    {isCaptain ? (
                      <Dialog open={showDisbandDialog} onOpenChange={setShowDisbandDialog}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
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
                    ) : (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Leave Team?</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to leave this team?
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
                              onClick={leaveTeam}
                            >
                              Confirm Leave
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isCaptain ? "Disband Team" : "Leave Team"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <TeamMembers 
              members={teamMembers} 
              onKick={handleKickMember}
              isCaptain={isCaptain}
              session={session}
            />

            {/* {isCaptain && ( */}
            {true && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-muted-foreground">Join Code:</span>
                <div className="relative flex items-center gap-1">
                  <div
                    className={`font-mono cursor-pointer p-1 rounded ${!revealCode ? 'bg-black text-black' : 'bg-transparent'}`}
                    onClick={() => {
                      setRevealCode(!revealCode);
                    }}
                  >
                    {revealCode ? joinCode : '••••••'}
                  </div>
                  {revealCode ?
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(joinCode);
                      toast({ title: "Join code copied to clipboard!" });
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  : null}
                </div>
              </div>
            )}
          </div>
          {/* Panels grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TournamentPanel teamId={teamId || ""} />
            <div className="space-y-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-background dark:bg-gray-900 px-3 text-sm text-gray-500 dark:text-gray-400 transition-[background-color,border-color] duration-200">
                    Challenges
                  </span>
                </div>
              </div>
              <ChallengePanel />
              {/* <ExperimentPanel /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;