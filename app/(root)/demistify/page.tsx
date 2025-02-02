"use client";

import Image from "next/image";
import { useState } from "react";
import DropDown from "/public/Vector 4.svg";

const demistifyData = [
    // TODO: these ideally should NOT be hard-coded into the .ts file, requires recompilation and is in general a bad idea.
    // For now, this satisfies our requirements, but in the short-term, we need to move these to sanity.
  {
    publishDate: "2024-02-18",
    issueNumber: "123",
    imgPath: "/imgs/demistify/issue1.svg",
    buttonHref: "https://utorontomist.medium.com/example",
    description: "Lorem Ipsum",
  },
  {
    publishDate: "2023-11-10",
    issueNumber: "122",
    imgPath: "/imgs/demistify/issue2.svg",
    buttonHref: "https://utorontomist.medium.com/example2",
    description: "Another example description for this issue.",
  },
];

const AllIssues: React.FC = () => {
  const [isYearFilterOpen, setIsYearFilterOpen] = useState(false);
  const [yearFilter, setYearFilter] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string[]>([]);

  const yearFilterToggle = () => {
    const recentYear = demistifyData[0].publishDate.substring(0, 4);
    let yearAsNumber = Number(recentYear);
    let updatedYearFilter: string[] = [];

    while (yearAsNumber !== 2017) {
      const range = `${yearAsNumber - 1}-${yearAsNumber}`;
      updatedYearFilter = [...updatedYearFilter, range];
      yearAsNumber = yearAsNumber - 1;
    }

    setYearFilter(updatedYearFilter);
    setIsYearFilterOpen(!isYearFilterOpen);
  };

  const filterByYear = (year: string) => {
    setSelectedYear([year.slice(4), year.slice(-4)]);
  };

  const filteredInfoCards = demistifyData
    .filter((item) => {
      if (selectedYear.length > 0) {
        const itemYear = item.publishDate.slice(0, 4);
        return selectedYear.includes(itemYear);
      }
      return true;
    })
    .map((item, ind) => {
      return (
        <div key={ind} className="rounded-md overflow-hidden bg-black shadow-lg w-362">
          <Image className="w-full h-315" src={item.imgPath} alt="Card Image" width={362} height={315} />
          <div className="px-6 py-4">
            <div className="font-bold text-white font-roboto-mono">{item.publishDate}</div>
            <div className="font-bold text-white font-roboto-mono">{item.issueNumber}</div>
            <p className="text-white font-roboto-mono">{item.description}</p>
          </div>
        </div>
      );
    });

  return (
    <div className="bg-dark-grey overflow-x-hidden">
      <div className="w-screen h-[53vh] bg-cover bg-wwd-banner"></div>
      <div className="absolute left-[16.7vw] top-[18vh] text-white text-[5.2vh] font-roboto-mono">
        <div>deMISTify</div>
        <div className="bg-[#00349F] w-[14vw] h-[6px]"></div>
      </div>
      <div className="relative flex items-center justify-center mt-6">
        <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <li className="relative">
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
              <ul className="absolute top-full left-0 mt-1 bg-dropdown rounded-md shadow-md text-white text-[2.2vh] w-[69.7vw] lg:w-[19.7vw] z-10 flex flex-col items-center">
                {yearFilter.map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={() => filterByYear(item)}
                      className={`font-roboto-mono block px-4 py-2 ${
                        selectedYear.includes(item.slice(-4)) ? "bg-utmist-pink" : ""
                      }`}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 p-10">
        {filteredInfoCards}
      </div>
    </div>
  );
};

export default AllIssues;
