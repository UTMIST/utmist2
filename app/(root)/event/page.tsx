"use client";

import React from "react";
import Link from "next/link";

const eventsData = [
  // TODO: these ideally should NOT be hard-coded into the .ts file, requires recompilation and is in general a bad idea.
  // For now, this satisfies our requirements, but in the short-term, we need to move these to sanity.
  {
    name: "template event 1",
    images: ["https://placeholder.pics/svg/200"],
    description: "desc.",
    publishDate: "temp",
    slug: "temp-1",
  },
  {
    name: "template event 2",
    images: ["https://placeholder.pics/svg/200"],
    description: "desc.",
    publishDate: "temp",
    slug: "temp-2",
  },
];

const Events: React.FC = () => {
  return (
    <div className="bg-dark-grey overflow-x-hidden">
      <div className="w-screen h-[53vh] bg-cover bg-wwd-banner"></div>
      <div className="absolute left-[16.7vw] top-[18vh] text-white text-[5.2vh] font-roboto-mono">
        <div>Events</div>
        <div className="bg-[#00349F] w-[14vw] h-[6px]"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-10">
        {eventsData.map((item, ind) => {
          return (
            <div className="rounded-md overflow-hidden bg-black shadow-lg w-full flex flex-col" key={ind}>
              <div>
                <img className="w-full h-40 object-cover" src={item.images[0]} alt="Card Image" />
              </div>
              <div className="px-6 py-4 flex-grow">
                <div className="font-bold text-white font-roboto-mono">{item.name}</div>
                <p className="text-white font-roboto-mono">{item.description}</p>
              </div>
              <div className="px-6 py-4 flex justify-end">
                <Link
                  href={`/event/${item.slug}`}
                  className="flex justify-center items-center rounded-md bg-utmist-purple shadow-md mt-5 text-[2.2vh] text-center w-[25vw] h-[5vh] lg:w-[8vw] lg:h-[4.9vh] md:w-[9vw] md:h-[6vh]"
                >
                  <div className="text-white font-roboto-mono">Read More</div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Events;
