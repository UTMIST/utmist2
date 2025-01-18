import { BaseMetaData } from "./BaseMetaData";

interface ProgramDescriptionData {
    overview: string;
    instructor: string;
    location: string;
}

interface ProgramContentData {
    type: string; // e.g. slides, recording
    link: string
}

interface TimelineData {
    date: string; // format: yyyy/mm/dd
    topic: string;
    content: ProgramContentData[]; // content could include multiple different types of media
}

export interface ProgramMetaData extends BaseMetaData {
    title: string;
    year: string; // e.g. 2023-2024
    description: ProgramDescriptionData;
    timeline: TimelineData[];
}