import { Party } from "./Party.js"

export class Play
{
	// party:Party;
	level:number;
	score:number;
	line_cleared:number;
	constructor(level:number, score:number, line_cleared:number)
	{
		// this.party = party;
		this.level = level;
		this.score = score;
		this.line_cleared = line_cleared;
	}
}