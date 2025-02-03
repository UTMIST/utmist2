import { AlumniMetaData } from "@/schemas/AlumniMetaData";
import Image from "next/image";

interface AlumniProps {
    data: AlumniMetaData[];
}

const alumniData: AlumniMetaData[] = [
    {
        name: "Jane Smith",
        story: "During my time at UTMIST, I led the Natural Language Processing research team, where we developed a sentiment analysis model for mental health support. Now, I'm a Machine Learning Engineer at Google Brain, working on large language models. UTMIST gave me the practical experience and leadership skills that helped launch my career in AI.",
        imgPath: "/images/alumni/jane-smith.png",
        linkedIn: "https://linkedin.com/in/jane-smith",
        description: "Former UTMIST NLP Team Lead, now at Google Brain",
        slug: "jane-smith-2023",
        publishDate: "2023-09-15"
    },
    {
        name: "Alex Chen",
        story: "As UTMIST's Workshop Coordinator, I organized hands-on sessions in computer vision and reinforcement learning. The experience of breaking down complex ML concepts for beginners shaped my path. Currently, I'm a Research Scientist at DeepMind, focusing on multi-agent systems.",
        imgPath: "/images/alumni/alex-chen.png",
        linkedIn: "https://linkedin.com/in/alex-chen",
        description: "Former UTMIST Workshop Coordinator, now at DeepMind",
        slug: "alex-chen-2022",
        publishDate: "2022-09-15"
    }
];


const AlumniSpotlight: React.FC = ({ }) => {

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
                                {alumniData[0].name}
                            </div>
                            <div className="w-[55vw] text-[2.8vh] ml-[24.6vw] mb-[7.5vh]">
                                {alumniData[0].story}
                            </div>
                            <div  className="font-bold underline w-[55vw] text-[2.4vh] ml-[24.6vw] mb-[7.5vh]"><a href={alumniData[0].linkedIn}>Alumni Story Link/linkedIn</a></div>
                        </div>
                        <div className='ml-[25vw] pb-10 md:ml-[40vw]'>
                            <Image src={alumniData[0].imgPath} alt="logo" width={238} height={231}></Image>
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
                                {alumniData[0].name}
                            </div>
                            <div
                                className="w-[55vw] text-[2.8vh] ml-[24.6vw] mb-[7.5vh] lg:w-[45vw] lg:text-[2.4vh] lg:ml-[5.7vw] lg:mb-[8vh]">
                                {alumniData[0].story}
                            </div>
                            <div  className="font-bold underline w-[55vw] text-[2.8vh] ml-[24.6vw] mb-[7.5vh] lg:w-[45vw] lg:text-[2.4vh] lg:ml-[5.7vw] lg:mb-[8vh]"><a href={alumniData[0].linkedIn}>Alumni Story Link/linkedIn</a></div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-[10.5vh] items-center">
                        <Image src={alumniData[0].imgPath} width={498} height={340} alt={"logo"}></Image></div>

                </div>
            </div>
        </div>


    </div>
}

export default AlumniSpotlight;