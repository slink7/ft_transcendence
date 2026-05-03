import { Router } from "express";
import { getAllTheme, getTheme } from "../controllers/Theme.controller.js"; 
import { jwtAuth } from "../security/jwt.verif.js";


export const themeRouter = Router();

themeRouter.get("/themelist",jwtAuth, getAllTheme);
themeRouter.get("/id_theme/:id_theme",jwtAuth, getTheme);
