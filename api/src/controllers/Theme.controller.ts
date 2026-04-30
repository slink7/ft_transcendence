import { Request, Response } from "express";
import { Theme, parseTheme } from "../class/Theme.js";
import { selectThemeById, selectAllTheme } from "../service/Theme.service.js";


export async function getAllTheme(req: Request, res: Response) {
    try {
        console.log(`try get all Theme`);
        var themeResult = await selectAllTheme();
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


export async function getTheme(req: Request, res: Response) {
    try {
        var themeResult = await selectThemeById(req.params.id_theme);
        console.log(`try get player ${req.params.id_theme}`);
        if(themeResult.rowCount == 0)
        {
            res.status(404).send({
                error: `theme ${req.params.id_theme} not found`
            });
            return;
        }
        var theme = parseTheme(themeResult.rows[0])
        res.send(theme);
    }
    catch (err) {
        console.error(err);
        res.status(500).send({
            error: "Erreur serveur"
        });
    }
}