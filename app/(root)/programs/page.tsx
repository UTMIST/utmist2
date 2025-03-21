"use client";

import { ProgramMetaData } from "@/schemas/ProgramMetaData";
import Link from "next/link";
import { useState } from "react";
import DropDown from "public/assets/Vector 4.svg";
import Image from "next/image";
import ProgramCard from "@/components/programs/ProgramCard";
import PageHeader from "@app/components/PageHeader";

const sampleProgramData: ProgramMetaData[] = [
    {
        title: "Machine Learning Fundamentals",
        year: "2023-2024",
        slug: "machine-learning-fundamentals",
        publishDate: "2023-09-15",
        description: {
            overview: "A comprehensive introduction to machine learning concepts, algorithms, and practical applications. Students will learn supervised and unsupervised learning techniques through hands-on projects.",
            instructor: "Dr. Sarah Chen",
            location: "Bahen Centre for Information Technology, Room 2270"
        },
        timeline: [
            {
                date: "2023/09/15",
                topic: "Introduction to ML & Python Libraries",
                content: [
                    {
                        type: "slides",
                        link: "https://utmist.com/slides/ml-fundamentals-1.pdf"
                    },
                    {
                        type: "recording",
                        link: "https://utmist.com/recordings/ml-fundamentals-1.mp4"
                    }
                ]
            },
            {
                date: "2023/09/22",
                topic: "Linear Regression & Gradient Descent",
                content: [
                    {
                        type: "slides",
                        link: "https://utmist.com/slides/ml-fundamentals-2.pdf"
                    }
                ]
            }
        ]
    },
    {
        title: "Deep Learning Workshop Series",
        year: "2023-2024",
        slug: "deep-learning-workshop-series",
        publishDate: "2023-09-15",
        description: {
            overview: "Advanced workshop series covering neural networks, CNNs, RNNs, and transformers. Participants will implement state-of-the-art architectures using PyTorch.",
            instructor: "Prof. Michael Zhang",
            location: "Online (Zoom)"
        },
        timeline: [
            {
                date: "2023/10/01",
                topic: "Neural Networks Basics",
                content: [
                    {
                        type: "slides",
                        link: "https://utmist.com/slides/dl-workshop-1.pdf"
                    }
                ]
            }
        ]
    },
    {
        title: "Natural Language Processing Bootcamp",
        year: "2022-2023",
        slug: "natural-language-processing-bootcamp",
        publishDate: "2023-09-15",
        description: {
            overview: "Intensive bootcamp covering text processing, word embeddings, and modern NLP architectures. Students will build practical applications like chatbots and text classifiers.",
            instructor: "Dr. Emily Rodriguez",
            location: "Myhal Centre, Room 150"
        },
        timeline: [
            {
                date: "2022/11/10",
                topic: "Text Processing & Word Embeddings",
                content: [
                    {
                        type: "slides",
                        link: "https://utmist.com/slides/nlp-bootcamp-1.pdf"
                    },
                    {
                        type: "recording",
                        link: "https://utmist.com/recordings/nlp-bootcamp-1.mp4"
                    }
                ]
            }
        ]
    }
];

export default function Program({ }) {
    const [isYearFilterOpen, setIsYearFilterOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState<string>("");

    // Assuming that the 1st item in the data array is the most recent one
    const recentYear = sampleProgramData[0].year.substring(5);
    let yearAsNumber = Number(recentYear);
    let yearFilter: any[] | ((prevState: string[]) => string[]) = [];

    while (yearAsNumber !== 2017) {
        const range = `${yearAsNumber - 1}-${yearAsNumber}`;
        yearFilter = [...yearFilter, range];
        yearAsNumber = yearAsNumber - 1;
    }
    const yearFilterToggle = () => {
        setIsYearFilterOpen(!isYearFilterOpen);
    };

    const filterByYear = (year: string) => {
        if (year === selectedYear) {
            setSelectedYear("");
        } else {
            setSelectedYear(year);
        }

    }

    const programCards = sampleProgramData.filter((programData) => {
        if (selectedYear.length > 0) {
            return programData.year === selectedYear;
        }
        else {
            return true;
        }
    }).map((programData, key) => {
        return (
            <ProgramCard key={key} data={programData}/>
        )
    });

    return (
        <>
            <div className="relative w-screen h-auto">
                <PageHeader title="Academic and Career Programs" />
                <div className="relative w-screen h-auto bg-gradient-to-b from-[#131B6B] via-[#00349F] to-[#4B3EE0]">
                    <div className="px-[11.6vw] py-[11.4vh] w-full">
                        <div className="text-white font-roboto-mono mb-[8.7vh] text-[16px]">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim cursus tellus sed iaculis. Donec egestas id odio ac semper. Nulla eget posuere purus, quis dignissim elit. Donec vel volutpat augue, suscipit dignissim odio. Nam molestie ligula id vestibulum sodales. Mauris volutpat ligula arcu, ac varius velit porta non. In hac habitasse platea dictumst. Sed massa orci, ullamcorper a euismod quis, auctor et leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim cursus tellus sed iaculis. Donec egestas id odio ac semper. Nulla eget posuere purus, quis dignissim elit. Donec vel volutpat augue, suscipit dignissim odio..
                        </div>
                        <div className="relative flex items-center justify-center mt-6">
                            <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
                                <li className="relative">
                                    <button className={isYearFilterOpen ? "flex items-center justify-center rounded-md bg-utmist-pink shadow-md text-[2.2vh] w-[69.7vw] h-[8.9vh] lg:w-[19.7vw] lg:h-[5.6vh]" : "flex items-center justify-center rounded-md bg-utmist-purple shadow-md text-[2.2vh] w-[69.7vw] h-[8.9vh] lg:w-[19.7vw] lg:h-[5.6vh]"}
                                        onClick={yearFilterToggle}>
                                        <p className="text-white font-roboto-mono">Year</p>
                                        <Image src={DropDown} height={14} width={14} alt="select year" className="ml-2" />
                                    </button>
                                    {isYearFilterOpen && (
                                        <ul className="absolute top-full left-0 mt-1 bg-dropdown rounded-md shadow-md text-white text-[2.2vh] w-[69.7vw] lg:w-[19.7vw] z-10 flex flex-col items-center">
                                            {yearFilter.map((item, index) => (
                                                <li key={index}>
                                                    <Link href="#" onClick={() => filterByYear(item)} className={selectedYear === item ? "font-roboto-mono bg-utmist-pink block px-4 py-2" : "font-roboto-mono block px-4 py-2"}>
                                                        {item}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            </ul>
                        </div>
                        <div className="mt-[10vh] text-white font-roboto-mono">
                            <div className="flex flex-col gap-[13vh]">
                                {programCards}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}