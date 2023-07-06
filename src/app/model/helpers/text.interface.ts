export interface IText {
    full_text: string;
    paragraph_separator: string;
    source_id: number;
    tokens: string[];
    tokens_term_pos: any[]; // Replace 'any' with the appropriate type
}