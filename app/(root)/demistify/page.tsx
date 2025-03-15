"use client";

import { DemistifyData } from "@/schemas/DemistifyData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DropDown from "public/assets/Vector 4.svg";

interface DemistifyProp {
  data: DemistifyData[];
}

const sampleDemistifyData: DemistifyData[] = [
  {
    slug: "issue-5",
    publishDate: "2024-02-01",
    issueNumber: "Issue #5",
    imgPath: "/imgs/fillers/circuits.png",
    buttonHref: "utorontomist.medium.com/issue-5",
    description: "Exploring the Latest Advances in Natural Language Processing and Their Impact on AI Development"
  },
  {
    slug: "issue-4",
    publishDate: "2023-12-15",
    issueNumber: "Issue #4",
    imgPath: "/imgs/fillers/circuits.png",
    buttonHref: "utorontomist.medium.com/issue-4",
    description: "Deep Learning in Computer Vision: Breaking Down Complex Visual Tasks"
  },
  {
    slug: "issue-3",
    publishDate: "2023-10-30",
    issueNumber: "Issue #3",
    imgPath: "/imgs/fillers/circuits.png",
    buttonHref: "utorontomist.medium.com/issue-3",
    description: "Reinforcement Learning: From Game Playing to Real-World Applications"
  },
  {
    slug: "issue-2",
    publishDate: "2023-09-15",
    issueNumber: "Issue #2",
    imgPath: "/imgs/fillers/circuits.png",
    buttonHref: "utorontomist.medium.com/issue-2",
    description: "The Ethics of AI: Addressing Bias and Fairness in Machine Learning Systems"
  },
  {
    slug: "issue-1",
    publishDate: "2023-08-01",
    issueNumber: "Issue #1",
    imgPath: "/imgs/fillers/circuits.png",
    buttonHref: "utorontomist.medium.com/issue-1",
    description: "Introduction to Machine Learning: Understanding the Basics of AI"
  }
];

