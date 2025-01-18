"use client";

import InfoCard from "@components/whatWeDo/InfoCard";

const whatWeDoData = [
  {
    title: "what we do 1",
    imgPath: "https://placeholder.pics/svg/200",
    buttonHref: "#",
  },
  {
    title: "what we do 2",
    imgPath: "https://placeholder.pics/svg/200",
    buttonHref: "#",
  },
  {
    title: "what we do 3",
    imgPath: "https://placeholder.pics/svg/200",
    buttonHref: "#",
  },
];

const WhatWeDo: React.FC = () => {
  const infoCards = whatWeDoData.map((item) => {
    return (
      <div key={item.title} className="mb-[14.9vh]">
        <InfoCard
          title={item.title}
          imgPath={item.imgPath}
          buttonHref={item.buttonHref}
        />
      </div>
    );
  });

  return (
    <>
      <div className="relative w-screen h-auto bg-dark-grey">
        <div className="w-screen h-[40vh] bg-cover bg-wwd-banner"></div>
        <div className="absolute left-[16.7vw] top-[15.7vh] text-white text-[5.2vh] font-roboto-mono">
          <div>What We Do</div>
          <div className="bg-[#00349F] w-[8.1vw] h-[6px]"></div>
        </div>
        <div className="mt-[-7.8vh] flex flex-col justify-around items-center text-white">
          {infoCards}
        </div>
      </div>
    </>
  );
};

export default WhatWeDo;
