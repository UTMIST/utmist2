'use client';

import { TeamJoin } from "@ai2components/TeamJoin";
import { useNavigate } from "react-router-dom";
import { Header } from "@ai2components/Header";
import { useRouter } from "next/navigation";

const DashboardJoinPage = () => {
  const router = useRouter();

  const handleTeamJoined = (teamName: string) => {
    localStorage.setItem("teamName", teamName);
    router.push('/ai2/dashboard');
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