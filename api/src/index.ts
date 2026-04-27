import express from "express";
import { Client, Pool } from "pg";
import { CONFIG } from "./config.js";
import { Player } from "./class/Player.js";
import { Theme } from "./class/Theme.js"

const app = express();
const port = CONFIG.PORT;
const pool = new Pool({
    user: 'basic',
    password: '123456',
    host: 'localhost',
    port: 5432,
    database: 'transcendence',
});



function serverStart() {

    console.log(`Le serveur est en cours d'exécution sur http://localhost:${port}`);
}


app.get("/playerlist", async (req, res) => {
    var playerList: Player[] = [];
    var query: string = "SELECT * FROM player\
                    INNER JOIN theme ON player.id_theme = theme.id_theme\
                    ORDER BY player.id_player ASC"
    try {
        const result = await pool.query(query);
        result.rows.forEach(res => {
            const theme = new Theme(res.id_theme, res.theme_directory);
            var player = new Player(res.id_player, res.username, res.email, res.color_pseudo, theme);
            playerList.push(player);
        });
        res.send(playerList);
    }
    catch (err) {
        console.error(err);
        res.status(500).send({
            error: "Erreur serveur"
        });
    }
});

app.listen(port, serverStart);

// function callbackGet() {
//     console.log("une fonction get a ete utilisee ");
// }
// app.get("/test", async (req, res) => {
//     callbackGet();
//     var test = {
//         name: "jon",
//         lastname: "le douaron"
//     }
//     console.log("test is called ");
//     res.send(test);
// });
// // const express = require('express');
// // const cors =require('cors');
// // const app = express();
// const port = 3000;
