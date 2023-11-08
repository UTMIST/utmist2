/*
lg:bg-banner-large
lg:left-[10%]

<div className="font-roboto-mono text-white text-center flex flex-col sm:justify-center lg:absolute lg:left-[10%] lg:top-[20%] ">
          <div className="w-[86vw] text-[6vh] sm:mt-[7.9vh] sm:ml-[7vw] lg:mt-0 lg:ml-0 lg:text-[5.4vh] lg:w-[39.9vw]">
            University of Toronto Machine Intelligence Student Team
          </div>
          <div className="w-[55vw] lg:w-[45vw] lg:text-[2.4vh]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce egestas, lorem id dapibus accumsan.
          </div>
        </div>

*/

export default function Banner() {
  return (
    <div>
      <div className="relative bg-cover bg-banner-small lg:bg-banner-large w-screen h-screen">
        <div className="font-roboto-mono text-white text-center flex flex-col ">
          <div className="w-[86vw] text-[6vh] ml-[7.6vw] mt-[7.9vh] sm:mb-[5.1vh] lg:ml-[8.3vw] lg:mt-[16.3vh] lg:mb-[5.1vh] lg:text-[5.4vh] lg:w-[39.9vw]">
            University of Toronto Machine Intelligence Student Team
          </div>
          <div className=" w-[55vw] text-[2.8vh] ml-[24.6vw] mb-[7.5vh] lg:w-[45vw] lg:text-[2.4vh] lg:ml-[5.7vw] lg:mb-[8vh]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            egestas, lorem id dapibus accumsan.
          </div>
          <button className="rounded-md bg-utmist-purple shadow-md text-[2.2vh] w-[69.7vw] h-[8.9vh] ml-[15vw] lg:w-[19.7vw] lg:h-[5.6vh] lg:ml-[17.7vw]">
            Join Us
          </button>
        </div>
      </div>
    </div>
  );
}
