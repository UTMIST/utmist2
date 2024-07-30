import { BaseMetaData } from "./BaseMetaData";

export interface DemistifyData extends BaseMetaData {
    publishDate: string; // YYYY-MM-DD
    issueNumber: string;
    imgPath: string;
    buttonHref: string; // the description is in the content
    description: string;
}