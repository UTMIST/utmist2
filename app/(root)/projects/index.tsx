//"use client";
import LinkButton from "@app/common/LinkButton";
import { ProjectMetaData } from "@/schemas/ProjectMetaData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DropDown from "public/assets/Vector 4.svg";

interface ProjectsProp {
  data: ProjectMetaData[];
}



const AllProjects: React.FC<ProjectsProp> = ({ data }) => {
    const [isYearFilterOpen, setIsYearFilterOpen] = useState(false);
    const [yearFilter, setYearFilter] = useState<string[]>([]);
    const [isProjectFilterOpen, setIsProjectFilterOpen] = useState(false);
    const [selectedYear,setSelectedYear]= useState<string[]>([]);
    const [selectedProjectType, setSelectedProjectType] = useState("");
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
        setIsProjectFilterOpen(false);
    };

    const projectTypeToggle = ()=>{
        setIsProjectFilterOpen(!isProjectFilterOpen);
        setIsYearFilterOpen(false)
    }

    const filterByProject = (projectType : string) => {
        setSelectedProjectType(projectType)
    }
    const filterByYear = (year:string) =>{
        setSelectedYear([year.slice(4),year.slice(-4)])
    }

    const resetFilters = ()=>{
        setSelectedYear([]);
        setSelectedProjectType("");
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
        .filter((item) => {
            // Filter based on selectedProjectType
            if (selectedProjectType !== "") {
                return item.type === selectedProjectType;
            }
            return true; // Include all if selectedProjectType is empty
        })
        .map((item, ind) => {
            return (
                <Link href={`/project/${item.slug}`} key={ind}>
                    <br></br>
                    <br></br>
                    <div className="rounded-md overflow-hidden bg-black shadow-lg w-362">
                        <div className="absolute bg-black text-white py-1 px-3 rounded font-roboto-mono">{item.status}</div>
                        <img className="w-full h-315" src={item.images[0]} alt="Card Image" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-white font-roboto-mono">{item.title}</div>
                            <p className="text-white font-roboto-mono">
                                {item.description}
                            </p>
                        </div>
                    </div>
                </Link>
            );
        });

  return (
            <div className="bg-dark-grey overflow-x-hidden">
                <div className=" w-screen h-[53vh] bg-cover bg-wwd-banner"></div>
                <div className=" absolute left-[16.7vw] top-[18vh] text-white text-[5.2vh] font-roboto-mono">
                    <div>Projects</div>
                    <div className="bg-[#00349F] w-[8.1vw] h-[6px]"></div>
                </div>
                <div className="absolute left-[16.7vw] top-[33vh] text-white text-[2.3vh] font-roboto-mono">
                    <p>Project Developer</p>
                    <p>Applications are Now Open!</p>
                    <p>For more information,...</p>
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

                        <li className="relative">
                            <button
                                className={isProjectFilterOpen?"flex items-center justify-center rounded-md bg-utmist-pink shadow-md text-[2.2vh] w-[69.7vw] h-[8.9vh] lg:w-[19.7vw] lg:h-[5.6vh]":"flex items-center justify-center rounded-md bg-utmist-purple shadow-md text-[2.2vh] w-[69.7vw] h-[8.9vh] lg:w-[19.7vw] lg:h-[5.6vh]"}
                                onClick={projectTypeToggle}
                            >
                                <p className="text-white font-roboto-mono">Project Type </p>
                                <Image src={DropDown} height={14} width={14} alt="select year" className="ml-2" />
                            </button>
                            {isProjectFilterOpen && (
                                <ul className="absolute top-full left-0 mt-1 bg-dropdown rounded-md shadow-md text-white text-[2.2vh] w-[69.7vw] lg:w-[19.7vw] z-10 flex flex-col items-center">
                                    <li>
                                        <Link href="#" onClick={() => filterByProject("Academic")} className={selectedProjectType=="Academic"?"font-roboto-mono bg-utmist-pink block px-4 py-2":"font-roboto-mono block px-4 py-2"}>
                                            Academic
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" onClick={() => filterByProject("Applied")} className={selectedProjectType=="Applied"?"font-roboto-mono bg-utmist-pink block px-4 py-2":"font-roboto-mono block px-4 py-2"}>
                                            Applied
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" onClick={() => filterByProject("Infrastructure")} className={selectedProjectType=="Infrastructure"?"font-roboto-mono bg-utmist-pink block px-4 py-2":"font-roboto-mono block px-4 py-2"}>
                                            Infrastructure
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button
                                className="flex items-center justify-center rounded-md bg-utmist-purple shadow-md text-[2.2vh] w-[69.7vw] h-[8.9vh] lg:w-[19.7vw] lg:h-[5.6vh]"
                                onClick={resetFilters}
                            >
                                <p className="text-white font-roboto-mono">Reset Filters</p>
                            </button>
                        </li>
                    </ul>
                </div>






                <div className={filteredInfoCards.length==0?"flex justify-center m-10 h-[26vh]":"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-10"}>
                    {filteredInfoCards.length==0? <p className="text-white font-roboto-mono">No projects found for the selected criteria.</p>:filteredInfoCards}
                </div>
            </div>

  );
};

export default AllProjects;