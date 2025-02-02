"use client";
import { getContentData } from "@/common/general_parser";
import UnderlinedHeader from "@/common/UnderlinedHeader";
import LinkButton from "@/common/LinkButton";
import { JoinUsData } from "@/schemas/JoinUsData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DropDown from "public/assets/Vector 4.svg";

interface JoinUsProp {
  data: JoinUsData[];
}

const AllIssues: React.FC<JoinUsProp> = ({ data }) => {

    const filteredInfoCards = data
        .map((item, ind) => {
            return (
                <div key={ind} className="rounded-md overflow-hidden bg-black shadow-lg w-362">
                    {/* <Image className="w-full h-315" src={item.imgPath} alt="Card Image" /> */}
                    <img className="w-full h-315" src={item.imgPath} alt="Card Image" />
                    <div className="px-6 py-4">
                        <div className="font-bold text-white font-roboto-mono">{item.publishDate}</div>
                        <div className="font-bold text-white font-roboto-mono">{item.issueNumber}</div>
                        <p className="text-white font-roboto-mono">
                            {item.description}
                        </p>
                    </div>
                </div>
            );
        });
    
    const leadershipPositions = data.filter(item => item.type === "leadership");
    const regularPositions = data.filter(item => item.type === "regular");
    const currentDate = new Date();
    const isSameOrAfterToday = (endDate: Date, currentDate: Date) => {
        const endDateLocal = new Date(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate() + 1
          );

        const endDateObj = new Date(endDateLocal.getTime() + 86400000);
        
        // Convert currentDate to the user's local timezone
        const currentDateLocal = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate()
        );
        
        console.log(`${endDate}T00:00:00`)
        return (
            endDateObj.getFullYear() > currentDate.getFullYear() ||
            (endDateObj.getFullYear() === currentDate.getFullYear() &&
            (endDateObj.getMonth() > currentDate.getMonth() ||
                (endDateObj.getMonth() === currentDate.getMonth() &&
                endDateObj.getDate() >= currentDate.getDate())))
        );
      };
      
 
    const renderPositions = (positions: JoinUsData[]) => {
        return positions
        .filter(item => isSameOrAfterToday(new Date(item.endDate), currentDate))
        .map((item, ind) => (
            <div key={ind} className="mb-6">
                <div className="font-bold text-white text-[2vh] font-roboto-mono mb-2">
                    {item.position}
                </div>
                <div className="text-white text-[1.8vh] font-roboto-mono mb-1">
                    Department: {item.department}
                </div>
                <p className="text-white text-[1.5vh] font-roboto-mono mb-2">
                    {item.description}
                </p>
                <p className="text-white text-[1.5vh] font-roboto-mono mb-2">
                    Requirements: {item.requirements}
                </p>
                <p className="text-white text-[1.5vh] font-roboto-mono mb-2">
                    Deadline: {item.endDate}
                </p>
                <LinkButton redirectPath={item.formLink} buttonText="Apply Here"></LinkButton>
            </div>
        ));
    };
          

    return (
    <>
        <div className="relative w-screen h-auto bg-dark-grey pb-16">
            <div className="w-screen h-[40vh] bg-cover bg-wwd-banner mb-[5vh]"></div>
            <div className="absolute left-[16.7vw] top-[15.7vh] text-white text-[5.2vh] font-roboto-mono">
                <div>Join Us</div>
                <div className="bg-[#00349F] w-[13.1vw] h-[6px]"></div>
            </div>

            <UnderlinedHeader text="Become a Member"/>
            <div className="px-[9.5vw] font-roboto-mono text-white font-[400] text-[14px] mb-[5vh]">
                UTMIST is committed to being an accessible school club. Membership is open to any UofT student regardless of faculty or campus affiliation.
            </div>
            <div className="px-[9.5vw] font-roboto-mono text-white font-[400] text-[14px] mb-[5vh]">
                <ul className="list-disc pl-5">
                    <li><a href="https://discord.gg/88mSPw8" className="text-[#00349F] underline">Join our Discord server</a></li>
                    <li><a href="http://eepurl.com/dGMddD" className="text-[#00349F] underline">Sign up on our Newsletter</a></li>
                    <li><a href="calendar" className="text-[#00349F] underline">Attend one of our events</a></li>
                    <li><a href="projects" className="text-[#00349F] underline">Browse/contribute to one of our projects</a></li>
                </ul>
            </div>
            
            <UnderlinedHeader text="Leadership Positions" />
            <div className="px-[7.4vw] font-roboto-mono text-white text-[20px] font-[700] mb-[3vh]">
                <div className={leadershipPositions.length === 0 ? "flex justify-center m-10 h-[26vh]" : "p-0"}>
                    {leadershipPositions.length === 0 ? (
                    <p className="text-white font-roboto-mono">No leadership positions found.</p>
                    ) : (
                    renderPositions(leadershipPositions)
                    )}
                </div>
            </div>

            <UnderlinedHeader text="Regular Team Positions" />
            <div className="px-[7.4vw] font-roboto-mono text-white text-[20px] font-[700] mb-[3vh]">
                <div className={regularPositions.length === 0 ? "flex justify-center m-10 h-[26vh]" : "p-0"}>
                    {regularPositions.length === 0 ? (
                    <p className="text-white font-roboto-mono">No regular positions found.</p>
                    ) : (
                    renderPositions(regularPositions)
                    )}
                </div>
            </div>
        </div>
    </>
    );
 }

 export async function getStaticProps() {
    const data: JoinUsData[] = await getContentData<JoinUsData>(
        "join-us"
    );

    return {
      props: {
        data,
      },
    };
  }
  
  export default AllIssues;