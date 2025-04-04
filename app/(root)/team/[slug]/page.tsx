"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import TeamMember from "../../../common/TeamMember";
import PageHeader from "@app/components/PageHeader";
import { useFirebase } from "@app/firebase/useFirebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function DepartmentTeamPage({ params }: { params: { slug: string } }) {
  const [department, setDepartment] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { db } = useFirebase();

  const departmentSlug = params.slug;
  const currentYear = new Date().getFullYear().toString();

  useEffect(() => {
    let isMounted = true;

    console.log("[DepartmentTeamPage] Firebase DB initialized:", !!db);

    if (!db) {
      console.warn("[DepartmentTeamPage] Database not initialized");
      setError("Database not initialized");
      setLoading(false);
      return;
    }

    const fetchDepartmentData = async () => {
      try {
        setLoading(true);
        console.log("[DepartmentTeamPage] Fetching department:", departmentSlug);
        
        const fallbackDepartment = {
          name: departmentSlug.charAt(0).toUpperCase() + departmentSlug.slice(1),
          description: "Information about this department is currently unavailable.",
          slug: departmentSlug
        };
        
        let departmentData = null;
        let permissionError = false;
        
        try {
          const departmentsRef = collection(db, "departments");
          const departmentQuery = query(departmentsRef, where("slug", "==", departmentSlug));
          const departmentSnapshot = await getDocs(departmentQuery);
          
          if (!departmentSnapshot.empty) {
            const departmentDoc = departmentSnapshot.docs[0];
            departmentData = departmentDoc.data();
          }
        } catch (err: any) {
          console.warn("[DepartmentTeamPage] Department fetch error:", err);
          if (err.code === 'permission-denied') {
            permissionError = true;
          }
        }
        
        if (!isMounted) return;
        
        if (!departmentData) {
          console.log("[DepartmentTeamPage] Using fallback department data");
          departmentData = fallbackDepartment;
        }
        
        setDepartment(departmentData);
        
        console.log("[DepartmentTeamPage] Fetching members for department:", departmentSlug);
        
        let fetchedMembers: any[] = [];
        
        try {
          const membersRef = collection(db, "members");
          const membersQuery = query(membersRef, where("departments", "array-contains", departmentSlug));
          const membersSnapshot = await getDocs(membersQuery);
          
          fetchedMembers = membersSnapshot.docs.map(doc => {
            const data = doc.data();
            
            const joined = data.Joined?.toDate ? data.Joined.toDate() : new Date();
            const created = data.createdAt?.toDate ? data.createdAt.toDate() : new Date();
            
            return {
              id: doc.id,
              name: data.name || "",
              displayName: data.displayName || data.name || "",
              roles: data.roles || {},
              image: data.image || "", 
              socials: data.socials || {},
              Joined: joined,
              createdAt: created
            };
          });
        } catch (err: any) {
          console.warn("[DepartmentTeamPage] Members fetch error:", err);
          if (err.code === 'permission-denied') {
            permissionError = true;
            
            // Create placeholder members if we have permission issues
            fetchedMembers = [
              {
                id: "member-1",
                name: "Department Lead",
                displayName: "Department Lead",
                roles: { [currentYear]: ["Lead"] },
                image: "/imgs/team/default.svg", 
                socials: {},
                Joined: new Date(),
                createdAt: new Date()
              },
              {
                id: "member-2",
                name: "Team Member",
                displayName: "Team Member",
                roles: { [currentYear]: ["Member"] },
                image: "/imgs/team/default.svg", 
                socials: {},
                Joined: new Date(),
                createdAt: new Date()
              }
            ];
          }
        }

        if (isMounted) {
          console.log("[DepartmentTeamPage] Setting members:", fetchedMembers.length);
          setMembers(fetchedMembers);
          setLoading(false);
        }
      } catch (err) {
        console.error("[DepartmentTeamPage] Error fetching data:", err);
        if (isMounted) {
          const fallbackDepartment = {
            name: departmentSlug.charAt(0).toUpperCase() + departmentSlug.slice(1),
            description: "Information about this department is currently unavailable.",
            slug: departmentSlug
          };
          
          setDepartment(fallbackDepartment);
          setMembers([
            {
              id: "member-1",
              name: "Department Lead",
              displayName: "Department Lead",
              roles: { [currentYear]: ["Lead"] },
              image: "/imgs/team/default.svg", 
              socials: {},
              Joined: new Date(),
              createdAt: new Date()
            }
          ]);
          setLoading(false);
        }
      }
    };

    fetchDepartmentData();
    
    return () => {
      isMounted = false;
    };
  }, [departmentSlug, db, currentYear]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const departmentName = department?.name || departmentSlug.charAt(0).toUpperCase() + departmentSlug.slice(1);
  const departmentDescription = department?.description || "No description available for this department.";

  return (
    <div className="relative w-screen h-auto">
      <PageHeader title={departmentName + " Department"} />

      <div className="flex flex-col justify-around items-center text-white px-[10vw] py-[5vh] bg-gradient-to-b from-[#131B6B] to-[#483EE0]">
        
        {/* Description */}
        <div className="w-full mb-[5vh]">
          <h2 className="text-[3vh] font-roboto-mono font-bold w-fit">Description</h2>
          <div className="bg-[#DA92F6] w-[8.1vw] h-[6px] mb-10"></div>
          <p className="text-white font-roboto-mono leading-relaxed">
            {departmentDescription}
          </p>
        </div>

        {/* Team Members */}
        <div className="w-full mb-[8vh]">
          <h2 className="text-[3vh] font-roboto-mono font-bold w-fit">The Team</h2>
          <div className="bg-[#DA92F6] w-[8.1vw] h-[6px] mb-10"></div>
          {members.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
              {members.map((member) => (
                <TeamMember key={member.id} data={member} />
              ))}
            </div>
          ) : (
            <p className="text-white">No team members found for this department.</p>
          )}
        </div>
      </div>
    </div>
  );
}