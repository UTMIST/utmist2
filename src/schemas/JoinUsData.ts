import { BaseMetaData } from "./BaseMetaData";

export interface JoinUsData extends BaseMetaData {
    type: string;
    position: string;
    department: string;
    description: string;
    requirements: string;
    instructions: string;
    endDate: Date; // Now a Date object
}