import express from "express";
import { Pool } from "pg";
import { CONFIG } from "./config.js";
import { Player } from "./class/Player.js";
import { Theme } from "./class/Theme.js"
import { Play } from "./class/Play.js"

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
    const playersMap = new Map<number, Player>();
    const query = `
        SELECT 
            player.id_player,
            player.username,
            player.email,
            player.color_pseudo,

            theme.id_theme,
            theme.theme_directory,

            play.id_party,
            play.level,
            play.score,
            play.line_cleared
        FROM player
        INNER JOIN theme ON player.id_theme = theme.id_theme
        LEFT JOIN play ON player.id_player = play.id_player
        ORDER BY player.id_player ASC
    `;
    try{
        const result = await pool.query(query);
        result.rows.forEach(element => {
        let player = playersMap.get(element.id_player);
        if (!player) {
            const play: Play[] = [];

            const theme = new Theme(
                element.id_theme,
                element.theme_directory
            );
            player = new Player(
                element.id_player,
                element.username,
                element.email,
                element.color_pseudo,
                theme,
                play
            );
            playersMap.set(element.id_player, player);
        }
        if (element.id_party !== null) {
            const newPlay: Play = new Play(
                element.level,
                element.score,
                element.line_cleared
            );
            player.play.push(newPlay);
        }
        });
        res.send(Array.from(playersMap.values()));
    }
    catch (err) {
        console.error(err);
        res.status(500).send({
            error: "Erreur serveur"
        });
    }
});

app.get("/player/:id_player", async (req, res) => {
    var query: string = `SELECT * FROM player\
                    INNER JOIN theme ON player.id_theme = theme.id_theme\
                    WHERE id_player=${req.params.id_player}`
    console.log(req.params.id_player);
    try {
        const result = await pool.query(query);
        const theme = new Theme(result.rows[0].id_theme,
                                result.rows[0].theme_directory);
        var play:Play[] = [];
        var player = new Player(result.rows[0].id_player, 
                                result.rows[0].username, 
                                result.rows[0].email, 
                                result.rows[0].color_pseudo, 
                                theme, play);
        res.send(player);
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
