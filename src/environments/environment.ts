export const environment: Environment = {
    production: false
};

export interface Environment {
    production: boolean;
    apiUrl?: string;
}