import { ICompositeTerm } from "./composite-term.interface";

export interface ISingularRequirement {
    term: ICompositeTerm;
    weight: number[];
    certificates:  ICompositeTerm[];
    experience: number;
    field: string;
}