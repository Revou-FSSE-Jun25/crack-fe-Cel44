export type Movie = {
    id: number;
    img: string[];
    title: string;
    genre?: string;
    rating?: string; // e.g., "PG-13", "R"
    duration?: number; // duration in minutes
    description? : string;
}