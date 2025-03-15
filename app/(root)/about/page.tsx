"use client";
import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <>
      <div className="relative w-screen h-auto bg-dark-grey">
        <div className="w-screen h-[40vh] bg-cover relative">
          <Image 
            src="/imgs/headers/header1.png" 
            alt="Header Image" 
            fill
            sizes="100vw"
            style={{ 
              objectFit: "cover", 
              objectPosition: "center 0%", 
              filter: "contrast(1.3) brightness(1.1)",
            }}
            // className="opacity-100"
          />
        </div>
        <div className="absolute left-[8.7vw] top-[15.7vh] text-white text-[5.2vh] font-roboto-mono">
          <div className="font-bold">About Us</div>
          <div className="bg-[#DA92F6] w-[11.1vw] h-[6px]"></div>
        </div>

        <div className="flex flex-col justify-around items-center text-white px-[10vw] py-[5vh] bg-gradient-to-b from-[#161652] to-[#483EE0]">
          <div className="w-full mb-[5vh]">
            <h2 className="text-[3vh] font-roboto-mono font-bold w-fit">Overview of UTMIST</h2>
            <div className="bg-[#92DEFF] w-[6vw] h-[6px] mb-10"></div>
            
            <p className="text-[2vh] font-['October_Tamil'] mb-4">
              Founded in 2017, UTMIST (University of Toronto Machine Intelligence Student Team) is the largest undergraduate Machine Learning 
              club at the University of Toronto with over 2400 Instagram followers, 2200+ community members on Discord, 8 technical and 
              functional departments, 30+ active executives every year including PhD, masters, and undergrad students. UTMIST 
              is the most influential student association in the STEM (Science, Technology, Engineering, and Math) community.
            </p>
            
            <p className="text-[2vh] font-['October_Tamil'] mb-4">
              In ML Projects at UTMIST, where students can gain real-time project experience, Our 9 PD teams with 45+ projects, 4 are 
              collaborative projects with industrial/research labs where they use their domain knowledge (Physics, Chemistry, Biology, 
              Computer Science, Math, Engineering Science, Statistics, ETC etc.) to work on projects in technologies with ML methods. Students can 
              also propose their own interdisciplinary, research or applied projects at UTMIST, or founding their own team of developers.
            </p>
            
            <p className="text-[2vh] font-['October_Tamil'] mb-4">
              UTMIST is also well known for its scalable professional initiatives and programs, such as Clear the Path Mentorship Program 2023 and 
              Hack the MIST Hackathon 2023. Moreover, the Technical Writing Department publishes articles about specific ML topics on 
              UTMIST's journal: SomethySomething on Medium, and the Academic department runs biweekly Study Group, Project Workshop, and 
              Paper Reading Group for ML enthusiasts to join.
            </p>
            
            <p className="text-[2vh] font-['October_Tamil']">
              Our past members and executives secured job offers and demonstrated excellence at top-brand companies like Intel, Cohere, Amazon, 
              AWS, Reebee, AI Med, Thai Restaurant, Huawei, Google, Deloitte, TD, Uber, Qualcomm, Restaurant Brands International, and more. 
              We are proud to foster a group of talented students in the STEM field who desire to widen their horizons in the thriving 
              field of ML and AI, growing together to land competitive positions and opportunities in the industry or academia.
            </p>
          </div>

          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 mb-[5vh]">
            <div className="w-full md:w-1/2 h-[40vh] bg-[#1F1F1F] rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-400 font-['October_Tamil']">Insert Picture</div>
            </div>
            <div className="w-full md:w-1/2 h-[40vh] bg-[#1F1F1F] rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-400 font-['October_Tamil']">Insert Picture</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
