export interface IValidationSummary {
    Accuracy: number;
    CohenKappa: number;
    F1: number;
    Matrix: number[];
    Model_name: string;
    Precision: number;
    RMSE: number;
    Ranking: number;
    Recall: number;
}