'use client';

import { Header } from "@ai2components/Header";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFirebase } from "@app/firebase/useFirebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@ai2components/ui/card";

interface Team {
  teamName: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  captainDisplayName: string;
}

const TeamsPage = () => {
  const { data: session, status } = useSession();
  const { db } = useFirebase();
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      if (status === 'authenticated' && db) {
        try {
          const teamsQuery = query(
            collection(db, 'AI2Teams'),
            orderBy('createdAt', 'desc')
          );
          const querySnapshot = await getDocs(teamsQuery);
          
          console.log("[AI2] Teams:", querySnapshot.docs);
          const teamsData = querySnapshot.docs.map(doc => ({
            teamName: doc.data().name,
            createdAt: doc.data().createdAt,
            captainDisplayName: doc.data().captainDisplayName
          }));
          
          setTeams(teamsData);
        } catch (error) {
          console.error('Error fetching teams:', error);
        } finally {
          setLoading(false);
        }
      } else if (status === 'unauthenticated') {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [status, db]);

  if (status === 'loading' || loading) {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated' || !session) {
    signIn('google', { callbackUrl: window.location.origin + '/ai2/teams' });
    return null;
  }

  return (
    <div className="min-h-screen bg-hackathon-background dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <div className="pt-20 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <h1 className="text-2xl font-bold text-center dark:text-white">
            All Teams
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.map((team) => (
              <Card key={team.teamName}>
                <CardHeader>
                  <CardTitle className="text-lg">{team.teamName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Captain: {team.captainDisplayName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Created: {new Date(team.createdAt.seconds * 1000).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsPage; 