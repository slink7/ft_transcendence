import express from "express"
import { CONFIG } from "./config.js"

const app = express();
const port = CONFIG.PORT;

function serverStart()
{
    console.log(`Le serveur est en cours d'exécution sur http://localhost:${port}` );
}

function callbackGet()
{
    console.log("une fonction geta ete utilisee");
}

app.get("/test", async (req, res) => {
    callbackGet();
    console.log("test is called");
    res.send("Route /test appelée");
});
app.listen(port, serverStart);


// // const express = require('express');
// // const cors =require('cors');
// // const app = express();
// const port = 3000;
