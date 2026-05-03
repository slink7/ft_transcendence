import { Router } from "express";
import { getAllGame, getGame } from "../controllers/Game.controller.js";
import { jwtAuth } from "../security/jwt.verif.js";


export const gameRouter = Router();

gameRouter.get("/gamelist",jwtAuth, getAllGame);
gameRouter.get("/id_game/:id_game",jwtAuth, async (req, res) => { getGame(req, res);});