import { WWeDoMetaData } from "@/schemas/WWeDoMetaData";
import React, { useEffect, useState } from "react";
import SmallCard from "@/components/home/SmallCard";
import LinkButton from "@app/common/LinkButton";
import LinkButtonSmall from "@app/common/LinkButtonSmall";

const wwdData: WWeDoMetaData[] = [
  {
      title: "Projects",
      imgPath: "/images/wwd/projects.png",
      buttonHref: "/projects",
      description: "Student-led machine learning research and development projects",
      slug: "projects",
      publishDate: "2023-09-15"
  },
  {
      title: "Events",
      imgPath: "/images/wwd/events.png",
      buttonHref: "/events",
      description: "Industry networking and social events",
      slug: "events",
      publishDate: "2023-09-15"
  },
  {
      title: "Competitions",
      imgPath: "/images/wwd/competitions.png",
      buttonHref: "/competitions",
      description: "ML competitions and hackathons",
      slug: "competitions",
      publishDate: "2023-09-15"
  }
];

const WwdHomepage: React.FC = ({ }) => {

  const smallCards = wwdData.map((item) => {
    return <SmallCard key={item.slug} imgPath={item.imgPath} buttonHref={item.buttonHref} title={item.title}></SmallCard>
  })

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div className="bg-dark-grey"> 
      <div className="lg:py-[20vh] lg:px-[9vw] sm:px-[6vw]">
        <div className="flex flex-row justify-between items-center mb-[6vh]">
          <div className="text-white font-roboto-mono"> 
            <div className="lg:text-[4.9vh] sm:text-[4.6vh]">What We Do</div>
            <div className="lg:text-[2.2vh] sm:text-[2.7vh]">Lorem ipsum dolor sit amet</div>
          </div>
          {isMobile ? <LinkButtonSmall buttonText="Find out more" redirectPath="#"></LinkButtonSmall>
          : <LinkButton buttonText="Find out more" redirectPath="/event"></LinkButton>}
          
        </div>
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 lg:gap-[1vh] sm:gap-x-[0.5vh] sm:gap-y-[1vw]">
          {smallCards}
        </div>
      </div>
    </div>
  );
};

export default WwdHomepage;