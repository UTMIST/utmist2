"use client";

import LinkButton from "@app/common/LinkButton";

export default function InfoCard(props: {
  title: string;
  imgPath: string;
  buttonHref: string;
}) {
  return (
    <div className="flex w-[78.8vw] h-[53vh] bg-[#121212] rounded-md shadow-md">
      <div
        className={"w-[40%] h-[100%] rounded-md bg-cover bg-".concat(props.imgPath)}
      >
        
      </div>
      
      <div className="w-[60%] flex flex-col px-[3.75vw] py-[4vh] font-roboto-mono text-white">
      <div className="font-semibold text-[2.3vh] mb-[1vh]">{props.title}</div>
        <div className="bg-[#00349F] w-[8.1vw] h-[5px] mb-[4vh]"></div>
        <div className="text-[1.75vh]  mb-[4.6vh]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.<br></br> <br></br>Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
          in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div className="w-[100%] flex justify-end text-[2.06vh]">
          <LinkButton redirectPath={props.buttonHref} buttonText="Find out more"></LinkButton>
        </div>
      </div>
    </div>
  );
}
