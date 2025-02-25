import Image from "next/image";
import { MissionMetaData } from "@/schemas/MissionMetaData";

const missionData: MissionMetaData[] = [
    {
        contents: "At UTMIST, we produce in-house academic content, spearhead design teams to collaborate on machine learning and infrastructure projects, and host annual milestone events, empowering our members to become the next generation of engineers, researchers, and leaders in AI/ML.",
        imgPath: "/images/mission-logo.png",
        buttonHref: "/about",
        slug: "mission-1",
        publishDate: "2023-09-15",
    }
];

const MissionStatement: React.FC = () => {
    return (
        <div className="relative flex justify-center items-center w-screen min-h-[80vh] bg-gradient-to-b from-[#221690] to-[#1A1F6C] px-6 sm:px-12 lg:px-[10vw]">
            
            {/* Content Box */}
            <div 
                className="p-6 sm:p-10 md:p-16 lg:p-20 w-full max-w-[1200px] flex flex-col md:flex-row items-center md:items-start shadow-lg mx-auto"
                style={{
                    backgroundColor: "#414DA8",  
                    borderRadius: "20px",       
                }}
            >
                {/* Text Section */}
                <div className="flex-1 text-white text-center md:text-left">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold font-roboto-mono mb-4 sm:mb-6">
                        About Us
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                        {missionData[0].contents}
                    </p>
                </div>

                {/* Logo and Button Section */}
                <div className="flex flex-col items-center justify-center mt-6 md:mt-0 md:ml-12">
                    <Image 
                        src={missionData[0].imgPath} 
                        alt="UTMIST Logo" 
                        width={120} 
                        height={120} 
                        className="mb-4 sm:mb-6"
                    />
                    <a href={missionData[0].buttonHref}>
                        <button className="bg-[#64C8FA] text-[#1E1E1E] text-base sm:text-lg font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-md shadow-md hover:bg-[#4DB2E6] transition">
                            Join Us
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default MissionStatement;