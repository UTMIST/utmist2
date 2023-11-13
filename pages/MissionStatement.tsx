import Image from "next/image";
import logo from "public/assets/mission-img.svg";
import {getContentData} from "../src/common/general_parser"
import {WWeDoMetaData} from "../src/schemas/WWeDoMetaData"
import LinkButton from "../src/common/LinkButton";
//import {useEffect, useState } from "react";
interface WhatWeDoProps {
    data: WWeDoMetaData;
}
const MissionStatement: React.FC<WhatWeDoProps> = ({ data }) => {

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
                                {/*Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec justo vel sapien*/}
                                {/*varius efficitur. Nullam sit amet metus sit amet metus scelerisque consectetur non a*/}
                                {/*felis.*/}
                                {/*<br/>*/}
                                {/*<br/>*/}
                                {/*Sed vel aliquet odio. Proin nec tellus quis nunc efficitur tincidunt.*/}
                                {data.title}
                            </div>
                        </div>
                        <div className='ml-[38vw] pb-10 md:ml-[45vw]'>
                            <Image src={data.imgPath} alt="logo" width={138} height={131}></Image>
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
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec justo vel sapien
                                varius efficitur. Nullam sit amet metus sit amet metus scelerisque consectetur non a
                                felis.
                                <br/>
                                <br/>
                                Sed vel aliquet odio. Proin nec tellus quis nunc efficitur tincidunt.
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <Image src={data.imgPath} alt={"logo"}></Image></div>

                </div>
                <a href={data.buttonHref}> <button
                    className="rounded-md bg-utmist-purple shadow-md text-[2.2vh] w-[69.7vw] h-[8.9vh] ml-[3vw] lg:w-[19.7vw] lg:h-[5.6vh] lg:ml-[65vw] text-white">
                    Find out more
                </button></a>
            </div>
        </div>


    </div>)
}
export async function getStaticProps() {
    const data: WWeDoMetaData[] = await getContentData<WWeDoMetaData>(
        "what-we-do"
    );

    return {
        props: {
            data,
        },
    };
}

export default MissionStatement;
