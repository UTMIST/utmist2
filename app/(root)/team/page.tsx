"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFirebase } from "@app/firebase/useFirebase";
import { collection, getDocs } from "firebase/firestore";
import { Team } from "@schema/team";
import PageHeader from "@app/components/PageHeader";

export default function TeamPage() {
  const [team, setTeam] = useState<Team[]>([]);
  const { db } = useFirebase();

  useEffect(() => {
    if (!db) {
      console.warn("[TeamPage] Database not initialized");
      return;
    }
    const fetchTeam = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "team"));
        const teamData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Team[];
        setTeam(teamData);
      } catch (error) {
        console.error("Error fetching team: ", error);
      }
    };

    fetchTeam();
  }, [db]);

  const departments = [
    { name: "ACADEMICS", slug: "academics", subtitle: "Department of Academics", image: "/imgs/team/academics-team.png" },
    { name: "ENGINEERING", slug: "engineering", subtitle: "Department of Engineering", image: "/imgs/team/eng-team.png" },
    { name: "ADMINISTRATION", slug: "admin", subtitle: "UTMIST admin", image: "/imgs/team/admin-team.png" },
    { name: "EXTERNAL RELATIONS", slug: "external", subtitle: "Department of External Relations", image: "/imgs/team/external-team.png" },
    { name: "INFRASTRUCTURE", slug: "infrastructure", subtitle: "Department of Infrastructure", image: "/imgs/team/infra-team.png" },
    { name: "MARKETING", slug: "marketing", subtitle: "Department of Marketing", image: "/imgs/team/marketing-team.png" },
    { name: "TECHNICAL WRITING", slug: "writing", subtitle: "Department of Technical Writing", image: "/imgs/team/writing-team.png" },
  ];

  return (
    <>
      <div className="relative w-screen h-auto"> 
        <PageHeader title="Our Teams" />

        <div className="flex flex-col justify-around items-center text-white px-[10vw] py-[5vh] bg-gradient-to-b from-[#131B6B] to-[#483EE0]">

          {/* Executives */}
          <div className="w-full mb-[8vh]">
            <h2 className="text-[3vh] font-roboto-mono font-bold w-fit">The Executives</h2>
            <div className="bg-[#DA92F6] w-[11.1vw] h-[6px] mb-10"></div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
              {Array(8).fill(0).map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  {/* layout */}
                  <div className="w-[100px] h-[100px] bg-gray-300 rounded-[50%] overflow-hidden flex-shrink-0 shadow-md mb-3">
                  </div>
                  <div className="text-center">
                    <p className="text-white font-roboto-mono font-medium">John Doe</p>
                    <p className="text-white/80 font-roboto-mono text-sm">Director</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Teams */}
          <div className="w-full mb-[8vh]">
            <h2 className="text-[3vh] font-roboto-mono font-bold w-fit">Department Teams</h2>
            <div className="bg-[#DA92F6] w-[8.1vw] h-[6px] mb-10"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {departments.map((dept, idx) => (
                <Link key={idx} href={`/team/${dept.slug}`}>
                  <div
                    className="group relative h-64 bg-[#1E1650] overflow-hidden shadow-xl hover:shadow-[0_0_25px_rgba(148,97,255,0.5)] transition-all"
                    style={{ borderRadius: "10px" }}
                  >
                    <div className="relative h-3/4 bg-gray-300">
                      <Image
                        src={dept.image}
                        alt={dept.name}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <div className="absolute bottom-0 w-full h-1/4 bg-[#6C63FF] group-hover:bg-[#8F88FF] transition-colors flex flex-col items-center justify-center">
                      <h3 className="font-roboto-mono font-bold text-lg">{dept.name}</h3>
                      <p className="font-roboto-mono text-xs">{dept.subtitle}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}