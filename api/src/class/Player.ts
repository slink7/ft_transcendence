import { Theme } from "./Theme.js"

export class Player {
    id_player:number;
    username:string;
    email:string;
    color_pseudo:string;
    theme:Theme;

    constructor(id_player: number, username: string, email: string, color_pseudo: string, theme:Theme) {
        this.id_player = id_player;
        this.username=username;
        this.email=email;
        this.color_pseudo=color_pseudo;
        this.theme = theme;
    };
}