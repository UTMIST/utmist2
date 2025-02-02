import { ProgramMetaData } from "@/schemas/ProgramMetaData";
import Link from "next/link";
import { useState } from "react";
import DropDown from "public/assets/Vector 4.svg";
import Image from "next/image";
import { getContentData } from "@/common/general_parser";
import ProgramCard from "@/components/programs/ProgramCard";


export default function Program({ data }: {data: ProgramMetaData[]}) {
    const [isYearFilterOpen, setIsYearFilterOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState<string>("");

    // Assuming that the 1st item in the data array is the most recent one
    const recentYear = data[0].year.substring(5);
    let yearAsNumber = Number(recentYear);
    let yearFilter: any[] | ((prevState: string[]) => string[]) = [];

    while (yearAsNumber !== 2017) {
        const range = `${yearAsNumber - 1}-${yearAsNumber}`;
        yearFilter = [...yearFilter, range];
        yearAsNumber = yearAsNumber - 1;
    }
    const yearFilterToggle = () => {
        setIsYearFilterOpen(!isYearFilterOpen);
    };

    const filterByYear = (year: string) => {
        if (year === selectedYear) {
            setSelectedYear("");
        } else {
            setSelectedYear(year);
        }

    }

    const programCards = data.filter((programData) => {
        if (selectedYear.length > 0) {
            return programData.year === selectedYear;
        }
        else {
            return true;
        }
    }).map((programData, key) => {
        return (
            <ProgramCard key={key} data={programData}/>
        )
    });

    return (
        <>
            <div className="relative w-screen h-auto bg-dark-grey">
                <div className=" w-screen h-[40vh] bg-cover bg-wwd-banner mb-[5vh]"></div>
                <div className=" absolute left-[16.7vw] top-[15.7vh] text-white text-[5.2vh] font-roboto-mono">
                    <div>Academic and Career Programs</div>
                    <div className="bg-[#00349F] w-[13.1vw] h-[6px]"></div>
                </div>
                <div className="px-[11.6vw] py-[11.4vh] w-full">
                    <div className="text-white font-roboto-mono mb-[8.7vh] text-[16px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim cursus tellus sed iaculis. Donec egestas id odio ac semper. Nulla eget posuere purus, quis dignissim elit. Donec vel volutpat augue, suscipit dignissim odio. Nam molestie ligula id vestibulum sodales. Mauris volutpat ligula arcu, ac varius velit porta non. In hac habitasse platea dictumst. Sed massa orci, ullamcorper a euismod quis, auctor et leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim cursus tellus sed iaculis. Donec egestas id odio ac semper. Nulla eget posuere purus, quis dignissim elit. Donec vel volutpat augue, suscipit dignissim odio..
                    </div>
                    <button className={isYearFilterOpen ? "flex items-center justify-center rounded-md bg-utmist-pink shadow-md text-[2.2vh] w-[69.7vw] h-[8.9vh] lg:w-[19.7vw] lg:h-[5.6vh]" : "flex items-center justify-center rounded-md bg-utmist-purple shadow-md text-[2.2vh] w-[69.7vw] h-[8.9vh] lg:w-[19.7vw] lg:h-[5.6vh]"}
                        onClick={yearFilterToggle}>
                        <p className="text-white font-roboto-mono">Year</p>
                        <Image src={DropDown} height={14} width={14} alt="select year" className="ml-2" />
                    </button>
                    {isYearFilterOpen && (
                        <ul className="left-0 mt-1 bg-dropdown rounded-md shadow-md text-white text-[2.2vh] w-[69.7vw] lg:w-[19.7vw] z-10 flex flex-col items-center">
                            {yearFilter.map((item, index) => (
                                <li key={index}>
                                    <Link href="#" onClick={() => filterByYear(item)} className={selectedYear === item ? "font-roboto-mono bg-utmist-pink block px-4 py-2" : "font-roboto-mono block px-4 py-2"}>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className="mt-[10vh] text-white font-roboto-mono">
                        <div className="flex flex-col gap-[13vh]">
                            {programCards}
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export async function getStaticProps() {
    const data: ProgramMetaData[] = await getContentData<ProgramMetaData>(
        "programs"
    );
  
    return {
      props: {
        data,
      },
    };
  }