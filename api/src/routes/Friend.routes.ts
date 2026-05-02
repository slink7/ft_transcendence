import { Router } from "express";
import { getFriendList } from "../controllers/Friend.controller.js";
 
export const friendRouter = Router();

friendRouter.get("/friendlist/:id_player", getFriendList);
