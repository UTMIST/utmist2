"use client";

import React, { useState } from "react";
import ProjectCard, { ProjectTypeCard } from "@/components/ProjectCard";
import SearchForm from "@/components/SearchForm";

type ProjectsClientProps = {
  projects: ProjectTypeCard[];
  query: string | null;
};

export default function ProjectsClient({ projects, query }: ProjectsClientProps) {
  const [isYearFilterOpen, setIsYearFilterOpen] = useState(false);
  const [isProjectFilterOpen, setIsProjectFilterOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string[]>([]);
  const [selectedProjectType, setSelectedProjectType] = useState("");

  const yearFilterToggle = () => {
    setIsYearFilterOpen(!isYearFilterOpen);
    setIsProjectFilterOpen(false);
  };

  const projectTypeToggle = () => {
    setIsProjectFilterOpen(!isProjectFilterOpen);
    setIsYearFilterOpen(false);
  };

  const resetFilters = () => {
    setSelectedYear([]);
    setSelectedProjectType("");
  };

  const filterByYear = (year: string) => {
    setSelectedYear([year]);
  };

  const filterByProject = (projectType: string) => {
    setSelectedProjectType(projectType);
  };

  const applyFilters = (projects: ProjectTypeCard[]) => {
    return projects.filter((project) => {
      const projectYear = project.publishDate
        ? new Date(project.publishDate).getFullYear().toString()
        : null;

      return (
        (selectedYear.length === 0 || (projectYear && selectedYear.includes(projectYear))) &&
        (selectedProjectType === "" || project.category?.toLowerCase() === selectedProjectType.toLowerCase())
      );
    });
  };

  const filteredProjects = applyFilters(projects);

  return (
    <div>
      <div className="relative flex items-center justify-center mt-6">
        <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <li>
            <button onClick={yearFilterToggle} className="filter_button">
              Year
            </button>
            {isYearFilterOpen && (
              <ul className="filter_dropdown">
                {[2023, 2022, 2021].map((year) => (
                  <li key={year}>
                    <button onClick={() => filterByYear(year.toString())}>{year}</button>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li>
            <button onClick={projectTypeToggle} className="filter_button">
              Project Type
            </button>
            {isProjectFilterOpen && (
              <ul className="filter_dropdown">
                {["Academic", "Applied", "Infrastructure"].map((type) => (
                  <li key={type}>
                    <button onClick={() => filterByProject(type)}>{type}</button>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li>
            <button onClick={resetFilters} className="filter_button">
              Reset Filters
            </button>
          </li>
        </ul>
      </div>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search Results for "${query}"` : `All Projects`}
        </p>
        <ul className="mt-7 card_grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))
          ) : (
            <p className="no-results">No Projects Found</p>
          )}
        </ul>
      </section>
    </div>
  );
}
