export interface Superstar {
    id: number;
    name: string;
    overall: number;
    gender: "M" | "F";
}

export interface TagTeam {
    id: number;
    name: string;
    members: Superstar[];
}
