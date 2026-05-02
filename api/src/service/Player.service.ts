import { pool } from "../db.js";

export async function selectAllPlayer() {
    const query = `SELECT
                id_player,
                username,
                email,
                profile_color,
                last_sign,
                id_theme
                FROM player
                ORDER BY player.id_player ASC`;
    return await pool.query(query);
}

export async function selectPlayer(value: any, field:string) {
    const query = `SELECT
                id_player,
                username,
                email,
                profile_color,
                last_sign,
                id_theme
                FROM player
                WHERE player.${field}=$1`;
    return await pool.query(query, [value]);
}

export async function selectPlayerLogin(value:any[]) {
    const query = `SELECT
                id_player,
                username,
                email,
                profile_color,
                last_sign,
                id_theme
                FROM player
                WHERE player.email=$1 AND player.hash_pwd=$2`;
    return await pool.query(query, value);
}


export async function insertPlayer(value:any[]) {
    const query = `INSERT INTO player (
                    username,
                    email,
                    hash_pwd,
                    profile_color,
                    last_sign,
                    id_theme
                )
                VALUES ($1, $2, $3, $4,NULL, 1)`;
    return await pool.query(query, value);
}