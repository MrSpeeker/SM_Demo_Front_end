import { ICvTerm } from "../helpers/cv-term.interface";
import { IText } from "../helpers/text.interface";

export interface ICv {
    object_id: string;
    text: IText;
    cv_terms: any[];
    expanded_cv_terms: ICvTerm[];
    name: string;
    role: string;
}