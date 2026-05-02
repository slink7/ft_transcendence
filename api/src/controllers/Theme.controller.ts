import { Request, Response } from "express";
import { Theme, parseTheme } from "../class/Theme.js";
import { selectThemeById, selectAllTheme } from "../service/Theme.service.js";


export async function getAllTheme(req: Request, res: Response) {
    try {
        console.log(`try get all Theme`);
        var themeResult = await selectAllTheme();
        if (themeResult.rowCount == 0) {
            res.status(404).send({ error: "No theme found" });
            return;
        }
        var themeRows = themeResult.rows;
        var themeList: Theme[] = [];
        themeRows.forEach(theme => {
            themeList.push(parseTheme(theme));
        });
        res.status(200).send(themeList);
        console.log("All theme successfully sent");

    }
    catch (err) {
        console.error(err);
        res.status(500).send({
            error: "Erreur serveur"
        });
    }
}


export async function getTheme(req: Request, res: Response) {
    const value = req.params.id_theme;
    try {
        var themeResult = await selectThemeById(value);
        console.log(`try get player ${value}`);
        if (themeResult.rowCount == 0) {
            res.status(404).send({
                error: `theme ${value} not found`
            });
            return;
        }
        var theme = parseTheme(themeResult.rows[0])
        res.status(200).send(theme);
        console.log(`theme ${value} successfully sent`);

    }
    catch (err) {
        console.error(err);
        res.status(500).send({
            error: "Erreur serveur"
        });
    }
}