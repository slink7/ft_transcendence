export class Party{
	id_party:number;
	party_name:string;
	date_start:Date;
	date_end:Date;
	//add Gamemode
	constructor(id_party:number, party_name:string, date_start:Date, date_end:Date)
	{
		this.id_party = id_party;
		this.party_name = party_name;
		this.date_start = date_start;
		this.date_end = date_end;
	}
}

// let d = new Date('2024-05-14T15:11:38.208+00');