import { BaseMetaData } from "./BaseMetaData";


export interface ImpactMetaData extends BaseMetaData {
    events: string;
    members: string;
    projects: string;
}