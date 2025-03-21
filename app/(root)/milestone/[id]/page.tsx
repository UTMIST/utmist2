"use client";

import React from "react";

import PageHeader from "@app/components/PageHeader";

const IndividualMilestone = () => {

    return (
        <>
            <div className="relative w-screen h-auto">
            <PageHeader title="Placeholder Event" />

            <div className="relative w-screen h-auto bg-gradient-to-b from-[#131B6B] to-[#483EE0] pb-16">
                <br />
                <div className="px-[7.4vw] font-roboto-mono text-white text-[24px] font-[700] mb-[3vh]">
                        <div className="mb-[1vh]">Synopsis</div>
                        <div className="bg-[#00349F] w-[8.1vw] h-[6px]"></div>
                    </div>
                    <div className="px-[9.5vw] font-roboto-mono text-white font-[400] text-[14px] mb-[5vh]">
                        Placeholder
                    </div>
                    <div className="px-[7.4vw] font-roboto-mono text-white text-[24px] font-[700] mb-[3vh]">
                        <div className="mb-[1vh]">Details</div>
                        <div className="bg-[#00349F] w-[8.1vw] h-[6px]"></div>
                    </div>
                    
                </div>
            </div>
        </>
    );
};

export default IndividualMilestone;