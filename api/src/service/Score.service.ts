import { pool } from "../db.js";

export async function selectAllScore(order:string)
{
    const query = `SELECT
                id_player,
                id_game,
                level,
                score,
                line_cleared,
                win
                FROM score
                ORDER BY id_game ${order}`;
    return await pool.query(query);  
}

export async function selectScore(value: any, order:string , field:string)
{
    const query = `SELECT
                id_player,
                id_game,
                level,
                score,
                line_cleared,
                win
                FROM score
                WHERE ${field}=$1
                ORDER BY id_game ${order}`;
    return await pool.query(query, [value]);
}