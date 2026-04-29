import express from "express";
// import { Request, Response } from "express";
import { Pool } from "pg";
import { CONFIG } from "./config.js";
// import { Player } from "./class/Player.js";
// import { Theme } from "./class/Theme.js"
// import { Score } from "./class/Score.js"
// import { Game } from "./class/Game.js";
// import {  } from "./controllers/Player.controller.js";
import { playerRouter } from "./routes/Player.routes.js";
import { themeRouter } from "./routes/Theme.routes.js";

const app = express();
const port = CONFIG.PORT;

const pool = new Pool({
    user: 'basic',
    password: '123456',
    host: 'localhost',
    port: 5432,
    database: 'transcendence',
});
app.use(express.json());

app.use("/player", playerRouter );
app.use("/theme", themeRouter);


function serverStart() {
    console.log(`Le serveur est en cours d'exécution sur http://localhost:${port}`);
}

// app.get("/player/playerlist", async (req, res) => { getPlayerList(req, res, pool);});

// app.get("/player/id/:id_player", (req: Request, res: Response) => {getPlayer(req, res, "id_player", pool);});

// app.get("/player/username/:username", (req: Request, res: Response) => {getPlayer(req, res, "username", pool);});

app.listen(port, serverStart);
