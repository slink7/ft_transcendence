import { pool } from "../db.js";

export async function getAllBasesPlayer() {
    const query = `SELECT
                player.id_player,
                player.username,
                player.email,
                player.profile_color,
                player.last_sign,
                player.id_theme
                FROM player
                ORDER BY player.id_player ASC`;
    return await pool.query(query);
}

export async function getBasesPlayer(value: any, field:string) {
    const query = `SELECT
                player.id_player,
                player.username,
                player.email,
                player.profile_color,
                player.last_sign,
                player.id_theme
                FROM player
                WHERE player.${field}=$1`;
    return await pool.query(query, [value]);
}
