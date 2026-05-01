import { Friend } from "../class/Friend.js";
import { pool } from "../db.js";

export async function selectFriendList(id_player:any) {
    const query = `SELECT 
                    f.id_friend,
                    f.statue,
                    f.date_send,
                    FROM friend AS f
                    WHERE  player.id_player = f.id_player

                `;

//                  OR player.id_player = f.id_friend
//                  LEFT JOIN player AS friend_player
//                  ON friend_player.id_player =
//                  case
//                  WHEN f.id_player = player.id_player THEN f.id_friend
//                  ELSE f.id_player
//                  END
    return pool.query(query);
}