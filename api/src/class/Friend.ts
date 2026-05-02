export class Friend {
    friend:number;
    username:string
    statue:string;
    date_send:Date;
    constructor(friends: number,username:string ,statue: "accepted" | "refused" | "pending", date_send: Date) 
    {
        this.friend = friends,
        this.username = username,
        this.statue = statue,
        this.date_send = date_send
    }
}

export function parseFriend(friend:any)
{
    return new Friend(
            friend.friend,
            friend.username,
            friend.statue,
            new Date(friend.send_date)
        );
}