import { Router } from "express";
import { getPlayerList, getPlayer} from "../controllers/Player.controller.js";
 
export const playerRouter = Router();

playerRouter.get("/playerlist", getPlayerList);
playerRouter.get("/username/:username", async (req, res) => { getPlayer(req, res, "username");});
playerRouter.get("/id/:id_player", async (req, res) => { getPlayer(req, res, "id_player");});
