"use client";

export default function WhatWeDo() {
  return (
    <>
      <div className="relative w-screen h-auto bg-dark-grey">
        <div className=" w-screen h-[40vh] bg-cover bg-wwd-banner"></div>
        <div className=" absolute left-[16.7vw] top-[15.7vh] text-white text-[5.2vh] font-roboto-mono">
          <div>Join Us</div>
          <div className="bg-[#00349F] w-[8.1vw] h-[6px]"></div>
        </div>
        <div className="mt-[-7.8vh] flex flex-col justify-around items-center text-white"></div>
      </div>
    </>
  );
}
