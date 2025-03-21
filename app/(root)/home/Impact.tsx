import React from "react";

const sampleData = [
    { number: "250+", text: "Lorem Ipsum Dolor" },
    { number: "1500+", text: "Lorem Ipsum Dolor" },
    { number: "250+", text: "Lorem Ipsum Dolor" },
    { number: "250+", text: "Lorem Ipsum Dolor" }
];

const Impact: React.FC = () => {
    return (
        <div className="bg-gradient-to-b from-[#150050] to-[#1B1F6E] min-h-[80vh] flex flex-col justify-center items-center px-6 sm:px-10">
            
            <h2 className="text-white font-roboto-mono text-2xl sm:text-3xl font-semibold mb-8 sm:mb-12 text-center">
                Impact
            </h2>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 w-full max-w-6xl">
                {sampleData.map((item, index) => (
                    <div 
                        key={index} 
                        className="bg-gradient-to-b from-[#414DA8] to-[#5B5DF5] rounded-[25px] shadow-lg p-6 sm:p-10 w-full min-h-[190px] flex flex-col justify-center items-center text-white"
                    >
                        <span className="text-3xl sm:text-4xl font-bold">{item.number}</span>
                        <span className="text-sm sm:text-md mt-2">{item.text}</span>
                    </div>
                ))}
            </div>

            {/* Button */}
            <button className="bg-[#64C8FA] hover:bg-[#4DB2E6] text-[#1E1E1E] text-base sm:text-lg font-semibold px-5 sm:px-6 py-2 sm:py-3 rounded-md mt-10 sm:mt-12 shadow-md transition">
                Learn More
            </button>
        </div>
    );
};

export default Impact;