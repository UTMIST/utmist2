"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

import LinkButton from "@app/common/LinkButton";
import TeamMember from "@app/common/TeamMember";
import { useFirebase } from "@app/firebase/useFirebase";
import { Project } from "@schema/project";
import PageHeader from "@app/components/PageHeader";


interface TeamMember {
    id: string;
    displayName: string;
    name: string;
    image: string;
    role: string;
    email?: string;
    socials?: {
        LinkedIn?: string;
        GitHub?: string;
    };
}

interface Team {
    id: string;
    name: string;
    title: string;
    description: string;
    members: any[];
}

const MarkdownComponents = {
    h1: ({ children, className = "mt-[1vh]", ...props }: { children?: React.ReactNode, className?: string, [key: string]: any }) => (
        <div className={`px-[7.4vw] font-roboto-mono text-white text-[24px] font-[700] mb-[2vh]`}>
            {children}
            <div className={`bg-[#00349F] w-[8.1vw] h-[6px] ${className}`}></div>
        </div>
    ),
    h2: ({ children, className = "mt-[1vh]", ...props }: { children?: React.ReactNode, className?: string, [key: string]: any }) => (
        <div className={`px-[9.5vw] font-roboto-mono text-white text-[20px] font-[700] mb-[2vh] mt-[3.5vh]`}>
            {children}
            <div className={`bg-[#00349F] w-[6.1vw] h-[4px] ${className}`}></div>
        </div>
    ),
    ul: ({ children, ...props }: { children?: React.ReactNode, [key: string]: any }) => (
        <div className={`px-[9.5vw] font-roboto-mono text-white text-[16px] font-[400] mb-[3vh]`}>
            {children}
        </div>
    ),
    p: ({ children, ...props }: { children?: React.ReactNode, [key: string]: any }) => (
        <div className={`px-[9.5vw] font-roboto-mono text-white text-[16px] font-[400] mb-[3vh]`}>
            <div style={{ whiteSpace: 'pre-wrap' }}>{children}</div>
        </div>
    ),
    img: ({ src, alt }: { src?: string, alt?: string }) => (
        <div className="rounded-md">
            <Image 
                src={src || ''} 
                alt={alt || ''} 
                width={800} 
                height={600}
                className="w-full h-auto"
            />
        </div>
    ),
    h6: ({ children, className }: { children?: React.ReactNode, className?: string }) => (
        <div className="px-[9.5vw] inline-block mb-[3vh]">
            {children}
        </div>
    ),
    br: () => <br />,
};

