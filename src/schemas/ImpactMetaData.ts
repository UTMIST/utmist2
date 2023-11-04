import { BaseMetaData } from "./BaseMetaData";

export type TableExample = {
    e1: string;
    e2: string;
}

export interface ImpactMetaData extends BaseMetaData {
    impactNumber: Number;
    tableExample: TableExample[];
}