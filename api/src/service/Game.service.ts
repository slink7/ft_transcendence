import { pool } from "../db.js"

export async function selectAllGame(){
    const query = `SELECT
                id_game,
                game_name,
                date_start,
                date_end
                FROM game
                ORDER BY date_end DESC`;
    return await pool.query(query);
}

export async function selectGame(id_game:any){
    const query = `SELECT
                id_game,
                game_name,
                date_start,
                date_end
                FROM game
                ORDER BY date_end DESC`;
    return await pool.query(query);
}