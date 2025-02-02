"use client";

import { useState } from "react";
import { TeamMetaData } from "@/schemas/TeamMetaData";
// import { TeamMetaData } from "@/schemas/TeamMetaData";
import { GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import TeamMember from "@/components/project/TeamMember";
import ReactMarkdown from "react-markdown";

type ContentData<T> = T & { content: string; slug: string };

const IndividualTeam = ({ found }: { found: ContentData<TeamMetaData>  }) => {
  const [selectedYear, setSelectedYear] = useState<string>("");

  const handleYearFilter = (year: string) => {
    setSelectedYear(prevYear => (prevYear === year ? "" : year));
  };

  const filteredTeamMembers = found.team.filter((member) =>
    selectedYear ? member.year === selectedYear : true
  );

  const teamMemberData = filteredTeamMembers.map((member) => (
    <TeamMember key={member.name} data={member}></TeamMember>
  ));

  const yearOptions = Array.from(new Set(found.team.map((member) => member.year)));

  const H1Component = (props: { className?: string; children?: React.ReactNode }) => (
    <div className="px-[7.4vw] font-roboto-mono text-white text-[24px] font-[700] mb-[2vh]">
      {props.children}
      <div className="bg-[#00349F] w-[8.1vw] h-[6px]"></div>
    </div>
  );

  const PComponent = (props: { className?: string; children?: React.ReactNode }) => (
    <div className="px-[9.5vw] font-roboto-mono text-white text-[16px] font-[400] mb-[3vh]">
      {props.children}
    </div>
  );

  return (
    <>
      <div className="relative w-screen h-auto bg-dark-grey pb-16">
        <div className="w-screen h-[40vh] bg-cover bg-wwd-banner mb-[5vh]"></div>
        <div className="absolute left-[16.7vw] top-[15.7vh] text-white text-[5.2vh] font-roboto-mono">
          <div>{found.title}</div>
          <div className="bg-[#00349F] w-[13.1vw] h-[6px]"></div>
        </div>
        <div className="px-[7.4vw] font-roboto-mono text-white text-[24px] font-[700] mb-[3vh]">
          <div className="mb-[1vh]">Description</div>
          <div className="bg-[#00349F] w-[8.1vw] h-[6px]"></div>
        </div>
        <div className="px-[9.5vw] font-roboto-mono text-white font-[400] text-[14px] mb-[5vh]">
            {found.description}
        </div>

        <div className="px-[7.4vw] font-roboto-mono text-white text-[20px] font-[700] mb-[3vh]">
          <div className="mb-[1vh]">Team Members</div>
          <div className="bg-[#00349F] w-[8.1vw] h-[6px]"></div>
        </div>
        <div className="px-[9.5vw]">
          <div className="flex space-x-4 mb-[3vh]">
            {yearOptions.map((year) => (
              <button
                key={year}
                className={`px-4 py-2 rounded-md ${
                  selectedYear === year ? "bg-blue-500" : "bg-gray-500"
                } text-white`}
                onClick={() => handleYearFilter(year)}
              >
                {year}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {teamMemberData}
          </div>
        </div>
        
      </div>
    </>
  );
};

export default IndividualTeam;