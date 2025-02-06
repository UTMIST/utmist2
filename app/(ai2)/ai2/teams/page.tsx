'use client';

import { Header } from "@ai2components/Header";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFirebase } from "@app/firebase/useFirebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@ai2components/ui/card";
import { Input } from "@ai2components/ui/input";
import { Badge } from "@ai2components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@ai2components/ui/select";
import { AI2Team } from "@app/schema/ai2team";


const TeamsPage = () => {
  const { data: session, status } = useSession();
  const { db } = useFirebase();
  const [teams, setTeams] = useState<AI2Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState<boolean | null>(null);

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
            name: doc.data().name,
            createdAt: doc.data().createdAt,
            captainDisplayName: doc.data().captainDisplayName,
            wins: doc.data().wins,
            losses: doc.data().losses,
            draws: doc.data().draws,
            openToChallenge: doc.data().openToChallenge,
            id: doc.id,
            lastSubmitted: doc.data().lastSubmitted,
            isBanned: doc.data().isBanned,
            memberCount: doc.data().memberCount,
            affiliation: doc.data().affiliation || ''
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

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterOpen === null ? true : team.openToChallenge === filterOpen;
    return matchesSearch && matchesFilter;
  });


  console.log("[AI2] Filtered teams:", filteredTeams);
  return (
    <div className="min-h-screen bg-hackathon-background dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <div className="pt-24 md:pt-28 p-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <h1 className="text-2xl font-bold text-center dark:text-white">
              All Teams
            </h1>
            <div className="flex gap-4 w-full md:w-auto">
              <Input
                placeholder="Search teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
              <Select onValueChange={(v) => setFilterOpen(v === 'all' ? null : v === 'open')}>
                <SelectTrigger className="min-w-[250px] max-w-[500px] pr-8">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teams</SelectItem>
                  <SelectItem value="open">Open to Challenge</SelectItem>
                  <SelectItem value="closed">Not Accepting Challenges</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTeams.map((team) => (
              <Card key={team.name} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{team.name}</CardTitle>
                      {team.affiliation && (
                        <a 
                          href={team.affiliation} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:opacity-75 transition-opacity"
                        >
                          <svg className="w-5 h-5" viewBox="0 0 16 16" fill="currentColor">
                            <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                    <Badge 
                      variant={team.openToChallenge ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {team.openToChallenge ? 'Open' : 'Closed'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Captain: {team.captainDisplayName}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm">
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Wins: {team.wins}</p>
                      <p className="text-muted-foreground">Losses: {team.losses}</p>
                      <p className="text-muted-foreground">Draws: {team.draws}</p>
                    </div>
                    <p className="text-muted-foreground text-right">
                      Created: {new Date(team.createdAt.seconds * 1000).toLocaleDateString()} {new Date(team.createdAt.seconds * 1000).toLocaleTimeString()}
                    </p>
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

export default TeamsPage; 