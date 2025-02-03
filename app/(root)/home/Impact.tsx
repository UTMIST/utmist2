import {ImpactMetaData} from "@/schemas/ImpactMetaData";
import React from "react";

const sampleData: ImpactMetaData[] = [
    {
        events: "10",
        members: "150",
        projects: "5",
        slug: "impact-1",
        publishDate: "2023-09-15"
    }
];

const Impact: React.FC = ({ }) => {
    return <>
        <div className="bg-dark-grey pb-14">
            <div className="lg:text-[4.9vh] sm:text-[4.6vh] text-white font-roboto-mono pl-10 pt-10 md:pl-20">Impact</div>
            <div className="flex flex-col items-center">
                <div className="flex items-end p-10">
                    <div className="bg-utmist-purple h-[7vh] w-[42vw] border-r-4 border-white"></div>
                    <div className="text-white font-roboto-mono pl-3">
                        {`${sampleData[0].events} Events Hosted`}
                    </div>
                </div>
                <div className="flex items-end p-10">
                    <div className="text-white font-roboto-mono pr-3">
                        {`${sampleData[0].members} Members`}
                    </div>
                    <div className="bg-blue-800 h-[7vh] w-[45vw] border-l-4 border-white"></div>
                </div>
                <div className="flex items-end p-10">
                    <div className="bg-utmist-purple h-[7vh] w-[46vw] border-r-4 border-white"></div>
                    <div className="text-white font-roboto-mono pl-3">
                            {`${sampleData[0].projects} Projects`}
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Impact;