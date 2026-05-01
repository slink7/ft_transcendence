import { Router } from "express";
import { getThemeList } from "../controllers/Theme.controller.js"; 

export const themeRouter = Router();

themeRouter.get("/themelist", getThemeList);