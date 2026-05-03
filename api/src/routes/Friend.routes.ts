import { Router } from "express";
import { getFriendList } from "../controllers/Friend.controller.js";
import { jwtAuth } from "../security/jwt.verif.js";
 

export const friendRouter = Router();

friendRouter.get("/friendlist", jwtAuth,getFriendList);
// friendRouter.get("/friendlist/:id_player", jwtAuth,getFriendList);

