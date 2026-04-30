import express from "express";
import { CONFIG } from "./config.js";
import { playerRouter } from "./routes/Player.routes.js";
import { themeRouter } from "./routes/Theme.routes.js";
import { scoreRouter } from "./routes/Score.routes.js";
import { gameRouter } from "./routes/Game.routes.js";


const app = express();
const port = CONFIG.PORT;
const baseUrl = "/wextrapi"

app.use(express.json());


app.use(`${baseUrl}/player`, playerRouter );
app.use(`${baseUrl}/theme`, themeRouter);
app.use(`${baseUrl}/score`, scoreRouter);
app.use(`${baseUrl}/game`, gameRouter);




function serverStart() {
    console.log(`Le serveur est en cours d'exécution sur http://localhost:${port}`);
}


app.listen(port, serverStart);