const IndividualProject = () => {
    const [project, setProject] = useState<Project | null>(null);
    const [team, setTeam] = useState<Team | null>(null);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { db } = useFirebase();
    const params = useParams();
    const id = params.id as string;

    useEffect(() => {
        let isMounted = true;

        const fetchProject = async () => {
            if (!db) {
                setError("Database not initialized");
                setLoading(false);
                return;
            }

            try {
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
                    
                    if (projectData.teamId && typeof projectData.teamId === 'object' && 'type' in projectData.teamId) {
                        await fetchTeamData(projectData.teamId);
                    }
                }
            } catch (error) {
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

        const fetchTeamData = async (teamRef: any) => {
            try {
                const teamDoc = await getDoc(teamRef);
                
                if (teamDoc.exists()) {
                    const rawData = teamDoc.data() as any;
                    const teamData: Team = {
                        id: teamDoc.id,
                        name: rawData.name || '',
                        title: rawData.title || '',
                        description: rawData.description || '',
                        members: rawData.members || []
                    };
                    
                    setTeam(teamData);
                    
                    if (teamData.members && teamData.members.length > 0) {
                        await processTeamMembers(teamData.members);
                    }
                }
            } catch (err) {
            }
        };

        const processTeamMembers = async (members: any[]) => {
            const membersArray: TeamMember[] = [];
            let permissionError = false;
            let successfulFetches = 0;
            
            for (let i = 0; i < members.length; i++) {
                const memberRef = members[i];
                
                try {
                    if (!memberRef) {
                        continue;
                    }
                    
                    let path = null;
                    let userId = null;
                    
                    if (typeof memberRef === 'string') {
                        path = memberRef;
                        userId = path.split('/').pop();
                    } else if (memberRef.path) {
                        path = memberRef.path;
                        userId = path.split('/').pop();
                    } else if (memberRef._key && memberRef._key.path && memberRef._key.path.segments) {
                        const segments = memberRef._key.path.segments;
                        userId = segments[segments.length - 1];
                        path = `publicUsers/${userId}`;
                    } else if (memberRef._path && memberRef._path.segments) {
                        const segments = memberRef._path.segments;
                        userId = segments[segments.length - 1];
                        path = `publicUsers/${userId}`;
                    } else if (memberRef.id) {
                        userId = memberRef.id;
                        path = `publicUsers/${userId}`;
                    }

                    console.log(path, userId)
                    
                    if (path) {
                        try {
                            const memberDocRef = doc(db as any, path);
                            const memberDoc = await getDoc(memberDocRef);
                            
                            if (memberDoc.exists()) {
                                const userData = memberDoc.data() as any;
                                
                                const publicUserData = {
                                    displayName: userData.displayName || userData.name || "Team Member",
                                    name: userData.name || userData.displayName || "Team Member",
                                    image: userData.image || "/imgs/team/default.svg",
                                    role: userData.role || "Member",
                                    socials: userData.socials || {}
                                };
                                
                                console.log(userData);

                                successfulFetches++;
                                
                                membersArray.push({
                                    id: userId || `user-${i}`,
                                    displayName: publicUserData.displayName,
                                    name: publicUserData.name,
                                    image: publicUserData.image,
                                    role: publicUserData.role,
                                    socials: publicUserData.socials
                                });
                            }
                        } catch (fetchError: any) {
                            if (fetchError.code === 'permission-denied') {
                                permissionError = true;
                            }
                        }
                    }
                } catch (err) {
                }
            }
            
            if (membersArray.length > 0) {
                setTeamMembers(membersArray);
            } else if (permissionError) {
                const userIds = members.map((ref, index) => {
                    if (typeof ref === 'string') return ref.split('/').pop() || `user-${index}`;
                    if (ref.path) return ref.path.split('/').pop() || `user-${index}`;
                    if (ref._key && ref._key.path && ref._key.path.segments) {
                        const segments = ref._key.path.segments;
                        return segments[segments.length - 1] || `user-${index}`;
                    }
                    if (ref._path && ref._path.segments) {
                        const segments = ref._path.segments;
                        return segments[segments.length - 1] || `user-${index}`;
                    }
                    if (ref.id) return ref.id;
                    return `user-${index}`;
                });
                
                userIds.forEach((userId, index) => {
                    membersArray.push({
                        id: userId,
                        displayName: `Team Member ${index + 1}`,
                        name: `Team Member ${index + 1}`,
                        image: "/imgs/team/default.svg",
                        role: index === 0 ? "Team Lead" : "Member",
                        email: "",
                        socials: {}
                    });
                });
                
                setTeamMembers(membersArray);
            }
        };

        fetchProject();

        return () => {
            isMounted = false;
        };
    }, [db, id]);

    const TeamSection = () => {
        if (!team) {
            return (
                <div className="w-full py-8">
                    <div className="px-[7.4vw] font-roboto-mono text-white text-[24px] font-[700] mb-[3vh]">
                        <div className="mb-[1vh]">Team</div>
                        <div className="bg-[#00349F] w-[8.1vw] h-[6px]"></div>
                    </div>
                    
                    <div className="px-[9.5vw] font-roboto-mono text-white font-[400] text-[14px] mb-[5vh]">
                        No team information available for this project.
                    </div>
                </div>
            );
        }
        
        return (
            <div className="w-full py-8">
                <div className="px-[7.4vw] font-roboto-mono text-white text-[24px] font-[700] mb-[3vh]">
                    <div className="mb-[1vh]">Team</div>
                    <div className="bg-[#00349F] w-[8.1vw] h-[6px]"></div>
                </div>
                
                <div className="px-[9.5vw] font-roboto-mono text-white font-[400] text-[14px] mb-[5vh]">
                    {team.description || "No team description available."}
                </div>
                
                {teamMembers.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 px-[7vw] mb-8">
                        {teamMembers.map((member) => (
                            <TeamMember key={member.id} data={member} />
                        ))}
                    </div>
                ) : (
                    <div className="px-[9.5vw] font-roboto-mono text-white font-[400] text-[14px] mb-[5vh]">
                        No team members listed for this project.
                    </div>
                )}
            </div>
        );
    };

    const renderMarkdownContent = (content: string) => (
        <ReactMarkdown
            className="markdown-body"
            components={MarkdownComponents}
        >
            {typeof content === 'string' ? content.replace(/\\n/g, '\n') : content}
        </ReactMarkdown>
    );

    const processContent = () => {
        if (!project?.content) return null;
        
        const TEAMS_PLACEHOLDER = "{{teams}}";
        
        if (project.content.includes(TEAMS_PLACEHOLDER)) {
            const contentParts = project.content.split(TEAMS_PLACEHOLDER);
            
            return (
                <>
                    {renderMarkdownContent(contentParts[0])}
                    <TeamSection />
                    {contentParts.length > 1 && renderMarkdownContent(contentParts[1])}
                </>
            );
        } else {
            return (
                <>
                    {renderMarkdownContent(project.content)}
                    <TeamSection />
                </>
            );
        }
    };

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

    return (
        <>
            <div className="relative w-screen h-auto">
            <PageHeader title={project.title} />

            <div className="relative w-screen h-auto bg-gradient-to-b from-[#131B6B] to-[#483EE0] pb-16">
                <br />
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
                    
                    {project.content ? processContent() : <TeamSection />}
                </div>
            </div>
        </>
    );
};

export default IndividualProject;