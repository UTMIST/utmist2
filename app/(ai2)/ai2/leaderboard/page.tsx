'use client';

import { Header } from "@ai2components/Header";
import { useFirebase } from "@app/firebase/useFirebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { AI2Team } from "@app/schema/ai2team";
import { Card, CardContent, CardHeader, CardTitle } from "@ai2components/ui/card";

const LeaderboardPage = () => {
  const { db } = useFirebase();
  const [teams, setTeams] = useState<AI2Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      if (!db) return;
      
      try {
        const teamsQuery = query(
          collection(db, 'AI2Teams'),
          orderBy('elo', 'desc')
        );
        const querySnapshot = await getDocs(teamsQuery);
        
        const teamsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt,
          lastSubmitted: doc.data().lastSubmitted,
        } as AI2Team));
        
        setTeams(teamsData);
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [db]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-hackathon-background dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <div className="pt-24 md:pt-28 p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl font-bold text-center dark:text-white mb-8">
            AI2 Leaderboard
          </h1>
          
          <div className="space-y-4">
            {teams.map((team, index) => (
              <Card key={team.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-bold">#{index + 1}</span>
                    <div>
                      <h3 className="text-lg font-semibold">{team.name}</h3>
                      <div className="text-sm text-muted-foreground">
                        {team.members.map((member, i) => (
                          <span key={member.email}>
                            {member.displayName}
                            {i < team.members.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-mono font-bold">
                      {Math.round(team.elo)}
                    </span>
                    <div className="w-24 text-right">
                      <span className={`text-sm ${
                        team.elo > 1200 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        ({team.elo > 1200 ? '+' : ''}{Math.round(team.elo - 1200)})
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage; 