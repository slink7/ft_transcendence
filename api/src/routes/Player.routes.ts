import { Router } from "express";
import { getAllPlayer, getPlayer} from "../controllers/Player.controller.js";
 
export const playerRouter = Router();

playerRouter.get("/playerlist", getAllPlayer);
playerRouter.get("/username/:username", async (req, res) => { getPlayer(req, res, "username");});
playerRouter.get("/id_player/:id_player", async (req, res) => { getPlayer(req, res, "id_player");});
