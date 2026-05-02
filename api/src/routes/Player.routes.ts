import { Router } from "express";
import { addPlayer, getAllPlayer, getPlayer, loginPlayer} from "../controllers/Player.controller.js";
 import { jwtAuth } from "../security/jwt.verif.js";
export const playerRouter = Router();

playerRouter.get("/playerlist",jwtAuth, getAllPlayer);
playerRouter.get("/username/:username", async (req, res) => { getPlayer(req, res, "username");});
playerRouter.get("/id_player/:id_player", async (req, res) => { getPlayer(req, res, "id_player");});
playerRouter.post("/login", loginPlayer);
playerRouter.post("/signin", addPlayer);


