import { Router } from "express";
import { getAllGame, getGame } from "../controllers/Game.controller.js";

export const gameRouter = Router();

gameRouter.get("/gamelist", getAllGame);
gameRouter.get("/id_game/:id_game", async (req, res) => { getGame(req, res);});