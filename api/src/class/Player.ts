import { Theme } from "./Theme.js"
import { Play } from "./Play.js"



export class Player {
    id_player:number;
    username:string;
    email:string;
    color_pseudo:string;
    theme:Theme;
    play:Play[];


    constructor(id_player: number, username: string, email: string, color_pseudo: string, theme:Theme, play:Play[]) {
        this.id_player = id_player;
        this.username=username;
        this.email=email;
        this.color_pseudo=color_pseudo;
        this.theme=theme;
        this.play=play;
    };
}