

import { TeamMember } from "@/schemas/ProjectMetaData";

export default function TeamMember(props: { data: TeamMember }) {

    const memberPhotoClassName = props.data.image === null ?
        "w-[158px] h-[151px] bg-[#C5C5C5] mb-[1.5vh] rounded-[50%]" :
        "w-[158px] h-[151px] bg-[#C5C5C5] mb-[1.5vh] bg-[url('"
            .concat(props.data.image!)
            .concat("')] rounded-[50%]")

    console.log(memberPhotoClassName);

    return (
        <>
            <div className="flex flex-col">
                <div className="w-fit">
                    <div className="flex flex-row justify-center mb-[1.5vh]">
                        {props.data.socials.LinkedIn != "" ? (
                            <a className="bg-linkedin w-[16px] h-[14px] mr-[0.25vw]" href={props.data.socials.LinkedIn} target="_blank"></a>

                        ) : null}
                        {props.data.socials.GitHub != "" ? (

                            <a className="bg-github w-[17px] h-[15px] ml-[0.25vw]" href={props.data.socials.GitHub} target="_blank"></a>

                        ) : null}
                    </div>
                    <div
                        className={memberPhotoClassName}
                    ></div>
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