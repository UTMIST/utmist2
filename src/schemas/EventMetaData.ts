import {BaseMetaData} from "@/schemas/BaseMetaData";

export interface EventMetaData extends BaseMetaData{
    name: string;
    images: string[];
    description: string;
}