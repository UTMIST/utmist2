"use client";

import InfoCard from "@src/components/whatWeDo/InfoCard";
import { WWeDoMetaData } from "@/schemas/WWeDoMetaData";

const sampleWWeDoData: WWeDoMetaData[] = [
    {
        slug: "research",
        title: "Research Projects",
        imgPath: "https://placeholder.pics/svg/200",
        buttonHref: "/projects",
        publishDate: new Date().toISOString(),
        description: "Our mission is to advance AI education"
    },
    {
        slug: "demistify",
        title: "deMISTify Newsletter",
        imgPath: "https://placeholder.pics/svg/200",
        buttonHref: "/demistify",
        publishDate: new Date().toISOString(),
        description: "Our mission is to advance AI education"
    },
    {
        slug: "workshops",
        title: "Workshops & Events",
        imgPath: "https://placeholder.pics/svg/200",
        buttonHref: "/events",
        publishDate: new Date().toISOString(),
        description: "Our mission is to advance AI education"
    }
    // {
    //     slug: "mentorship",
    //     title: "Mentorship Program",
    //     imgPath: "https://placeholder.pics/svg/200",
    //     buttonHref: "/mentorship",
    //     publishDate: new Date().toISOString(),
    //     description: "Our mission is to advance AI education"
    // }
];

const WhatWeDo = () => {
    const infoCards = sampleWWeDoData.map((item) => {
        return (
            <div key={item.slug} className="mb-[14.9vh]">
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
            <div className="relative w-screen h-auto bg-dark-grey">
                <div className=" w-screen h-[40vh] bg-cover bg-wwd-banner"></div>
                <div className=" absolute left-[16.7vw] top-[15.7vh] text-white text-[5.2vh] font-roboto-mono">
                    <div>What We Do</div>
                    <div className="bg-[#00349F] w-[8.1vw] h-[6px]"></div>
                </div>
                <div className="mt-[-7.8vh] flex flex-col justify-around items-center text-white">
                    {infoCards}
                </div>
            </div>
        </>
    );
};

export default WhatWeDo;
