import { Game } from "./Game.js"

export class Score
{
	id_player:number
	id_game:number;
	level:number;
	score:number;
	line_cleared:number;
	win:boolean;

	constructor(id_player:number, id_game:number,level:number, score:number, line_cleared:number,win:boolean, )
	{
		this.id_player = id_player;
		this.id_game = id_game;
		this.level = level;
		this.score = score;
		this.line_cleared = line_cleared;
		this.win = win;
	}
}

export function parseScore(score:any)
{
	return new Score(
		score.id_player,
		score.id_game,
		score.level,
		score.score,
		score.line_cleared,
		score.win,
	);
}

