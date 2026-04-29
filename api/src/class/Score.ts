import { Game } from "./Game.js"

export class Score
{
	// party:Party;
	level:number;
	score:number;
	line_cleared:number;
	win:boolean;
	game:Game;

	constructor(level:number, score:number, line_cleared:number,win:boolean, game:Game)
	{
		this.level = level;
		this.score = score;
		this.line_cleared = line_cleared;
		this.win = win;
		this.game = game;
	}
}