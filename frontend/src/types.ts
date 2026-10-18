export interface Competitor {
	id: number;
	name: string;
	overall: number;
	rank: number;
	wins: number;
	losses: number;
	ppvWins: number;
	ppvLosses: number;
	championship: string | null;
	reigns: TitleReigns;
}

export type Gender = "M" | "F";

export interface Superstar extends Competitor {
	gender: Gender;
}

export interface TagTeam extends Competitor {
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
