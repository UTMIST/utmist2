import Image from "next/image";
import { MissionMetaData } from "@/schemas/MissionMetaData";

const missionData: MissionMetaData[] = [
    {
        contents: "UTMIST is dedicated to fostering a vibrant community of students passionate about machine intelligence and its applications. We aim to bridge the gap between theoretical knowledge and practical implementation through workshops, projects, and industry connections.",
        imgPath: "/images/mission-logo.png",
        buttonHref: "/about",
        slug: "mission-1",
        publishDate: "2023-09-15",
    }
];

const MissionStatement: React.FC = ({ }) => {
    return (<div className="overflow-x-hidden">
        <div className="relative bg-cover bg-mission w-screen h-[120vh]  lg:h-[90vh]">
            {/*    Mobile screens*/}
            <div className="lg:hidden">
                <div className="flex items-center">
                    <div>
                        <div className="font-roboto-mono text-left text-white flex flex-col">
                            <div
                                className="w-screen text-[4vh] ml-[24.6vw] mt-[7.9vh] sm:mb-[5.1vh] lg:ml-[5.7vw] lg:mt-[16.3vh] lg:mb-[5.1vh] lg:text-[5.4vh] lg:w-screen">
                                BRIEF MISSION STATEMENT
                            </div>
                            <div className="w-[55vw] text-[2.8vh] ml-[24.6vw] mb-[7.5vh]">
                                {missionData[0].contents}
                            </div>
                        </div>
                        <div className='ml-[38vw] pb-10 md:ml-[45vw]'>
                            <Image src={missionData[0].imgPath} alt="logo" width={138} height={131}></Image>
                        </div>
                    </div>

                </div>
                <button
                    className="lg:hidden rounded-md bg-utmist-purple shadow-md text-[2.2vh] w-[20vw] h-[8.9vh] ml-[68vw] lg:w-[19.7vw] lg:h-[5.6vh] lg:ml-[70vw] text-white">
                    Find out more
                </button>
            </div>
            {/*Larger screens */}
            <div className="hidden lg:block">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    <div>
                        <div className="font-roboto-mono text-left text-white flex flex-col">
                            <div
                                className="w-screen text-[6vh] ml-[24.6vw] mt-[7.9vh] sm:mb-[5.1vh] lg:ml-[5.7vw] lg:mt-[16.3vh] lg:mb-[5.1vh] lg:text-[5.4vh] lg:w-screen">
                                BRIEF MISSION STATEMENT
                            </div>
                            <div
                                className="w-[55vw] text-[2.8vh] ml-[24.6vw] mb-[7.5vh] lg:w-[45vw] lg:text-[2.4vh] lg:ml-[5.7vw] lg:mb-[8vh]">
                                {missionData[0].contents}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <Image src={missionData[0].imgPath} width={244} height={238} alt={"logo"}></Image></div>

                </div>
                <a href={missionData[0].buttonHref}> <button
                    className="rounded-md bg-utmist-purple shadow-md text-[2.2vh] w-[69.7vw] h-[8.9vh] ml-[3vw] lg:w-[19.7vw] lg:h-[5.6vh] lg:ml-[65vw] text-white">
                    Find out more
                </button></a>
            </div>
        </div>


    </div>)
}

export default MissionStatement;