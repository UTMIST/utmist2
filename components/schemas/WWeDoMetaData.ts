import { BaseMetaData } from "./BaseMetaData";

export interface WWeDoMetaData extends BaseMetaData {
    title: string;
    imgPath: string;
    buttonHref: string; // the description is in the content
}