'use client'

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@ai2components/ui/card";
import { Button } from "@ai2components/ui/button";
import { ScrollArea } from "@ai2components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@ai2components/ui/dialog";
import { Input } from "@ai2components/ui/input";
import { Swords, Upload, Video } from "lucide-react";
import { FileSubmission } from "./FileSubmission";
import { VideoPlayer } from "./VideoPlayer";
import AI2Layout from './layouts/AI2Layout'
import { getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { query } from "firebase/firestore";
import { collection, or, setDoc } from "firebase/firestore";
import { doc, getDoc, where } from "firebase/firestore";
import { useFirebase } from "@app/firebase/useFirebase";
import { useSession } from "next-auth/react";
import { Badge } from "@ai2components/ui/badge";
import { AI2Team } from "@app/schema/ai2team";
import { AI2Challenge } from "@app/schema/ai2challenge";
import { toast } from "@app/common/ai2/ui/use-toast";
import { useNotifications } from "@app/context/NotificationsContext";

export const ChallengePanel = () => {
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);
  const { db } = useFirebase();
  const { data: session, status: sessionStatus } = useSession();
  const [challenges, setChallenges] = useState<AI2Challenge[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTeams, setFilteredTeams] = useState<AI2Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<AI2Team | null>(null);
  const [teamId, setTeamId] = useState<string>('');
  const { notifications, addNotification, markRead, markInteracted } = useNotifications();
  
  const fetchChallenges = async () => {
    if (!db || !session?.user?.email) return;
    
    const teamDoc = await getDoc(doc(db, 'AI2Registration', session.user.email));
    const teamId = teamDoc.data()?.team;
    
    if (!teamId) return;

    // console.log("[AI2] Fetching challenges for team:", teamId);
    const challengesQuery = query(
      collection(db, 'AI2Challenges'),
      or(
        where('team1', '==', teamId),
        where('team2', '==', teamId)
      )
    );
    // console.log("[AI2] Challenges query:", challengesQuery);

    const querySnapshot = await getDocs(challengesQuery);
    // console.log("[AI2] Challenges query snapshot:", querySnapshot.docs);
    const challengesData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      team1: doc.data().team1,
      team2: doc.data().team2,
      status: doc.data().status,
      createdAt: doc.data().createdAt,
      videoUrl: doc.data().videoUrl,
      result: doc.data().result,
      entryName: doc.data().entryName || null,
      opponentEntryName: doc.data().opponentEntryName || null,
      statusCode: doc.data().statusCode || 0
    } as AI2Challenge)).sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
    
    setChallenges(challengesData);
    setTeamId(teamId || '');
  };

  useEffect(() => {
    fetchChallenges();
  }, [db, session]);

  useEffect(() => {
    const searchTeams = async () => {
      if (!db) return;
      
      const teamsQuery = query(
        collection(db, 'AI2Teams'),
      );
      
      const snapshot = await getDocs(teamsQuery);
      const allOpenTeams = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        createdAt: doc.data().createdAt,
        lastSubmitted: doc.data().lastSubmitted || null,
        wins: doc.data().wins || 0,
        losses: doc.data().losses || 0,
        draws: doc.data().draws || 0,
        elo: doc.data().elo || 1200,
        autoAcceptChallenge: doc.data().autoAcceptChallenge,
        isBanned: doc.data().isBanned || false,
        captainDisplayName: doc.data().captainDisplayName,
        members: doc.data().members || [],
        memberEmails: doc.data().memberEmails || [],
        repolink: doc.data().repolink || ''
      }));

      const filtered = allOpenTeams.filter(team =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFilteredTeams(filtered);
    };
    
    searchTeams();
  }, [searchQuery, db]);

  const handleCreateChallenge = async () => {
    if (!selectedTeam || !db || !teamId) return;

    if (selectedTeam.id === teamId) {
      toast({ title: "Invalid Challenge", description: "You can't challenge your own team", variant: "destructive" });
      return;
    }

    try {
      const [challengerSubs] = await Promise.all([
        getDocs(query(collection(db, 'AI2Submissions'), 
          where('team', '==', teamId), 
          where('statusCode', '==', 3)))
      ]);

      if (challengerSubs.empty) {
        toast({
          title: "Missing Submission",
          description: "Both teams must have valid submissions to challenge",
          variant: "destructive"
        });
        return;
      }

      const receiverTeamDoc = await getDoc(doc(db, 'AI2Teams', selectedTeam.id));
      const autoAccept = receiverTeamDoc.data()?.autoAcceptChallenge ?? false;

      if (autoAccept) {
        const challengeRef = doc(collection(db, 'AI2Challenges'));
        await setDoc(challengeRef, {
          team1: teamId,
          team2: selectedTeam.id,
          status: 'ongoing',
          createdAt: new Date(),
          videoUrl: null,
          result: null,
          entryName: "HI",
          opponentEntryName: "HI",
          statusCode: 0
        });
        toast({ title: "Challenge Started!", description: "Match has been automatically accepted" });
      } else {
        const existingRequestQuery = query(
          collection(db, 'AI2ChallengeRequests'),
          where('challengerTeam', '==', teamId),
          where('receiverTeam', '==', selectedTeam.id),
          where('status', '==', 'pending')
        );
        
        const existingSnapshot = await getDocs(existingRequestQuery);

        if (!existingSnapshot.empty) {
          const existingChallenge = existingSnapshot.docs[0].data();
          const challengeAge = Date.now() - existingChallenge.createdAt.toDate().getTime();
          const fiveMinutes = 5 * 60 * 1000;

          if (challengeAge < fiveMinutes) {
            toast({
              title: "Challenge Cooldown",
              description: "Please wait 5 minutes before challenging this team again",
              variant: "destructive"
            });
            return;
          } else {
            await updateDoc(existingSnapshot.docs[0].ref, {
              createdAt: new Date()
            });
            toast({
              title: "Challenge Updated!",
              description: `Challenge to ${selectedTeam.name} has been renewed`,
            });
            return;
          }
        }

        const challengerTeamDoc = await getDoc(doc(db, 'AI2Teams', teamId));
        const challengerTeamName = challengerTeamDoc.data()?.name || 'Unknown Team';

        const challengeRef = doc(collection(db, 'AI2ChallengeRequests'));
        await setDoc(challengeRef, {
          challengerTeam: teamId,
          challengerTeamName,
          receiverTeam: selectedTeam.id,
          receiverTeamName: selectedTeam.name,
          status: 'pending',
          createdAt: new Date(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
        });

        toast({
          title: "Challenge Sent!",
          description: `${selectedTeam.name} has been notified`,
        });

        setSelectedTeam(null);
        setSearchQuery('');
        document.dispatchEvent(new Event('dialog-close'));
      }
      
      await fetchChallenges();
      
    } catch (error) {
      console.error('Challenge creation failed:', error);
      toast({
        title: "Challenge Failed",
        description: error instanceof Error ? error.message : "Could not create challenge",
        variant: "destructive"
      });
    }
  };

    useEffect(() => {
    const getTeamId = async () => {
      if (session?.user?.email && db) {
        const userDoc = await getDoc(doc(db, 'AI2Registration', session.user.email));
        setTeamId(userDoc.data()?.team || '');
      }
    };
    getTeamId();
  }, [session, db]);

  useEffect(() => {
    const checkPendingChallenges = async () => {
      if (sessionStatus === 'loading' || !teamId || !db) return;
      
      const challengesQuery = query(
        collection(db, 'AI2ChallengeRequests'),
        where('receiverTeam', '==', teamId),
        where('status', '==', 'pending')
      );

      const unsubscribe = onSnapshot(challengesQuery, 
        { includeMetadataChanges: false }, (snapshot) => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            const challengeData = change.doc.data();
            if (challengeData.challengerTeam === teamId) return;
            
            // console.log("[AI2] New challenge:", challengeData);
            addNotification({
              title: "New Challenge!",
              description: `You have a challenge from ${challengeData.challengerTeamName}`,
              actionText: "Accept",
              onAction: () => {
                handleAcceptChallenge(change.doc.id);
              }
            });
          }
        });
      });

      return () => {
        unsubscribe();
        setFilteredTeams([]);
      };
    };

    checkPendingChallenges();
  }, [teamId, db, sessionStatus]);

  const handleAcceptChallenge = async (challengeRequestId: string) => {
    // console.log("[AI2] Accepting challenge:", challengeRequestId);
    const challengeRef = doc(db, 'AI2ChallengeRequests', challengeRequestId);
    const challengeSnap = await getDoc(challengeRef);
    
    if (!challengeSnap.exists()) return;

    const { challengerTeam, receiverTeam, challengerTeamName, receiverTeamName } = challengeSnap.data();
    
    const existingChallengeQuery = query(
      collection(db, 'AI2Challenges'),
      where('requestId', '==', challengeRequestId)
    );
    const existingSnapshot = await getDocs(existingChallengeQuery);
    
    if (!existingSnapshot.empty) {
      console.error("Challenge already exists for this request");
      toast({
        title: "Challenge Failed",
        description: "Challenge already exists",
        variant: "destructive"
      });
      return;
    }

    const submissionsQuery = query(
      collection(db, 'AI2Submissions'),
      where('team', '==', teamId),
      where('statusCode', '==', 3)
    );
    const submissionsSnapshot = await getDocs(submissionsQuery);
    if (submissionsSnapshot.empty) {
      toast({
        title: "No Valid Submission",
        description: "You must have an accepted submission to accept challenges",
        variant: "destructive"
      });
      return;
    }

    const challengeDoc = doc(collection(db, 'AI2Challenges'));
    await setDoc(challengeDoc, {
      requestId: challengeRequestId,
      team1: challengerTeam,
      team2: receiverTeam,
      team1Name: challengerTeamName,
      team2Name: receiverTeamName,
      status: 'pending',
      createdAt: new Date(),
      videoUrl: null,
      result: null,
      statusCode: 0
    });

    markInteracted(challengeRequestId);
    await updateDoc(challengeRef, { status: 'accepted' });
  };

  return (
    <AI2Layout>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Swords className="h-6 w-6" />
            Challenges
          </CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button>New Challenge</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Challenge</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input 
                  placeholder="Search teams..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <ScrollArea className="h-48">
                  {filteredTeams.map(team => (
                    <div 
                      key={team.id} 
                      className={`p-2 hover:bg-gray-100 cursor-pointer ${selectedTeam?.id === team.id ? 'bg-blue-50' : ''}`}
                      onClick={() => setSelectedTeam(team)}
                    >
                      <div className="flex justify-between items-center">
                        <span>{team.name}</span>
                        <Badge variant={team.autoAcceptChallenge ? 'default' : 'destructive'}>
                          {team.autoAcceptChallenge ? 'Auto Accept' : 'Manual Accept'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
                <Button 
                  onClick={handleCreateChallenge}
                  disabled={!selectedTeam}
                >
                  Challenge Selected Team
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="flex justify-between items-center p-3 border-b last:border-0 transition-[background-color,border-color] duration-200"
              >
                <div>
                  <p className="font-medium">vs {
                    challenge.team1 === teamId ? 
                    filteredTeams.find(t => t.id === challenge.team2)?.name || 'Unknown Team' : 
                    filteredTeams.find(t => t.id === challenge.team1)?.name || 'Unknown Team'
                  }
                  
                  <span className={`inline-block px-2 py-0.5 ml-2 text-xs rounded-full ${
                    challenge.result === teamId ? 
                      "bg-green-100 text-green-800" : 
                    challenge.result && challenge.result !== "Draw" ? 
                      "bg-red-100 text-red-800" : 
                      "bg-yellow-100 text-yellow-800"
                  }`}>
                    {challenge.result === teamId ? "Win" : 
                    challenge.result === null ? "Pending" : 
                     challenge.result && challenge.result !== "Draw" ? "Loss" : 
                     "Draw"}
                  </span>
                  
                  </p>
                  {challenge.entryName && (
                    <div className="flex gap-2 text-sm text-gray-500">
                      <span>Your Bot: {challenge.entryName}</span>
                      {challenge.opponentEntryName && (
                        <span>• Opponent: {challenge.opponentEntryName}</span>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">

                  {challenge.videoUrl != "" && challenge.videoUrl != null && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const url = challenge.videoUrl!;
                        console.log('Opening video with URL:', url);
                        setSelectedVideo({
                          url,
                          title: `Challenge vs ${
                            challenge.team1 === teamId ? 
                            filteredTeams.find(t => t.id === challenge.team2)?.name || 'Unknown Team' : 
                            filteredTeams.find(t => t.id === challenge.team1)?.name || 'Unknown Team'
                          } Recording`
                        });
                      }}
                    >
                      <Video className="h-4 w-4" />
                      Watch
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        {selectedVideo && (
          <VideoPlayer
            isOpen={!!selectedVideo}
            onClose={() => setSelectedVideo(null)}
            videoUrl={selectedVideo.url}
            title={selectedVideo.title}
          />
        )}
      </Card>
    </AI2Layout>
  );
};