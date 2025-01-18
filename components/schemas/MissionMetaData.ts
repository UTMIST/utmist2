import { BaseMetaData } from "./BaseMetaData";

export interface MissionMetaData extends BaseMetaData {
    contents: string;
    imgPath: string;
    buttonHref: string;
}