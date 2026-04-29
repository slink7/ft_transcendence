import { Theme } from "./Theme.js"
import { Score } from "./Score.js"
import { Request, Response } from "express";
import { Pool } from "pg";
import { CONFIG } from "../config.js";
import { Game } from "./Game.js";



export class Player {
    id_player: number;
    username: string;
    email: string;
    profile_color: string;
    id_theme: number;

    constructor(id_player: number, username: string, email: string, profile_color: string,id_theme:number) {
        this.id_player = id_player;
        this.username = username;
        this.email = email;
        this.profile_color = profile_color;
        this.id_theme = id_theme;
    };
}

export function parsePlayer(player:any)
{
    return new Player(
        player.id_player,
        player.username,
        player.email,
        player.profile_color,
        player.id_theme
    );
}