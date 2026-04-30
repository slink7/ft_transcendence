import { Player } from "./Player.js";

export class Friend {
    friend:number;
    statue:string;
    date_send:Date;
    constructor(friends: number, statue: "accepted" | "refused" | "pending", date_send: Date) 
    {
        this.friend = friends,
        this.statue = statue,
        this.date_send = date_send
    }
}

export function parseFriend(friend:any)
{
    return new Friend(
            friend.friend,
            friend.statue,
            friend.date_send
        );
}