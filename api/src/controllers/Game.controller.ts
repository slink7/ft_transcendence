import { Game, parseGame } from "../class/Game.js"
import { Request, Response } from "express";
import { selectAllGame, selectGame } from "../service/Game.service.js";

export async function getAllGame(req: Request, res: Response) {
    try {
        console.log("try get all Game");
        var gameResult = await selectAllGame();
        if (gameResult.rowCount == 0) {
            res.status(404).send({ error: "No game found" });
            return;
        }
        var gameRows = gameResult.rows;
        var gameList: Game[] = [];
        gameRows.forEach(Game => {
            gameList.push(parseGame(Game))
        });
        res.status(200).send(gameList);
        console.log(`All game were successfully sent`);

    }
    catch (err) {
        console.error(err);
        res.status(500).send({
            error: "Erreur serveur"
        });
    }
}
export async function getGame(req: Request, res: Response) {
    const value = req.params.id_game;
    try {
        console.log(`try get Game ${value}`);
        var gameResult = await selectGame(value);
        if (gameResult.rowCount == 0) {
            res.status(404).send({
                error: `game ${value} not found`
            });
            return;
        }
        var game = gameResult.rows[0];
        res.status(200).send(parseGame(game));
        console.log(`game ${value} were successfully sent`);

    }
    catch (err) {
        console.error(err);
        res.status(500).send({
            error: "Erreur serveur"
        });
    }

}