import Image from "next/image";
import logo from "public/assets/mission-img.svg";
import { MissionMetaData } from "@components/schemas/MissionMetaData";
//import {useEffect, useState } from "react";
interface MissionProps {
    data: MissionMetaData[];
}
const MissionStatement: React.FC<MissionProps> = ({ data }) => {
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
                                {data[0].contents}
                            </div>
                        </div>
                        <div className='ml-[38vw] pb-10 md:ml-[45vw]'>
                            <Image src={data[0].imgPath} alt="logo" width={138} height={131}></Image>
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
                                {data[0].contents}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <Image src={data[0].imgPath} width={244} height={238} alt={"logo"}></Image></div>

                </div>
                <a href={data[0].buttonHref}> <button
                    className="rounded-md bg-utmist-purple shadow-md text-[2.2vh] w-[69.7vw] h-[8.9vh] ml-[3vw] lg:w-[19.7vw] lg:h-[5.6vh] lg:ml-[65vw] text-white">
                    Find out more
                </button></a>
            </div>
        </div>


    </div>)
}

export default MissionStatement;