import { Router } from "express";
import { getAllScore, getScore } from "../controllers/Score.controller.js";

export const scoreRouter = Router();

scoreRouter.get("/scorelist/asc", async (req, res) => { getAllScore(req,res, "ASC") });
scoreRouter.get("/scorelist/desc", async (req, res) => { getAllScore(req,res, "DESC")});

scoreRouter.get("/id_player/:id_player/asc", async (req, res) => { getScore(req, res, "ASC", "id_player" );});
scoreRouter.get("/id_player/:id_player/desc", async (req, res) => { getScore(req, res, "DESC", "id_player" );});

scoreRouter.get("/id_game/:id_game/asc", async (req, res) => { getScore(req, res, "ASC", "id_game" );});
scoreRouter.get("/id_game/:id_game/desc", async (req, res) => { getScore(req, res, "DESC", "id_game" );});
