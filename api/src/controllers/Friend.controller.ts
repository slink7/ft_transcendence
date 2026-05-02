import { Friend, parseFriend } from "../class/Friend.js";
import { Request, Response } from "express";
import { selectFriendList } from "../service/Friend.service.js";

export async function getFriendList(req:Request, res:Response)
{
    var value = req.params.id_player;
    try {
            console.log("try get all friend");
            var friendResult = await selectFriendList(value);
            if (friendResult.rowCount == 0)
            {
                res.status(404).send({ error: "No friend found"});
                return;
            }
            var friendRows = friendResult.rows;
            var friendList: Friend[] = [];
            friendRows.forEach(friend => {
                friendList.push(parseFriend(friend))
            });
            res.status(200).send(friendList);
            console.log(`All friends were successfully sent`);
        }
        catch (err) {
            console.error(err);
            res.status(500).send({
                error: "Erreur serveur"
            });
        }
}