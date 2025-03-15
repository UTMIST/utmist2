"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function JoinUs() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(4); // Set the last one open by default

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

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
          />
        </div>
        <div className="absolute left-[8.7vw] top-[15.7vh] text-white text-[5.2vh] font-roboto-mono">
          <div className="font-bold">Join Us</div>
          <div className="bg-[#DA92F6] w-[11.1vw] h-[6px]"></div>
        </div>

        <div className="flex flex-col justify-around items-center text-white px-[10vw] py-[5vh] bg-gradient-to-b from-[#161652] to-[#483EE0]">
          <div className="w-full mb-[8vh]">
            <h2 className="text-[3vh] font-roboto-mono font-bold w-fit">Get in Touch/Become A Member/Connect with us</h2>
            <div className="bg-[#00349F] w-[6vw] h-[6px] mb-6"></div>
            
            <p className="text-[2vh] font-roboto-mono mb-12">
              UTMIST is committed to being an accessible school club. Membership is open to any UofT student regardless of faculty or campus affiliation.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 px-4">
              <div className="bg-[#1E1650] rounded-[25px] overflow-hidden shadow-xl hover:shadow-[0_0_25px_rgba(148,97,255,0.5)] transition-all">
                <div className="h-[200px] relative">
                  <Image 
                    src="/imgs/fillers/circuits.png" 
                    alt="Join Discord"
                    fill
                    style={{ objectFit: "cover" }} 
                  />
                </div>
                <div className="p-4 text-center bg-[#6C63FF] hover:bg-[#8F88FF] transition-colors cursor-pointer">
                  <p className="font-roboto-mono font-bold text-xl">Join our Discord</p>
                </div>
              </div>
              
              <div className="bg-[#1E1650] rounded-[25px] overflow-hidden shadow-xl hover:shadow-[0_0_25px_rgba(148,97,255,0.5)] transition-all">
                <div className="h-[200px] relative">
                  <Image 
                    src="/imgs/fillers/newsletter.png" 
                    alt="Newsletter"
                    fill
                    style={{ objectFit: "cover" }} 
                  />
                </div>
                <div className="p-4 text-center bg-[#6C63FF] hover:bg-[#8F88FF] transition-colors cursor-pointer">
                  <p className="font-roboto-mono font-bold text-xl">Sign up for our newsletter</p>
                </div>
              </div>
              
              <div className="bg-[#1E1650] rounded-[25px] overflow-hidden shadow-xl hover:shadow-[0_0_25px_rgba(148,97,255,0.5)] transition-all">
                <div className="h-[200px] relative">
                  <Image 
                    src="/imgs/fillers/red_venue.png" 
                    alt="Attend Event"
                    fill
                    style={{ objectFit: "cover" }} 
                  />
                </div>
                <div className="p-4 text-center bg-[#6C63FF] hover:bg-[#8F88FF] transition-colors cursor-pointer">
                  <p className="font-roboto-mono font-bold text-xl">Attend an event</p>
                </div>
              </div>
              
              <div className="bg-[#1E1650] rounded-[25px] overflow-hidden shadow-xl hover:shadow-[0_0_25px_rgba(148,97,255,0.5)] transition-all">
                <div className="h-[200px] relative">
                  <Image 
                    src="/imgs/fillers/screen_code.png" 
                    alt="Projects"
                    fill
                    style={{ objectFit: "cover" }} 
                  />
                </div>
                <div className="p-4 text-center bg-[#6C63FF] hover:bg-[#8F88FF] transition-colors cursor-pointer">
                  <p className="font-roboto-mono font-bold text-xl">View our projects</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full mb-[8vh]">
            <h2 className="text-[3vh] font-roboto-mono font-bold w-fit">Join the Team</h2>
            <div className="bg-[#00349F] w-[6vw] h-[6px] mb-10"></div>
            
            <div className="mb-8">
              <h3 className="text-[2.5vh] font-roboto-mono font-bold mb-2">Leadership Positions</h3>
              <p className="text-[2vh] font-roboto-mono text-gray-300">
                We currently don't have executive openings. Check back later!
              </p>
            </div>
            
            <div className="mb-16">
              <h3 className="text-[2.5vh] font-roboto-mono font-bold mb-2">Regular Team Positions</h3>
              <p className="text-[2vh] font-roboto-mono text-gray-300">
                We currently don't have executive openings. Check back later!
              </p>
            </div>
          </div>
          
          <div className="w-full mb-[8vh]">
            <h2 className="text-[3vh] font-roboto-mono font-bold w-fit">Frequently Asked Questions</h2>
            <div className="bg-[#00349F] w-[6vw] h-[6px] mb-10"></div>
            
            <div className="space-y-4">
              {[0, 1, 2, 3, 4].map((index) => (
                <div 
                  key={index}
                  className={`rounded-lg overflow-hidden ${openFAQ === index ? 'bg-[#5D55CF]' : 'bg-[#6C63FF]'}`}
                >
                  <button 
                    className="w-full p-4 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="font-roboto-mono font-bold">How do I become a member?</span>
                    <span className="text-xl">{openFAQ === index ? '▲' : '▼'}</span>
                  </button>
                  
                  {openFAQ === index && (
                    <div className="p-4 bg-[#5D55CF]">
                      <p className="font-roboto-mono text-[2vh]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
                        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                        culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
