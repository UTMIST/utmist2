import {EventMetaData} from "@/schemas/EventMetaData";
import React from "react";
import Link from "next/link";
import LinkButton from "@app/common/LinkButton";
import Image from "next/image";
import PageHeader from "@app/components/PageHeader";

interface EventsProp {
    data: EventMetaData[];
}

const sampleEvents: EventMetaData[] = [
    {
        name: "AI Ethics Workshop",
        slug: "/events/ai-ethics-workshop-2024",
        images: ["/images/events/ai-ethics.jpg"],
        description: "Join us for an interactive workshop exploring the ethical implications of artificial intelligence in today's society.",
        publishDate: new Date("2024-01-15").toISOString(),
    },
    {
        name: "Machine Learning Hackathon",
        slug: "hack-the-mist",
        images: ["/images/events/ml-hackathon.jpg"],
        description: "A 24-hour hackathon where participants will build innovative ML solutions to real-world problems.",
        publishDate: new Date("2024-02-01").toISOString(),
    },
    {
        name: "Deep Learning Seminar",
        slug: "/events/deep-learning-seminar-2024",
        images: ["/images/events/deep-learning.jpg"],
        description: "An in-depth seminar covering the latest advances in deep learning, featuring guest speakers from leading tech companies.",
        publishDate: new Date("2024-03-10").toISOString(),
    }
];

const Events: React.FC = ({ }) => {
    return <>
        <div className="overflow-x-hidden">
            <PageHeader title="Events" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-10 bg-gradient-to-b from-[#131B6B] to-[#483EE0]">
                {sampleEvents.map((item, ind) => {
                    return (
                        <div className="bg-[#1E1650] rounded-[25px] overflow-hidden shadow-xl hover:shadow-[0_0_25px_rgba(148,97,255,0.5)] transition-all" key={ind}>
                        {/* <div className="rounded-md overflow-hidden bg-black shadow-lg w-full flex flex-col" key={ind}> */}
                            <div>
                                <Image 
                                    className="w-full h-40 object-cover"
                                    src={item.images[0]}
                                    alt={`${item.name} event image`}
                                    width={400}
                                    height={160}
                                />
                            </div>
                            <div className="px-6 py-4 flex-grow">
                                <div className="font-bold text-white font-roboto-mono">{item.name}</div>
                                <p className="text-white font-roboto-mono">
                                    {item.description}
                                </p>
                            </div>
                            <div className="px-6 py-4 flex justify-end">
                                <Link
                                    href={`${item.slug}`}
                                    className="flex items-center justify-center rounded-md bg-utmist-purple shadow-md text-[2.2vh] w-[69.7vw] h-[8.9vh] lg:w-[19.7vw] lg:h-[5.6vh]"
                                >
                                    <div className="text-white font-roboto-mono">Read More</div>
                                </Link>
                            </div>

                        </div>
                    );
                })}
            </div>




        </div>
    </>
}

export default Events;