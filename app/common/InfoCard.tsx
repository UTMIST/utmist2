"use client";

import LinkButton from "@app/common/LinkButton";

export default function InfoCard(props: {
  title: string;
  imgPath: string;
  buttonHref: string;
}) {
  return (
    <div className="relative flex w-[78.8vw] rounded-md shadow-md overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#8B7FFF] via-[#726FE0] to-[#5AB5DC] opacity-60"></div>

      <div
        className="relative w-[40%] bg-cover bg-center z-10"
        style={{ backgroundImage: `url(${props.imgPath})` }}
      />

      <div className="relative w-[60%] flex flex-col px-[3.75vw] py-[4vh] font-roboto-mono text-white z-10">

        {/* Title */}
        <div className="font-semibold text-[2.3vh] mb-[1vh]">{props.title}</div>
        <div className="bg-[#00349F] w-[8.1vw] h-[5px] mb-[4vh]" />

        <div className="text-[1.75vh]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.<br /> <br />
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>

        <div className="w-full flex justify-end mt-[2vh]">
          <LinkButton redirectPath={props.buttonHref} buttonText="Find out more" />
        </div>
      </div>
    </div>
  );
}