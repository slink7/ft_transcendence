import { Request, Response } from "express";
import { insertPlayer, selectAllPlayer, selectPlayer, selectPlayerLogin } from "../service/Player.service.js";
import { Player, parsePlayer } from "../class/Player.js"
import jwt from "jsonwebtoken";


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

export async function loginPlayer(req: Request, res: Response) {
    const { email, pwd } = req.body
    try {

        const value = [email, pwd];
        if (!email || !pwd) {
            return res.status(400).send({
                error: "Missing required fields"
            });
        }
        console.log(`try get Player ${email}`);
    const { email, pwd } = req.body
    try {

        const value = [email, pwd];
        if (!email || !pwd) {
            return res.status(400).send({
                error: "Missing required fields"
            });
        }
        console.log(`try get Player ${email}`);
        var playerResult = await selectPlayerLogin(value);
        if (playerResult.rowCount == 0) {
            res.status(404).send({
                error: `player ${email} not found`
                error: `player ${email} not found`
            });
            return;
        }
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET is missing from environment variables");
        }
        const player: Player = parsePlayer(playerResult.rows[0]);
        const token = jwt.sign(
            {
                id: player.id_player,
                username: player.username,
                id_theme: player.id_theme
            },
            jwtSecret,
            {
                expiresIn: "1h"
            }
        );
        res.status(200).send(token);
        console.log(`player ${email} were successfully sent`);
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET is missing from environment variables");
        }
        const player: Player = parsePlayer(playerResult.rows[0]);
        const token = jwt.sign(
            {
                id: player.id_player,
                username: player.username,
                id_theme: player.id_theme
            },
            jwtSecret,
            {
                expiresIn: "1h"
            }
        );
        res.status(200).send(token);
        console.log(`player ${email} were successfully sent`);
    }
    catch (err) {
        console.error(err);
        res.status(500).send({
            error: "Erreur serveur"
        });
    }
}

export async function addPlayer(req: Request, res: Response) {
    try {
        const { username, email, pwd, profile_color } = req.body;
        if (!username || !email || !pwd || !profile_color) {
            return res.status(400).send({
                error: "Missing required fields"
            });
        }
        const values = [username, email, pwd, profile_color];
        console.log(`try add Player ${username}`);
        var playerResult = await insertPlayer(values);
        if (!playerResult.rows || playerResult.rowCount === 0) {
            console.log(playerResult);
            return res.status(500).send({
                error: "Player could not be created"
            });
        }
        res.status(201).send(`player ${username} succesfully created`);
    }
    catch (err: any) {
    catch (err: any) {

        if (err.code === "23505") {
            return res.status(409).send({
                error: "Duplicate value",
                detail: err.detail,
                constraint: err.constraint
            });
        }
        console.error(err);
        res.status(500).send({
            error: "Erreur serveur"
        });
    }
}
