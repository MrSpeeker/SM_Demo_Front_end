import { ICompositeRequirement } from "../helpers/composite-requirement.interface";
import { ICompositeTerm } from "../helpers/composite-term.interface";
import { ITextPosition } from "../helpers/text-position.interface";
import { IText } from "../helpers/text.interface";

export interface IOpportunity {
  display_name: string;
  object_id: number;
  opportunity_demand_paragraphs: ITextPosition[];
  opportunity_demands: any[]; // Replace 'any' with the appropriate type
  opportunity_expanded_demands: ICompositeRequirement[];
  opportunity_expanded_terms: ICompositeTerm[];
  opportunity_expanded_wishes: ICompositeRequirement[];
  opportunity_id: string;
  opportunity_terms: any[]; // Replace 'any' with the appropriate type
  opportunity_wish_paragraphs: ITextPosition[];
  opportunity_wishes: any[]; // Replace 'any' with the appropriate type
  reference_id: number;
  role: string;
  rvo_status: string;
  text: IText;
}
