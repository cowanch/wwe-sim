export interface Superstar {
	id: number;
	name: string;
	overall: number;
	gender: "M" | "F";
	rank: number;
	wins: number;
	losses: number;
	ppvWins: number;
	ppvLosses: number;
	championship: string | null;
	titleHistory: TitleReigns;
}

export interface TagTeam {
	id: number;
	name: string;
	members: Superstar[];
}

export interface Championship {
	id: TitleKey;
	name: string;
}

export interface TitleReigns {
	wwe: number;
	universal: number;
	nxt: number;
	intercontinental: number;
	unitedStates: number;
	rawWomens: number;
	smackdownWomens: number;
	nxtWomens: number;
	rawTagTeam: number;
	smackdownTagTeam: number;
	nxtTagTeam: number;
}

export type TitleKey = keyof TitleReigns;
