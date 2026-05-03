import { Router } from "express";
import { getAllScore, getScore } from "../controllers/Score.controller.js";
import { jwtAuth } from "../security/jwt.verif.js";


export const scoreRouter = Router();

scoreRouter.get("/scorelist/asc",jwtAuth, async (req, res) => { getAllScore(req,res, "ASC") });
scoreRouter.get("/scorelist/desc",jwtAuth, async (req, res) => { getAllScore(req,res, "DESC")});

scoreRouter.get("/id_player/:id_player/asc", jwtAuth,async (req, res) => { getScore(req, res, "ASC", "id_player" );});
scoreRouter.get("/id_player/:id_player/desc",jwtAuth, async (req, res) => { getScore(req, res, "DESC", "id_player" );});

scoreRouter.get("/id_game/:id_game/asc", jwtAuth,async (req, res) => { getScore(req, res, "ASC", "id_game" );});
scoreRouter.get("/id_game/:id_game/desc",jwtAuth, async (req, res) => { getScore(req, res, "DESC", "id_game" );});
