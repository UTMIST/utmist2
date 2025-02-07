'use client';

import { TeamJoin } from "@ai2components/TeamJoin";
import { Header } from "@ai2components/Header";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { collection, doc, getDoc, query, updateDoc, where, getDocs } from "firebase/firestore";
import { useFirebase } from "@app/firebase/useFirebase";
import { useEffect, useState } from "react";

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
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated' || !session) {
    signIn('google', { callbackUrl: window.location.origin + '/ai2/dashboard/join' });
    return null;
  }

  const handleTeamJoined = async (teamName: string, password: string) => {
    if (!db || !session?.user?.email) {
      throw new Error('Not authenticated');
    }
    const now = Date.now();
    if (now - lastAttemptTime < 1000) {
      throw new Error('Please wait 1 second before trying again');
    }
    setLastAttemptTime(now);

    try {
      const teamsQuery = query(
        collection(db, 'AI2Teams'),
        where('name', '==', teamName)
      );
      const querySnapshot = await getDocs(teamsQuery);
      
      if (querySnapshot.empty) {
        throw new Error('Team does not exist');
      }

      const teamDoc = querySnapshot.docs[0];
      const teamRef = teamDoc.ref;
      const teamData = teamDoc.data();

      if (!teamData) {
        throw new Error('Invalid team data');
      }

      if (teamData.joinCode !== password) {
        throw new Error('Incorrect join code');
      }

      if (teamData.members.map((member: { email: string, displayName: string }) => member.email).includes(session.user.email)) {
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