"use client";

import Image from "next/image";
import PageHeader from "@app/components/PageHeader";

const HackTheMist: React.FC = ({ }) => {
    return <>
        <div className="overflow-x-hidden">
            <PageHeader title="Hack The Mist" />

            <div className="flex flex-col justify-around items-center text-white px-[10vw] py-[5vh] bg-gradient-to-b from-[#131B6B] to-[#483EE0]">
                <div className="w-full flex justify-center mb-10">
                    <div className="relative w-full max-w-[800px] h-[350px]">
                        <Image 
                            src="/imgs/hack-the-mist/header.png" 
                            alt="Hack the MIST Header" 
                            width={1000} 
                            height={350} 
                            className="object-contain"
                        />
                    </div>
                </div>

                <div className="w-full mb-10">
                    <h2 className="text-2xl font-roboto-mono font-bold mb-4 flex items-center">
                        What is Hack the MIST? <span className="ml-2">🤖</span>
                    </h2>
                    <p className="font-roboto-mono text-sm mb-5">
                        This is UTMIST's first large-scale hackathon where participants will focus on developing an end-to-end solution for a 
                        real-world problem with ML. This will be an all-inclusive hackathon where we invite hackers from all backgrounds. You 
                        will get a chance to learn about building full ML pipelines for real-world applications in the domain of NLP, Climate 
                        Change, and Art, which is not something that is taught in university courses. We will host a range of events including 
                        Speaker Panels, workshops to develop both technical and business acumen, networking sessions and a social gathering for 
                        participants.
                    </p>
                </div>

                <div className="w-full mb-10">
                    <h2 className="text-2xl font-roboto-mono font-bold mb-4">
                        Why should you join?
                    </h2>
                    <div className="font-roboto-mono text-sm">
                        <p className="mb-2">Build your first ML project in a team of 2-4, make friends, and win prizes!</p>
                        <p className="mb-2">Connect with company representatives and judges who're experienced professionals, upper-year mentors at speaker panels, networking sessions, technical workshops, and a social gathering.</p>
                        <p className="mb-2">Get exposed to areas such as Natural Language Processing, Image recognition, and the intersection of ML with Art and Climate Change to solve real-world problems.</p>
                        <p className="mb-2">At Hack The MIST technical workshops, learn how to build a Reinforcement Learning Model; Intro to NLP; Python programming; popular ML frameworks such as Keras, Torch, and Tensorflow; ML deployment infrastructures, such as AWS and GCP; and emerging technologies developed by sponsored companies.</p>
                    </div>
                </div>

                <div className="w-full mb-10">
                    <p className="font-roboto-mono text-sm mb-3">Are you new to ML?</p>
                    <p className="font-roboto-mono text-sm mb-5">
                        Don't fear! Hack the MIST is open to high school and college students with any background. There will be workshops and 
                        on-site mentors support you, too.
                    </p>
                    
                    <p className="font-roboto-mono text-sm mb-3">Are you an experienced ML hacker?</p>
                    <p className="font-roboto-mono text-sm mb-5">
                        This is your opportunity to apply your ML knowledge to solve real problems by creating a working product. Impress your 
                        peers, judges, and our sponsors!
                    </p>
                </div>

                <div className="w-full mb-10">
                    <h2 className="text-2xl font-roboto-mono font-bold mb-6">
                        Schedule
                    </h2>
                    
                    <div className="w-full flex justify-center mb-6">
                        <div className="relative w-full max-w-[800px] h-[350px]">
                            <Image 
                                src="/imgs/hack-the-mist/schedule.png" 
                                alt="Hack the MIST Schedule" 
                                width={1000} 
                                height={350} 
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full mb-10">
                    <h2 className="text-xl font-roboto-mono font-bold text-center mb-5">
                        UTMIST's first in-person ML Hackathon, Hack the MIST, is coming!
                    </h2>
                    
                    <div className="font-roboto-mono text-sm mt-8">
                        <p className="mb-1">Hacker Application:</p>
                        <p className="mb-4 text-blue-300 underline">https://</p>
                        
                        <p className="mb-1">Our Website:</p>
                        <p className="mb-4 text-blue-300 underline">https://utmist.ca/</p>
                        
                        <p className="mb-1">FAQ</p>
                        <p className="mb-1">See the website for an FAQ!</p>
                    </div>
                </div>
            </div>
        </div>
    </>
}
  
export default HackTheMist;