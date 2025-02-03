import { BaseMetaData } from "./BaseMetaData";

export interface AlumniMetaData extends BaseMetaData {
    name: string;
    story: string;
    imgPath: string;
    linkedIn: string;
    description: string;
}