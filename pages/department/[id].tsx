"use client";

import { getContentData } from "@/common/general_parser";
import { useState } from "react";
import { DepartmentMetaData } from "@/schemas/DepartmentMetaData";
import { GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import TeamMember from "@/components/project/TeamMember";
import ReactMarkdown from "react-markdown";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import DropDown from "public/assets/Vector 4.svg";

type ContentData<T> = T & { content: string; slug: string };

const IndividualDepartment = ({
  found,
}: {
  found: ContentData<DepartmentMetaData>;
}) => {
  // logic to determine the number of rows needed to display team members
  const [isYearFilterOpen, setIsYearFilterOpen] = useState(false);
  const [yearFilter, setYearFilter] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string[]>([]);

  const yearFilterToggle = () => {
    // Assuming that the 1st item in the data array is the most recent one
    const recentYear = new Date().getFullYear();
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

  const filterByYear = (year: string) => {
    const yearArray = year.split("-").map(String);
    setSelectedYear(yearArray);
  };

  const filteredTeamMembers = found.team.filter((item) => {
    // If no year is selected, return all items
    if (selectedYear.length === 0) return true;
    return item.year.some((year) => selectedYear.includes(year.trim()));
  });

  const numRows = Math.ceil(filteredTeamMembers.length / 6);
  const teamMemberData = [];
  for (let i = 0; i < numRows; i++) {
    const row = filteredTeamMembers.slice(6 * i, 6 * (i + 1));
    const rowElements = row.map((rowItem, i) => {
      return <TeamMember key={rowItem.name} data={rowItem}></TeamMember>;
    });
    teamMemberData.push(
      <div key={i} className="flex justify-evenly">
        {rowElements}
      </div>
    );
  }

  // creating custom components to style markdown content from yaml file
  const H1Component = (props: {
    className?: string;
    children?: React.ReactNode;
  }) => (
    <div
      className={`px-[7.4vw] font-roboto-mono text-white text-[24px] font-[700] mb-[2vh]`}
    >
      {props.children}
      <div
        className={`bg-[#00349F] w-[8.1vw] h-[6px] ${props.className}`}
      ></div>
    </div>
  );

  const H2Component = (props: {
    className?: string;
    children?: React.ReactNode;
  }) => (
    <div
      className={`px-[9.5vw] font-roboto-mono text-white text-[20px] font-[700] mb-[2vh] mt-[3.5vh]`}
    >
      {props.children}
      <div
        className={`bg-[#00349F] w-[6.1vw] h-[4px] ${props.className}`}
      ></div>
    </div>
  );

  const UlComponent = (props: {
    className?: string;
    children?: React.ReactNode;
  }) => (
    <div
      className={`px-[9.5vw] font-roboto-mono text-white text-[16px] font-[400] mb-[3vh]`}
    >
      {props.children}
    </div>
  );

  const PComponent = (props: {
    className?: string;
    children?: React.ReactNode;
  }) => {
    return (
      <div
        className={`px-[9.5vw] font-roboto-mono text-white text-[16px] font-[400] mb-[3vh]`}
      >
        {props.children}
      </div>
    );
  };

  const ImgComponent = (props: { src?: string; alt?: string }) => {
    return (
      <div className="rounded-md">
        <img src={props.src} alt={props.alt} />
      </div>
    );
  };

  const H6Component = (props: {
    className?: string;
    children?: React.ReactNode;
  }) => {
    return (
      <div className="px-[9.5vw] inline-block mb-[3vh]">{props.children}</div>
    );
  };

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
        <ReactMarkdown
          components={{
            h1: ({ children, className = "mt-[1vh]", ...props }) => (
              <H1Component className={className} {...props}>
                {children}
              </H1Component>
            ),
            h2: ({ children, className = "mt-[1vh]", ...props }) => (
              <H2Component className={className} {...props}>
                {children}
              </H2Component>
            ),
            ul: ({ children, ...props }) => (
              <UlComponent {...props}>{children}</UlComponent>
            ),
            p: ({ children, ...props }) => (
              <PComponent {...props}>{children}</PComponent>
            ),
            img: ({ src, alt }) => <ImgComponent src={src} alt={alt} />,
            h6: ({ children, className }) => (
              <H6Component>{children}</H6Component>
            ),
          }}
        >
          {found.content}
        </ReactMarkdown>

        {/* Flex container for "The Team" and Year button */}
        <div className="flex items-center justify-between px-[7.4vw] mb-[6vh] pt-5">
          <div className="flex flex-col">
            <div className="font-roboto-mono text-white text-[20px] font-[700]">
              The Team
            </div>
            <div className="bg-[#00349F] w-[8.1vw] h-[6px] mt-[1vh]"></div>
          </div>
          <div className="relative">
            {" "}
            {/* Added relative positioning here */}
            <button
              className={`flex items-center justify-center rounded-md shadow-md text-[2.2vh] 
    h-[6vh] sm:h-[5.6vh] md:h-[5vh] lg:h-[4.5vh] 
    ${
      isYearFilterOpen
        ? "bg-utmist-pink w-[70vw] sm:w-[50vw] md:w-[40vw] lg:w-[19.7vw]"
        : "bg-utmist-purple w-[70vw] sm:w-[50vw] md:w-[40vw] lg:w-[19.7vw]"
    }`}
              onClick={yearFilterToggle}
            >
              <p className="text-white font-roboto-mono">Year</p>
              <Image
                src={DropDown}
                height={14}
                width={14}
                alt="select year"
                className="ml-2"
              />
            </button>
            {/* Dropdown list */}
            {isYearFilterOpen && (
              <ul className="absolute top-full left-0 mt-1 bg-dropdown rounded-md shadow-md text-white text-[2.2vh] w-[69.7vw] lg:w-[19.7vw] z-10 flex flex-col items-center">
                {yearFilter.map((item, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      onClick={() => filterByYear(item)}
                      className={
                        selectedYear.includes(item.slice(-4))
                          ? "font-roboto-mono bg-utmist-pink block px-4 py-2"
                          : "font-roboto-mono block px-4 py-2"
                      }
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="px-[9.5vw]">{teamMemberData}</div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const data: ContentData<DepartmentMetaData>[] =
    await getContentData<DepartmentMetaData>("departments");

  const paths = data.map((item) => {
    return { params: { id: item.slug } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const params: ParsedUrlQuery = context.params!;
  const data: ContentData<DepartmentMetaData>[] =
    await getContentData<DepartmentMetaData>("departments");
  const deptId = params.id as string;

  const found = data.find((item) => item.slug == deptId);

  return {
    props: {
      found,
    },
  };
}

export default IndividualDepartment;
