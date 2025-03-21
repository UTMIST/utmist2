"use client";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@app/components/PageHeader";

export default function AlumniPage() {
  return (
    <>
      <div className="relative w-screen h-auto">
        <PageHeader title="Impact & Alumni" />

        <div className="flex flex-col justify-around items-center text-white px-[10vw] py-[5vh] bg-gradient-to-b from-[#131B6B] to-[#483EE0]">
          <div className="w-full mb-[8vh]">
            <h2 className="text-[3vh] font-roboto-mono font-bold w-fit">Achievements</h2>
            <div className="bg-[#00349F] w-[6vw] h-[6px] mb-10"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="text-[#9461FF] text-5xl font-bold font-roboto-mono mb-2">250+</div>
                <p className="font-['October_Tamil'] text-lg">Lorem Ipsum Dolor</p>
              </div>
              
              <div className="text-center">
                <div className="text-white text-5xl font-bold font-roboto-mono mb-2">1500+</div>
                <p className="font-['October_Tamil'] text-lg">Lorem Ipsum Dolor</p>
              </div>
              
              <div className="text-center">
                <div className="text-[#9461FF] text-5xl font-bold font-roboto-mono mb-2">250+</div>
                <p className="font-['October_Tamil'] text-lg">Lorem Ipsum Dolor</p>
              </div>
              
              <div className="text-center">
              <div className="text-white text-5xl font-bold font-roboto-mono mb-2">250+</div>
                <p className="font-['October_Tamil'] text-lg">Lorem Ipsum Dolor</p>
              </div>
            </div>
            
            {/* black square section */}
            <div className="bg-[#0A0E29] rounded-[30px] p-8 mb-12 shadow-[0_0_25px_rgba(255,255,255,0.35)] backdrop-blur-sm">
              <ul className="list-disc pl-6 space-y-0 font-roboto-mono text-lg">
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                <li>Aliquam gravida eros ut consequat varius.</li>
                <li>Vestibulum auctor dapibus neque.</li>
                <li>Nunc dignissim risus id metus.</li>
                <li>Cras ornare tristique elit.</li>
                <li>Vivamus vestibulum ntulla nec ante.</li>
                <li>Praesent placerat risus quis eros.</li>
                <li>Fusce pellentesque suscipit nibh.</li>
                <li>Integer vitae libero ac risus egestas placerat.</li>
                <li>Vestibulum commodo felis quis tortor.</li>
              </ul>
            </div>
          </div>
          
          <div className="w-full mb-[8vh]">
            <h2 className="text-[3vh] font-roboto-mono font-bold w-fit">Alumni Companies</h2>
            <div className="bg-[#00349F] w-[6vw] h-[6px] mb-6"></div>
            
            <p className="text-[2vh] font-roboto-mono mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec justo vel sapien varius efficitur. Nullam sit amet metus sit amet metus scelerisque consectetur non a felis. Sed vel aliquet odio. Proin nec tellus quis nunc efficitur tincidunt.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-6 justify-items-center">
              <div className="bg-gray-300 h-[140px] w-[140px] rounded-xl"></div>
              <div className="bg-gray-300 h-[140px] w-[140px] rounded-xl"></div>
              <div className="bg-gray-300 h-[140px] w-[140px] rounded-xl"></div>
              <div className="bg-gray-300 h-[140px] w-[140px] rounded-xl"></div>
              <div className="bg-gray-300 h-[140px] w-[140px] rounded-xl"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12 justify-items-center">
              <div className="bg-gray-300 h-[140px] w-[140px] rounded-xl"></div>
              <div className="bg-gray-300 h-[140px] w-[140px] rounded-xl"></div>
              <div className="bg-gray-300 h-[140px] w-[140px] rounded-xl"></div>
              <div className="bg-gray-300 h-[140px] w-[140px] rounded-xl"></div>
              <div className="bg-gray-300 h-[140px] w-[140px] rounded-xl"></div>
            </div>
          </div>

          <div className="w-full mb-[5vh]">
            <h2 className="text-[3vh] font-roboto-mono font-bold w-fit">Alumni & Past Members</h2>
            <div className="bg-[#00349F] w-[6vw] h-[6px] mb-6"></div>
            
            <p className="text-[2vh] font-['October_Tamil'] mb-10">
              Over the years, we've been lucky to have great members and leaders, shaping what UTMIST is.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="w-[100px] h-[100px] bg-gray-300 rounded-[50%] overflow-hidden flex-shrink-0 shadow-md">
                </div>
                <div>
                  <h3 className="font-roboto-mono font-bold text-xl mb-2">Jane Doe</h3>
                  <p className="text-[2vh] font-roboto-mono">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec justo vel sapien varius 
                    efficitur. Nullam sit amet metus sit amet metus scelerisque consectetur non a felis. Sed vel aliquet 
                    odio. Proin nec tellus quis nunc efficitur tincidunt.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="w-[100px] h-[100px] bg-gray-300 rounded-[50%] overflow-hidden flex-shrink-0 shadow-md">
                </div>
                <div>
                  <h3 className="font-roboto-mono font-bold text-xl mb-2">Jane Doe</h3>
                  <p className="text-[2vh] font-roboto-mono">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec justo vel sapien varius 
                    efficitur. Nullam sit amet metus sit amet metus scelerisque consectetur non a felis. Sed vel aliquet 
                    odio. Proin nec tellus quis nunc efficitur tincidunt.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="w-[100px] h-[100px] bg-gray-300 rounded-[50%] overflow-hidden flex-shrink-0 shadow-md">
                </div>
                <div>
                  <h3 className="font-roboto-mono font-bold text-xl mb-2">Jane Doe</h3>
                  <p className="text-[2vh] font-roboto-mono">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec justo vel sapien varius 
                    efficitur. Nullam sit amet metus sit amet metus scelerisque consectetur non a felis. Sed vel aliquet 
                    odio. Proin nec tellus quis nunc efficitur tincidunt.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
