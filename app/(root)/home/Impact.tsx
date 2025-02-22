import { ImpactMetaData } from "@/schemas/ImpactMetaData";
import React from "react";

const sampleData = [
    { number: "250+", text: "Lorem Ipsum Dolor" },
    { number: "1500+", text: "Lorem Ipsum Dolor" },
    { number: "250+", text: "Lorem Ipsum Dolor" },
    { number: "250+", text: "Lorem Ipsum Dolor" }
];

const Impact: React.FC = () => {
    return (
        <div className="bg-gradient-to-b from-[#150050] to-[#1B1F6E] h-[80vh] flex flex-col justify-center items-center">

            <h2 className="text-white font-roboto-mono text-3xl font-semibold mb-12">
                Impact
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-[85%] max-w-6xl">
                {sampleData.map((item, index) => (
                    <div 
                        key={index} 
                        className="bg-gradient-to-b from-[#414DA8] to-[#5B5DF5] rounded-[25px] shadow-lg p-12 w-full min-h-[220px] flex flex-col justify-center items-center text-white"
                    >
                        <span className="text-4xl font-bold">{item.number}</span>
                        <span className="text-md mt-2">{item.text}</span>
                    </div>
                ))}
            </div>

            {/* Button */}
            <button className="bg-[#64C8FA] hover:bg-[#4DB2E6] text-[#1E1E1E] text-lg font-semibold px-6 py-3 rounded-md mt-12 shadow-md transition">
                Learn More
            </button>
        </div>
    );
};

export default Impact;