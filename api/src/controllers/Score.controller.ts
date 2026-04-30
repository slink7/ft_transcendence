import { Request, Response } from "express"; 4
import { Score, parseScore } from "../class/Score.js";
import { selectAllScore, selectScore } from "../service/Score.service.js";

export async function getAllScore(req: Request, res: Response, order: "ASC" | "DESC") {
    try {
        console.log("try get all Score");
        var scoreResult = await selectAllScore(order);
        var scoreRows = scoreResult.rows;
        var scoreList: Score[] = [];
        scoreRows.forEach(score => {
            scoreList.push(parseScore(score));
        });
        res.send(scoreList);
    }
    catch (err) {
        console.error(err);
        res.status(500).send({
            error: "Erreur serveur"
        });
    }
}
export async function getScore(req: Request, res: Response, order: "ASC" | "DESC", field: "id_player" | "id_game") {
    const value = field === "id_player" ? req.params.id_player : req.params.id_game;
    try {
        console.log(`try get Player ${value}`);
        var scoreResult = await selectScore(value, order, field);
        if(scoreResult.rowCount == 0)
        {
            res.status(404).send({
                error: `score ${value} not found`
            });
            return;
        }
        var scoreRows = scoreResult.rows;
        var scoreList: Score[] = [];
        scoreRows.forEach(score => {
            scoreList.push(parseScore(score));
        });
        res.send(scoreList);
    }
    catch (err) {
        console.error(err);
        res.status(500).send({
            error: "Erreur serveur"
        });
    }

}