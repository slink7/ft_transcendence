import { Request, Response } from "express";
import { Theme, parseTheme } from "../class/Theme.js";
import { getTheme, getAllTheme } from "../service/Theme.service.js";


export async function getThemeList(req: Request, res: Response) {
    try {
        var themeResult = await getAllTheme();
        var themeRows = themeResult.rows;
        var themeList: Theme[] = [];
        themeRows.forEach(theme => {
            themeList.push(parseTheme(theme));
        });
        res.send(themeList);
    }
    catch (err) {
        console.error(err);
        res.status(500).send({
            error: "Erreur serveur"
        });
    }
}