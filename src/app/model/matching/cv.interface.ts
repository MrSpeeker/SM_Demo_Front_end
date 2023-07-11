import { ICvTerm } from "../helpers/cv-term.interface";
import { IText } from "../helpers/text.interface";

export interface ICv {
    name: string;
    text: IText;
    object_id?: string;
    cv_terms?: any[];
    expanded_cv_terms?: ICvTerm[];
    role?: string;
}