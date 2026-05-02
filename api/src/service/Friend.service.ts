import { Friend } from "../class/Friend.js";
import { pool } from "../db.js";

export async function selectFriendList(id_player:any) {
    const query = `SELECT
                    case 
                        when friend.id_player=$1
                        then friend.id_friend
                        else friend.id_player
                    end
                    as id,
                    friend.statue,
                    friend.send_date,
                    player.username
                    from friend
                    inner join player 
                    on player.id_player= 
                    case 
                        when friend.id_player=$1
                        then friend.id_friend
                        else friend.id_player
                    end
                    where friend.id_player=$1
                    or friend.id_friend=$1`
    return pool.query(query,[id_player]);
}