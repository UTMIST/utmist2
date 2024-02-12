import { ProgramMetaData } from "@/schemas/ProgramMetaData";
import Link from "next/link";


export default function ProgramCard(props: { data: ProgramMetaData }) {

    const dateComponents = props.data.timeline.map((item) => {
        const date = item.date;
        return (
            <div className="text-[14px]">
                {date}
            </div>
        )
    });

    const topicComponents = props.data.timeline.map((item) => {
        const topic = item.topic;
        return (
            <div className="text-[14px]">
                {topic}
            </div>
        )
    });

    const timelineRows = props.data.timeline.map((item, index) => {
        const date = item.date;
        const topic = item.topic;
        const content = item.content;

        const contentLinks = content.map((contentItem, key) => {
            return (
                <Link key={key} href={contentItem.link}>
                    <p className="text-[14px]">
                        {contentItem.type}
                    </p>
                </Link>
            )
        });

        return (
            <tr key={index}>
                <td >
                    {date}
                    <div className="w-[5vw] inline opacity-0">Spacer</div>
                </td>
                <td >
                    {topic}
                    <div className="w-[7vw] inline opacity-0">Spacer</div>
                </td>
                <td className=" underline">
                    {contentLinks}
                </td>
            </tr>
        );
    });

    return (
        <>
            <div className="bg-utmist-black w-full rounded-md shadow-md">
                <div className="flex flex-col gap-[15px] px-[5.3%] py-[3.6%] text-white font-roboto-mono">
                    <div>
                        <div className="text-[20px] font-bold mb-[3px]">
                            {props.data.title}
                        </div>
                        <div className="bg-[#00349F] w-[117px] h-[6px]"></div>
                    </div>

                    <div className="text-[14px]">
                        <p>{`Instructor: ${props.data.description.instructor}`}</p>
                        <p>{`Location: ${props.data.description.location}`}</p>
                    </div>
                    <div className="text-[14px]">
                        {props.data.description.overview}
                    </div>
                    <div>
                        <div className="text-[20px] font-bold mb-[3px]">
                            Timeline
                        </div>
                        <div className="bg-[#00349F] w-[65px] h-[6px]"></div>
                    </div>
                    <div className="w-[80%]">
                        <table className="font-[14px]">
                            <thead>
                                <tr>
                                    <th className="text-left font-bold">Date</th>
                                    <th className="text-left font-bold">Topic</th>
                                    <th className="text-left font-bold">Content</th>
                                </tr>
                            </thead>
                            <tbody>
                                {timelineRows}
                            </tbody>
                        </table>
                    </div>


                </div>
            </div>
        </>
    )
}