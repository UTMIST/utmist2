'use client';

import MissionStatement from "@src/components/home/MissionStatement";
import Banner from "@app/common/Banner";
import WwdHomepage from "@root/home/WwdHomepage";
import AlumniSpotlight from "@/components/home/AlumniSpotlight";
import Impact from "@root/home/Impact";
import NewsletterHomepage from "@root/home/NewsletterHomepage";

const HomePage: React.FC = () => {
    return (
        <>
            <Banner />
            <MissionStatement />
            <WwdHomepage />
            <AlumniSpotlight />
            <Impact />
            <NewsletterHomepage />
        </>
    );
};

export default HomePage;