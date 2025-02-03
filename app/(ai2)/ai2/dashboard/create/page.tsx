'use client';

import { TeamCreate } from "@ai2components/TeamCreate";
import { useNavigate } from "react-router-dom";
import { Header } from "@ai2components/Header";
import { useRouter } from "next/navigation";

const DashboardCreatePage = () => {
  const router = useRouter();

  const handleTeamCreated = (teamName: string) => {
    localStorage.setItem("teamName", teamName);
    router.push('/ai2/dashboard')};
  };

  return (
    <div className="min-h-screen bg-hackathon-background">
      <Header />
      <div className="pt-16 p-4 flex flex-col items-center justify-center">
        <TeamCreate onTeamCreated={handleTeamCreated} />
      </div>
    </div>
  );
};

export default DashboardCreatePage;