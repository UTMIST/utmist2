"use client";

import InfoCard from "@app/common/InfoCard";
import { WWeDoMetaData } from "@/schemas/WWeDoMetaData";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@app/components/PageHeader";

const sampleWWeDoData: WWeDoMetaData[] = [
    {
        slug: "community-events",
        title: "Annual Milestone",
        imgPath: "/images/community-events.jpg",
        buttonHref: "/milestone/milestone4",
        publishDate: new Date().toISOString(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula, mauris et egestas tristique, risus nunc tincidunt libero, in varius justo elit ac metus.",
    },
    {
        slug: "projects",
        title: "Annual Milestone",
        imgPath: "/images/projects.jpg",
        buttonHref: "/milestone/milestone2",
        publishDate: new Date().toISOString(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula, mauris et egestas tristique, risus nunc tincidunt libero, in varius justo elit ac metus.",
    },
    {
        slug: "academic-programs",
        title: "Annual Milestones",
        imgPath: "/images/academic-career.jpg",
        buttonHref: "/milestone/milestone3",
        publishDate: new Date().toISOString(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula, mauris et egestas tristique, risus nunc tincidunt libero, in varius justo elit ac metus.",
    },
    {
        slug: "milestone",
        title: "Annual Milestone",
        imgPath: "/images/milestone-events.jpg",
        buttonHref: "/milestone/milestone4",
        publishDate: new Date().toISOString(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula, mauris et egestas tristique, risus nunc tincidunt libero, in varius justo elit ac metus.",
    },
];

const AnnualMilestone = () => {
    const infoCards = sampleWWeDoData.map((item) => {
        return (
            <div key={item.slug} className="mb-[10vh]">
                <InfoCard
                    title={item.title}
                    imgPath={item.imgPath}
                    buttonHref={item.buttonHref}
                ></InfoCard>
            </div>
        );
    });

    return (
        <>
            <div className="relative w-screen h-auto"> 
                <PageHeader title="Annual Milestone Events" />

                <div className="relative w-screen h-auto bg-gradient-to-b from-[#131B6B] via-[#00349F] to-[#4B3EE0] py-[10vh]">
                    <div className="flex flex-col justify-around items-center text-white">
                        {infoCards}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AnnualMilestone;
