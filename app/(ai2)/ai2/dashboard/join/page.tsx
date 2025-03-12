'use client';

import { TeamJoin } from "@ai2components/TeamJoin";
import { Header } from "@ai2components/Header";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { collection, doc, getDoc, query, updateDoc, where, getDocs } from "firebase/firestore";
import { useFirebase } from "@app/firebase/useFirebase";
import { useEffect, useState } from "react";
import { toast } from "@app/common/ai2/ui/use-toast";

const DashboardJoinPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { db } = useFirebase();
  const [loading, setLoading] = useState(true);
  const [lastAttemptTime, setLastAttemptTime] = useState<number>(0);

  useEffect(() => {
    const fetchTeam = async () => {
      if (status === 'authenticated' && session?.user?.email && db) {
        try {
          const userDoc = await getDoc(doc(db, 'AI2Registration', session.user.email));
          
          if (userDoc.exists() && userDoc.data().team) {
            router.push('/ai2/dashboard');
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
  }, [status, session, db, router]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-background dark:bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold text-hackathon-primary animate-pulse">
            UTMIST
          </h1>
          <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-hackathon-primary animate-progress"
              style={{ width: '45%' }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated' || !session) {
    signIn('google', { callbackUrl: window.location.origin + '/ai2/dashboard/join' });
    return null;
  }

  const handleTeamJoined = async (joinCode: string) => {
    if (!db || !session?.user?.email) {
      throw new Error('Not authenticated');
    }
    const now = Date.now();
    if (now - lastAttemptTime < 1000) {
      throw new Error('Please wait 1 second before trying again');
    }
    setLastAttemptTime(now);

    console.log('joinCode', joinCode);

    try {
      const teamsQuery = query(
        collection(db, 'AI2Teams'),
        where('joinCode', '==', joinCode)
      );
      const querySnapshot = await getDocs(teamsQuery);
      
      if (querySnapshot.empty) {
        throw new Error('Invalid join code');
      }

      const teamDoc = querySnapshot.docs[0];
      const teamRef = teamDoc.ref;
      const teamData = teamDoc.data();

      if (!teamData) {
        throw new Error('Invalid team data');
      }

      if (teamData.members.map((member: { email: string }) => member.email).includes(session.user.email)) {
        throw new Error('You are already a member of this team');
      }

      if (teamData.members.length >= 4) {
        throw new Error('Team is already full (maximum 4 members)');
      }

      await updateDoc(teamRef, {
        members: [...teamData.members, {
          email: session.user.email,
          displayName: session.user.displayName
        }],
        memberEmails: [...teamData.memberEmails, session.user.email]
      });

      toast({
        title: "Team Joined Successfully",
        description: `You have joined team ${teamData.name}`,
      });
      await updateDoc(doc(db, 'AI2Registration', session.user.email), {
        team: teamDoc.id
      });

      router.push('/ai2/dashboard');
    } catch (error) {
      console.error('Error joining team:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <div className="pt-16 p-4 flex flex-col items-center justify-center">
        <TeamJoin onTeamJoined={handleTeamJoined} />
      </div>
    </div>
  );
};

export default DashboardJoinPage;