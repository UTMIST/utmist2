'use client';

import { useEffect, useState } from 'react';
import MissionStatement from "@src/components/home/MissionStatement";
import Banner from "@/common/banner";
import { MissionMetaData } from "@/schemas/MissionMetaData";
import { WWeDoMetaData } from "@/schemas/WWeDoMetaData";
import WwdHomepage from "@root/home/WwdHomepage";
import { AlumniMetaData } from "@/schemas/AlumniMetaData";
import AlumniSpotlight from "@/components/home/AlumniSpotlight";
import Impact from "@root/home/Impact";
import { ImpactMetaData } from "@/schemas/ImpactMetaData";
import NewsletterHomepage from "@root/home/NewsletterHomepage";

// Sample data following the schemas
const sampleMissionData: MissionMetaData[] = [{
    slug: "mission-1",
    contents: "Our mission is to advance AI education",
    imgPath: "https://placeholder.pics/svg/200",
    buttonHref: "/about",
    publishDate: new Date().toISOString()
}];

const sampleWwdData: WWeDoMetaData[] = [{
    slug: "wwd-1",
    title: "Research Projects",
    imgPath: "https://placeholder.pics/svg/200",
    buttonHref: "/projects",
    publishDate: new Date().toISOString()
}];

const sampleAlumniData: AlumniMetaData[] = [{
    slug: "alumni-1",
    name: "John Doe",
    story: "Former ML Team Lead",
    imgPath: "https://placeholder.pics/svg/200",
    linkedIn: "https://linkedin.com/in/johndoe",
    publishDate: new Date().toISOString()
}];

const sampleImpactData: ImpactMetaData[] = [{
    slug: "impact-2023",
    events: "50+",
    members: "200+",
    projects: "30+",
    publishDate: new Date().toISOString()
}];

const HomePage: React.FC = () => {
    return (
        <>
            <Banner />
            <MissionStatement data={sampleMissionData} />
            <WwdHomepage data={sampleWwdData} />
            <AlumniSpotlight data={sampleAlumniData} />
            <Impact data={sampleImpactData}/>
            <NewsletterHomepage></NewsletterHomepage>
        </>
    );
};

export default HomePage;