import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { PROJECT_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import ReactMarkdown from 'react-markdown';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import { User } from '@/sanity/types';

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;

    const project = await client.fetch(PROJECT_BY_ID_QUERY, { id });

    if (!project) return notFound();

    return (
        <>
            <div className="relative w-screen h-auto bg-dark-grey pb-16">
                <div className="w-screen h-[40vh] bg-cover bg-wwd-banner mb-[5vh]"></div>
                <div className="absolute left-[16.7vw] top-[15.7vh] text-white text-[5.2vh] font-roboto-mono">
                    <div>{project.title}</div>
                    <div className="bg-[#00349F] w-[13.1vw] h-[6px]"></div>
                </div>

                <div className="px-[10vw] flex justify-end mb-[5vh]">
                    {project.youtube && (
                        <div className="mr-[2.2vw]">
                            <a
                                href={project.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#00349F] text-white py-2 px-4 rounded-lg font-roboto-mono"
                            >
                                YouTube
                            </a>
                        </div>
                    )}
                    {project.proposal && (
                        <div className="mr-[2.2vw]">
                            <a
                                href={project.proposal}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#00349F] text-white py-2 px-4 rounded-lg font-roboto-mono"
                            >
                                Proposal
                            </a>
                        </div>
                    )}
                </div>

                {/* Desciption Section */}
                <div className="px-[7.4vw] font-roboto-mono text-white text-[24px] font-[700] mb-[3vh]">
                    <div className="mb-[1vh]">Description</div>
                    <div className="bg-[#00349F] w-[8.1vw] h-[6px]"></div>
                </div>
                <div className="px-[9.5vw] font-roboto-mono text-white font-[400] text-[14px] mb-[5vh]">
                    {project.description}
                </div>

                <ReactMarkdown className="prose max-w-4xl mx-auto text-white">
                    {project.details || ''}
                </ReactMarkdown>

                <div className="px-[7.4vw] font-roboto-mono text-white text-[20px] font-[700] mb-[6vh]">
                    <div className="mb-[1vh]">The Team</div>
                    <div className="bg-[#00349F] w-[8.1vw] h-[6px]"></div>
                </div>
                <div className="px-[9.5vw]">
                    {project.team?.length > 0 ? (
                        Array.from({ length: Math.ceil(project.team.length / 6) }).map((_, rowIndex) => (
                            <div key={rowIndex} className="flex justify-evenly mb-[2vh]">
                                {project.team
                                    .slice(rowIndex * 6, (rowIndex + 1) * 6)
                                    .map((member: User) => (
                                        <div
                                            key={member._id}
                                            className="flex flex-col items-center text-center text-white"
                                        >
                                            {member.image && (
                                                <Image
                                                    src={member.image}
                                                    alt={member.name || 'User Avatar'}
                                                    width={64}
                                                    height={64}
                                                    className="rounded-full mb-2"
                                                />
                                            )}
                                            <p className="font-bold">{member.name || 'Unknown User'}</p>
                                            <p className="text-sm">{member.username || 'No Username'}</p>
                                            {member._id && (
                                                <Link
                                                    href={`/user/${member._id}`}
                                                    className="text-blue-400 hover:underline"
                                                >
                                                    View Profile
                                                </Link>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        ))
                    ) : (
                        <p className="text-white text-center">No team members listed.</p>
                    )}
                </div>

                <Suspense fallback={<Skeleton className="view-skeleton" />}>
                    <View id={id} />
                </Suspense>
            </div>
        </>
    );
};

export default page;
