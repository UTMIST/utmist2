

import { TeamMember } from "@/schemas/ProjectMetaData";
import Image from "next/image";
import Link from "next/link";

export default function TeamMember(props: { data: TeamMember }) {

    // const memberPhotoClassName = props.data.image === null ?
    //     "w-[158px] h-[151px] bg-[#C5C5C5] mb-[1.5vh] rounded-[50%]" :
    //     "w-[158px] h-[151px] bg-[#C5C5C5] mb-[1.5vh] bg-[url('"
    //         .concat(props.data.image!)
    //         .concat("')] rounded-[50%]")
    const memberPhotoClassName = props.data.image == null ?
        "/imgs/team/default.svg" :
        props.data.image

    return (
        <>
            <div className="flex flex-col">
                <div className="w-fit">
                    <div className="flex flex-row justify-center mb-[1.5vh]">
                        {props.data.socials.LinkedIn != null ? (
                            <Link className="bg-linkedin w-[16px] h-[14px] mr-[0.25vw]" href={props.data.socials.LinkedIn} target="_blank"></Link>

                        ) : null}
                        {props.data.socials.GitHub != null ? (

                            <Link className="bg-github w-[17px] h-[15px] ml-[0.25vw]" href={props.data.socials.GitHub} target="_blank"></Link>

                        ) : null}
                    </div>
                    {/* <div
                        className={memberPhotoClassName}
                    ></div> */}
                    <div className="w-[158px] h-[151px] mb-[1.5vh] bg-[#C5C5C5] rounded-[50%] overflow-hidden">
                        <img src={memberPhotoClassName} alt="Team member image" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-row justify-center text-white font-roboto-mono text-[16px]">
                        {props.data.name}
                    </div>
                    <div className="flex flex-row justify-center text-white font-roboto-mono text-[12px]">
                        {props.data.role}
                    </div>
                </div>
            </div>
        </>
    );
}