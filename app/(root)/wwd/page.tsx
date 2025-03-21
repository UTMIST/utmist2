"use client";

import InfoCard from "@app/common/InfoCard";
import { WWeDoMetaData } from "@/schemas/WWeDoMetaData";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@app/components/PageHeader";

const sampleWWeDoData: WWeDoMetaData[] = [
    {
        slug: "community-events",
        title: "Community Events",
        imgPath: "/images/community-events.jpg",
        buttonHref: "/events",
        publishDate: new Date().toISOString(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula, mauris et egestas tristique, risus nunc tincidunt libero, in varius justo elit ac metus.",
    },
    {
        slug: "projects",
        title: "Projects",
        imgPath: "/images/projects.jpg",
        buttonHref: "/projects",
        publishDate: new Date().toISOString(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula, mauris et egestas tristique, risus nunc tincidunt libero, in varius justo elit ac metus.",
    },
    {
        slug: "academic-programs",
        title: "Academic and Career Programs",
        imgPath: "/images/academic-career.jpg",
        buttonHref: "/programs",
        publishDate: new Date().toISOString(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula, mauris et egestas tristique, risus nunc tincidunt libero, in varius justo elit ac metus.",
    },
    {
        slug: "milestone-events",
        title: "Annual Milestone Events",
        imgPath: "/images/milestone-events.jpg",
        buttonHref: "/milestone",
        publishDate: new Date().toISOString(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula, mauris et egestas tristique, risus nunc tincidunt libero, in varius justo elit ac metus.",
    },
    {
        slug: "demistify",
        title: "deMISTify",
        imgPath: "/images/demistify.jpg",
        buttonHref: "/demistify",
        publishDate: new Date().toISOString(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula, mauris et egestas tristique, risus nunc tincidunt libero, in varius justo elit ac metus.",
    },
    {
        slug: "competition",
        title: "International Competition",
        imgPath: "/images/competition.jpg",
        buttonHref: "/international-competition",
        publishDate: new Date().toISOString(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula, mauris et egestas tristique, risus nunc tincidunt libero, in varius justo elit ac metus.",
    },
    {
        slug: "campus-engagement",
        title: "Campus Engagement",
        imgPath: "/images/campus-engagement.jpg",
        buttonHref: "/campus-engagement",
        publishDate: new Date().toISOString(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula, mauris et egestas tristique, risus nunc tincidunt libero, in varius justo elit ac metus.",
    }
];

const WhatWeDo = () => {
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
                <PageHeader title="What We Do" />

                <div className="relative w-screen h-auto bg-gradient-to-b from-[#131B6B] via-[#00349F] to-[#4B3EE0] py-[10vh]">
                    <div className="flex flex-col justify-around items-center text-white">
                        {infoCards}
                    </div>
                </div>
            </div>
        </>
    );
};

export default WhatWeDo;
