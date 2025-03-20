"use client";
import { Project } from "@schema/project";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import DropDown from "public/assets/Vector 4.svg";
import { useFirebase } from "@app/firebase/useFirebase";
import { collection, getDocs } from "firebase/firestore";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isYearFilterOpen, setIsYearFilterOpen] = useState(false);
  const [yearFilter, setYearFilter] = useState<string[]>([]);
  const [isProjectFilterOpen, setIsProjectFilterOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string[]>([]);
  const [selectedProjectType, setSelectedProjectType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { db } = useFirebase();

  useEffect(() => {
    let isMounted = true;

    if (!db) {
      console.warn("[ProjectsPage] Database not initialized");
      setError("Database not initialized");
      setLoading(false);
      return;
    }

    const fetchProjects = async () => {
      try {
        const projectsRef = collection(db, "projects");
        const querySnapshot = await getDocs(projectsRef);
        
        if (!isMounted) {
          return;
        }

        const projectsData = querySnapshot.docs.map((doc) => ({
          slug: doc.id,
          ...doc.data(),
        })) as Project[];

        const visibleProjects = projectsData.filter(project => project.slug !== null);

        if (isMounted) {
          setProjects(visibleProjects);
          if (visibleProjects.length > 0) {
            const years = visibleProjects.map(p => p.startDate.substring(0, 4));
            const uniqueYears = Array.from(new Set(years)).sort().reverse();
            const yearRanges = uniqueYears.slice(0, -1).map((year, index) => 
              `${uniqueYears[index + 1]}-${year}`
            );
            setYearFilter(yearRanges);
          }
        }
      } catch (error) {
        console.error("[ProjectsPage] Error fetching projects:", error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Failed to fetch projects");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, [db]);

  const yearFilterToggle = () => {
    setIsYearFilterOpen(!isYearFilterOpen);
    setIsProjectFilterOpen(false);
  };

  const projectTypeToggle = () => {
    setIsProjectFilterOpen(!isProjectFilterOpen);
    setIsYearFilterOpen(false);
  };

  const filterByProject = (projectType: string) => {
    setSelectedProjectType(projectType);
  };

  const filterByYear = (year: string) => {
    setSelectedYear([year.slice(4), year.slice(-4)]);
  };

  const resetFilters = () => {
    setSelectedYear([]);
    setSelectedProjectType("");
    setSearchQuery("");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredProjects = projects
    .filter((project) => {
      if (searchQuery) {
        return project.title.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
    })
    .filter((project) => {
      if (selectedYear.length > 0) {
        const projectYear = project.startDate.substring(0, 4);
        return selectedYear.includes(projectYear);
      }
      return true;
    })
    .filter((project) => {
      if (selectedProjectType !== "") {
        return project.type === selectedProjectType;
      }
      return true;
    })
    .map((project) => (
      <Link href={`/projects/${project.slug}`} key={project.id}>
        <div className="bg-[#1E1650] rounded-[25px] overflow-hidden shadow-xl hover:shadow-[0_0_25px_rgba(148,97,255,0.5)] transition-all">
          <div className="absolute bg-black text-white py-1 px-3 rounded font-roboto-mono">
            {project.status}
          </div>
          <Image
            className="w-full h-315"
            src={project.thumbnail}
            alt={project.title}
            width={400}
            height={315}
          />
          <div className="p-4 text-center bg-[#665ADF] hover:bg-[#7A6FEB] transition-colors cursor-pointer flex flex-col justify-center">
            <div className="font-bold text-left text-white font-roboto-mono">
              {project.title}
            </div>
            <p className="text-white text-left font-roboto-mono mt-1">
              {project.synopsis}
            </p>
          </div>
        </div>
      </Link>
    ));

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-dark-grey">
        <div className="text-white text-xl">Loading projects...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-dark-grey">
        <div className="text-white text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-auto bg-[#3749E4] overflow-x-hidden">
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
        />
      </div>
      <div className="absolute left-[8.7vw] top-[15.7vh] text-white text-[5.2vh] font-roboto-mono">
        <div className="font-bold">Projects</div>
        <div className="bg-[#DA92F6] w-[11.1vw] h-[6px]"></div>
      </div>
      
      <div className="text-white px-10 pt-8 pb-4 font-['October_Tamil_Regular']">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec justo vel sapien varius efficitur. Nullam sit amet metus sit amet metus scelerisque consectetur non a felis. Sed vel aliquet odio. Proin nec tellus quis nunc efficitur tincidunt.
      </div>

      <div className="relative flex items-center justify-center mt-6">
        <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <li className="relative">
            <button
              className={isYearFilterOpen ? "flex items-center justify-center rounded-md bg-utmist-pink shadow-md text-[2.2vh] w-[69.7vw] h-[8.9vh] lg:w-[19.7vw] lg:h-[5.6vh]" : "flex items-center justify-center rounded-md bg-utmist-purple shadow-md text-[2.2vh] w-[69.7vw] h-[8.9vh] lg:w-[19.7vw] lg:h-[5.6vh]"}
              onClick={yearFilterToggle}
            >
              <p className="text-white font-roboto-mono">Year</p>
              <Image src={DropDown} height={14} width={14} alt="select year" className="ml-2" />
            </button>
            {isYearFilterOpen && (
              <ul className="absolute top-full left-0 mt-1 bg-dropdown rounded-md shadow-md text-white text-[2.2vh] w-[69.7vw] lg:w-[19.7vw] z-10 flex flex-col items-center">
                {yearFilter.map((item, index) => (
                  <li key={index}>
                    <Link href="#" onClick={() => filterByYear(item)} className={selectedYear.includes(item.slice(-4)) ? "font-roboto-mono bg-utmist-pink block px-4 py-2" : "font-roboto-mono block px-4 py-2"}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li className="relative">
            <button
              className={isProjectFilterOpen ? "flex items-center justify-center rounded-md bg-utmist-pink shadow-md text-[2.2vh] w-[69.7vw] h-[8.9vh] lg:w-[19.7vw] lg:h-[5.6vh]" : "flex items-center justify-center rounded-md bg-utmist-purple shadow-md text-[2.2vh] w-[69.7vw] h-[8.9vh] lg:w-[19.7vw] lg:h-[5.6vh]"}
              onClick={projectTypeToggle}
            >
              <p className="text-white font-roboto-mono">Project Type </p>
              <Image src={DropDown} height={14} width={14} alt="select year" className="ml-2" />
            </button>
            {isProjectFilterOpen && (
              <ul className="absolute top-full left-0 mt-1 bg-dropdown rounded-md shadow-md text-white text-[2.2vh] w-[69.7vw] lg:w-[19.7vw] z-10 flex flex-col items-center">
                <li>
                  <Link href="#" onClick={() => filterByProject("Academic")} className={selectedProjectType == "Academic" ? "font-roboto-mono bg-utmist-pink block px-4 py-2" : "font-roboto-mono block px-4 py-2"}>
                    Academic
                  </Link>
                </li>
                <li>
                  <Link href="#" onClick={() => filterByProject("Applied")} className={selectedProjectType == "Applied" ? "font-roboto-mono bg-utmist-pink block px-4 py-2" : "font-roboto-mono block px-4 py-2"}>
                    Applied
                  </Link>
                </li>
                <li>
                  <Link href="#" onClick={() => filterByProject("Infrastructure")} className={selectedProjectType == "Infrastructure" ? "font-roboto-mono bg-utmist-pink block px-4 py-2" : "font-roboto-mono block px-4 py-2"}>
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
      
      <div className="flex justify-center mb-6 pt-10 px-10">
        <div className="w-full max-w-xl flex">
          <input
            type="text"
            placeholder="Project Name"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full py-2 px-4 rounded-l-md border-0 focus:outline-none"
          />
          <button className="bg-[#92DEFF] px-4 rounded-r-md flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Projects List */}
      <div className={filteredProjects.length == 0 ? "flex justify-center m-10 h-[26vh]" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-10"}>
        {filteredProjects.length == 0 ? <p className="text-white font-roboto-mono">No projects found for the selected criteria.</p> : filteredProjects}
      </div>
    </div>
  );
}