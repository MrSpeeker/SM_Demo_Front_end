import { ISingularRequirement } from "./singular-requirement.interface";
import { ITextPosition } from "./text-position.interface";

export interface ICompositeRequirement {
    requirement_position: ITextPosition;
    singular_requirements: ISingularRequirement[];
    weight: number;
}