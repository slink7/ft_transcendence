export class Game{
	id_game:number;
	game_name:string;
	date_start:Date;
	date_end:Date;

	constructor(id_game:number, game_name:string, date_start:Date, date_end:Date)
	{
		this.id_game = id_game;
		this.game_name = game_name;
		this.date_start = date_start;
		this.date_end = date_end;
	}
}

export function parseGame(game:any)
{
	return new Game(
			game.id_game,
			game.game_name,
			new Date(game.date_start),
			new Date(game.date_end)
	)
}

// let d = new Date('2024-05-14T15:11:38.208+00');