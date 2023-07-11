import { ICompositeRequirement } from "../helpers/composite-requirement.interface";
import { ICompositeTerm } from "../helpers/composite-term.interface";
import { ITextPosition } from "../helpers/text-position.interface";
import { IText } from "../helpers/text.interface";

export interface IOpportunity {
  display_name: string;
  opportunity_id: string;
  object_id: number;
  text: IText;
  reference_id: number;
  rvo_status: string;
  role: string;
  opportunity_demand_paragraphs?: ITextPosition[];
  opportunity_demands?: any[]; // Replace 'any' with the appropriate type
  opportunity_expanded_demands?: ICompositeRequirement[];
  opportunity_expanded_terms?: ICompositeTerm[];
  opportunity_expanded_wishes?: ICompositeRequirement[];
  opportunity_terms?: any[]; // Replace 'any' with the appropriate type
  opportunity_wish_paragraphs?: ITextPosition[];
  opportunity_wishes?: any[]; // Replace 'any' with the appropriate type
}