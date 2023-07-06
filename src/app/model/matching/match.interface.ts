import { IDomainDemandResult } from "../helpers/domain-demand-result.interface";
import { IDomainTermsResult } from "../helpers/domain-terms-result.interface";
import { IGenericModelResult } from "../helpers/generic-model-result.interface";
import { IGenericTfIdfResult } from "../helpers/generic-tf-idf-result.interface";
import { IQualifierDomainDemandResult } from "../helpers/qualifier-domain-demand-result.interface";
import { ICv } from "./cv.interface";
import { IOpportunity } from "./opportunity.interface";

export interface IMatch {
    cv: ICv;
    opportunity: IOpportunity;
    matched_eisen_wensen_domain: any;
    jaren_ervaring_eisen_wensen: any;
    qualifier_domain_demand_result: IQualifierDomainDemandResult;
    domain_demand_result: IDomainDemandResult;
    domain_terms_result: IDomainTermsResult;
    generic_tfidf_result: IGenericTfIdfResult;
    generic_prediction_result: IGenericModelResult;
}