import { Request, Response } from "express";
import { selectAllPlayer, selectPlayer } from "../service/Player.service.js";
import { Player, parsePlayer } from "../class/Player.js"


export async function getAllPlayer(req: Request, res: Response) {
    try {
        console.log("try get all Player");
        var playerResult = await selectAllPlayer();
        if (playerResult.rowCount == 0) {
            res.status(404).send({ error: "No player found" });
            return;
        }
        var playerRows = playerResult.rows;
        var playerList: Player[] = [];
        playerRows.forEach(player => {
            playerList.push(parsePlayer(player))
        });
        res.status(200).send(playerList);
            console.log("All player were successfully sent");
    }
    catch (err) {
        console.error(err);
        res.status(500).send({
            error: "Erreur serveur"
        });
    }
}
export async function getPlayer(req: Request, res: Response, field: "id_player" | "username") {
    const value = field === "id_player" ? req.params.id_player : req.params.username;
    try {
        console.log(`try get Player ${value}`);
        var playerResult = await selectPlayer(value, field);
        if (playerResult.rowCount == 0) {
            res.status(404).send({
                error: `player ${value} not found`
            });
            return;
        }
        res.status(200).send(parsePlayer(playerResult.rows[0]));
            console.log(`player ${value} were successfully sent`);
    }
    catch (err) {
        console.error(err);
        res.status(500).send({
            error: "Erreur serveur"
        });
    }
}
// export async function getPlayerList(req: Request, res: Response, pool: Pool) {
//     const playersMap = new Map<number, Player>();
//     const query = `SELECT
//                 player.id_player,
//                 player.username,
//                 player.email,
//                 player.profile_color,
//                 player.last_sign,
//                 theme.id_theme,
//                 theme.l_left,
//                 theme.l_right,
//                 theme.s_left,
//                 theme.s_right,
//                 theme.t,
//                 theme.square,
//                 theme.rod,
//                 score.id_game,
//                 score.level,
//                 score.score,
//                 score.line_cleared,
//                 score.win,
//                 game.id_game,
//                 game.game_name
//                 FROM player
//                 INNER JOIN theme ON player.id_theme = theme.id_theme
//                 LEFT JOIN score ON player.id_player = score.id_player
//                 INNER JOIN game ON score.id_game = game.id_game
//                 ORDER BY player.id_player ASC`;
//     try {
//         console.log("get player list is required");
//         const result = await pool.query(query);
//         result.rows.forEach(element => {
//             let player = playersMap.get(element.id_player);
//             if (!player) {
//                 const score: Score[] = [];
//                 const theme = new Theme(
//                     element.id_theme,
//                     element.l_left,
//                     element.l_right,
//                     element.s_left,
//                     element.s_right,
//                     element.t,
//                     element.square,
//                     element.rod
//                 );
//                 player = new Player(
//                     element.id_player,
//                     element.username,
//                     element.email,
//                     element.profile_color,
//                     theme,
//                     score
//                 );
//                 playersMap.set(element.id_player, player);
//             }
//             if (element.id_party !== null) {
//                 const game: Game = new Game(
//                     element.id_game,
//                     element.game_name
//                 );
//                 const newScore: Score = new Score(
//                     element.level,
//                     element.score,
//                     element.line_cleared,
//                     element.win,
//                     game
//                 );
//                 player.score.push(newScore);
//             }
//         });
//         res.send(Array.from(playersMap.values()));
//         console.log(`${playersMap.size} row(s) send`);
//     }
//     catch (err) {
//         console.error(err);
//         res.status(500).send({
//             error: "Erreur serveur"
//         });
//     }
// }
// export async function getFriend(req: Request, res: Response, pool: Pool, players:Map<number,Player>)
// {

// }

// export async function getPlayer(req: Request, res: Response, field: "id_player" | "username", pool: Pool) {
//     const query = `SELECT
//                     player.id_player,
//                     player.username,
//                     player.email,
//                     player.profile_color,
//                     player.last_sign,
//                     theme.id_theme,
//                     theme.l_left,
//                     theme.l_right,
//                     theme.s_left,
//                     theme.s_right,
//                     theme.t,
//                     theme.square,
//                     theme.rod,
//                     score.id_game,
//                     score.level,
//                     score.score,
//                     score.line_cleared,
//                     score.win,
//                     game.id_game,
//                     game.game_name,
//                     friend_player.id_player,
//                     friend_player.username,
//                     friend_player.profile_color
//                     FROM player
//                     INNER JOIN theme ON player.id_theme = theme.id_theme
//                     LEFT JOIN score ON player.id_player = score.id_player
//                     LEFT JOIN game ON score.id_game = game.id_game
//                     LEFT JOIN friend AS f
//                     ON player.id_player = f.id_player
//                     OR player.id_player = f.id_friend
//                     LEFT JOIN player AS friend_player
//                     ON friend_player.id_player =
//                     case
//                     WHEN f.id_player = player.id_player THEN f.id_friend
//                     ELSE f.id_player
//                     END
//                     WHERE player.${field}=$1
//                     `;
//     try {
//         const value = field === "id_player" ? req.params.id_player : req.params.username;
// const result = await pool.query(query, [value]);
//         console.log(`get player with ${field} = ${value} required`);

//         const score:Score[] = [];
//         const theme = new Theme(
//             result.rows[0].id_theme,
//             result.rows[0].l_left,
//             result.rows[0].l_right,
//             result.rows[0].s_left,
//             result.rows[0].s_right,
//             result.rows[0].t,
//             result.rows[0].square,
//             result.rows[0].rod
//         );
//         var player = new Player(
//             result.rows[0].id_player,
//             result.rows[0].username,
//             result.rows[0].email,
//             result.rows[0].profile_color,
//             theme,
//             score,
//             friend
//         );
//         result.rows.forEach(element => {
//             const game: Game = new Game(
//                 element.id_game,
//                 element.game_name
//             );
//             const newScore: Score = new Score(
//                 element.level,
//                 element.score,
//                 element.line_cleared,
//                 element.win,
//                 game
//             );
//             player.score.push(newScore);
//         });
//         res.send(player);
//         console.log(`1 row send`);

//     }
//     catch (err) {
//         console.error(err);
//         res.status(500).send({
//             error: "Erreur serveur"
//         });
//     }
// }