import { WWeDoMetaData } from "@/schemas/WWeDoMetaData";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const wwdData: WWeDoMetaData[] = [
  { title: "Annual Milestone Events", imgPath: "", buttonHref: "#" },
  { title: "Campus Engagement", imgPath: "", buttonHref: "#" },
  { title: "Academic & Career Programs", imgPath: "", buttonHref: "#" },
  { title: "Projects", imgPath: "", buttonHref: "#" },
  { title: "deMISTify", imgPath: "", buttonHref: "#" },
  { title: "Community Events", imgPath: "", buttonHref: "#" },
  { title: "International Competition", imgPath: "", buttonHref: "#" },
];

const WwdHomepage: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-[#1B1F6E] to-[#0E1D4A] py-[12vh] px-[6vw]">
      <div className="text-white font-roboto-mono mb-[5vh]">
        <h2 className="text-[4vh] font-semibold">What We Do</h2>
        <p className="text-[2.2vh] opacity-80">Lorem ipsum dolor sit amet</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {wwdData.map((item, index) => (
          <Link key={index} href={item.buttonHref} className="relative group">
            <div className="rounded-[25px] overflow-hidden shadow-lg transition transform group-hover:scale-105 bg-[#292F6D]">
              {item.imgPath ? (
                <Image 
                  src={item.imgPath} 
                  alt={item.title} 
                  width={300} 
                  height={250} 
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-[250px] flex items-center justify-center text-white bg-opacity-20">
                  No Image
                </div>
              )}
              {/* Overlay with Title */}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
                <p className="text-white text-sm font-semibold">{item.title}</p>
              </div>
            </div>
          </Link>
        ))}

        {/* Find Out More Box */}
        <Link href="#" className="relative group">
          <div className="rounded-[25px] bg-gradient-to-b from-[#7A6CFF] to-[#3F63CE] flex justify-center items-center p-6 h-full text-white font-semibold text-lg shadow-lg transition transform group-hover:scale-105">
            <span>Find Out More</span>
            <span className="ml-3">→</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default WwdHomepage;