const Demistify: React.FC = ({ }) => {
    const [isYearFilterOpen, setIsYearFilterOpen] = useState(false);
    const [yearFilter, setYearFilter] = useState<string[]>([]);
    const [selectedYear,setSelectedYear]= useState<string[]>([]);

    const yearFilterToggle = () => {
        // Assuming that the 1st item in the data array is the most recent one
        const recentYear = sampleDemistifyData[0].publishDate.substring(0, 4);
        let yearAsNumber = Number(recentYear);
        let updatedYearFilter: any[] | ((prevState: string[]) => string[]) = [];

        while (yearAsNumber !== 2017) {
            const range = `${yearAsNumber - 1}-${yearAsNumber}`;
            updatedYearFilter = [...updatedYearFilter, range];
            yearAsNumber = yearAsNumber - 1;
        }

        setYearFilter(updatedYearFilter);

        setIsYearFilterOpen(!isYearFilterOpen);
    };

    const filterByYear = (year:string) =>{
        setSelectedYear([year.slice(4),year.slice(-4)])
    }

    const filteredInfoCards = sampleDemistifyData
        .filter((item) => {
            // Filter based on selectedYear
            if (selectedYear.length > 0) {
                const itemYear = item.publishDate.slice(0, 4);
                return selectedYear.includes(itemYear);
            }
            return true; // Include all if selectedYear is empty

        })
        .map((item, ind) => {
            return (
                <div key={ind} className="rounded-md overflow-hidden bg-black shadow-lg w-362">
                    <Image 
                        className="w-full h-315" 
                        src={item.imgPath} 
                        alt="Card Image"
                        width={362}
                        height={315}
                    />
                    <div className="px-6 py-4">
                        <div className="font-bold text-white font-roboto-mono">{item.publishDate}</div>
                        <div className="font-bold text-white font-roboto-mono">{item.issueNumber}</div>
                        <p className="text-white font-roboto-mono">
                            {item.description}
                        </p>
                    </div>
                </div>
            );
        });

        return <>
         <div className="bg-dark-grey overflow-x-hidden">
            <div className="w-screen h-[40vh] bg-cover relative">
            <Image 
                src="/imgs/headers/header1.png" 
                alt="Header Image" 
                fill
                sizes="100vw"
                style={{ 
                objectFit: "cover", 
                objectPosition: "center 0%", 
                filter: "contrast(1.3) brightness(1.1)",
                }}
            />
            </div>
            <div className="absolute left-[8.7vw] top-[15.7vh] text-white text-[5.2vh] font-roboto-mono">
                <div className="font-bold">deMISTify</div>
                <div className="bg-[#DA92F6] w-[11.1vw] h-[6px]"></div>
            </div>

            <div className="flex flex-col justify-around items-center text-white px-[10vw] py-[5vh] bg-gradient-to-b from-[#161652] to-[#483EE0]">

            <div className="relative flex items-center justify-center mt-6">
                    <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
                        <li className="relative">
                            <button
                                className={isYearFilterOpen?"flex items-center justify-center rounded-md bg-utmist-pink shadow-md text-[2.2vh] w-[69.7vw] h-[8.9vh] lg:w-[19.7vw] lg:h-[5.6vh]":"flex items-center justify-center rounded-md bg-utmist-purple shadow-md text-[2.2vh] w-[69.7vw] h-[8.9vh] lg:w-[19.7vw] lg:h-[5.6vh]"}
                                onClick={yearFilterToggle}
                            >
                                <p className="text-white font-roboto-mono">Year</p>
                                <Image src={DropDown} height={14} width={14} alt="select year" className="ml-2" />
                            </button>
                            {isYearFilterOpen && (
                                <ul className="absolute top-full left-0 mt-1 bg-dropdown rounded-md shadow-md text-white text-[2.2vh] w-[69.7vw] lg:w-[19.7vw] z-10 flex flex-col items-center">
                                    {yearFilter.map((item, index) => (
                                        <li key={index}>
                                            <Link href="#" onClick={() => filterByYear(item)} className={selectedYear.includes(item.slice(-4))?"font-roboto-mono bg-utmist-pink block px-4 py-2":"font-roboto-mono block px-4 py-2"}>
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
             <div className="flex flex-col gap-12 p-10 max-w-[1000px] w-full">
                 {sampleDemistifyData.map((item, ind) => {
                     return (
                        <Link href={`https://${item.buttonHref}`} key={ind} className="rounded-[20px] overflow-hidden shadow-lg w-full flex flex-col cursor-pointer hover:opacity-95 transition-opacity">
                             <div>
                                 <Image 
                                     className="w-full h-52 object-cover" 
                                     src={item.imgPath} 
                                     alt="Circuit board"
                                     width={1000}
                                     height={208}
                                 />
                             </div>
                             <div className="px-8 py-8 flex-grow bg-[#665ADF] rounded-b-[20px]">
                                 <div className="font-bold text-white font-roboto-mono text-lg uppercase">
                                     {item.publishDate.split('-')[0]}-{item.publishDate.split('-')[1]}-{item.publishDate.split('-')[2]} | {item.issueNumber}
                                 </div>
                                 
                                 <div className="font-bold text-white font-roboto-mono mt-4 text-lg uppercase">
                                     WHAT THIS NEWSLETTER COVERS:
                                 </div>
                                 <div className="text-white font-roboto-mono mt-4 text-lg">
                                    {item.description}
                                 </div>
                                 {/* <ul className="list-disc pl-6 mt-3 text-white font-roboto-mono space-y-2">
                                     <li>{item.description}</li>
                                     <li>Lorem Ipsum</li>
                                     <li>Lorem Ipsum</li>
                                     <li>Lorem Ipsum</li>
                                 </ul> */}
                             </div>
                        </Link>
                     );
                 })}
             </div>

             <div className="flex justify-center gap-10 pb-12 mt-4">
                 <Link href="#" className="flex justify-center items-center rounded-[10px] bg-[#92DEFF] shadow-md text-center px-10 py-3 w-[320px]">
                     <div className="text-black font-roboto-mono font-normal text-lg">Subscribe to deMISTify</div>
                 </Link>
                 <Link href="https://medium.com/utorontomist" className="flex justify-center items-center rounded-[10px] bg-[#92DEFF] shadow-md text-center px-10 py-3 w-[320px]">
                     <div className="text-black font-roboto-mono font-normal text-lg">Read on Medium!</div>
                 </Link>
             </div>
            </div>
         </div>
     </>
 }
  
export default Demistify;