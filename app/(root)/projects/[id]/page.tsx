"use client";

import LinkButton from "@app/common/LinkButton";
import ReactMarkdown from "react-markdown";
import React from "react";
import { useFirebase } from "@app/firebase/useFirebase";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useParams } from "next/navigation";
import { Project } from "@schema/project";
import { useEffect, useState } from "react";
import Image from "next/image";

const IndividualProject = () => {
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { db } = useFirebase();
    const params = useParams();
    const id = params.id as string;

    useEffect(() => {
        let isMounted = true;

        const fetchProject = async () => {
            if (!db) {
                console.warn("[ProjectPage] Database not initialized");
                setError("Database not initialized");
                setLoading(false);
                return;
            }

            try {
                console.log("[ProjectPage] Fetching project with slug:", id);
                const projectsRef = collection(db, "projects");
                const q = query(projectsRef, where("slug", "==", id));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    setError("Project not found with slug: " + id);
                    setLoading(false);
                    return;
                }

                const projectDoc = querySnapshot.docs[0];
                const projectData = {
                    id: projectDoc.id,
                    ...projectDoc.data()
                } as Project;

                if (isMounted) {
                    setProject(projectData);
                }
            } catch (error) {
                console.error("[ProjectPage] Error fetching project:", error, id);
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Failed to fetch project");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchProject();

        return () => {
            isMounted = false;
        };
    }, [db, id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-dark-grey">
                <div className="text-white text-xl">Loading project...</div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-dark-grey">
                <div className="text-white text-xl">Error: {error || "Project not found"}</div>
            </div>
        );
    }

    // creating custom components to style markdown content
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
                <Image 
                    src={props.src || ''} 
                    alt={props.alt || ''} 
                    width={800} 
                    height={600}
                    className="w-full h-auto"
                />
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
            <div className="relative w-screen h-auto bg-dark-grey pb-16">
                <div className="w-screen h-[40vh] bg-cover bg-wwd-banner mb-[5vh]"></div>
                <div className="absolute left-[16.7vw] top-[15.7vh] text-white text-[5.2vh] font-roboto-mono">
                    <div>{project.title}</div>
                    <div className="bg-[#00349F] w-[13.1vw] h-[6px]"></div>
                </div>
                <div className="px-[7.4vw] font-roboto-mono text-white text-[24px] font-[700] mb-[3vh]">
                    <div className="mb-[1vh]">Synopsis</div>
                    <div className="bg-[#00349F] w-[8.1vw] h-[6px]"></div>
                </div>
                <div className="px-[9.5vw] font-roboto-mono text-white font-[400] text-[14px] mb-[5vh]">
                    {project.synopsis}
                </div>
                <div className="px-[7.4vw] font-roboto-mono text-white text-[24px] font-[700] mb-[3vh]">
                    <div className="mb-[1vh]">Details</div>
                    <div className="bg-[#00349F] w-[8.1vw] h-[6px]"></div>
                </div>
                <div className="px-[9.5vw] font-roboto-mono text-white font-[400] text-[14px] mb-[5vh]">
                    <p>Type: {project.type}</p>
                    <p>Status: {project.status}</p>
                    <p>Duration: {project.startDate} - {project.endDate}</p>
                </div>
                {project.content && (
                    <ReactMarkdown
                        className="markdown-body"
                        components={{
                            h1: ({ children, className = "mt-[1vh]", ...props }) => <H1Component className={className} {...props}>{children}</H1Component>,
                            h2: ({ children, className = "mt-[1vh]", ...props }) => <H2Component className={className} {...props}>{children}</H2Component>,
                            ul: ({ children, ...props }) => <UlComponent {...props}>{children}</UlComponent>,
                            p: ({ children, ...props }) => (
                                <PComponent {...props}>
                                    <div style={{ whiteSpace: 'pre-wrap' }}>{children}</div>
                                </PComponent>
                            ),
                            img: ({ src, alt }) => <ImgComponent src={src} alt={alt} />,
                            h6: ({ children, className }) => <H6Component>{children}</H6Component>,
                            br: () => <br />,
                        }}>
                        {typeof project.content === 'string' ? project.content.replace(/\\n/g, '\n') : project.content}
                    </ReactMarkdown>
                )}
            </div>
        </>
    );
};

export default IndividualProject; 