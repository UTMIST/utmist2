"use client";
import LinkButton from "@/common/LinkButton";
import { getContentData } from "@/common/general_parser";
import { ProjectMetaData } from "@/schemas/ProjectMetaData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProjectsProp {
  data: ProjectMetaData[];
}

const AllProjects: React.FC<ProjectsProp> = ({ data }) => {

  const infoCards = data.map((item, ind) => {
    return (
        <Link href="#">
        <div key={ind}>
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

        </div>
        </Link>

    );
  });

    const [isYearFilterOpen, setIsYearFilterOpen] = useState(false);
    const [yearFilter, setYearFilter] = useState<string[]>([]);
    const [isProjectFilterOpen, setIsProjectFilterOpen] = useState(false);
    const [selectedYear,setSelectedYear]= useState("");
    const [selectProjectType, setSelectedProjectType] = useState("");
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

    const projectTypeToggle = ()=>{
        setIsProjectFilterOpen(!isProjectFilterOpen);
    }

    const filterByProject = (projectType : string) => {
          setSelectedProjectType(projectType)
    }
    const filterByYear = (year:string) =>{
        setSelectedYear(year)
    }

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
                <br></br>
                <ul>
                    <li className="inline-block"> <button
                        className="flex flex-col justify-center rounded-md bg-utmist-purple shadow-md text-[2.2vh] text-center w-[69.7vw] h-[8.9vh] ml-[15vw] lg:w-[19.7vw] lg:h-[5.6vh] lg:ml-[17.7vw]"
                        onClick={yearFilterToggle}>
                        <p className="mx-auto text-white font-roboto-mono">Year</p> </button> </li>
                    {isYearFilterOpen && (
                        <ul>
                            {yearFilter.map((item, index) => (
                                <li key={index}>
                                   <Link href="#" onClick={()=>filterByYear(item.slice(-4))} className="text-white font-roboto-mono">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    )}



                    <li className="inline-block"> <button
                        className="flex flex-col justify-center rounded-md bg-utmist-purple shadow-md text-[2.2vh] text-center w-[69.7vw] h-[8.9vh] ml-[15vw] lg:w-[19.7vw] lg:h-[5.6vh] lg:ml-[17.7vw]"
                        onClick={projectTypeToggle}>
                        <p className="mx-auto text-white font-roboto-mono">Project Type</p> </button> </li>
                    {isProjectFilterOpen && (
                        <ul className="text-white font-roboto-mono">
                            <li><Link href="#" onClick={()=>filterByProject("Academic")}>Academic</Link></li>
                            <li><Link href="#" onClick={()=>filterByProject("Applied")}>Applied</Link></li>
                            <li><Link href="#" onClick={()=>filterByProject("Infrastructure")}>Infrastructure</Link></li>
                        </ul>
                    )}
                </ul>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-10">
                    {infoCards}
                </div>
            </div>

  );
};

export async function getStaticProps() {
  const data: ProjectMetaData[] = await getContentData<ProjectMetaData>(
      "projects"
  );

  return {
    props: {
      data,
    },
  };
}

export default AllProjects;