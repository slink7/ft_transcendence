export class Game{
	id_game:number;
	game_name:string;
	// date_start:Date;
	// date_end:Date;
	//add Gamemode
	constructor(id_game:number, game_name:string)
	{
		this.id_game = id_game;
		this.game_name = game_name;
		// this.date_start = date_start;
		// this.date_end = date_end;
	}
}

// let d = new Date('2024-05-14T15:11:38.208+00');