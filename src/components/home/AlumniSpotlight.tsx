import { AlumniMetaData } from "@/schemas/AlumniMetaData";
import Image from "next/image";

interface AlumniProps {
    data: AlumniMetaData[];
}


const AlumniSpotlight: React.FC<AlumniProps> = ({data}) => {

    return <div className="overflow-x-hidden overflow-y-hidden">
        <div className="relative bg-cover bg-mission w-screen h-[120vh]  lg:h-[90vh]">
            {/*Mobile screens*/}
            <div className="lg:hidden">
                <div className="flex items-center">
                    <div>
                        <div className="font-roboto-mono text-left text-white flex flex-col">
                            <div  className="font-bold w-screen ml-[24.6vw] mt-[7.9vh] sm:text-[2.2vh]">Alumni Spotlight:</div>
                            <div
                                className="w-screen text-[6vh] ml-[24.6vw] sm:mb-[5vh]">
                                {data[0].name}
                            </div>
                            <div className="w-[55vw] text-[2.8vh] ml-[24.6vw] mb-[7.5vh]">
                                {data[0].story}
                            </div>
                            <div  className="font-bold underline w-[55vw] text-[2.4vh] ml-[24.6vw] mb-[7.5vh]"><a href={data[0].linkedIn}>Alumni Story Link/linkedIn</a></div>
                        </div>
                        <div className='ml-[25vw] pb-10 md:ml-[40vw]'>
                            <Image src={data[0].imgPath} alt="logo" width={238} height={231}></Image>
                        </div>
                    </div>

                </div>
            </div>
            {/*Larger screens */}
            <div className="hidden lg:block">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    <div>
                        <div className="font-roboto-mono text-left text-white flex flex-col">
                            <div  className="font-bold w-screen ml-[24.6vw] mt-[7.9vh] lg:ml-[5.7vw] lg:mt-[16.3vh] lg:text-[2.1vh]">Alumni Spotlight:</div>
                            <div
                                className="w-screen text-[6vh] ml-[24.6vw] sm:mb-[5.1vh] lg:ml-[5.7vw] lg:mb-[5vh] lg:text-[5.4vh] lg:w-screen">
                                {data[0].name}
                            </div>
                            <div
                                className="w-[55vw] text-[2.8vh] ml-[24.6vw] mb-[7.5vh] lg:w-[45vw] lg:text-[2.4vh] lg:ml-[5.7vw] lg:mb-[8vh]">
                                {data[0].story}
                            </div>
                            <div  className="font-bold underline w-[55vw] text-[2.8vh] ml-[24.6vw] mb-[7.5vh] lg:w-[45vw] lg:text-[2.4vh] lg:ml-[5.7vw] lg:mb-[8vh]"><a href={data[0].linkedIn}>Alumni Story Link/linkedIn</a></div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-[10.5vh] items-center">
                        <Image src={data[0].imgPath} width={498} height={340} alt={"logo"}></Image></div>

                </div>
            </div>
        </div>


    </div>
}

export default AlumniSpotlight;