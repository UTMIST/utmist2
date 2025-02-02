"use client";
import LinkButton from "@app/common/LinkButton";
import { Project } from "@schema/project";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import DropDown from "public/assets/Vector 4.svg";
import { useFirebase } from "@app/firebase/useFirebase";
import { collection, getDocs } from "firebase/firestore";

export default function ProjectsPage() {
    console.log("[ProjectsPage] Init");
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isYearFilterOpen, setIsYearFilterOpen] = useState(false);
    const [yearFilter, setYearFilter] = useState<string[]>([]);
    const [isProjectFilterOpen, setIsProjectFilterOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState<string[]>([]);
    const [selectedProjectType, setSelectedProjectType] = useState("");
    const { db } = useFirebase();
    console.log("[ProjectsPage] Firebase db instance:", db ? "exists" : "null");

    useEffect(() => {
        let isMounted = true;
        console.log("[ProjectsPage] Effect running, db:", db);

        if (!db) {
            console.warn("[ProjectsPage] Database not initialized");
            setError("Database not initialized");
            setLoading(false);
            return;
        }

        const fetchProjects = async () => {
            try {
                console.log("[ProjectsPage] Starting fetch...");
                const projectsRef = collection(db, "projects");
                console.log("[ProjectsPage] Got collection ref");
                
                const querySnapshot = await getDocs(projectsRef);
                console.log("[ProjectsPage] Got snapshot, size:", querySnapshot.size);
                
                if (!isMounted) {
                    console.log("[ProjectsPage] Component unmounted, cancelling");
                    return;
                }

                const projectsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Project[];
                
                console.log("[ProjectsPage] Mapped data:", projectsData.length, "projects");
                
                const visibleProjects = projectsData.filter(project => project.slug !== null);
                console.log("[ProjectsPage] Visible projects:", visibleProjects.length);

                if (isMounted) {
                    setProjects(visibleProjects);
                    // Initialize year filter based on project dates
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
                    console.error("[ProjectsPage] Error details:", error.message);
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
    };

    const filteredProjects = projects
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
        .map((project, ind) => (
            <Link href={`/projects/${project.slug}`} key={project.id}>
                <br />
                <br />
                <div className="rounded-md overflow-hidden bg-black shadow-lg w-362">
                    <div className="absolute bg-black text-white py-1 px-3 rounded font-roboto-mono">
                        {project.status}
                    </div>
                    <img
                        className="w-full h-315"
                        src={project.thumbnail}
                        alt={project.title}
                    />
                    <div className="px-6 py-4">
                        <div className="font-bold text-white font-roboto-mono">
                            {project.title}
                        </div>
                        <p className="text-white font-roboto-mono">
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
        <div className="bg-dark-grey overflow-x-hidden">
            <div className="w-screen h-[53vh] bg-cover bg-wwd-banner"></div>
            <div className="absolute left-[16.7vw] top-[18vh] text-white text-[5.2vh] font-roboto-mono">
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

            <div className={filteredProjects.length == 0 ? "flex justify-center m-10 h-[26vh]" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-10"}>
                {filteredProjects.length == 0 ? <p className="text-white font-roboto-mono">No projects found for the selected criteria.</p> : filteredProjects}
            </div>
        </div>
    );
}