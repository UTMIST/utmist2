"use client";

import LinkButton from "@/common/LinkButton";
import { getContentData } from "@/common/general_parser";
import { ProjectMetaData } from "@/schemas/ProjectMetaData";
import { GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import TeamMember from "@/components/project/TeamMember";
import ReactMarkdown from "react-markdown";
import React from "react";
type ContentData<T> = T & { content: string; slug: string };

const IndividualProject = ({ found }: { found: ContentData<ProjectMetaData> }) => {
    // mock data for testing purposes
    const propData = {
        name: 'John Doe',
        image: "/assets/LinkedinIcon.svg",
        socials: {
            LinkedIn: "https://linkedin.com/in/example",
            GitHub: "https://github.com/example",
            Twitter: "https://twitter.com/example"
        },
        role: "Director"
    }

    console.log(found);
    const numRows = Math.ceil((found.team.length / 6))
    const teamMemberData = [];
    for (let i = 0; i < numRows; i++) {
        const row = found.team.slice(6 * i, 6 * (i + 1));
        const rowElements = row.map((rowItem) => {
            return (
                <TeamMember data={rowItem}></TeamMember>
            )
        })
        teamMemberData.push(
            <div className="flex justify-evenly">
                {rowElements}
            </div>
        )
    }


    const H1Component = (props: { className?: string, children?: React.ReactNode }) => (
        <div className={`px-[7.4vw] font-roboto-mono text-white text-[24px] font-[700] mb-[2vh]`}>
            {props.children}
            <div className={`bg-[#00349F] w-[8.1vw] h-[6px] ${props.className}`}></div>
        </div>
    );

    const H2Component = (props: { className?: string, children?: React.ReactNode }) => (
        <div className={`px-[9.5vw] font-roboto-mono text-white text-[20px] font-[700] mb-[2vh] mt-[3.5vh]`}>
            {props.children}
            <div className={`bg-[#00349F] w-[6.1vw] h-[4px] ${props.className}`}></div>
        </div>
    );

    const UlComponent = (props: { className?: string, children?: React.ReactNode }) => (
        <div className={`px-[9.5vw] font-roboto-mono text-white text-[16px] font-[400] mb-[3vh]`}>
            {props.children}
        </div>
    );

    const PComponent = (props: { className?: string, children?: React.ReactNode }) => {
        return (
            <div className={`px-[9.5vw] font-roboto-mono text-white text-[16px] font-[400] mb-[3vh]`}>
                {props.children}
            </div>
        )
    }

    const ImgComponent = (props: {src?: string, alt?: string}) => {
        return (
            <div className="rounded-md">
                <img src={props.src} alt={props.alt}/>
            </div>
        );
    }

    const H6Component = (props: {className?: string, children?: React.ReactNode}) => {
        return (
            <div className="px-[9.5vw] inline-block mb-[3vh]">
                {props.children}
            </div>
        );
    }

    return (

        <>
            <div className="relative w-screen h-auto bg-dark-grey">
                <div className=" w-screen h-[40vh] bg-cover bg-wwd-banner mb-[5vh]"></div>
                <div className=" absolute left-[16.7vw] top-[15.7vh] text-white text-[5.2vh] font-roboto-mono">
                    <div>{found.title}</div>
                    <div className="bg-[#00349F] w-[13.1vw] h-[6px]"></div>
                </div>
                <div className="px-[10vw] flex justify-end mb-[5vh]">
                    <div className="mr-[2.2vw]">
                        <LinkButton buttonText="Youtube" redirectPath=""></LinkButton>
                    </div>
                    <div className="ml-[2.2vw]">
                        <LinkButton buttonText="Proposal" redirectPath=""></LinkButton>
                    </div>

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
                        h1: ({ children, className = "mt-[1vh]", ...props }) => <H1Component className={className} {...props}>{children}</H1Component>,
                        h2: ({ children, className = "mt-[1vh]", ...props }) => <H2Component className={className} {...props}>{children}</H2Component>,
                        ul: ({ children, ...props }) => <UlComponent {...props}>{children}</UlComponent>,
                        p: ({ children, ...props }) => <PComponent  {...props}>{children}</PComponent>,
                        img: ({src, alt}) => <ImgComponent src={src} alt={alt}/>, 
                        h6: ({children, className}) => <H6Component>{children}</H6Component>, 

                    }}>
                    {found.content}
                </ReactMarkdown>
                <div className="px-[7.4vw] font-roboto-mono text-white text-[20px] font-[700] mb-[6vh]">
                    <div className="mb-[1vh]">The Team</div>
                    <div className="bg-[#00349F] w-[8.1vw] h-[6px]"></div>
                </div>
                <div className="px-[9.5vw]">
                    {teamMemberData}



                </div>



            </div>
        </>
    );
};

export async function getStaticPaths() {
    const data: ContentData<ProjectMetaData>[] = await getContentData<ProjectMetaData>(
        "projects"
    );

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
    const data: ContentData<ProjectMetaData>[] = await getContentData<ProjectMetaData>(
        "projects"
    );
    const projId = params.id as string

    const found = data.find((item) => item.slug == projId);

    return {
        props: {
            found,
        },
    };
}

export default IndividualProject;
