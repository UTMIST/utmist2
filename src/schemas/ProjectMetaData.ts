import { BaseMetaData } from "./BaseMetaData";

export interface ProjectMetaData extends BaseMetaData {
    title: string;
    publishDate: string; // YYYY-MM-DD
}