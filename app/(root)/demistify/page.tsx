"use client";

import { DemistifyData } from "@/schemas/DemistifyData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DropDown from "public/assets/Vector 4.svg";

interface DemistifyProp {
  data: DemistifyData[];
}

const Demistify: React.FC<DemistifyProp> = ({ data }) => {
    const [isYearFilterOpen, setIsYearFilterOpen] = useState(false);
    const [yearFilter, setYearFilter] = useState<string[]>([]);
    const [selectedYear,setSelectedYear]= useState<string[]>([]);

    const yearFilterToggle = () => {
        // Assuming that the 1st item in the data array is the most recent one
        const recentYear = data[0].publishDate.substring(0, 4);
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

    const filteredInfoCards = data
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
                    <Image className="w-full h-315" src={item.imgPath} alt="Card Image" />
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
             <div className=" w-screen h-[53vh] bg-cover bg-wwd-banner"></div>
             <div className=" absolute left-[16.7vw] top-[18vh] text-white text-[5.2vh] font-roboto-mono">
                 <div>deMISTify</div>
                 <div className="bg-[#00349F] w-[14vw] h-[6px]"></div>
             </div>
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
             <div className="grid grid-cols-1 md:grid-cols-1 gap-4 p-10">
                 {data.map((item, ind) => {
                     return (
                         <div className="rounded-md overflow-hidden bg-black shadow-lg w-full flex flex-col" key={ind}>
                             <div>
                                 <Image className="w-full h-40 object-cover" src={item.imgPath} alt="Card Image" />
                                 <Image className="w-full h-40 object-cover" src={item.issueNumber} alt="Card Image" />
                             </div>
                             <div className="px-6 py-4 flex-grow">
                                 <p className="text-white font-roboto-mono">
                                     {item.description}
                                 </p>
                             </div>
                             <div className="px-6 py-4 flex justify-end">
                                 <Link
                                     href={`utorontomist.medium.com/${item.slug}`}
                                     className="flex justify-center items-center rounded-md bg-utmist-purple shadow-md mt-5 text-[2.2vh] text-center w-[25vw] h-[5vh] lg:w-[8vw] lg:h-[4.9vh] md:w-[9vw] md:h-[6vh]"
                                 >
                                     <div className="text-white font-roboto-mono">Read More</div>
                                 </Link>
                             </div>

                         </div>
                     );
                 })}
             </div>




         </div>
     </>
 }
  
export default Demistify;