export interface IDomainDemandResult {
    score: number;
    fulfilled_demands: any[]
    unfulfilled_demands: any[]
    fulfilled_wishes: any[]
    unfulfilled_wishes: any[]
    term_list_version: number;
}