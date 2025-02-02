"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DropDown from "/public/Vector 4.svg";
import ProgramCard from "@/components/programs/ProgramCard";

const programData = [
  // TODO: these ideally should NOT be hard-coded into the .ts file, requires recompilation and is in general a bad idea.
  // For now, this satisfies our requirements, but in the short-term, we need to move these to sanity.
  {
    title: "Program Example",
    year: "2022-2023",
    description: {
      overview: "This is UTMIST's coolest program ever! Students from all academic backgrounds are welcome to join.",
      instructor: "John Doe",
      location: "Bahen Centre for Information Technology",
    },
    timeline: [
      {
        date: "2023/09/21",
        topic: "Week 1: Introduction",
        content: [
          {
            type: "slides",
            link: "https://google.com",
          },
        ],
      },
      {
        date: "2023/09/28",
        topic: "Week 2: What is Machine Learning?",
        content: [
          {
            type: "slides",
            link: "https://google.com",
          },
        ],
      },
      {
        date: "2023/10/05",
        topic: "Week 3: Introduction to Computer Vision",
        content: [
          {
            type: "slides",
            link: "https://google.com",
          },
        ],
      },
      {
        date: "2023/10/12",
        topic: "Week 4: Introduction to Natural Language Processing",
        content: [
          {
            type: "slides",
            link: "https://google.com",
          },
        ],
      },
    ],
  },
];

export default function Program() {
  const [isYearFilterOpen, setIsYearFilterOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string>("");

  const recentYear = programData[0].year.substring(5);
  let yearAsNumber = Number(recentYear);
  let yearFilter: string[] = [];

  while (yearAsNumber !== 2017) {
    const range = `${yearAsNumber - 1}-${yearAsNumber}`;
    yearFilter = [...yearFilter, range];
    yearAsNumber = yearAsNumber - 1;
  }

  const yearFilterToggle = () => {
    setIsYearFilterOpen(!isYearFilterOpen);
  };

  const filterByYear = (year: string) => {
    setSelectedYear(year === selectedYear ? "" : year);
  };

  const programCards = programData
    .filter((program) => (selectedYear ? program.year === selectedYear : true))
    .map((program, index) => <ProgramCard key={index} data={program} />);

  return (
    <div className="relative w-screen h-auto bg-dark-grey">
      <div className="w-screen h-[40vh] bg-cover bg-wwd-banner mb-[5vh]"></div>
      <div className="absolute left-[16.7vw] top-[15.7vh] text-white text-[5.2vh] font-roboto-mono">
        <div>Academic and Career Programs</div>
        <div className="bg-[#00349F] w-[13.1vw] h-[6px]"></div>
      </div>
      <div className="px-[11.6vw] py-[11.4vh] w-full">
        <div className="text-white font-roboto-mono mb-[8.7vh] text-[16px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim cursus tellus sed iaculis. Donec
          egestas id odio ac semper. Nulla eget posuere purus, quis dignissim elit. Donec vel volutpat augue, suscipit
          dignissim odio. Nam molestie ligula id vestibulum sodales. Mauris volutpat ligula arcu, ac varius velit porta
          non. In hac habitasse platea dictumst. Sed massa orci, ullamcorper a euismod quis, auctor et leo.
        </div>
        <button
          className={`flex items-center justify-center rounded-md ${
            isYearFilterOpen ? "bg-utmist-pink" : "bg-utmist-purple"
          } shadow-md text-[2.2vh] w-[69.7vw] h-[8.9vh] lg:w-[19.7vw] lg:h-[5.6vh]`}
          onClick={yearFilterToggle}
        >
          <p className="text-white font-roboto-mono">Year</p>
          <Image src={DropDown} height={14} width={14} alt="select year" className="ml-2" />
        </button>
        {isYearFilterOpen && (
          <ul className="left-0 mt-1 bg-dropdown rounded-md shadow-md text-white text-[2.2vh] w-[69.7vw] lg:w-[19.7vw] z-10 flex flex-col items-center">
            {yearFilter.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => filterByYear(item)}
                  className={`font-roboto-mono block px-4 py-2 ${selectedYear === item ? "bg-utmist-pink" : ""}`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-[10vh] text-white font-roboto-mono">
          <div className="flex flex-col gap-[13vh]">{programCards}</div>
        </div>
      </div>
    </div>
  );
}
