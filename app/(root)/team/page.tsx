"use client";

import { useState, useEffect } from "react";
import { useFirebase } from "@app/firebase/useFirebase";
import { collection, getDocs } from "firebase/firestore";
import { Team } from "@schema/team";

export default function TeamPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const { db } = useFirebase();
  console.log("[TeamPage] Init");

  useEffect(() => {
    if (!db) {
      console.warn("[TeamPage] Database not initialized");
      return;
    }
    console.log("[TeamPage] useEffect triggered");
    const fetchTeams = async () => {
      try {
        console.log("[TeamPage] Fetching teams...");
        const querySnapshot = await getDocs(collection(db, "teams"));
        const teamsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Team[];
        console.log("[TeamPage] Teams data:", teamsData);
        setTeams(teamsData);
      } catch (error) {
        console.error("Error fetching teams: ", error);
      }
    };

    fetchTeams();
  }, [db]);

  return (
    <div className="relative w-screen h-auto bg-dark-grey pb-16">
      <div className="w-screen h-[40vh] bg-cover bg-wwd-banner mb-[5vh]"></div>
      <div className="absolute left-[16.7vw] top-[15.7vh] text-white text-[5.2vh] font-roboto-mono">
        <div>Our Teams</div>
        <div className="bg-[#00349F] w-[13.1vw] h-[6px]"></div>
      </div>

      {teams.map((team) => (
        <div key={team.id} className="mb-16">
          <div className="px-[7.4vw] font-roboto-mono text-white text-[24px] font-[700] mb-[3vh]">
            <div className="mb-[1vh]">{team.title}</div>
            <div className="bg-[#00349F] w-[8.1vw] h-[6px]"></div>
          </div>
          
          <div className="px-[9.5vw] font-roboto-mono text-white font-[400] text-[14px] mb-[5vh]">
            {team.description}
          </div>
        </div>
      ))}
    </div>
  );
}