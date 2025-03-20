"use client";

import Image from "next/image";
import { useState } from "react";
import TeamMember from "../../../common/TeamMember";

// Replace with Firebase
export default function DepartmentTeamPage({ params }: { params: { slug: string } }) {

  const departmentName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);

  // Placeholder for firebase data
  const placeholderMembers = Array(8).fill(null).map((_, i) => ({
    id: `${i + 1}`,
    name: `John Doe ${i + 1}`,
    displayName: `John Doe ${i + 1}`,
    role: i === 0 ? "Director" : i === 1 ? "Lead" : "Member",
    image: "", 
    socials: {
      LinkedIn: "https://linkedin.com/in/example",
      GitHub: "https://github.com/example",
    },
  }));

  return (
    <div className="relative w-screen h-auto bg-[#3749E4]">
      <div className="w-screen h-[40vh] bg-cover relative">
        <Image 
          src="/imgs/headers/header1.png"
          alt="Header Image"
          fill
          sizes="100vw"
          style={{ 
            objectFit: "cover", 
            objectPosition: "center 0%", 
            filter: "contrast(1.1) brightness(1)",
          }}
          priority
        />
      </div>
      <div className="absolute left-[8.7vw] top-[15.7vh] text-white text-[5.2vh] font-roboto-mono">
        <div className="font-bold">{departmentName} Department</div>
        <div className="bg-[#DA92F6] w-[11.1vw] h-[6px]"></div>
      </div>

      <div className="flex flex-col justify-around items-center text-white px-[10vw] py-[5vh] bg-gradient-to-b from-[#161652] to-[#483EE0]">
        
        {/* Description */}
        <div className="w-full mb-[5vh]">
          <h2 className="text-[3vh] font-roboto-mono font-bold w-fit">Description</h2>
          <div className="bg-[#DA92F6] w-[8.1vw] h-[6px] mb-10"></div>
          <p className="text-white font-roboto-mono leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim cursus tellus sed iaculis. 
            Donec egestas id odio ac semper. Nulla eget posuere purus, quis dignissim elit. Mauris volutpat ligula arcu, 
            ac varius velit posuere ut. Sed vel aliquet odio. Proin nec tellus quis nunc efficitur tincidunt.
          </p>
        </div>

        {/* Team Members */}
        <div className="w-full mb-[8vh]">
          <h2 className="text-[3vh] font-roboto-mono font-bold w-fit">The Team</h2>
          <div className="bg-[#DA92F6] w-[8.1vw] h-[6px] mb-10"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {placeholderMembers.map((member) => (
              <TeamMember key={member.id} data={member} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}