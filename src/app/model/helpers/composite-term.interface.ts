import { ISingularTerm } from "./singular-term.interface";

export interface ICompositeTerm {
    synonym_term: string;
    occurances: ISingularTerm[]
}