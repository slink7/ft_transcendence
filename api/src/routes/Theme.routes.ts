import { Router } from "express";
import { getAllTheme, getTheme } from "../controllers/Theme.controller.js"; 

export const themeRouter = Router();

themeRouter.get("/themelist", getAllTheme);
themeRouter.get("/id_theme/:id_theme", getTheme);
